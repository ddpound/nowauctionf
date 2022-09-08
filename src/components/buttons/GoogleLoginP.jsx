import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import axios from "axios";

import { connect } from "react-redux/es/exports";

import {
  makeCookie,
  makeLocalStorageToken,
  makeLocalStorageReToken,
} from "../../commonFuntions/makeCookiesToken";
import { setUserStore } from "../../reduxstore/actions";

import { requestGetHaveToken } from "../../commonFuntions/requestHaveToken";

// 현재 어플리케이션 api 2번 아이디를 따르고있음
// 쿠키를 받아 냈을 때, 쿠키검사는 계속 하면서 아래 로그인 버튼은 뜨지 않는다.
// 즉 메인에서 쿠키 검사

const login_key = process.env.REACT_APP_google_login_API_KEY;

// 로그인상태 유지를 위한 부울 값 , 로그인 성공시 로그인을 유지하겠다는 true를 넣어주면됨

function giveRole() {
  const returnResponse = requestGetHaveToken("/user/info", null);

  returnResponse.then((res) => {
    if (!!res) {
      if (res.data.role == "ADMIN") {
        localStorage.setItem("adminSuccess", res.data.id);
      }

      if (res.data.role == "SELLER") {
        localStorage.setItem("sellerSuccess", res.data.id);
      }
    }
  });
}

function setUserModel(userName, role, nickName, picture) {
  return {
    userName: userName,
    role: role,
    nickName: nickName,
    picture: picture,
  };
}
function GoogleLoginP({ set, props }) {
  return (
    <GoogleOAuthProvider clientId={login_key}>
      <GoogleLogin
        size="large"
        type="standard"
        isSignedIn={true}
        onSuccess={(credentialResponse) => {
          const SuccessToken = credentialResponse.credential;
          // 현재 암호화된 토큰을 받아온걸 이걸 그대로 전해주면 될듯 백엔드쪽에
          //console.log(credentialResponse);

          //console.log(credentialResponse.credential);

          axios
            .get("/login/token/google", {
              headers: {
                Authorization: "Bearer " + SuccessToken, //the token is a variable which holds the token
              },
            })
            .then((responese) => {
              // 자동로그인인데 만약 해당 쿠키가 없다면 값받아서 쿠키에 추가
              // 이미 있는 쿠키값이라면 문제없음
              //console.log(responese);
              //console.log(responese.headers);

              const retrunAuthHeaders = responese.headers.authorization;
              const retrunAuthRefreshHeaders = responese.headers.refreshtoken;

              if (
                retrunAuthHeaders != null &&
                retrunAuthRefreshHeaders != null
              ) {
                makeCookie(7, retrunAuthHeaders);

                makeLocalStorageToken(
                  "google-login-success",
                  retrunAuthHeaders
                );

                makeLocalStorageReToken(
                  "google-login-success-re",
                  retrunAuthRefreshHeaders
                );

                set(
                  setUserModel(
                    responese.data.userName,
                    responese.data.role,
                    responese.data.nickName,
                    responese.data.picture
                  )
                );

                localStorage.setItem(
                  "userdata",
                  JSON.stringify(
                    setUserModel(
                      responese.data.userName,
                      responese.data.role,
                      responese.data.nickName,
                      responese.data.picture
                    )
                  )
                );

                // 로그인 완료 권한을 다시 주는것이 중요 로그아웃시에 다삭제
                giveRole();
                alert("로그인 완료.");

                props.history.push("/");
              } else {
                alert("로그인 실패");
              }
            })
            .catch((Error) => {
              if (Error.response.status == "500") {
                alert("서버에 문제 발생했습니다 죄송합니다!");
              }
              if (Error.response.status == "401") {
                console.log("로그인 실패 회원가입시도");
                // 주의 Post 요청일때는 반드시 중간에 null넣어줘야함
                // 요청 url, body, header 이렇게 되기 때문!!!
                axios
                  .post("/join/googletoken", null, {
                    headers: {
                      Authorization: "Bearer " + SuccessToken, //the token is a variable which holds the token
                    },
                  })
                  .then((responese) => {
                    console.log(responese);
                    axios
                      .get("/login/token/google", {
                        headers: {
                          Authorization: "Bearer " + SuccessToken, //the token is a variable which holds the token
                        },
                      })
                      .then((responese) => {
                        console.log(responese);
                        const retrunAuthHeaders =
                          responese.headers.authorization;
                        const retrunAuthRefreshHeaders =
                          responese.headers.refreshtoken;

                        if (
                          retrunAuthHeaders != null &&
                          retrunAuthRefreshHeaders != null
                        ) {
                          makeCookie(7, retrunAuthHeaders);

                          makeLocalStorageToken(
                            "google-login-success",
                            retrunAuthHeaders
                          );

                          makeLocalStorageReToken(
                            "google-login-success-re",
                            retrunAuthRefreshHeaders
                          );

                          localStorage.setItem(
                            "userdata",
                            JSON.stringify(
                              setUserModel(
                                responese.data.userName,
                                responese.data.role,
                                responese.data.nickName,
                                responese.data.picture
                              )
                            )
                          );

                          // 로그인 완료 권한을 다시 주는것이 중요 로그아웃시에 다삭제
                          giveRole();
                          alert("회원가입및 로그인 완료.");
                          props.history.push("/");
                        } else {
                          alert("로그인 실패");
                        }
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }
            });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
    </GoogleOAuthProvider>
  );
}

// 인자로 들어옴
const StateToprops = (state) => {
  return {
    userdata: state,
  };
};

const DispatchtoPrps = (dispatch) => {
  // 변경할때 사용

  return {
    set: (userModel) => {
      dispatch(setUserStore(userModel));
    },
  };
};

const loginContainer = connect(
  // 어떤값을 받아 props에 전달할지
  StateToprops,

  // 어떤값을 받아 dispatch할지
  DispatchtoPrps
)(GoogleLoginP);

export default loginContainer;

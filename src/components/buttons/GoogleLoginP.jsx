import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import axios from "axios";

import {
  makeCookie,
  makeLocalStorageToken,
  makeLocalStorageReToken,
} from "../../commonFuntions/makeCookiesToken";

// 현재 어플리케이션 api 2번 아이디를 따르고있음
// 쿠키를 받아 냈을 때, 쿠키검사는 계속 하면서 아래 로그인 버튼은 뜨지 않는다.
// 즉 메인에서 쿠키 검사

const login_key = process.env.REACT_APP_google_login_API_KEY;

// 로그인상태 유지를 위한 부울 값 , 로그인 성공시 로그인을 유지하겠다는 true를 넣어주면됨

export default function GoogleLoginP() {
  const expires = new Date();
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

                console.log(responese.data);
                alert("로그인 완료.");
                document.location.href = "/";
              } else {
                alert("로그인 실패");
              }
            })
            .catch((Error) => {
              if (Error.response.status == "500") {
                alert("서버에 문제 발생했습니다 죄송합니다!");
              }
              if (Error.response.status == "401") {
                console.log("전송전송할 토큰" + SuccessToken);
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

                          //console.log(responese);
                          alert("회원가입및 로그인 완료.");
                          document.location.href = "/";
                        } else {
                          alert("로그인 실패");
                        }
                      });
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

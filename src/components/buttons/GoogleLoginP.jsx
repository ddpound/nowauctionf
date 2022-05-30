import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import axios from "axios";

// 현재 어플리케이션 api 2번 아이디를 따르고있음
// 쿠키를 받아 냈을 때, 쿠키검사는 계속 하면서 아래 로그인 버튼은 뜨지 않는다.
// 즉 메인에서 쿠키 검사

const login_key = process.env.REACT_APP_google_login_API_KEY;

export default function GoogleLoginP() {
  return (
    <GoogleOAuthProvider clientId={login_key}>
      <GoogleLogin
        size="large"
        type="standard"
        onSuccess={(credentialResponse) => {
          // 현재 암호화된 토큰을 받아온걸 이걸 그대로 전해주면 될듯 백엔드쪽에
          console.log(credentialResponse);

          console.log(credentialResponse.credential);

          axios
            .get("/login/token/google", {
              headers: {
                "x-apikey": "59a7ad19f5a9fa0808f11931",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                  "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                Authorization: "Bearer " + credentialResponse.credential, //the token is a variable which holds the token
              },
            })
            .then((responese) => {
              // 자동로그인인데 만약 해당 쿠키가 없다면 값받아서 쿠키에 추가
              // 이미 있는 쿠키값이라면 문제없음
              console.log(responese);
              console.log(responese.headers);
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
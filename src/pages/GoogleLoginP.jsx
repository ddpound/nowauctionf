import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import axios from "axios";

// 현재 어플리케이션 api 2번 아이디를 따르고있음

const login_key = process.env.REACT_APP_google_login_API_KEY;

export default function GoogleLoginP() {
  return (
    <GoogleOAuthProvider clientId={login_key}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // 현재 암호화된 토큰을 받아온걸 이걸 그대로 전해주면 될듯 백엔드쪽에
          console.log(credentialResponse);

          console.log(credentialResponse.credential);

          axios
            .get("http://localhost:5000/try-login-google", {
              headers: {
                Authorization: "Bearer " + credentialResponse.credential, //the token is a variable which holds the token
              },
            })
            .then((responese) => {
              console.log(responese);
            });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        useOneTap
      />
      ;
    </GoogleOAuthProvider>
  );
}

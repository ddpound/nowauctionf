import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import axios from "axios";

// 현재 어플리케이션 api 2번 아이디를 따르고있음

export default function GoogleLoginP() {
  return (
    <GoogleOAuthProvider clientId="1013346603521-o3f3sr148gv12tbahtqplelcaq6u18jk.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          // 현재 암호화된 토큰을 받아온걸 이걸 그대로 전해주면 될듯 백엔드쪽에
          console.log(credentialResponse);

          axios.get("http://localhost:5000/test/try-login-google?i=12");
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

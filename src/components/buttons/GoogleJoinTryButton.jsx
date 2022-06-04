/* eslint-disable react-hooks/rules-of-hooks */
import { useGoogleLogin } from "@react-oauth/google";

import MyCustomJoinGoogleButton from "./MyCustomJoinGoogleButton";

const join_key = process.env.REACT_APP_google_login_API_KEY;

const login = useGoogleLogin({
  onSuccess: (tokenResponse) => console.log(tokenResponse),
});

export default function GoogoleJoinTryButton() {
  return (
    <MyCustomJoinGoogleButton onClick={() => login()}>
      Join in with Google 🚀{" "}
    </MyCustomJoinGoogleButton>
  );
}

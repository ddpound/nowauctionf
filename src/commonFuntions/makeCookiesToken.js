import cookies from "react-cookies";

export function makeCookie(days, token) {
  const expires = new Date();

  expires.setDate(expires.getDate() + days); // 7일
  return cookies.save("login-check", token.replace("Bearer ", ""), {
    path: "/", // 모든 경로 접근가능
    expires,
  });
}


export function makeLocalStorageToken(tokenName,retrunAuthHeaders){
  return (
    localStorage.setItem(
      tokenName,
      retrunAuthHeaders.replace("Bearer ", "")
    )
  );
}

export function makeLocalStorageReToken(reTokenName,retrunAuthRefreshHeaders){
  localStorage.setItem(
    reTokenName,
    retrunAuthRefreshHeaders.replace("Bearer ", "")
  )
}



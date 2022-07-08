import axios from "axios";


// 모든 요청에 대해서 헤더에 토큰이 있어야하며
// 토큰 값이 변할경우 마찬가지로 set으로 변환해줘야하는 공통점이 있음

export let retrunTokens = () =>{
  return "Bearer " + localStorage.getItem("google-login-success")
  
}

export let returnReToke = () =>{
  return "Bearer " + localStorage.getItem("google-login-success-re")
  
}


export var returnHeaderTokens ={
    headers: {
      Authorization: "Bearer " + localStorage.getItem("google-login-success"),
      Refreshtoken: "Bearer " + localStorage.getItem("google-login-success-re"),
    }
  
}

export function resetTokens(responese){
  
    const retrunAuthHeaders = responese.headers.authorization;
    const retrunAuthRefreshHeaders = responese.headers.refreshtoken;

    if (retrunAuthHeaders != null && retrunAuthRefreshHeaders != null) {
      localStorage.setItem(
        "google-login-success",
        retrunAuthHeaders.replace("Bearer ", "")
      );
      localStorage.setItem(
        "google-login-success-re",
        retrunAuthRefreshHeaders.replace("Bearer ", "")
      );
    }

}
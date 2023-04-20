import axios from "axios";
import { deleteUserDataToken } from "./deleteUserDataToken";
import { resetTokens } from "./TokenRelatedFunctions";

export function requestGetHaveToken(url,props){
    return axios.get(url,{
      withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("google-login-success"),
          Refreshtoken:
            "Bearer " + localStorage.getItem("google-login-success-re")
        },
      }).then((responese)=>{
        // 토큰 초기화
        resetTokens(responese)

        //성공할때 항상 결과값을 반환해줘야함
        return responese;
      }).catch((Error)=>{
        if (Error.response.status == undefined) {
          console.log(Error.response);
        } else if (Error.response.status == "403" || Error.response.status == "401") {
          deleteUserDataToken();
          alert("권한이 없습니다! 다시 로그인하거나 문의해주세요");
          
          if(!!props){
            props.history.push("/");
          }else{
            document.location.href = "/";
          }
          
        }
      })
    
}

export function requestPostHaveToken(url,props,body){
    return axios.post(url,body,{
      withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("google-login-success"),
          Refreshtoken:
            "Bearer " + localStorage.getItem("google-login-success-re"),
        },
      }).then((responese)=>{
        // 토큰 초기화
        resetTokens(responese)
        return responese;
      }).catch((Error)=>{
        if (Error.response.status == undefined) {
          console.log(Error);
        } else if (Error.response.status == "403" || Error.response.status == "401") {
          deleteUserDataToken();
          alert("권한이 없습니다! 다시 로그인하거나 문의해주세요");
          
          if(!!props){
            props.history.push("/");
          }else{
            document.location.href = "/";
          }
          
        }
      })
    
}

export function requestDeleteHaveToken(url,props){
  
  return axios.delete(url,{
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("google-login-success"),
      Refreshtoken:
        "Bearer " + localStorage.getItem("google-login-success-re"),
    },
  }).then((responese)=>{
    // 토큰 초기화
    resetTokens(responese)
    return responese;
  }).catch((Error)=>{
    if (Error.response.status == undefined) {
      console.log(Error);
    } else if (Error.response.status == "403") {
      deleteUserDataToken();
      alert("권한이 없습니다! 다시 로그인하거나 문의해주세요");
      
      if(!!props){
        props.history.push("/");
      }else{
        document.location.href = "/";
      }

      
    }
  })

}

export function requestDeleteHaveTokenBody(url,props,data){
  return axios.delete(url,{
    withCredentials: true,
    data: data,
    headers: {
      Authorization: "Bearer " + localStorage.getItem("google-login-success"),
      Refreshtoken:
        "Bearer " + localStorage.getItem("google-login-success-re"),
    },
  }).then((responese)=>{
    // 토큰 초기화
    resetTokens(responese)
    return responese;
  }).catch((Error)=>{
    if (Error.response.status == undefined) {
      console.log(Error);
    } else if (Error.response.status == "403") {
      deleteUserDataToken();
      alert("권한이 없습니다! 다시 로그인하거나 문의해주세요");
      
      if(!!props){
        props.history.push("/");
      }else{
        document.location.href = "/";
      }

      
    }
  })

}

export function requestPutHaveToken(url,props,body){
  return axios.put(url,body,{
    withCredentials: true,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("google-login-success"),
        Refreshtoken:
          "Bearer " + localStorage.getItem("google-login-success-re"),
      },
    }).then((responese)=>{
      // 토큰 초기화
      resetTokens(responese)
      return responese;
    }).catch((Error)=>{
      if (Error.response.status == undefined) {
        console.log(Error);
      } else if (Error.response.status == "403") {
        deleteUserDataToken();
        alert("권한이 없습니다! 다시 로그인하거나 문의해주세요");
        
        if(!!props){
          props.history.push("/");
        }else{
          document.location.href = "/";
        }

        
      }
    })
  
}
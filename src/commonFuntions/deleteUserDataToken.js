import cookies from "react-cookies";

export function deleteUserDataToken(){
    localStorage.removeItem("google-login-success");
    localStorage.removeItem("google-login-success-re");
    localStorage.removeItem("userdata");
    cookies.remove("login-check");


}
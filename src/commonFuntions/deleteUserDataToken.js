import cookies from "react-cookies";

export function deleteUserDataToken(){
    localStorage.removeItem("google-login-success");
    localStorage.removeItem("google-login-success-re");
    localStorage.removeItem("userdata");
    localStorage.removeItem("adminSuccess")
    localStorage.removeItem("sellerSuccess")
    cookies.remove("login-check");


}
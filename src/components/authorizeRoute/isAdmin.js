const isAdmin = () =>{
    
    //로그인과 어드민이 동시에 되어있어야함
    if( !!localStorage.getItem('google-login-success') && !! localStorage.getItem("adminSuccess")){
        return true
    }
    
    return false;
}

// null이나 undefined등등의 빈값만 아니라면 참을 리턴

export default isAdmin;
const isLogin = () =>{
    return !!localStorage.getItem('google-login-success');
}

// null이나 undefined등등의 빈값만 아니라면 참을 리턴

export default isLogin;
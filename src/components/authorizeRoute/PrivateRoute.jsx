import React from "react";
import { Route, Redirect } from "react-router-dom";
import isLogin from "./isLogin";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => {
        !isLogin() &&
          alert("접근 권한이 없습니다. 로그인 후 다시 시도하십시오.");
        return isLogin() ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;

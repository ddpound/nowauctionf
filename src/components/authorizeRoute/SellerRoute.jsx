import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAdmin from "./isAdmin";
import isSeller from "./isSeller";

const SellerRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => {
        !isSeller() && alert("판매자가 아닙니다");
        // 둘중 하나만 참이면 됨, 즉 어드민일때도 접근이 가능하게함
        return isSeller() || isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login-page" />
        );
      }}
    />
  );
};

export default SellerRoute;

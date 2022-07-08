import React from "react";
import { Route, Redirect } from "react-router-dom";
import isAdmin from "./isAdmin";

const AdminRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) => {
        !isAdmin() && alert("관리자가 아닙니다");
        return isAdmin() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login-page" />
        );
      }}
    />
  );
};

export default AdminRoute;

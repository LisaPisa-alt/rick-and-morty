import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/userSession";

const AuthRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
export default AuthRoute;

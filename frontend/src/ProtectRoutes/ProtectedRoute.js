
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Check if the user is logged in and has the required role
  if (user && user.result && user.result.role === allowedRole) {
    return children;
  } else {
    alert("Unauthorized access. Redirecting to login.");
    return <Navigate to="/" />;
  }
};
export default PrivateRoute;

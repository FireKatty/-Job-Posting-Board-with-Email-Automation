
// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children, allowedRole }) => {

//   const user = JSON.parse(localStorage.getItem("user"));
//   // console.log(user)
//   // Check if the user is logged in and has the required role
//   if (user) {
//     return children;
//   } else {
//     // alert("Unauthorized access. Redirecting to login.");
//     return <Navigate to="/" />;
//   }
// };
// export default PrivateRoute;

import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Check user data in localStorage

  if (user) {
    return children;
  } else {
    // alert("Unauthorized access. Redirecting to login.");
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;

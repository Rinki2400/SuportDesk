// src/utils/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // Or use context/state
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default PrivateRoute;

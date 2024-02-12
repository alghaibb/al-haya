import React from "react";
import { Navigate } from "react-router-dom";
import Auth from "./auth";

interface AuthOnlyRouteProps {
  children: React.ReactNode;
}

const AuthOnlyRoute: React.FC<AuthOnlyRouteProps> = ({ children }) => {
  const isLoggedIn = Auth.loggedIn();

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default AuthOnlyRoute;

import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userStore } from "../store/userStore";

interface PrivateRouteProps {
  children: React.ReactElement;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLogged } = userStore();

  return isLogged ? children : <Navigate to="/login" />;
};

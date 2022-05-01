import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userStore } from "../store/store";

interface PublicRouteProps {
  children: React.ReactElement;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isLogged } = userStore();

  return isLogged ? <Navigate to="/home" /> : children;
};

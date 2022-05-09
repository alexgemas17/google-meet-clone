import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userStore } from "../store/userStore";

interface PublicRouteProps {
  children: React.ReactElement;
  redirectTo: string;
}

export const PublicRoute = ({ children, redirectTo }: PublicRouteProps) => {
  const { isLogged } = userStore();

  console.log('PublicRoute ', {isLogged});

  return isLogged ? <Navigate to={redirectTo} /> : children;
};

import React, { useContext } from "react";
import { Navigate, Outlet  } from "react-router-dom";
import { userStore } from "../store/userStore";

interface PrivateRouteProps {
  redirectTo: string;
}

export const PrivateRoute = ({ redirectTo }: PrivateRouteProps) => {
  const { isLogged } = userStore();

  console.log('private ', {isLogged});
  
  return isLogged ? <Outlet/> : <Navigate to={redirectTo} />;
};

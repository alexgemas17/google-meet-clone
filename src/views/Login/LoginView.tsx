import { Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginBackImg from "../../../public/images/login-background.jpg";
import { Footer } from "../../components/Footer/Footer";
import { LoginComponent } from "../../components/Login/LoginComponent";
import { userStore } from "../../store/userStore";

import "./LoginView.scss";

export const LoginView: React.FC = () => {
  const { isLogged } = userStore()
  const navigate = useNavigate();

  console.log({ isLogged });

  React.useEffect(() => {
    if (isLogged) {
      navigate('/');
    }
  }, [isLogged])

  return (
    <div className="login-view-container">
      <div
        style={{
          background: `url(${LoginBackImg})`,
        }}
        className="login-view-left"
      ></div>

      <div className="login-view-right">
        <div className="title">
          <Typography color={'black'} variant="h3" component="h2">Welcome to Alxapp Meet!</Typography>
        </div>
        <LoginComponent />
      </div>
    </div>
  );
};

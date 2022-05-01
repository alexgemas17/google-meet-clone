import React, { useState } from "react";
import LoginBackImg from "../../Resources/login-background.jpg";
import { LoginComponent } from "../../components/Loggin/LoginComponent";

import "./LoginView.scss";
import { userStore } from "../../store/store";
import { StartLoginWithGithub } from "../../api/firebaseAuth";
import { useNavigate } from "react-router-dom";

export const LoginView: React.FC = () => {
  return (
    <div className="login-view-container">
      <div
        style={{
          background: `url(${LoginBackImg})`,
        }}
        className="login-view-left"
      ></div>

      <div className="login-view-right">
        <h3>Bienvenido a Alxapp Meet!</h3>
        <LoginComponent />
      </div>
    </div>
  );
};

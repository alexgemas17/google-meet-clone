import React from "react";
import LoginBackImg from "../../../public/images/login-background.jpg";
import { LoginComponent } from "../../components/Loggin/LoginComponent";

import "./LoginView.scss";

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

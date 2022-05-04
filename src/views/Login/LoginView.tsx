import React from "react";
import LoginBackImg from "../../../public/images/login-background.jpg";
import { Footer } from "../../components/Footer/Footer";
import { LoginComponent } from "../../components/Login/LoginComponent";

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

        <Footer />
      </div>
    </div>
  );
};

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
        <h3>Bienvenido a Alxapp Meet!</h3>
        <LoginComponent />

        <Footer />
      </div>
    </div>
  );
};

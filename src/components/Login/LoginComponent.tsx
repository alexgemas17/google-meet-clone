import React from "react";
import { loginUser } from "../../api/endpoints";
import { StartLoginWithGithub, StartLoginWithGoogle } from "../../api/firebaseAuth";
import { userStore } from "../../store/userStore";

import "./styles.css";

export const LoginComponent = () => {
  const [error, setErrorDoingLogin] = React.useState(false);
  const { doLogin } = userStore();

  const handleInputLoginWithGithub = async () => {
    const result = await StartLoginWithGithub();
    if (result) { 
      doLogin(result.user);
      loginUser(result.user)
      setErrorDoingLogin(false);
    } else {
      setErrorDoingLogin(true);
    }
  };

  const handleInputLoginWithGoogle = async () => {
    const result = await StartLoginWithGoogle();
    if (result) { 
      doLogin(result.user);
      loginUser(result.user)
      setErrorDoingLogin(false);
    } else {
      setErrorDoingLogin(true);
    }
  };

  return (
    <div className="social-networks">
      <p>
        {" "}
        <b>Login with:</b>
      </p>
      {error && <span>Error durante el login :( </span>}

      <div
        className="btn-login github"
        role="button"
        aria-label="github icon"
        onClick={() => handleInputLoginWithGithub()}
      >
        <div className="icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1024px-Octicons-mark-github.svg.png"
            alt="github icon"
          />
        </div>

        <p className="btn-text">
          <b>Sign in with Github</b>
        </p>
      </div>

      <div
        className="btn-login linkedin"
        role="button"
        aria-label="linkedin icon"
        onClick={() => handleInputLoginWithGoogle()}
      >
        <div className="icon-wrapper">
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
            alt="linkedin icon"
          />
        </div>

        <p className="btn-text">
          <b>Sign in with Google</b>
        </p>
      </div>
    </div>
  );
};

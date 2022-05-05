import React from "react";
import { isEmpty } from "@firebase/util";
import { IsUserLogged } from "./api/firebaseAuth";
import { AppRouter } from "./routers/AppRouter";
import { userStore } from "./store/userStore";
import "./App.css";

const App: React.FC = () => {
  const { setIsLogged, doLogin } = userStore();
  React.useEffect(() => {
    const checkIfUserLogged = async () => {
      const user = await IsUserLogged();
      if (user && !isEmpty(user)) {
        setIsLogged(true);
        doLogin(user);
      } else {
        setIsLogged(false);
      }
    };

    checkIfUserLogged();
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;

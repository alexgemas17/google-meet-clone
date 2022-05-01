import { isEmpty } from "@firebase/util";
import React from "react";
import { IsUserLogged } from "./api/firebaseAuth";
import "./App.css";
import { AppRouter } from "./routers/AppRouter";
import { userStore } from "./store/store";

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

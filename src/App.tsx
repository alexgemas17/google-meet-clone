import React, { useState } from "react";
import { isEmpty } from "@firebase/util";
import { IsUserLogged } from "./api/firebaseAuth";
import { AppRouter } from "./routers/AppRouter";
import { userStore } from "./store/userStore";
import "./App.css";

const App: React.FC = () => {
  const { setIsLogged, doLogin } = userStore();
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const checkIfUserLogged = async () => {
      const user = await IsUserLogged();
      if (user && !isEmpty(user)) {
        setIsLogged(true);
        doLogin(user);
      } else {
        setIsLogged(false);
      }
      setIsLoading(false)
    };

    checkIfUserLogged();
  }, []);

  if(isLoading) {
    return <>loading...</>
  }

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userStore } from "../../store/store";

export const HomeView = () => {

  const { userData, doLogout } = userStore();
  const { displayName, photoURL } = userData

  console.log({userData})

  return (
    <div>
      <h1>Logged view! Hello {displayName}</h1>

      <img src={photoURL} alt='user photo!' />

      <button onClick={() => doLogout()} >Logout</button>

    </div>
  )
}

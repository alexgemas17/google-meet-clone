import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../App";

export const Home = () => {

  const { state, dispatch } = useContext(AuthContext);

  const { avatar_url, name } = state.user

  return (
    <div>
      <h1>Logged view! Hello {name}</h1>

      <img src={avatar_url} alt='user photo!' />

    </div>
  )
}

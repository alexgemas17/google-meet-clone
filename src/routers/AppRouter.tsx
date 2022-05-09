import { Routes, Route, BrowserRouter, useParams, useLocation } from "react-router-dom";
import { HomeView } from "../views/Home/HomeView";
import { LoginView } from "../views/Login/LoginView";
import { RoomLoader } from "../views/Room/RoomLoader";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { Redirect } from "./Redirect";

export const AppRouter = () => {

  const path = window.location.pathname
  console.log({ path });

  const getRoomUrl = (url: string) => {
    const roomId = url.substring(6)

    if (roomId !== '') {
      return `/room/${roomId}`
    }

    return "/"
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute redirectTo="/login" />}>
          <Route path="/room/:roomURL" element={<RoomLoader />} />
          <Route path="/" element={<HomeView />} />
        </Route>

        <Route
          path="/login"
          element={
            <LoginView />
          }
        />

        <Route path="*" element={<Redirect url="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

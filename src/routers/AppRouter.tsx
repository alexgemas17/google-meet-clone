import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomeView } from "../views/Home/HomeView";
import { LoginView } from "../views/Login/LoginView";
import { Room } from "../views/Room/Room";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginView />
            </PublicRoute>
          }
        />

        <Route
          path="/room/:id"
          element={
            <PrivateRoute>
              <Room />
            </PrivateRoute>
          }
        />

        <Route
          path="/*"
          element={
            <PrivateRoute>
              <HomeView />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

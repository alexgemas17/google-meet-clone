import { Routes, Route, BrowserRouter } from "react-router-dom";
import { HomeView } from "../views/Home/HomeView";
import { LoginView } from "../views/Login/LoginView";

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

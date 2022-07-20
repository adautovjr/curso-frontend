import React from "react";
import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import LoginCallback from "./pages/LoginCallback";
import CreateUser from "./pages/Users/Create";
import { useRoutes } from "react-router-dom";
import ListEspecialidades from "./pages/Especialidades";
import CreateEspecialidades from "./pages/Especialidades/Create";
import ListTurmas from "./pages/Turmas";
import CreateTurmas from "./pages/Turmas/Create";

const DefaultRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <RequireAuth>
          <Home />
        </RequireAuth>
      ),
    },
    {
      path: "/users/create",
      element: <CreateUser />,
    },
    {
      path: "/especialidades",
      element: <ListEspecialidades />,
    },
    {
      path: "/especialidades/create",
      element: <CreateEspecialidades />,
    },
    {
      path: "/turmas",
      element: <ListTurmas />,
    },
    {
      path: "/turmas/create",
      element: <CreateTurmas />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/callback",
      element: <LoginCallback />,
    },
  ]);

  return routes;
};

interface RequireAuthProps {
  children?: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  let auth = useAuth();
  return auth.user ? (
    <>{children}</>
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default DefaultRoutes;

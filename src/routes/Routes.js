import React, { useContext } from 'react';
import { Routes, Route, Navigate} from "react-router-dom";

import { Login } from '../pages/Login/Login'
import { Home } from '../pages/Home/Home'
import AuthContext from '../contexts/auth';

function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
export const AppRoutes = () => {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Login />} />;

      {/* PROTECTED ROUTES */}
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
    </Routes>
  )
};

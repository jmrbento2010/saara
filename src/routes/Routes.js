import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from '../pages/Login/Login'
import { Home } from '../pages/Home/Home'

function RequireAuth({ children }) {
  const user = false
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

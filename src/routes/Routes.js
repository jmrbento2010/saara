import React, { useContext } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import AuthContext from '../contexts/auth';

import { Login } from '../pages/Login/Login'
import { Home } from '../pages/Home/Home'
import { New } from '../pages/New/New';
import { Crisis } from '../pages/Crisis/Crisis';
import { NewCrisis } from '../pages/NewCrisis/NewCrisis';
import { Precrisis } from '../pages/Precrisis/Precrisis';
import { NewPrecrisis } from '../pages/NewPrecrisis/NewPrecrisis';

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
      <Route
        path="/new"
        element={
          <RequireAuth>
            <New />
          </RequireAuth>
        }
      />
      <Route
        path="/crisis/:studentId"
        element={
          <RequireAuth>
            <Crisis />
          </RequireAuth>
        }
      />
      <Route
        path="/crisis/:studentId/new"
        element={
          <RequireAuth>
            <NewCrisis />
          </RequireAuth>
        }
      />

<Route
        path="/precrisis/:studentId"
        element={
          <RequireAuth>
            <Precrisis />
          </RequireAuth>
        }
      />
      <Route
        path="/precrisis/:studentId/new"
        element={
          <RequireAuth>
            <NewPrecrisis />
          </RequireAuth>
        }
      />    </Routes>
  )
};

import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import Dashboard from 'pages/dashboard/Dashboard';
import Profile from 'pages/dashboard/Profile';
import AuthLayout from 'pages/auth/Layout';
import DashboardLayout from 'pages/dashboard/Layout';
import PrivateRoute from 'components/Navigation/PrivateRoute';
import { useAppSelector } from 'utils/hooks';
import OAuthHandler from 'pages/dashboard/OAuthHandler';

const AuthRoutes = (): JSX.Element => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (isAuth) {
    navigate('/dashboard');
  }
  return (
    <AuthLayout>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="/auth/login" />} />
      </Routes>
    </AuthLayout>
  );
};

const DashboardRoutes = (): JSX.Element => (
  <DashboardLayout>
    <Routes>
      <Route
        index
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  </DashboardLayout>
);

const AppRoutes = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
        <Route
          path="/oauth_callback"
          element={
            <PrivateRoute>
              <OAuthHandler />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

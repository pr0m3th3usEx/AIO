import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import Dashboard from 'pages/dashboard/Dashboard';
import Profile from 'pages/dashboard/Profile';
import AuthLayout from 'pages/auth/Layout';
import DashboardLayout from 'pages/dashboard/Layout';

const AuthRoutes = (): JSX.Element => (
  <AuthLayout>
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  </AuthLayout>
);

const DashboardRoutes = (): JSX.Element => (
  <DashboardLayout>
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
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
      </Routes>
    </Router>
  );
};

export default AppRoutes;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from 'pages/auth/Login';
import Register from 'pages/auth/Register';
import Dashboard from 'pages/dashboard/Dashboard';
import Profile from 'pages/dashboard/Profile';
import AuthLayout from 'pages/auth/Layout';
import DashboardLayout from 'pages/dashboard/Layout';

const AuthRoutes = (): JSX.Element => (
  <AuthLayout>
    <Routes>
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  </AuthLayout>
);

const DashboardRoutes = (): JSX.Element => (
  <DashboardLayout>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard" element={<Profile />} />
    </Routes>
  </DashboardLayout>
);

const AppRoutes = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthRoutes />} />
        <Route path="/*" element={<DashboardRoutes />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

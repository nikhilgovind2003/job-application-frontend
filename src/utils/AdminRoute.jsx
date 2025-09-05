// utils/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const token = localStorage.getItem('authToken');
  
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;

import React from 'react';
import { useUser } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ element: Component, ...rest }) => {
  const { user } = useUser();

  return user && user.email === 'admin@gmail.com' ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
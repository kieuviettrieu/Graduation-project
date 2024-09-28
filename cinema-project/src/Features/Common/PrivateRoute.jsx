import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ requiredRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!requiredRoles || requiredRoles?.length == 0) {
    return <Outlet />;
}

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;




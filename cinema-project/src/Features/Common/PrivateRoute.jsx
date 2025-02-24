import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ requiredRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!requiredRoles || requiredRoles?.length === 0) {
    return <Outlet />;
}

  if (!isAuthenticated && !user) {
    return <Navigate to="/login" />;
  }
  console.log(user, "úe")
  console.log(user?.roles.includes(requiredRoles[0]), "user?.roles.includes(requiredRoles[0])")

  if (requiredRoles.length > 0 && !user?.roles.includes(requiredRoles[0])) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;




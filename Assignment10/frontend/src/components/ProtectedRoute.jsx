import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const { isAuthenticated, userType } = useSelector((state) => state.auth);

  console.log('ProtectedRoute - Auth state:', { isAuthenticated, userType, allowedRoles });

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    // Redirect to login page but save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If allowedRoles is empty array or not provided, allow access to all authenticated users
  if (allowedRoles.length === 0) {
    console.log('No role restrictions, allowing access');
    return children;
  }

  // If allowedRoles is specified, check if the user has the required role
  if (!allowedRoles.includes(userType)) {
    console.log('User does not have required role, redirecting to unauthorized');
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('User authenticated and authorized, rendering protected content');
  return children;
};

export default ProtectedRoute;
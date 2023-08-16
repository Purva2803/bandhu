
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './authContext';

const ProtectedRoute = ({ element: Element }) => {
  const checkAuth = ()  => {
    if(localStorage.getItem('token')){
        return true;
    }
    else{
        return false;
    }

    };

  const isAuthenticated = checkAuth(); // Use your authentication function here

  if (isAuthenticated) {
    return <Element />;
  } else {
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;

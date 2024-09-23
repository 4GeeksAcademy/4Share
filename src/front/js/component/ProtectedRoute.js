import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('jwt-token');
  const isLoggedIn = !!token;

  if (!isLoggedIn) {
    // If no token go directly to home (I have to put an Alert that says you cant go there! or something like that)
    return <Navigate to="/" />;
  }

  const tokenData = JSON.parse(atob(token.split('.')[1]));
  const tokenExpiration = tokenData.exp;

  if (tokenExpiration < Date.now() / 1000) {
    // If token is expirated go to home too (I have to put an Alert that says your session expired! or something like that)
    localStorage.removeItem('jwt-token');
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
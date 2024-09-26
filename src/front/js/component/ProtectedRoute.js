import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProtectedRoute = () => {
  const [redirect, setRedirect] = useState(false); // Estado para controlar la redirección
  const token = localStorage.getItem('jwt-token');
  const isLoggedIn = !!token;

  useEffect(() => {
    if (!isLoggedIn) {
      Swal.fire('Warning', "You can't go there! Try logging first!", 'warning').then(() => {
        setRedirect(true); // Cambiar el estado para activar la redirección
      });
    } else if (token) {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const tokenExpiration = tokenData.exp;

      if (tokenExpiration < Date.now() / 1000) {
        localStorage.removeItem('jwt-token');
        Swal.fire('Warning', 'Your session has expired!', 'warning').then(() => {
          setRedirect(true); // Cambiar el estado para activar la redirección
        });
      }
    }
  }, [isLoggedIn, token]);

  // Si `redirect` es true, redirige al usuario al home ("/")
  if (redirect) {
    return <Navigate to="/" />;
  }

  // Si el usuario está autenticado y el token es válido, renderiza el contenido protegido
  return isLoggedIn ? <Outlet /> : null;
};

export default ProtectedRoute;
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth(); // Obtener el estado de autenticación

  if (isLoading) {
    // Componente de carga aqui
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    // Si el usuario no está autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizar los componentes hijos
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
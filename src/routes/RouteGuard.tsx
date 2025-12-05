import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type GuardType = 'public' | 'protected';

interface RouteGuardProps {
  type: GuardType;
  children?: React.ReactNode;
  redirectTo?: string; // default: '/dashboard' for public, '/' for protected
}

const RouteGuard: React.FC<RouteGuardProps> = ({ type, children, redirectTo }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  if (type === 'public') {
    if (isAuthenticated) {
      return <Navigate to={redirectTo ?? '/dashboard'} replace />;
    }
    return children ? <>{children}</> : <Outlet />;
  }

  // protected
  if (!isAuthenticated) {
    return <Navigate to={redirectTo ?? '/'} replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

export default RouteGuard;

import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isPrivate?: boolean;
  isGuestOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isPrivate = false,
  isGuestOnly = false,
}) => {
  const { user, anonymousUserId } = useAuth();
  const location = useLocation();

  const isAuthenticated = !!(user && user.isLoggedIn);

  if (isPrivate && !isAuthenticated) {
    const loginTarget = anonymousUserId ? `/login/${anonymousUserId}` : '/login';
    return <Navigate to={loginTarget} state={{ from: location }} replace />;
  }

  if (isGuestOnly && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

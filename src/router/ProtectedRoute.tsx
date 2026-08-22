import React from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAppState } from '../context/AppStateContext';
import { PageLoader } from '../components/ui/PageLoader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  isPrivate?: boolean;
  isGuestOnly?: boolean;
}

/**
 * Componente Guard corporativo para controle de rotas privadas e exclusivas para visitantes.
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isPrivate = false,
  isGuestOnly = false,
}) => {
  const { user } = useAppState();
  const location = useLocation();

  const isAuthenticated = !!user;

  // Se a rota for privada e o usuário não estiver autenticado, redireciona para o login salvando a intenção de navegação
  if (isPrivate && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se a rota for apenas para visitantes (ex: Login, Cadastro) e o usuário já estiver logado, redireciona para a Home
  if (isGuestOnly && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

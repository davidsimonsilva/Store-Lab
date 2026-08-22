import { lazy } from 'react';

export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<any>>;
  isPrivate?: boolean;
  isGuestOnly?: boolean;
}

/**
 * Configuração centralizada de rotas da aplicação (Padrão Corporativo)
 * Facilita auditorias de segurança, SEO, logs e renderização dinâmica.
 */
export const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: lazy(() => import('../pages/Home/HomePage')),
  },
  {
    path: '/perfil/:userId',
    element: lazy(() => import('../pages/Profile/ProfilePage')),
    isPrivate: true,
  },
  {
    path: '/perfil',
    element: lazy(() => import('../pages/Profile/ProfilePage')),
    isPrivate: true,
  },
  {
    path: '/carrinho/:userId',
    element: lazy(() => import('../pages/Cart/CartPage')),
  },
  {
    path: '/carrinho',
    element: lazy(() => import('../pages/Cart/CartPage')),
  },
  {
    path: '/produto/:slug',
    element: lazy(() => import('../pages/ProductDetail/ProductDetailPage')),
  },
  {
    path: '/login',
    element: lazy(() => import('../pages/Login/LoginPage')),
    isGuestOnly: true,
  },
  {
    path: '/cadastro',
    element: lazy(() => import('../pages/Register/RegisterPage')),
    isGuestOnly: true,
  },
];

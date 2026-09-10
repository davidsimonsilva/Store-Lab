import { lazy } from 'react';

export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<React.ComponentType<{}>>;
  isPrivate?: boolean;
  isGuestOnly?: boolean;
}

export const routesConfig: RouteConfig[] = [
  {
    path: '/',
    element: lazy(() => import('../pages/Home/HomePage')),
  },
  {
    path: '/perfil/:userName',
    element: lazy(() => import('../pages/Profile/ProfilePage')),
    isPrivate: true,
  },
  {
    path: '/perfil',
    element: lazy(() => import('../pages/Profile/ProfilePage')),
    isPrivate: true,
  },
  {
    path: '/carrinho',
    element: lazy(() => import('../pages/Cart/CartPage')),
  },
  {
    path: '/rastreio',
    element: lazy(() => import('../pages/Tracking/TrackingPage')),
  },
  {
    path: '/faq',
    element: lazy(() => import('../pages/Institutional/FAQPage')),
  },
  {
    path: '/termos',
    element: lazy(() => import('../pages/Institutional/TermsPage')),
  },
  {
    path: '/privacidade',
    element: lazy(() => import('../pages/Institutional/PrivacyPage')),
  },
  {
    path: '/institucional',
    element: lazy(() => import('../pages/Institutional/FAQPage')),
  },
  {
    path: '/checkout',
    element: lazy(() => import('../pages/Checkout/CheckoutPage')),
    isPrivate: true,
  },
  {
    path: '/produto/:slug',
    element: lazy(() => import('../pages/ProductDetail/ProductDetailPage')),
  },
  {
    path: '/login/:userId',
    element: lazy(() => import('../pages/Login/LoginPage')),
    isGuestOnly: true,
  },
  {
    path: '/login',
    element: lazy(() => import('../pages/Login/LoginPage')),
    isGuestOnly: true,
  },
  {
    path: '/cadastro/:userId',
    element: lazy(() => import('../pages/Register/RegisterPage')),
    isGuestOnly: true,
  },
  {
    path: '/cadastro',
    element: lazy(() => import('../pages/Register/RegisterPage')),
    isGuestOnly: true,
  },
];

import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { MainLayout } from '../layout/MainLayout';
import { PageLoader } from '../components/ui/PageLoader';
import { routesConfig } from './routesConfig';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter: React.FC = () => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <MainLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {routesConfig.map((route) => {
            const Component = route.element;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedRoute
                    isPrivate={route.isPrivate}
                    isGuestOnly={route.isGuestOnly}
                  >
                    <Component />
                  </ProtectedRoute>
                }
              />
            );
          })}
          
          {/* Redirecionamentos de Legados e fallback */}
          <Route path="/register" element={<Navigate to="/cadastro" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};


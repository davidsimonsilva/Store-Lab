import React, { Suspense, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router';
import { MainLayout } from '../layout/MainLayout';
import { PageLoader } from '../components/ui/PageLoader';
import { routesConfig } from './routesConfig';
import { ProtectedRoute } from './ProtectedRoute';
import { useRouteSEO } from '../hooks/useRouteSEO';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';

export const AppRouter: React.FC = () => {
  const location = useLocation();

  useRouteSEO();

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

          <Route path="/register" element={<Navigate to="/cadastro" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
};


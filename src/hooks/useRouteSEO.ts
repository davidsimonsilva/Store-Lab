import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { checkRouteSEO } from '../constants/seoConfig';
import { applySEO } from './useDocumentTitle';

export function useRouteSEO(): void {
  const location = useLocation();

  useEffect(() => {
    const seo = checkRouteSEO(location.pathname);
    if (seo) {
      applySEO(seo);
    }
  }, [location.pathname]);
}

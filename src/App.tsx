import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { UIStateProvider } from './context/UIStateContext';
import { ToastProvider } from './context/ToastContext';
import { LAB_THEME } from './theme';
import { AppRouter } from './router/AppRouter';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }} />
    );
  }

  return (
    <BrowserRouter>
      <ThemeProvider theme={LAB_THEME}>
        <CssBaseline />
        <AuthProvider>
          <ToastProvider>
            <CartProvider>
              <UIStateProvider>
                <AppRouter />
              </UIStateProvider>
            </CartProvider>
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}


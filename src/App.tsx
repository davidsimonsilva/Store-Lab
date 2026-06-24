import React, { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { GlobalStateProvider, useGlobalState } from './context/GlobalStateContext';
import { LAB_THEME } from './theme';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomeView } from './views/HomeView';
import { CartView } from './views/CartView';
import { ProfileView } from './views/ProfileView';
import { LoginView } from './views/LoginView';
import { RegisterView } from './views/RegisterView';
import { ProductDetailView } from './views/ProductDetailView';

const AppContent: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/perfil/:userId" element={<ProfileView />} />
          <Route path="/perfil" element={<ProfileView />} />
          <Route path="/carrinho/:userId" element={<CartView />} />
          <Route path="/carrinho" element={<CartView />} />
          <Route path="/produto/:slug" element={<ProductDetailView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/cadastro" element={<RegisterView />} />
          <Route path="/register" element={<Navigate to="/cadastro" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Box>

      <Footer />
    </Box>
  );
};

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
      <GlobalStateProvider>
        <ThemeProvider theme={LAB_THEME}>
          <CssBaseline />
          <AppContent />
        </ThemeProvider>
      </GlobalStateProvider>
    </BrowserRouter>
  );
}

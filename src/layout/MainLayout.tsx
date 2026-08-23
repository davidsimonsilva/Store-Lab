import React from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

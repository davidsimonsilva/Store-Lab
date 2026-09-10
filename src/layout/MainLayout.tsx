import React from 'react';
import { Box } from '@mui/material';
import { Header } from './Header';
import { Footer } from './Footer';
import { mainLayoutRootStyle, mainLayoutMainContentStyle } from './MainLayout.styles';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={mainLayoutRootStyle}>
      <Header />
      <Box component="main" sx={mainLayoutMainContentStyle}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

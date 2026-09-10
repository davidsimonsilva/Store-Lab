import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { pageLoaderBoxStyle, pageLoaderSpinnerStyle } from './PageLoader.styles';

export const PageLoader: React.FC = () => {
  return (
    <Box sx={pageLoaderBoxStyle}>
      <CircularProgress size={40} thickness={4} sx={pageLoaderSpinnerStyle} />
    </Box>
  );
};

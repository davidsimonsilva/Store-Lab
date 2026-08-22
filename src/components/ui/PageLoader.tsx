import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const PageLoader: React.FC = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        width: '100%',
        bgcolor: 'background.default'
      }}
    >
      <CircularProgress size={40} thickness={4} sx={{ color: 'primary.main' }} />
    </Box>
  );
};

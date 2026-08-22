import React from 'react';
import { Card, Box, Skeleton } from '@mui/material';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        bgcolor: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '16px',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      }}
    >
      <Skeleton
        variant="rectangular"
        height={160}
        sx={{ borderRadius: '12px', mb: 2 }}
        animation="wave"
      />
      <Skeleton variant="text" width="40%" height={16} sx={{ mb: 1 }} animation="wave" />
      <Skeleton variant="text" width="80%" height={24} sx={{ mb: 1 }} animation="wave" />
      <Skeleton variant="text" width="100%" height={16} animation="wave" />
      <Skeleton variant="text" width="60%" height={16} sx={{ mb: 2 }} animation="wave" />
      <Box sx={{ mt: 'auto', pt: 1.5, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Skeleton variant="text" width={50} height={12} animation="wave" />
          <Skeleton variant="text" width={80} height={20} animation="wave" />
        </Box>
        <Skeleton variant="circular" width={28} height={28} animation="wave" />
      </Box>
    </Card>
  );
};

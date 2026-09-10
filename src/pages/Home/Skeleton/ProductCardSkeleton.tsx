import React from 'react';
import { Card, Box, Skeleton } from '@mui/material';
import {
  productCardSkeletonCardStyle,
  productCardSkeletonFooterStyle,
} from './ProductCardSkeleton.styles';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Card sx={productCardSkeletonCardStyle}>
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
      <Box sx={productCardSkeletonFooterStyle}>
        <Box>
          <Skeleton variant="text" width={50} height={12} animation="wave" />
          <Skeleton variant="text" width={80} height={20} animation="wave" />
        </Box>
        <Skeleton variant="circular" width={28} height={28} animation="wave" />
      </Box>
    </Card>
  );
};

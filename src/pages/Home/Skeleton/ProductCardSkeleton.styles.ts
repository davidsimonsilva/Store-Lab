import { SxProps, Theme } from '@mui/material';

export const productCardSkeletonCardStyle: SxProps<Theme> = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  p: 2,
  bgcolor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '16px',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
};

export const productCardSkeletonFooterStyle: SxProps<Theme> = {
  mt: 'auto',
  pt: 1.5,
  borderTop: '1px solid #f1f5f9',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

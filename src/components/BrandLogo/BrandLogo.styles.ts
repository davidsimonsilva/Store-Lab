import { SxProps, Theme } from '@mui/material';

export const brandLogoContainerStyle = (isLarge: boolean): SxProps<Theme> => ({
  bgcolor: '#2563eb',
  width: isLarge ? '56px' : '40px',
  height: isLarge ? '56px' : '40px',
  borderRadius: isLarge ? '12px' : '8px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
  '&:hover': {
    bgcolor: '#1d4ed8',
    transform: isLarge ? 'scale(1.05) rotate(-4deg)' : 'rotate(-4deg)',
  },
});

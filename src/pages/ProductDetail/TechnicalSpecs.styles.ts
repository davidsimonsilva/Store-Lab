import { SxProps, Theme } from '@mui/material';

export const specsGridStyle: SxProps<Theme> = {
  display: 'grid',
  gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
  gap: 3,
};

export const specsCardStyle: SxProps<Theme> = {
  p: { xs: 3, md: 4 },
  bgcolor: 'background.paper',
  borderRadius: '24px',
  border: '1px solid',
  borderColor: 'divider',
  height: '100%',
  boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
};

export const specsTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  color: 'text.primary',
  mb: 2,
  fontSize: '1.25rem',
};

export const specsTextStyle: SxProps<Theme> = {
  color: 'text.secondary',
  lineHeight: 1.6,
  fontSize: '0.95rem',
};

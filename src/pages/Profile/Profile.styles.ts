import { SxProps, Theme } from '@mui/material';

export const profileHeaderStyle: SxProps<Theme> = {
  mb: 4,
};

export const profileTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  color: 'text.primary',
  letterSpacing: '-0.02em',
  mb: 0.5,
};

export const profileSubtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.95rem',
};

export const profileCardStyle: SxProps<Theme> = {
  p: { xs: 3, md: 4 },
  borderRadius: '24px',
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  boxShadow: '0 2px 12px rgba(0,0,0,0.02)',
};

export const profileInputRootStyle: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
  },
};

import { SxProps, Theme } from '@mui/material';

export const categoryHeadingStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  color: 'text.primary',
  mb: 2.5,
  letterSpacing: '-0.02em',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const categoryContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: { xs: 1, sm: 1.5 },
  width: '100%',
};

export const gridTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  color: 'text.primary',
  letterSpacing: '-0.03em',
};

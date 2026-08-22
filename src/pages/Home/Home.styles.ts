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

export const showMoreBoxStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  mt: 5,
  p: 3,
  bgcolor: 'action.hover',
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'divider',
};

export const showMoreButtonStyle: SxProps<Theme> = {
  borderRadius: '50px',
  px: 4,
  py: 1.5,
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  boxShadow: '0 4px 10px rgba(37, 99, 235, 0.2)',
};

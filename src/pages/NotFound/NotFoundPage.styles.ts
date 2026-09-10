import { SxProps, Theme } from '@mui/material/styles';

export const notFoundContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  minHeight: '60vh',
  py: 8,
  px: 2,
};

export const notFoundCodeStyle: SxProps<Theme> = {
  fontSize: { xs: '5rem', sm: '7rem', md: '9rem' },
  fontWeight: 900,
  letterSpacing: '-0.04em',
  color: 'primary.main',
  lineHeight: 1,
  mb: 1,
  opacity: 0.85,
};

export const notFoundTitleStyle: SxProps<Theme> = {
  fontSize: { xs: '1.5rem', sm: '2rem' },
  fontWeight: 700,
  color: 'text.primary',
  mb: 2,
};

export const notFoundDescriptionStyle: SxProps<Theme> = {
  fontSize: '1rem',
  color: 'text.secondary',
  maxWidth: 480,
  mb: 4,
  lineHeight: 1.6,
};

export const notFoundActionsStyle: SxProps<Theme> = {
  display: 'flex',
  gap: 2,
  flexWrap: 'wrap',
  justifyContent: 'center',
};

import { SxProps, Theme } from '@mui/material';

export const checkoutContainerStyle: SxProps<Theme> = {
  maxWidth: 1200,
  width: '100%',
  mx: 'auto',
  py: { xs: 2, sm: 3, md: 5 },
  px: { xs: 1.5, sm: 2.5, md: 3 },
  boxSizing: 'border-box',
};

export const checkoutHeaderStyle: SxProps<Theme> = {
  mb: { xs: 2.5, sm: 4 },
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
  alignItems: { xs: 'flex-start', sm: 'center' },
  gap: 2,
};

export const checkoutTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  fontSize: { xs: '1.4rem', sm: '1.85rem', md: '2.25rem' },
  color: 'text.primary',
  letterSpacing: '-0.02em',
  wordBreak: 'break-word',
};

export const checkoutSubtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: { xs: '0.85rem', sm: '0.95rem' },
  mt: 0.5,
};

export const checkoutStepBoxStyle: SxProps<Theme> = {
  bgcolor: 'background.paper',
  p: { xs: 2, sm: 3, md: 3.5 },
  borderRadius: { xs: '16px', sm: '20px' },
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  gap: 2.5,
  mb: 3,
  width: '100%',
  boxSizing: 'border-box',
  overflow: 'hidden',
  '&:last-of-type': {
    mb: 0,
  },
};

export const checkoutStepHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 1.25,
};

export const checkoutStepTitleWrapperStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
};

export const checkoutStepTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: { xs: '1.05rem', sm: '1.15rem' },
  color: 'text.primary',
  whiteSpace: 'nowrap',
};

export const checkoutStepBadgeStyle: SxProps<Theme> = {
  width: 28,
  height: 28,
  borderRadius: '50%',
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: '0.85rem',
  flexShrink: 0,
};

export const checkoutStickySummaryStyle: SxProps<Theme> = {
  position: { xs: 'static', md: 'sticky' },
  top: { md: 88 },
  zIndex: 10,
  alignSelf: 'flex-start',
  height: 'fit-content',
};

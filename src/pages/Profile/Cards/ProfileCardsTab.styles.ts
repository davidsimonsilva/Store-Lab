import { SxProps, Theme } from '@mui/material';

export const cardsContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export const cardsHeaderStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
  alignItems: { xs: 'flex-start', sm: 'flex-start' },
  gap: { xs: 1.5, sm: 2 },
};

export const cardsHeaderTextContainerStyle: SxProps<Theme> = {
  flex: 1,
  minWidth: 0,
};

export const cardsHeaderTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '1.1rem',
  lineHeight: 1.3,
};

export const cardsHeaderSubtitleStyle: SxProps<Theme> = {
  fontSize: '0.875rem',
  color: 'text.secondary',
  mt: 0.25,
};

export const addCardButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 700,
  px: 2.5,
  py: 0,
  height: 44,
  minHeight: 44,
  maxHeight: 44,
  whiteSpace: 'nowrap',
  flexShrink: 0,
  width: { xs: '100%', sm: 'auto' },
  alignSelf: { xs: 'stretch', sm: 'flex-start' },
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
};

export const emptyCardsContainerStyle: SxProps<Theme> = {
  py: { xs: 4, sm: 6 },
  px: 3,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  border: '1px solid',
  borderColor: 'divider',
  flex: 1,
  minHeight: { xs: '260px', sm: '280px' },
};

export const emptyCardsIconContainerStyle: SxProps<Theme> = {
  width: 56,
  height: 56,
  borderRadius: '50%',
  bgcolor: 'primary.50',
  color: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 2,
};

export const emptyCardsTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  fontSize: '1.1rem',
  mb: 0.5,
};

export const emptyCardsSubtitleStyle: SxProps<Theme> = {
  maxWidth: 420,
  mb: 3,
  fontSize: '0.875rem',
  lineHeight: 1.5,
};

export const emptyCardsButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '0.925rem',
  px: 3,
  py: 0,
  height: 44,
  minHeight: 44,
  whiteSpace: 'nowrap',
  boxShadow: 'none',
  bgcolor: '#2563eb',
  '&:hover': {
    bgcolor: '#1d4ed8',
    boxShadow: 'none',
  },
};


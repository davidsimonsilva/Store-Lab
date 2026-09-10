import { SxProps, Theme } from '@mui/material';

export const footerRootStyles: SxProps<Theme> = {
  bgcolor: 'background.paper',
  color: 'text.primary',
  pt: { xs: 8, md: 9 },
  pb: 5,
  borderTop: '1px solid',
  borderColor: 'divider',
  mt: 'auto',
};

export const newsletterCardStyles: SxProps<Theme> = {
  bgcolor: 'background.default',
  borderRadius: 3,
  p: { xs: 3, md: 4 },
  mb: 7,
  border: '1px solid',
  borderColor: 'divider',
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  alignItems: { xs: 'flex-start', md: 'center' },
  justifyContent: 'space-between',
  gap: 3,
};

export const newsletterTextContainerStyles: SxProps<Theme> = {
  maxWidth: 540,
};

export const newsletterTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: '1.25rem',
  color: 'text.primary',
  mb: 0.5,
};

export const newsletterSubtitleStyles: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.875rem',
  lineHeight: 1.5,
};

export const newsletterFormStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  gap: 1.5,
  width: { xs: '100%', md: 'auto' },
  minWidth: { sm: 380 },
  alignItems: { xs: 'stretch', sm: 'flex-start' },
};

export const newsletterInputStyles: SxProps<Theme> = {
  flexGrow: 1,
  '& .MuiOutlinedInput-root': {
    height: '44px',
    borderRadius: '12px',
    bgcolor: 'background.paper',
    '& input': {
      py: 0,
      height: '44px',
      boxSizing: 'border-box',
      fontSize: '0.875rem',
    },
  },
};

export const newsletterButtonStyles: SxProps<Theme> = {
  height: '44px',
  minHeight: '44px',
  boxSizing: 'border-box',
  borderRadius: '12px',
  px: 3,
  py: 0,
  fontSize: '0.875rem',
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: 'none',
  whiteSpace: 'nowrap',
  width: { xs: '100%', sm: 'auto' },
  '&:hover': {
    boxShadow: 'none',
  },
};

export const brandContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const logoRowStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  cursor: 'pointer',
  userSelect: 'none',
  width: 'fit-content',
};

export const logoTitleStyles: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  fontSize: '1.35rem',
  letterSpacing: '-0.04em',
  color: 'text.primary',
  display: 'flex',
  alignItems: 'center',
  gap: '1px',
};

export const logoHyphenStyles: SxProps<Theme> = {
  color: '#2563eb',
  fontWeight: 900,
};

export const logoSuffixStyles: SxProps<Theme> = {
  color: '#2563eb',
  fontWeight: 300,
  fontSize: '0.95em',
};

export const brandDescriptionStyles: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.875rem',
  lineHeight: 1.7,
  maxWidth: 320,
};

export const socialGroupStyles: SxProps<Theme> = {
  display: 'flex',
  gap: 1,
  mt: 0.5,
};

export const socialIconButtonStyles: SxProps<Theme> = {
  color: 'text.secondary',
  bgcolor: 'background.default',
  border: '1px solid',
  borderColor: 'divider',
  p: 1,
  borderRadius: '50%',
  transition: 'all 0.2s ease',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  '&:hover': {
    color: 'primary.main',
    borderColor: 'primary.light',
    bgcolor: 'background.paper',
    transform: 'translateY(-2px)',
  },
};

export const columnTitleStyles: SxProps<Theme> = {
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'text.primary',
  mb: 2.5,
};

export const linkListStyles: SxProps<Theme> = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 1.25,
};

export const linkItemStyles: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.875rem',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  transition: 'color 0.15s ease',
  cursor: 'pointer',
  '&:hover': {
    color: 'primary.main',
    textDecoration: 'underline',
  },
};

export const contactRowStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 1.25,
  color: 'text.secondary',
  fontSize: '0.875rem',
  lineHeight: 1.5,
};

export const bottomCopyrightRowStyles: SxProps<Theme> = {
  borderTop: '1px solid',
  borderColor: 'divider',
  pt: 4,
  mt: 7,
  display: 'flex',
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 2,
};

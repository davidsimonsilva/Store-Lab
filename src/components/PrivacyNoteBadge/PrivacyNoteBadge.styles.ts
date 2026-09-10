import { SxProps, Theme } from '@mui/material';

export const privacyBadgeButtonStyles: SxProps<Theme> = {
  position: 'fixed',
  bottom: { xs: 16, sm: 24 },
  right: { xs: 16, sm: 24 },
  zIndex: 1100,
  bgcolor: 'background.paper',
  color: 'primary.main',
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: '0 4px 14px rgba(15, 23, 42, 0.1)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    bgcolor: '#eff6ff',
    transform: 'scale(1.05)',
    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.2)',
  },
};

export const privacyPopoverPaperStyles: SxProps<Theme> = {
  p: 3,
  width: 380,
  maxWidth: 'calc(100vw - 32px)',
  borderRadius: 4,
  boxShadow: '0 12px 36px -8px rgba(15, 23, 42, 0.16)',
  border: '1px solid',
  borderColor: 'divider',
};

export const privacyDialogPaperStyles: SxProps<Theme> = {
  p: 3,
  m: 2,
  width: 'calc(100% - 32px)',
  borderRadius: 4,
  boxShadow: '0 16px 40px -10px rgba(15, 23, 42, 0.2)',
  border: '1px solid',
  borderColor: 'divider',
};

export const privacyHeaderStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  mb: 2,
};

export const privacyHeaderTitleBoxStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
};

export const privacyIconBadgeStyles: SxProps<Theme> = {
  width: 32,
  height: 32,
  borderRadius: 2,
  bgcolor: '#eff6ff',
  color: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '1px solid #bfdbfe',
};

export const privacyTitleStyles: SxProps<Theme> = {
  fontWeight: 700,
  fontSize: '1rem',
  fontFamily: '"Space Grotesk", sans-serif',
  color: 'text.primary',
};

export const privacyBodyContainerStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1.5,
  mb: 2.5,
};

export const privacyBodyTextStyles: SxProps<Theme> = {
  fontSize: '0.875rem',
  color: 'text.secondary',
  lineHeight: 1.6,
};

export const privacyFooterStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  pt: 2,
  borderTop: '1px solid',
  borderColor: 'divider',
};

export const privacyStorageTagStyles: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.75,
  fontSize: '0.75rem',
  fontWeight: 650,
  color: '#15803d',
  bgcolor: '#f0fdf4',
  px: 1.5,
  py: 0.5,
  borderRadius: 2,
  border: '1px solid #bbf7d0',
};


import React from 'react';
import { SxProps, Theme } from '@mui/material';

export const cartBreadcrumbsStyle: SxProps<Theme> = {
  mb: 3,
};

export const cartBreadcrumbLinkStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#2563eb',
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
};

export const cartBreadcrumbCurrentStyle: SxProps<Theme> = {
  fontSize: '0.85rem',
  fontWeight: 700,
  color: 'text.primary',
};

export const cartHeaderStyle: SxProps<Theme> = {
  mb: 4,
};

export const cartTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 800,
  color: 'text.primary',
  letterSpacing: '-0.02em',
  mb: 0.5,
};

export const cartSubtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.95rem',
};

export const cartAlertStyle: SxProps<Theme> = {
  mb: 2.5,
  py: 1,
  px: 2,
  borderRadius: '10px',
  fontSize: '0.8125rem',
};

export const cartLoginAlertButtonStyle: SxProps<Theme> = {
  fontWeight: 600,
  textTransform: 'none',
  borderRadius: '6px',
  px: 1.5,
  py: 0,
  fontSize: '0.75rem',
  lineHeight: 1,
  height: '28px',
  minHeight: '28px',
  maxHeight: '28px',
  whiteSpace: 'nowrap',
  minWidth: 'auto',
  flexShrink: 0,
  alignSelf: 'center',
  bgcolor: '#2563eb',
  color: '#ffffff',
  boxShadow: 'none',
  '&:hover': {
    bgcolor: '#1d4ed8',
    boxShadow: 'none',
  },
};

export const emptyCartContainerStyle: SxProps<Theme> = {
  minHeight: { xs: 'auto', md: '540px' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  py: { xs: 2, md: 4 },
};

export const emptyCartCardStyle: SxProps<Theme> = {
  p: { xs: 4, sm: 6 },
  textAlign: 'center',
  bgcolor: '#ffffff',
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '680px',
  width: '100%',
  boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
};

export const emptyCartIconBoxStyle: SxProps<Theme> = {
  bgcolor: '#eff6ff',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  mb: 3,
  color: '#2563eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const cartStickySummaryStyle: SxProps<Theme> = {
  position: { xs: 'static', md: 'sticky' },
  top: { md: 88 },
  zIndex: 10,
};

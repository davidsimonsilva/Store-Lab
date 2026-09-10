import { SxProps, Theme } from '@mui/material';

export const bannerMainContainerStyle = (bgColor?: string): SxProps<Theme> => ({
  position: 'relative',
  width: '100%',
  height: { xs: '510px', sm: '490px', md: '520px' },
  borderRadius: '24px',
  overflow: 'hidden',
  mb: 6,
  border: '1px solid #e2e8f0',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
  ...(bgColor ? { background: bgColor } : {}),
});

export const bannerSlideWrapperStyle = (bgColor: string): SxProps<Theme> => ({
  width: '100%',
  height: '100%',
  background: bgColor,
  display: 'flex',
  flexDirection: { xs: 'column-reverse', sm: 'row' },
  position: 'absolute',
  top: 0,
  left: 0,
});

export const bannerTextContainerStyle: SxProps<Theme> = {
  flex: { xs: '1', sm: '0.58', md: '0.55' },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: { xs: 'flex-start', sm: 'center' },
  pl: { xs: 2.5, sm: 8.5, md: 8 },
  pr: { xs: 2.5, sm: 2, md: 4 },
  pt: { xs: 1.5, sm: 3.5, md: 4 },
  pb: { xs: 4, sm: 5.5, md: 5 },
  color: '#0f172a',
  zIndex: 3,
  position: 'relative',
};

export const bannerBadgeStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  bgcolor: 'rgba(255, 255, 255, 0.65)',
  px: 2,
  py: 0.75,
  borderRadius: '20px',
  width: 'fit-content',
  height: '32px',
  boxSizing: 'border-box',
  mb: { xs: 1, sm: 1.5, md: 2 },
  border: '1px solid rgba(255, 255, 255, 0.8)',
  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
};

export const bannerBadgeTextStyle: SxProps<Theme> = {
  fontSize: '0.75rem',
  fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '0.05em',
  textTransform: 'uppercase',
  color: '#334155',
};

export const bannerSubtitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  letterSpacing: '0.22em',
  fontWeight: 700,
  color: '#2563eb',
  display: 'block',
  height: '18px',
  lineHeight: '18px',
  mb: { xs: 0.5, sm: 1 },
  textTransform: 'uppercase',
  fontSize: { xs: '0.7rem', sm: '0.75rem' },
};

export const bannerTitleStyle: SxProps<Theme> = {
  fontWeight: 800,
  letterSpacing: '-0.04em',
  mb: { xs: 1, sm: 1.5, md: 2 },
  lineHeight: { xs: 1.2, sm: 1.2, md: 1.15 },
  fontFamily: '"Space Grotesk", sans-serif',
  color: '#0f172a',
  fontSize: { xs: '1.4rem', sm: '1.85rem', md: '2.65rem' },
  height: { xs: '66px', sm: '76px', md: '98px' },
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

export const bannerDescriptionStyle: SxProps<Theme> = {
  mb: { xs: 2.5, sm: 2.5, md: 3 },
  color: '#475569',
  fontWeight: 400,
  lineHeight: { xs: 1.45, sm: 1.55 },
  maxWidth: '480px',
  fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '0.95rem' },
  height: { xs: '58px', sm: '62px', md: '68px' },
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
};

export const bannerCtaContainerStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  height: '48px',
  gap: 2,
};

export const bannerCtaButtonStyle: SxProps<Theme> = {
  px: { xs: 3, sm: 3.75, md: 4.5 },
  py: { xs: 1.3, sm: 1.5, md: 1.6 },
  minHeight: '48px',
  borderRadius: '12px',
  fontWeight: 800,
  bgcolor: '#0f172a',
  color: '#ffffff',
  boxShadow: '0 4px 12px 0 rgba(15, 23, 42, 0.15)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  fontFamily: '"Space Grotesk", sans-serif',
  fontSize: { xs: '0.875rem', sm: '0.9375rem' },
  '&:hover': {
    bgcolor: '#2563eb',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 20px 0 rgba(37, 99, 235, 0.3)',
  },
};

export const bannerImageWrapperStyle: SxProps<Theme> = {
  flex: { xs: '0 0 auto', sm: '0.45' },
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'visible',
  pt: { xs: 2.5, sm: 0 },
  pb: { xs: 0.5, sm: 0 },
  pr: { xs: 0, sm: 6, md: 0 },
};

export const bannerImageBackdropCircleStyle: SxProps<Theme> = {
  width: { xs: '155px', sm: '260px', md: '320px' },
  height: { xs: '155px', sm: '260px', md: '320px' },
  bgcolor: 'rgba(255, 255, 255, 0.45)',
  borderRadius: '50%',
  border: '1px solid rgba(255, 255, 255, 0.6)',
  position: 'absolute',
  zIndex: 1,
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.02)',
};

export const bannerImageCardStyle: SxProps<Theme> = {
  width: { xs: '136px', sm: '200px', md: '240px' },
  height: { xs: '136px', sm: '200px', md: '240px' },
  borderRadius: { xs: '18px', sm: '22px', md: '24px' },
  bgcolor: '#ffffff',
  border: { xs: '4px solid #ffffff', md: '6px solid #ffffff' },
  transform: 'rotate(12deg)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
  position: 'relative',
  overflow: 'hidden',
  zIndex: 2,
  cursor: 'pointer',
  transition: 'transform 0.5s ease',
  '&:hover': {
    transform: 'rotate(8deg) scale(1.04)',
  },
};

export const bannerNavButtonStyle = (side: 'left' | 'right'): SxProps<Theme> => ({
  position: 'absolute',
  [side]: { sm: '12px', md: '18px' },
  top: '50%',
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(255, 255, 255, 0.75)',
  color: '#0f172a',
  backdropFilter: 'blur(8px)',
  border: '1px solid #e2e8f0',
  zIndex: 4,
  display: { xs: 'none', sm: 'inline-flex' },
  '&:hover': { bgcolor: '#ffffff' },
});

export const bannerDotsContainerStyle: SxProps<Theme> = {
  position: 'absolute',
  bottom: { xs: '8px', sm: '14px', md: '18px' },
  left: { xs: '50%', sm: '68px', md: '64px' },
  transform: { xs: 'translateX(-50%)', sm: 'none' },
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
  zIndex: 4,
};

export const bannerDotHitboxStyle: SxProps<Theme> = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '44px',
  minHeight: '44px',
  p: 0,
  m: 0,
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  outline: 'none',
  borderRadius: '8px',
  '&:focus-visible': {
    outline: '2px solid #2563eb',
    outlineOffset: '2px',
  },
};

export const bannerDotIndicatorStyle = (isActive: boolean): SxProps<Theme> => ({
  backgroundColor: isActive ? '#2563eb' : '#94a3b8',
  width: isActive ? '10px' : '8px',
  height: isActive ? '10px' : '8px',
  borderRadius: '50%',
  boxShadow: isActive ? '0 0 0 3px rgba(37, 99, 235, 0.25)' : 'none',
  transition: 'all 0.25s ease-in-out',
});

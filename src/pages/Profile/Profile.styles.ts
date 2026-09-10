import { SxProps, Theme } from '@mui/material';

export const profileHeaderStyle: SxProps<Theme> = {
  mb: 3,
};

export const profileHeroCardStyle: SxProps<Theme> = {
  p: { xs: 2.5, md: 3.5 },
  borderRadius: '20px',
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'flex-start', sm: 'center' },
  justifyContent: 'space-between',
  gap: 2.5,
  mb: 3,
};

export const profileUserInfoWrapperStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
};

export const profileAvatarContainerStyle: SxProps<Theme> = {
  position: 'relative',
  cursor: 'pointer',
  borderRadius: '50%',
  '&:hover .avatar-overlay': {
    opacity: 1,
  },
};

export const profileAvatarCircleStyle: SxProps<Theme> = {
  width: { xs: 64, sm: 72 },
  height: { xs: 64, sm: 72 },
  borderRadius: '50%',
  bgcolor: 'primary.50',
  color: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid',
  borderColor: 'primary.200',
  flexShrink: 0,
  overflow: 'hidden',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.04)',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
  },
};

export const profileAvatarImageStyle: SxProps<Theme> = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
};

export const profileAvatarBadgeStyle: SxProps<Theme> = {
  position: 'absolute',
  bottom: -2,
  right: -2,
  bgcolor: 'primary.main',
  color: 'white',
  p: 0.5,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '2px solid white',
  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
};

export const profileTitleStyle: SxProps<Theme> = {
  fontFamily: '"Space Grotesk", sans-serif',
  fontWeight: 700,
  color: 'text.primary',
  letterSpacing: '-0.02em',
  fontSize: { xs: '1.25rem', sm: '1.5rem' },
};

export const profileSubtitleStyle: SxProps<Theme> = {
  color: 'text.secondary',
  fontSize: '0.875rem',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  flexWrap: 'wrap',
  mt: 0.25,
};

export const profileTabsCardStyle: SxProps<Theme> = {
  borderRadius: '20px',
  border: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
  overflow: 'hidden',
};

export const profileTabsContainerStyle: SxProps<Theme> = {
  borderBottom: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.default',
  px: { xs: 2.5, md: 4 },
  pt: 1,
  '& .MuiTabs-indicator': {
    height: 3,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
};

export const profileTabItemStyle: SxProps<Theme> = {
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.925rem',
  minHeight: 48,
  py: 1.5,
  px: 2,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
};

export const profileTabContentWrapperStyle: SxProps<Theme> = {
  p: { xs: 2.5, md: 4 },
  display: 'flex',
  flexDirection: 'column',
};

export const profileUnauthContainerStyle: SxProps<Theme> = {
  py: 8,
  textAlign: 'center',
};

export const profileUnauthIconBoxStyle: SxProps<Theme> = {
  width: 72,
  height: 72,
  borderRadius: '50%',
  bgcolor: 'primary.50',
  color: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mx: 'auto',
  mb: 2,
};

export const profileUnauthTitleStyle: SxProps<Theme> = {
  fontWeight: 800,
  mb: 1,
  fontFamily: '"Space Grotesk", sans-serif',
};

export const profileUnauthSubtitleStyle: SxProps<Theme> = {
  maxWidth: 450,
  mx: 'auto',
  mb: 3,
};

export const profileUnauthButtonStyle: SxProps<Theme> = {
  borderRadius: '12px',
  px: 3.5,
  py: 1.25,
  fontWeight: 700,
  textTransform: 'none',
};

export const profileBreadcrumbWrapperStyle: SxProps<Theme> = {
  mb: 2,
};

export const profileBreadcrumbLinkStyle: SxProps<Theme> = {
  fontSize: '0.85rem',
  fontWeight: 600,
  color: 'text.secondary',
};

export const profileBreadcrumbCurrentStyle: SxProps<Theme> = {
  fontSize: '0.85rem',
  fontWeight: 700,
};

export const profileTabsStyle: SxProps<Theme> = {
  minHeight: 48,
};


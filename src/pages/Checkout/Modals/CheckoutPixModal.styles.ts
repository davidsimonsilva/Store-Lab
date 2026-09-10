import { SxProps, Theme } from '@mui/material';

export const pixModalHeaderBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
};

export const pixModalHeaderIconBoxStyle: SxProps<Theme> = {
  width: 34,
  height: 34,
  borderRadius: '10px',
  bgcolor: 'rgba(37, 99, 235, 0.1)',
  color: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const pixModalHeaderTextStyle: SxProps<Theme> = {
  fontWeight: 800,
  color: 'text.primary',
  fontSize: '1.15rem',
  fontFamily: '"Space Grotesk", sans-serif',
};

export const pixCardContainerStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  bgcolor: '#ffffff',
  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
  display: 'flex',
  flexDirection: { xs: 'column', sm: 'row' },
  alignItems: { xs: 'center', sm: 'flex-start' },
  gap: { xs: 2.5, sm: 3 },
};

export const pixQrBoxStyle: SxProps<Theme> = {
  p: 2,
  bgcolor: '#ffffff',
  borderRadius: '14px',
  border: '1px solid #e2e8f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const pixInfoContainerStyle: SxProps<Theme> = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: 1.25,
  width: '100%',
};

export const pixAmountRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: 1,
};

export const pixAmountLabelStyle: SxProps<Theme> = {
  fontWeight: 800,
  color: '#0f172a',
  fontSize: '1.05rem',
  fontFamily: '"Space Grotesk", sans-serif',
};

export const pixAmountValueStyle: SxProps<Theme> = {
  fontWeight: 800,
  color: 'primary.main',
  fontSize: '1.15rem',
  fontFamily: '"Space Grotesk", sans-serif',
};

export const pixInstructionTextStyle: SxProps<Theme> = {
  lineHeight: 1.6,
  color: 'text.secondary',
  fontSize: '0.875rem',
};

export const pixCopyButtonStyle: SxProps<Theme> = {
  borderRadius: '10px',
  textTransform: 'none',
  fontWeight: 700,
  mt: 1,
  py: 1,
  px: 2,
  alignSelf: { xs: 'stretch', sm: 'flex-start' },
  borderWidth: '1.5px',
  '&:hover': { borderWidth: '1.5px' },
};


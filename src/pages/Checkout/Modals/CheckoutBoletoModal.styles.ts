import { SxProps, Theme } from '@mui/material';

export const boletoModalHeaderBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.25,
};

export const boletoModalHeaderIconBoxStyle: SxProps<Theme> = {
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

export const boletoModalHeaderTextStyle: SxProps<Theme> = {
  fontWeight: 800,
  color: 'text.primary',
  fontSize: '1.15rem',
  fontFamily: '"Space Grotesk", sans-serif',
};

export const boletoCardContainerStyle: SxProps<Theme> = {
  p: { xs: 2, sm: 2.5 },
  borderRadius: '16px',
  border: '1px solid #e2e8f0',
  bgcolor: '#ffffff',
  boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

export const boletoHeaderRowStyle: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 1,
};

export const boletoDueDateBoxStyle: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
};

export const boletoDueDateTextStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: '#d97706',
  fontSize: '0.9rem',
};

export const boletoAmountValueStyle: SxProps<Theme> = {
  fontWeight: 800,
  color: 'primary.main',
  fontSize: '1.25rem',
  fontFamily: '"Space Grotesk", sans-serif',
};

export const boletoBarcodeBoxStyle: SxProps<Theme> = {
  p: 2,
  borderRadius: '12px',
  bgcolor: '#f8fafc',
  border: '1px dashed #cbd5e1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: 1.5,
};

export const boletoBarcodeInfoStyle: SxProps<Theme> = {
  minWidth: 200,
  flex: 1,
};

export const boletoBarcodeLabelStyle: SxProps<Theme> = {
  display: 'block',
  mb: 0.5,
  fontWeight: 600,
  color: 'text.secondary',
  fontSize: '0.75rem',
};

export const boletoBarcodeCodeStyle: SxProps<Theme> = {
  fontFamily: 'monospace',
  fontWeight: 700,
  fontSize: { xs: '0.8rem', sm: '0.9rem' },
  letterSpacing: '0.02em',
  color: 'text.primary',
};

export const boletoCopyButtonStyle: SxProps<Theme> = {
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 700,
  whiteSpace: 'nowrap',
  py: 0.75,
  px: 1.5,
};

export const emailNoticeBoxStyle: SxProps<Theme> = {
  p: 1.75,
  borderRadius: '12px',
  bgcolor: 'rgba(37, 99, 235, 0.06)',
  border: '1px solid rgba(37, 99, 235, 0.15)',
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
};

export const emailNoticeIconBoxStyle: SxProps<Theme> = {
  width: 32,
  height: 32,
  borderRadius: '8px',
  bgcolor: 'rgba(37, 99, 235, 0.1)',
  color: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

export const emailNoticeTitleStyle: SxProps<Theme> = {
  fontWeight: 700,
  color: '#1e3a8a',
  fontSize: '0.875rem',
};

export const emailNoticeDescStyle: SxProps<Theme> = {
  display: 'block',
  color: 'text.secondary',
  fontSize: '0.75rem',
};

export const boletoInstructionsContainerStyle: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0.75,
};

export const boletoInstructionTextStyle: SxProps<Theme> = {
  lineHeight: 1.6,
  color: 'text.secondary',
  fontSize: '0.75rem',
};


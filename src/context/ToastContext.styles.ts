import { SxProps, Theme, AlertColor } from '@mui/material';

export const toastSnackbarStyle: SxProps<Theme> = {
  top: { xs: '68px !important', sm: '76px !important' },
  right: { xs: '16px !important', sm: '24px !important' },
  left: 'auto !important',
  bottom: 'auto !important',
  maxWidth: { xs: 'calc(100vw - 32px)', sm: '400px' },
  zIndex: (theme) => theme.zIndex.snackbar + 10,
};

const toastColorMap: Record<AlertColor, { bg: string; text: string; border: string; icon: string; shadow: string }> = {
  success: {
    bg: '#ecfdf5',
    text: '#059669',
    border: '#10b981',
    icon: '#059669',
    shadow: '0 4px 14px -2px rgba(5, 150, 105, 0.12), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
  },
  info: {
    bg: '#f6f9fc',
    text: '#1e40af',
    border: '#3b82f6',
    icon: '#2563eb',
    shadow: '0 6px 20px -2px rgba(0, 0, 0, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
  },
  warning: {
    bg: '#fffdf5',
    text: '#92400e',
    border: '#f59e0b',
    icon: '#d97706',
    shadow: '0 6px 20px -2px rgba(0, 0, 0, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
  },
  error: {
    bg: '#fef7f7',
    text: '#991b1b',
    border: '#ef4444',
    icon: '#dc2626',
    shadow: '0 6px 20px -2px rgba(0, 0, 0, 0.07), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
  },
};

export const getToastAlertStyle = (severity: AlertColor): SxProps<Theme> => {
  const current = toastColorMap[severity] || toastColorMap.success;

  return {
    borderRadius: '10px',
    py: 0.75,
    px: 1.5,
    minHeight: '42px',
    fontWeight: 600,
    fontSize: '0.85rem',
    alignItems: 'center',
    bgcolor: current.bg,
    color: current.text,
    border: `1px solid ${current.border}`,
    boxShadow: current.shadow,
    backdropFilter: 'blur(8px)',
    transition: 'all 0.2s ease-in-out',
    '& .MuiAlert-icon': {
      fontSize: '1.15rem',
      color: current.icon,
      mr: 1,
      py: 0,
      my: 0,
    },
    '& .MuiAlert-action': {
      p: 0,
      my: 0,
      mr: -0.5,
      color: current.text,
    },
    '& .MuiAlert-message': {
      p: 0,
      my: 0,
      fontWeight: 650,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
  };
};


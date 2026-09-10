import { SxProps, Theme } from '@mui/material';

export type CustomAlertSeverity = 'error' | 'warning' | 'info' | 'success';
export type CustomAlertActionPosition = 'right' | 'below';

export interface AlertColorConfig {
  bg: string;
  color: string;
  border: string;
  iconColor: string;
}

export const alertSeverityConfigs: Record<CustomAlertSeverity, AlertColorConfig> = {
  error: {
    bg: '#fef2f2',
    color: '#991b1b',
    border: '#fecaca',
    iconColor: '#dc2626',
  },
  warning: {
    bg: '#fffbeb',
    color: '#92400e',
    border: '#fde68a',
    iconColor: '#d97706',
  },
  info: {
    bg: '#eff6ff',
    color: '#1e40af',
    border: '#bfdbfe',
    iconColor: '#2563eb',
  },
  success: {
    bg: '#f0fdf4',
    color: '#166534',
    border: '#bbf7d0',
    iconColor: '#16a34a',
  },
};

export const getCustomAlertStyle = (
  severity: CustomAlertSeverity = 'error',
  _actionPosition: CustomAlertActionPosition = 'right'
): SxProps<Theme> => {
  const current = alertSeverityConfigs[severity] || alertSeverityConfigs.error;

  return {
    borderRadius: '12px',
    border: `1px solid ${current.border}`,
    bgcolor: current.bg,
    color: current.color,
    py: 1.25,
    px: 2,
    boxSizing: 'border-box',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.5,
  };
};

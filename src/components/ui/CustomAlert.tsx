import React from 'react';
import { Box, IconButton, SxProps, Theme } from '@mui/material';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';
import {
  CustomAlertSeverity,
  CustomAlertActionPosition,
  getCustomAlertStyle,
  alertSeverityConfigs,
} from './CustomAlert.styles';

export interface CustomAlertProps {
  severity?: CustomAlertSeverity;
  actionPosition?: CustomAlertActionPosition;
  action?: React.ReactNode;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  id?: string;
  sx?: SxProps<Theme>;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({
  severity = 'error',
  actionPosition = 'right',
  action,
  children,
  icon,
  onClose,
  sx,
  id = 'custom_alert_box',
}) => {
  const getDefaultIcon = () => {
    if (icon !== undefined) return icon;
    switch (severity) {
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
        return <Info size={20} />;
      case 'success':
        return <CheckCircle2 size={20} />;
      default:
        return <AlertCircle size={20} />;
    }
  };

  const config = alertSeverityConfigs[severity] || alertSeverityConfigs.error;

  return (
    <Box
      id={id}
      sx={[
        getCustomAlertStyle(severity, actionPosition),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        className="CustomAlert-content"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1.5,
          width: '100%',
        }}
      >
        <Box
          className="CustomAlert-icon"
          sx={{
            color: config.iconColor,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            alignSelf: 'center',
            my: 'auto',
          }}
        >
          {getDefaultIcon()}
        </Box>

        <Box
          className="CustomAlert-message"
          sx={{
            flex: 1,
            fontSize: 'inherit',
            fontWeight: 500,
            lineHeight: 1.4,
            color: config.color,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {children}
        </Box>

        {action && actionPosition === 'right' && (
          <Box
            className="CustomAlert-action"
            sx={{
              display: 'flex',
              alignItems: 'center',
              ml: 'auto',
              flexShrink: 0,
            }}
          >
            {action}
          </Box>
        )}

        {onClose && (
          <IconButton
            size="small"
            onClick={onClose}
            aria-label="Fechar alerta"
            sx={{
              p: 0.5,
              ml: action && actionPosition === 'right' ? 1 : 'auto',
              color: config.color,
              alignSelf: 'center',
              flexShrink: 0,
            }}
          >
            <X size={16} />
          </IconButton>
        )}
      </Box>

      {action && actionPosition === 'below' && (
        <Box
          className="CustomAlert-action-below"
          sx={{
            display: 'flex',
            alignItems: 'center',
            mt: 1.25,
            pl: { xs: 0, sm: '32px' },
          }}
        >
          {action}
        </Box>
      )}
    </Box>
  );
};

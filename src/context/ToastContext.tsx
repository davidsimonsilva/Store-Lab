import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, AlertColor, Fade } from '@mui/material';
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { toastSnackbarStyle, getToastAlertStyle } from './ToastContext.styles';

export interface ToastOptions {
  message: string;
  severity?: AlertColor;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, severity?: AlertColor, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<ToastOptions>({
    message: '',
    severity: 'success',
    duration: 4000,
  });

  const showToast = useCallback(
    (message: string, severity: AlertColor = 'success', duration = 4000) => {
      setToast({ message, severity, duration });
      setOpen(true);
    },
    []
  );

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const renderIcon = (severity: AlertColor = 'success') => {
    switch (severity) {
      case 'success':
        return <CheckCircle2 size={18} />;
      case 'error':
        return <AlertCircle size={18} />;
      case 'warning':
        return <AlertTriangle size={18} />;
      case 'info':
      default:
        return <Info size={18} />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={toast.duration || 4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={Fade}
        transitionDuration={{ enter: 250, exit: 300 }}
        sx={toastSnackbarStyle}
      >
        <Alert
          onClose={handleClose}
          icon={renderIcon(toast.severity)}
          severity={toast.severity}
          variant="standard"
          sx={getToastAlertStyle(toast.severity || 'success')}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    return {
      showToast: () => {},
    };
  }
  return context;
};


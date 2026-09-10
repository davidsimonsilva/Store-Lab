import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  CircularProgress,
} from '@mui/material';
import { X } from 'lucide-react';
import {
  baseModalPaperStyle,
  baseModalTitleStyle,
  baseModalContentStyle,
  baseModalActionsStyle,
  modalSecondaryButtonStyle,
  modalPrimaryButtonStyle,
} from './BaseModal.styles';

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: number | string;
  actions?: React.ReactNode;
  primaryActionText?: string;
  onPrimaryAction?: () => void;
  primaryActionIcon?: React.ReactNode;
  primaryActionDisabled?: boolean;
  primaryActionLoading?: boolean;
  primaryActionType?: 'button' | 'submit';
  formId?: string;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  hideCloseButton?: boolean;
}

export const BaseModal: React.FC<BaseModalProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = '580px',
  actions,
  primaryActionText,
  onPrimaryAction,
  primaryActionIcon,
  primaryActionDisabled = false,
  primaryActionLoading = false,
  primaryActionType = 'button',
  formId,
  secondaryActionText,
  onSecondaryAction,
  hideCloseButton = false,
}) => {
  const handleSecondary = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else {
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableScrollLock
      PaperProps={{
        sx: baseModalPaperStyle(maxWidth),
      }}
    >
      <DialogTitle sx={baseModalTitleStyle}>
        <span>{title}</span>
        {!hideCloseButton && (
          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Fechar"
            sx={{
              color: 'text.secondary',
              '&:hover': { bgcolor: '#f1f5f9' },
            }}
          >
            <X size={20} />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent sx={baseModalContentStyle}>{children}</DialogContent>

      {(actions || primaryActionText || secondaryActionText) && (
        <DialogActions sx={baseModalActionsStyle}>
          {actions ? (
            actions
          ) : (
            <>
              {secondaryActionText && (
                <Button
                  onClick={handleSecondary}
                  variant="text"
                  sx={modalSecondaryButtonStyle}
                >
                  {secondaryActionText}
                </Button>
              )}
              {primaryActionText && (
                <Button
                  type={primaryActionType}
                  form={formId}
                  onClick={onPrimaryAction}
                  variant="contained"
                  disabled={primaryActionDisabled || primaryActionLoading}
                  startIcon={
                    primaryActionLoading ? (
                      <CircularProgress size={18} color="inherit" />
                    ) : (
                      primaryActionIcon
                    )
                  }
                  sx={modalPrimaryButtonStyle}
                >
                  {primaryActionText}
                </Button>
              )}
            </>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
};

import React, { useState } from 'react';
import {
  Box,
  IconButton,
  Popover,
  Dialog,
  Typography,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ShieldCheck, Lock, X, CheckCircle2 } from 'lucide-react';
import {
  privacyBadgeButtonStyles,
  privacyPopoverPaperStyles,
  privacyDialogPaperStyles,
  privacyHeaderStyles,
  privacyHeaderTitleBoxStyles,
  privacyIconBadgeStyles,
  privacyTitleStyles,
  privacyBodyContainerStyles,
  privacyBodyTextStyles,
  privacyFooterStyles,
  privacyStorageTagStyles,
} from './PrivacyNoteBadge.styles';

export const PrivacyNoteBadge: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'privacy-popover' : undefined;

  const content = (
    <>
      <Box sx={privacyHeaderStyles}>
        <Box sx={privacyHeaderTitleBoxStyles}>
          <Box sx={privacyIconBadgeStyles}>
            <Lock size={16} />
          </Box>
          <Typography variant="subtitle1" sx={privacyTitleStyles}>
            Nota de Privacidade
          </Typography>
        </Box>
        <IconButton size="small" onClick={handleClose} aria-label="Fechar nota de privacidade">
          <X size={16} />
        </IconButton>
      </Box>

      <Box sx={privacyBodyContainerStyles}>
        <Typography sx={privacyBodyTextStyles}>
          Seus dados de cadastro servem exclusivamente para simular o comportamento da plataforma e são salvos localmente em seu navegador por meio de <strong>localStorage</strong>.
        </Typography>

        <Typography sx={privacyBodyTextStyles}>
          Suas informações e senhas nunca são transmitidas para servidores externos nem compartilhadas com terceiros.
        </Typography>
      </Box>

      <Box sx={privacyFooterStyles}>
        <Box sx={privacyStorageTagStyles}>
          <CheckCircle2 size={14} />
          <span>Armazenamento 100% Local</span>
        </Box>
      </Box>
    </>
  );

  return (
    <>
      <Tooltip title="Nota de Privacidade" placement="left" arrow>
        <IconButton
          id="privacy-badge-trigger-btn"
          aria-describedby={id}
          onClick={handleClick}
          sx={privacyBadgeButtonStyles}
          size="medium"
          aria-label="Informações de privacidade"
        >
          <ShieldCheck size={20} />
        </IconButton>
      </Tooltip>

      {isMobile ? (
        <Dialog
          open={open}
          onClose={handleClose}
          disableScrollLock
          maxWidth="xs"
          fullWidth
          PaperProps={{
            sx: privacyDialogPaperStyles,
          }}
        >
          {content}
        </Dialog>
      ) : (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          disableScrollLock
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          slotProps={{
            paper: {
              sx: privacyPopoverPaperStyles,
            },
          }}
        >
          {content}
        </Popover>
      )}
    </>
  );
};


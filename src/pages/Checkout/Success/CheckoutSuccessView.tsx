import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  PackageCheck,
  ArrowRight,
} from 'lucide-react';
import { Order } from '../../../types';
import {
  successContainerStyle,
  successHeaderCardStyle,
  successBadgeWrapperStyle,
  warningBadgeWrapperStyle,
  orderNumberChipBoxStyle,
  successActionsStyle,
} from './CheckoutSuccessView.styles';

interface CheckoutSuccessViewProps {
  order: Order;
  onGoToOrders: () => void;
  onGoToStore: () => void;
}

export const CheckoutSuccessView: React.FC<CheckoutSuccessViewProps> = ({
  order,
  onGoToOrders,
  onGoToStore,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleCopyOrderNumber = () => {
    navigator.clipboard?.writeText(order.orderNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const isDeclined =
    order.status === 'cancelled' ||
    order.timeline?.some((step) => step.label.includes('não Autorizado') || step.label.includes('não Efetivado'));

  return (
    <Box sx={successContainerStyle}>

      <Box sx={successHeaderCardStyle}>
        <Box sx={isDeclined ? warningBadgeWrapperStyle : successBadgeWrapperStyle}>
          {isDeclined ? (
            <AlertCircle size={40} strokeWidth={2.5} />
          ) : (
            <CheckCircle2 size={40} strokeWidth={2.5} />
          )}
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontFamily: '"Space Grotesk", sans-serif',
            fontWeight: 800,
            color: 'text.primary',
            fontSize: { xs: '1.35rem', sm: '2.1rem' },
            letterSpacing: '-0.02em',
            wordBreak: 'break-word',
          }}
        >
          Pedido Realizado com Sucesso!
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 540, fontSize: { xs: '0.875rem', sm: '1.025rem' }, lineHeight: 1.6, px: { xs: 0.5, sm: 0 } }}
        >
          Seu pedido foi registrado em nosso sistema e já está sendo processado. Você pode acompanhar o status detalhado em Meus Pedidos.
        </Typography>

        <Box sx={orderNumberChipBoxStyle}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              flexWrap: 'wrap',
              maxWidth: '100%',
            }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 600, fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
            >
              Código do Pedido:
            </Typography>
            <Typography
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'primary.main',
                fontSize: { xs: '0.825rem', sm: '0.95rem' },
                wordBreak: 'break-all',
                textAlign: 'center',
              }}
            >
              {order.orderNumber}
            </Typography>
          </Box>
          <Button
            size="small"
            variant="text"
            onClick={handleCopyOrderNumber}
            startIcon={copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              fontSize: { xs: '0.8rem', sm: '0.85rem' },
              color: copied ? 'success.main' : 'primary.main',
              whiteSpace: 'nowrap',
              minWidth: 'auto',
              px: 1.5,
              py: 0.5,
              mt: { xs: 0.25, sm: 0 },
            }}
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </Button>
        </Box>

        <Box sx={successActionsStyle}>
          <Button
            variant="contained"
            onClick={onGoToOrders}
            startIcon={<PackageCheck size={18} />}
            sx={{
              borderRadius: '12px',
              px: { xs: 2, sm: 3.5 },
              py: { xs: 1.5, sm: 1.35 },
              minHeight: 48,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '0.95rem',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)',
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              width: '100%',
            }}
          >
            Acompanhar em Meus Pedidos
          </Button>

          <Button
            variant="outlined"
            onClick={onGoToStore}
            endIcon={<ArrowRight size={18} />}
            sx={{
              borderRadius: '12px',
              px: { xs: 2, sm: 3.5 },
              py: { xs: 1.5, sm: 1.35 },
              minHeight: 48,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '0.95rem',
              width: '100%',
            }}
          >
            Continuar Comprando
          </Button>
        </Box>
      </Box>
    </Box>
  );
};


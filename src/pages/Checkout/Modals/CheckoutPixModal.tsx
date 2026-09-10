import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { QrCode, Copy, Check, ShieldCheck } from 'lucide-react';
import { BaseModal } from '../../../components/BaseModal/BaseModal';
import { formatCurrencyBRL } from '../../../utils/formatters';
import {
  pixModalHeaderBoxStyle,
  pixModalHeaderIconBoxStyle,
  pixModalHeaderTextStyle,
  pixCardContainerStyle,
  pixQrBoxStyle,
  pixInfoContainerStyle,
  pixAmountRowStyle,
  pixAmountLabelStyle,
  pixAmountValueStyle,
  pixInstructionTextStyle,
  pixCopyButtonStyle,
} from './CheckoutPixModal.styles';

interface CheckoutPixModalProps {
  open: boolean;
  totalAmount: number;
  onClose: () => void;
  onConfirmPayment: () => void;
}

export const CheckoutPixModal: React.FC<CheckoutPixModalProps> = ({
  open,
  totalAmount,
  onClose,
  onConfirmPayment,
}) => {
  const [copiedPix, setCopiedPix] = useState(false);

  const pixPayload =
    '00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865802BR5913STORELAB LTDA6009SAO PAULO62070503***6304E2CA';

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixPayload);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 3000);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      maxWidth="640px"
      title={
        <Box sx={pixModalHeaderBoxStyle}>
          <Box sx={pixModalHeaderIconBoxStyle}>
            <QrCode size={18} />
          </Box>
          <Typography variant="h6" sx={pixModalHeaderTextStyle}>
            Pagamento via Pix
          </Typography>
        </Box>
      }
      secondaryActionText="Cancelar"
      onSecondaryAction={onClose}
      primaryActionText="Confirmar Pagamento"
      onPrimaryAction={onConfirmPayment}
      primaryActionIcon={<ShieldCheck size={18} />}
    >
      <Box sx={pixCardContainerStyle}>

        <Box sx={pixQrBoxStyle}>
          <QrCode size={135} color="#0f172a" />
        </Box>

        <Box sx={pixInfoContainerStyle}>
          <Box sx={pixAmountRowStyle}>
            <Typography variant="subtitle1" sx={pixAmountLabelStyle}>
              Pague com Pix em segundos
            </Typography>
            <Typography variant="subtitle2" sx={pixAmountValueStyle}>
              {formatCurrencyBRL(totalAmount)}
            </Typography>
          </Box>

          <Typography variant="body2" sx={pixInstructionTextStyle}>
            1. Abra o aplicativo do seu banco ou carteira digital.
          </Typography>
          <Typography variant="body2" sx={pixInstructionTextStyle}>
            2. Escolha pagar via Pix e escaneie o QR Code ou use a chave Copia e Cola.
          </Typography>
          <Typography variant="body2" sx={pixInstructionTextStyle}>
            3. A confirmação é instantânea e o pedido entra em separação imediatamente.
          </Typography>

          <Button
            variant="outlined"
            color={copiedPix ? 'success' : 'primary'}
            onClick={handleCopyPix}
            startIcon={copiedPix ? <Check size={18} /> : <Copy size={18} />}
            sx={pixCopyButtonStyle}
          >
            {copiedPix ? 'Chave Pix Copiada!' : 'Copiar Chave Pix Copia e Cola'}
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};


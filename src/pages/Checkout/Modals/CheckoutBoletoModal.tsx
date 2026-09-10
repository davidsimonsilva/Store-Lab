import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { FileText, Copy, Check, Mail, ShieldCheck, Clock } from 'lucide-react';
import { BaseModal } from '../../../components/BaseModal/BaseModal';
import { formatCurrencyBRL } from '../../../utils/formatters';
import {
  boletoModalHeaderBoxStyle,
  boletoModalHeaderIconBoxStyle,
  boletoModalHeaderTextStyle,
  boletoCardContainerStyle,
  boletoHeaderRowStyle,
  boletoDueDateBoxStyle,
  boletoDueDateTextStyle,
  boletoAmountValueStyle,
  boletoBarcodeBoxStyle,
  boletoBarcodeInfoStyle,
  boletoBarcodeLabelStyle,
  boletoBarcodeCodeStyle,
  boletoCopyButtonStyle,
  emailNoticeBoxStyle,
  emailNoticeIconBoxStyle,
  emailNoticeTitleStyle,
  emailNoticeDescStyle,
  boletoInstructionsContainerStyle,
  boletoInstructionTextStyle,
} from './CheckoutBoletoModal.styles';

interface CheckoutBoletoModalProps {
  open: boolean;
  totalAmount: number;
  userEmail?: string;
  onClose: () => void;
  onConfirmPayment: () => void;
}

export const CheckoutBoletoModal: React.FC<CheckoutBoletoModalProps> = ({
  open,
  totalAmount,
  userEmail,
  onClose,
  onConfirmPayment,
}) => {
  const [copiedBoleto, setCopiedBoleto] = useState(false);

  const barcodeNumber = '34191.79001 01043.510047 91020.150008 8 98250000045000';

  const handleCopyBoleto = () => {
    navigator.clipboard.writeText(barcodeNumber);
    setCopiedBoleto(true);
    setTimeout(() => setCopiedBoleto(false), 3000);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      maxWidth="640px"
      title={
        <Box sx={boletoModalHeaderBoxStyle}>
          <Box sx={boletoModalHeaderIconBoxStyle}>
            <FileText size={18} />
          </Box>
          <Typography variant="h6" sx={boletoModalHeaderTextStyle}>
            Pagamento via Boleto Bancário
          </Typography>
        </Box>
      }
      secondaryActionText="Cancelar"
      onSecondaryAction={onClose}
      primaryActionText="Confirmar Pedido"
      onPrimaryAction={onConfirmPayment}
      primaryActionIcon={<ShieldCheck size={18} />}
    >
      <Box sx={boletoCardContainerStyle}>

        <Box sx={boletoHeaderRowStyle}>
          <Box sx={boletoDueDateBoxStyle}>
            <Clock size={18} color="#d97706" />
            <Typography variant="subtitle2" sx={boletoDueDateTextStyle}>
              Vencimento em 1 dia útil
            </Typography>
          </Box>
          <Typography variant="h6" sx={boletoAmountValueStyle}>
            {formatCurrencyBRL(totalAmount)}
          </Typography>
        </Box>

        <Box sx={boletoBarcodeBoxStyle}>
          <Box sx={boletoBarcodeInfoStyle}>
            <Typography variant="caption" sx={boletoBarcodeLabelStyle}>
              Linha Digitável do Boleto:
            </Typography>
            <Typography variant="body2" sx={boletoBarcodeCodeStyle}>
              {barcodeNumber}
            </Typography>
          </Box>

          <Button
            size="small"
            variant="outlined"
            color={copiedBoleto ? 'success' : 'primary'}
            onClick={handleCopyBoleto}
            startIcon={copiedBoleto ? <Check size={16} /> : <Copy size={16} />}
            sx={boletoCopyButtonStyle}
          >
            {copiedBoleto ? 'Código Copiado!' : 'Copiar Linha Digitável'}
          </Button>
        </Box>

        <Box sx={emailNoticeBoxStyle}>
          <Box sx={emailNoticeIconBoxStyle}>
            <Mail size={18} />
          </Box>
          <Box>
            <Typography variant="body2" sx={emailNoticeTitleStyle}>
              Boleto também enviado por e-mail
            </Typography>
            <Typography variant="caption" sx={emailNoticeDescStyle}>
              Uma cópia em PDF com código de barras foi encaminhada para{' '}
              <strong>{userEmail || 'seu e-mail cadastrado'}</strong>.
            </Typography>
          </Box>
        </Box>

        <Box sx={boletoInstructionsContainerStyle}>
          <Typography variant="caption" sx={boletoInstructionTextStyle}>
            • O pagamento pode ser realizado em qualquer agência bancária, casa lotérica ou através do Internet Banking / app do seu banco.
          </Typography>
          <Typography variant="caption" sx={boletoInstructionTextStyle}>
            • A confirmação bancária ocorre normalmente em até 1 dia útil após a quitação.
          </Typography>
          <Typography variant="caption" sx={boletoInstructionTextStyle}>
            • O pedido será despachado assim que o banco nos confirmar a compensação.
          </Typography>
        </Box>
      </Box>
    </BaseModal>
  );
};


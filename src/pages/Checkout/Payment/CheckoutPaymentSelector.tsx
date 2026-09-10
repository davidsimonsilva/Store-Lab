import React from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Radio,
} from '@mui/material';
import {
  CreditCard,
  QrCode,
  FileText,
  Lock,
  Plus,
} from 'lucide-react';
import { SavedCard, User } from '../../../types';
import { BUSINESS_CONSTANTS } from '../../../constants';
import { formatCurrencyBRL } from '../../../utils/formatters';
import { calculateInstallmentDetails } from '../../../utils/pricing';
import { CreditCardCard } from '../../../components/CreditCardCard/CreditCardCard';
import { NewCreditCardForm } from './components/NewCreditCardForm';
import {
  paymentMethodTabStyle,
  paymentOptionCardStyle,
  paymentInfoBoxStyle,
} from './CheckoutPaymentSelector.styles';

export interface CardFormData {
  isUsingSavedCard: boolean;
  savedCardId: string | null;
  holderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  installments: number;
}

interface CheckoutPaymentSelectorProps {
  paymentMethod: 'credit_card' | 'pix' | 'boleto';
  onChangePaymentMethod: (method: 'credit_card' | 'pix' | 'boleto') => void;
  savedCards: SavedCard[];
  cardData: CardFormData;
  onChangeCardData: (updater: (prev: CardFormData) => CardFormData) => void;
  totalAmount: number;
  user: User;
  showErrors?: boolean;
}

export const CheckoutPaymentSelector: React.FC<CheckoutPaymentSelectorProps> = ({
  paymentMethod,
  onChangePaymentMethod,
  savedCards,
  cardData,
  onChangeCardData,
  totalAmount,
  showErrors = false,
}) => {
  const activeSavedCard = savedCards.find((c) => c.id === cardData.savedCardId);
  const savedCardBrand = activeSavedCard?.brand || 'unknown';
  const is4DigitSavedBrand = savedCardBrand === 'amex' || savedCardBrand === 'discover';

  const installmentOptions = Array.from({ length: BUSINESS_CONSTANTS.MAX_INSTALLMENTS }, (_, i) => {
    const num = i + 1;
    const details = calculateInstallmentDetails(totalAmount, num);
    return {
      number: num,
      label: details.hasInterest
        ? `${num}x de ${formatCurrencyBRL(details.installmentValue)} c/ juros (Total: ${formatCurrencyBRL(details.totalWithInterest)})`
        : `${num}x de ${formatCurrencyBRL(details.installmentValue)} sem juros`,
      total: details.totalWithInterest,
    };
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Box
          sx={paymentMethodTabStyle(paymentMethod === 'credit_card')}
          onClick={() => onChangePaymentMethod('credit_card')}
        >
          <CreditCard size={26} color={paymentMethod === 'credit_card' ? '#2563eb' : '#64748b'} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Cartão de Crédito
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Até 12x • Aprovação imediata
          </Typography>
        </Box>

        <Box
          sx={paymentMethodTabStyle(paymentMethod === 'pix')}
          onClick={() => onChangePaymentMethod('pix')}
        >
          <QrCode size={26} color={paymentMethod === 'pix' ? '#2563eb' : '#64748b'} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Pix Instantâneo
          </Typography>
          <Typography variant="caption" color="text.secondary">
            QR Code dinâmico
          </Typography>
        </Box>

        <Box
          sx={paymentMethodTabStyle(paymentMethod === 'boleto')}
          onClick={() => onChangePaymentMethod('boleto')}
        >
          <FileText size={26} color={paymentMethod === 'boleto' ? '#2563eb' : '#64748b'} />
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            Boleto Bancário
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Vencimento em 1 dia útil
          </Typography>
        </Box>
      </Box>

      {paymentMethod === 'credit_card' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>

          {savedCards.length > 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                Escolha um cartão salvo ou insira um novo cartão:
              </Typography>

              <Grid container spacing={2}>
                {savedCards.map((card) => {
                  const isSelected = cardData.isUsingSavedCard && cardData.savedCardId === card.id;
                  return (
                    <Grid size={{ xs: 12, sm: 6 }} key={card.id} sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CreditCardCard
                        card={card}
                        isSelected={isSelected}
                        selectable
                        onSelect={() => {
                          onChangeCardData((prev) => ({
                            ...prev,
                            isUsingSavedCard: true,
                            savedCardId: card.id,
                            holderName: card.holderName,
                            cardNumber: `•••• •••• •••• ${card.lastFourDigits}`,
                            expiryDate: `${card.expiryMonth}/${card.expiryYear}`,
                            cvv: '',
                          }));
                        }}
                      />
                    </Grid>
                  );
                })}

                <Grid size={{ xs: 12, sm: 6 }} sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={paymentOptionCardStyle(!cardData.isUsingSavedCard)}
                    onClick={() => {
                      onChangeCardData((prev) => ({
                        ...prev,
                        isUsingSavedCard: false,
                        savedCardId: null,
                        holderName: '',
                        cardNumber: '',
                        expiryDate: '',
                        cvv: '',
                      }));
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0.5, height: '100%', textAlign: 'center', px: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a' }}>
                        Inserir Novo Cartão
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5 }}>
                        Preenchimento rápido de novo cartão
                      </Typography>
                      <Radio checked={!cardData.isUsingSavedCard} size="small" sx={{ p: 0 }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}

          {!cardData.isUsingSavedCard ? (
            <NewCreditCardForm
              cardData={cardData}
              onChangeCardData={onChangeCardData}
              showErrors={showErrors}
              installmentOptions={installmentOptions}
            />
          ) : (

            <Box
              sx={{
                p: { xs: 2, sm: 2.5 },
                bgcolor: 'transparent',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                mt: 0.5,
              }}
            >
              <Grid container spacing={2} alignItems="flex-start">
                <Grid size={{ xs: 12, sm: 3.5 }}>
                  <TextField
                    label="CVV"
                    placeholder={is4DigitSavedBrand ? '1234' : '123'}
                    type="password"
                    value={cardData.cvv}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                      onChangeCardData((prev) => ({ ...prev, cvv: val }));
                    }}
                    error={Boolean(
                      showErrors && (
                        is4DigitSavedBrand
                          ? cardData.cvv.length !== 4
                          : (cardData.cvv.length < 3 || cardData.cvv.length > 4)
                      )
                    )}
                    helperText={
                      showErrors && (
                        is4DigitSavedBrand
                          ? cardData.cvv.length !== 4
                          : (cardData.cvv.length < 3 || cardData.cvv.length > 4)
                      )
                        ? (is4DigitSavedBrand ? 'Exige 4 dígitos' : 'Exige 3 ou 4 dígitos')
                        : undefined
                    }
                    fullWidth
                    variant="outlined"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock size={16} color="#94a3b8" />
                          </InputAdornment>
                        ),
                      },
                      htmlInput: {
                        maxLength: 4,
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 8.5 }}>
                  <TextField
                    select
                    label="Opções de Parcelamento"
                    value={cardData.installments}
                    onChange={(e) =>
                      onChangeCardData((prev) => ({ ...prev, installments: Number(e.target.value) }))
                    }
                    fullWidth
                    variant="outlined"
                    sx={{
                      '& .MuiSelect-select': {
                        fontSize: { xs: '0.8rem', sm: '0.875rem' },
                        py: { xs: 1.25, sm: 1.75 },
                      },
                    }}
                  >
                    {installmentOptions.map((opt) => (
                      <MenuItem 
                        key={opt.number} 
                        value={opt.number}
                        sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                      >
                        {opt.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      )}

      {paymentMethod === 'pix' && (
        <Box sx={paymentInfoBoxStyle}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.5,
              p: { xs: 0.5, sm: 1 },
            }}
          >
            <Box
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                borderRadius: '14px',
                bgcolor: 'rgba(37, 99, 235, 0.08)',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                mx: 'auto',
              }}
            >
              <QrCode size={28} />
            </Box>

            <Box sx={{ flex: 1, width: '100%' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                Pague com Pix em segundos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Ao clicar em <strong>Pagar com Pix</strong>, geraremos o QR Code oficial e a chave Copia e Cola em uma janela exclusiva para pagamento instantâneo pelo seu aplicativo bancário.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}

      {paymentMethod === 'boleto' && (
        <Box sx={paymentInfoBoxStyle}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1.5,
              p: { xs: 0.5, sm: 1 },
            }}
          >
            <Box
              sx={{
                width: { xs: 48, sm: 56 },
                height: { xs: 48, sm: 56 },
                borderRadius: '14px',
                bgcolor: 'rgba(37, 99, 235, 0.08)',
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                mx: 'auto',
              }}
            >
              <FileText size={28} />
            </Box>

            <Box sx={{ flex: 1, width: '100%' }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                Boleto Bancário (Vencimento em 1 dia útil)
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                Ao clicar em <strong>Gerar Boleto Bancário</strong>, geraremos o código de barras digitável para pagamento em qualquer banco ou Internet Banking. Uma cópia do boleto também será enviada para o seu e-mail.
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

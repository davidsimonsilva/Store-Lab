import React from 'react';
import {
  Grid,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  CreditCard,
  Calendar,
  User as UserIcon,
  Lock,
} from 'lucide-react';
import { CardFormData } from '../CheckoutPaymentSelector';
import { detectCardBrand, formatExpiryInput } from '../../../../services/cardValidationService';

interface NewCreditCardFormProps {
  cardData: CardFormData;
  onChangeCardData: (updater: (prev: CardFormData) => CardFormData) => void;
  showErrors?: boolean;
  installmentOptions: { number: number; label: string; total: number }[];
}

export const NewCreditCardForm: React.FC<NewCreditCardFormProps> = ({
  cardData,
  onChangeCardData,
  showErrors = false,
  installmentOptions,
}) => {
  const detectedBrand = detectCardBrand(cardData.cardNumber);
  const is4DigitNewBrand = detectedBrand === 'amex' || detectedBrand === 'discover';

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <TextField
          label="Nome Impresso no Cartão"
          placeholder="Ex: JOAO SILVA"
          value={cardData.holderName}
          onChange={(e) =>
            onChangeCardData((prev) => ({ ...prev, holderName: e.target.value.toUpperCase() }))
          }
          fullWidth
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <UserIcon size={16} color="#94a3b8" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Grid>

      <Grid size={12}>
        <TextField
          label="Número do Cartão (Algoritmo de Luhn)"
          placeholder="0000 0000 0000 0000"
          value={cardData.cardNumber}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
            const parts: string[] = [];
            for (let i = 0; i < raw.length; i += 4) {
              parts.push(raw.slice(i, i + 4));
            }
            onChangeCardData((prev) => ({ ...prev, cardNumber: parts.join(' ') }));
          }}
          fullWidth
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCard size={16} color="#94a3b8" />
                </InputAdornment>
              ),
              endAdornment: detectedBrand !== 'unknown' && (
                <InputAdornment position="end">
                  <Chip
                    label={detectedBrand.toUpperCase()}
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 800, fontSize: '0.65rem' }}
                  />
                </InputAdornment>
              ),
            },
            htmlInput: {
              maxLength: 19,
            },
          }}
        />
      </Grid>

      <Grid size={6}>
        <TextField
          label="Validade (MM/AA)"
          placeholder="12/28"
          value={cardData.expiryDate}
          onChange={(e) => {
            const formatted = formatExpiryInput(e.target.value, cardData.expiryDate);
            onChangeCardData((prev) => ({ ...prev, expiryDate: formatted }));
          }}
          fullWidth
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Calendar size={16} color="#94a3b8" />
                </InputAdornment>
              ),
            },
            htmlInput: {
              maxLength: 5,
            },
          }}
        />
      </Grid>

      <Grid size={6}>
        <TextField
          label="CVV"
          placeholder={is4DigitNewBrand ? '1234' : '123'}
          type="password"
          value={cardData.cvv}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 4);
            onChangeCardData((prev) => ({ ...prev, cvv: val }));
          }}
          error={Boolean(
            showErrors && (
              is4DigitNewBrand
                ? cardData.cvv.length !== 4
                : (cardData.cvv.length < 3 || cardData.cvv.length > 4)
            )
          )}
          helperText={
            showErrors && (
              is4DigitNewBrand
                ? cardData.cvv.length !== 4
                : (cardData.cvv.length < 3 || cardData.cvv.length > 4)
            )
              ? (is4DigitNewBrand ? 'CVV deve ter 4 dígitos' : 'CVV deve ter 3 ou 4 dígitos')
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

      <Grid size={12}>
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
  );
};

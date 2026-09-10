import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  InputAdornment,
  Grid,
} from '@mui/material';
import {
  User as UserIcon,
  CreditCard,
  Calendar,
  Lock,
  Check,
} from 'lucide-react';
import { useFormik } from 'formik';
import { BaseModal } from '../../../../components/BaseModal/BaseModal';
import { creditCardSchema } from '../../../../schemas/cardSchemas';
import { detectCardBrand } from '../../../../services/cardValidationService';
import { cardService, formatExpiryInput } from '../../../../services/cardService';
import { useToast } from '../../../../context/ToastContext';

export interface CardFormModalProps {
  open: boolean;
  userId: string;
  onClose: () => void;
  onSaved: () => void;
}

export const CardFormModal: React.FC<CardFormModalProps> = ({
  open,
  userId,
  onClose,
  onSaved,
}) => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      holderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      isDefault: false,
    },
    validationSchema: creditCardSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const cleanNumber = values.cardNumber.replace(/\D/g, '');
        const expiryParts = values.expiryDate.split('/');

        await cardService.saveCardAsync({
          userId,
          holderName: values.holderName,
          cardNumber: cleanNumber,
          expiryMonth: expiryParts[0] || '',
          expiryYear: expiryParts[1] || '',
          isDefault: values.isDefault,
        });

        formik.resetForm();
        onClose();
        onSaved();
        showToast('Cartão salvo com sucesso!', 'success');
      } catch {
        showToast('Erro ao salvar cartão.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const detectedBrand = detectCardBrand(formik.values.cardNumber.replace(/\s/g, ''));

  return (
    <BaseModal
      open={open}
      onClose={handleClose}
      title="Adicionar Cartão de Crédito"
      maxWidth="580px"
      secondaryActionText="Cancelar"
      onSecondaryAction={handleClose}
      primaryActionText="Salvar Cartão"
      onPrimaryAction={() => formik.handleSubmit()}
      primaryActionIcon={<Check size={18} />}
      primaryActionDisabled={isSubmitting}
      primaryActionLoading={isSubmitting}
    >
      <Box
        component="form"
        id="card-form"
        onSubmit={formik.handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1.5 }}
      >

        <TextField
          select
          name="cardType"
          label="Tipo de Cartão"
          value="credit"
          onChange={() => {}}
          fullWidth
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
        >
          <MenuItem value="credit">Cartão de Crédito</MenuItem>
          <MenuItem value="debit" disabled>Cartão de Débito (Indisponível)</MenuItem>
        </TextField>

        <TextField
          name="holderName"
          label="Nome do Titular"
          placeholder="Ex: João Silva"
          value={formik.values.holderName}
          onChange={(e) => formik.setFieldValue('holderName', e.target.value)}
          onBlur={formik.handleBlur}
          error={formik.touched.holderName && Boolean(formik.errors.holderName)}
          helperText={formik.touched.holderName && formik.errors.holderName}
          fullWidth
          variant="outlined"
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <TextField
              name="cardNumber"
              label="Número do Cartão"
              placeholder="0000 0000 0000 0000"
              value={formik.values.cardNumber}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
                const parts: string[] = [];
                for (let i = 0; i < raw.length; i += 4) {
                  parts.push(raw.slice(i, i + 4));
                }
                formik.setFieldValue('cardNumber', parts.join(' '));
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={
                formik.touched.cardNumber && formik.errors.cardNumber
                  ? formik.errors.cardNumber
                  : detectedBrand !== 'unknown'
                  ? `Bandeira: ${detectedBrand.toUpperCase()}`
                  : undefined
              }
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCard size={16} color="#94a3b8" />
                    </InputAdornment>
                  ),
                },
                htmlInput: {
                  maxLength: 19,
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 6, sm: 3, md: 3 }}>
            <TextField
              name="expiryDate"
              label="Validade"
              placeholder="MM/AA"
              value={formik.values.expiryDate}
              onChange={(e) => {
                const formatted = formatExpiryInput(e.target.value, formik.values.expiryDate);
                formik.setFieldValue('expiryDate', formatted);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
              helperText={formik.touched.expiryDate && formik.errors.expiryDate}
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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

          <Grid size={{ xs: 6, sm: 3, md: 3 }}>
            <TextField
              name="cvv"
              label="CVV"
              placeholder="123"
              type="text"
              value={formik.values.cvv}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                formik.setFieldValue('cvv', val);
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.cvv && Boolean(formik.errors.cvv)}
              helperText={formik.touched.cvv && formik.errors.cvv}
              fullWidth
              variant="outlined"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px' } }}
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
        </Grid>
      </Box>
    </BaseModal>
  );
};

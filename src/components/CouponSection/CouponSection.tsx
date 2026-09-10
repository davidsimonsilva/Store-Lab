import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Tag } from 'lucide-react';
import { couponSchema } from '../../schemas/commonSchemas';
import {
  couponContainerStyle,
  couponHeaderTitleStyle,
  couponErrorTextStyle,
  couponInputRowStyle,
  couponTextFieldStyle,
  couponApplyButtonStyle,
  couponRemoveActionButtonStyle,
  couponHintTextStyle,
  couponHintCodeStyle,
} from './CouponSection.styles';

export interface CouponSectionProps {
  couponCode: string;
  discountApplied: boolean;
  couponError?: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
  onClearError?: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export const CouponSection: React.FC<CouponSectionProps> = ({
  couponCode,
  discountApplied,
  couponError,
  onApplyCoupon,
  onRemoveCoupon,
  onClearError,
  disabled = false,
  compact = false,
}) => {
  const [inputValue, setInputValue] = useState(couponCode || '');
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    setInputValue(couponCode || '');
  }, [couponCode]);

  const handleApply = (codeToApply?: string) => {
    const trimmed = (codeToApply || inputValue).trim().toUpperCase();
    if (!trimmed) {
      setValidationError('Informe o código do cupom');
      return;
    }

    try {
      couponSchema.validateSync(trimmed);
      setValidationError(null);
      setInputValue(trimmed);
      onApplyCoupon(trimmed);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cupom inválido';
      setValidationError(msg);
    }
  };

  const handleRemove = () => {
    onRemoveCoupon();
    setInputValue('');
    setValidationError(null);
    if (onClearError) onClearError();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    setInputValue(newValue);
    if (validationError) setValidationError(null);
    if (couponError && onClearError) onClearError();

    if (discountApplied) {
      onRemoveCoupon();
    }
  };

  const activeError = couponError || validationError;

  return (
    <Box sx={couponContainerStyle}>
      <Typography
        variant="caption"
        sx={couponHeaderTitleStyle}
      >
        <Tag size={compact ? 14 : 16} color="#2563eb" /> CUPOM DE DESCONTO
      </Typography>

      <Box sx={couponInputRowStyle}>
        <TextField
          id="coupon-code-input"
          placeholder="Ex: LAB10"
          size="small"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (discountApplied) {
                handleRemove();
              } else {
                handleApply();
              }
            }
          }}
          error={Boolean(activeError)}
          disabled={disabled}
          slotProps={{
            htmlInput: {
              maxLength: 20,
            },
          }}
          sx={couponTextFieldStyle}
        />
        <Button
          id="coupon-apply-btn"
          variant={discountApplied ? 'outlined' : 'contained'}
          color={discountApplied ? 'error' : 'primary'}
          onClick={discountApplied ? handleRemove : () => handleApply()}
          disabled={disabled}
          sx={discountApplied ? couponRemoveActionButtonStyle : couponApplyButtonStyle}
        >
          {discountApplied ? 'Remover' : 'Aplicar'}
        </Button>
      </Box>

      {activeError && (
        <Typography
          variant="caption"
          sx={couponErrorTextStyle}
        >
          {activeError}
        </Typography>
      )}

      <Typography
        variant="caption"
        sx={couponHintTextStyle}
        onClick={() => {
          if (!discountApplied) {
            handleApply('LAB10');
          }
        }}
        title="Clique para aplicar o cupom promocional LAB10"
      >
        Dica: use o cupom <Box component="span" sx={couponHintCodeStyle}>LAB10</Box> para 10% de desconto!
      </Typography>
    </Box>
  );
};

export default CouponSection;


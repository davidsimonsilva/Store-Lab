import React, { useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { Truck } from 'lucide-react';
import { cepSchema } from '../../../schemas/commonSchemas';
import { calculateShippingOptions, ShippingOption } from '../../../services/cepService';
import { formatCurrencyBRL } from '../../../utils/formatters';
import {
  shippingSimulationContainerStyle,
  shippingSimulationOptionCardStyle,
  shippingSimulationTextColStyle,
  shippingSimulationOptionNameStyle,
  shippingSimulationOptionDaysStyle,
  getShippingSimulationPriceStyle,
  shippingCepConsultButtonStyle,
} from '../ProductDetail.styles';

export const ProductFreightCalculator: React.FC = () => {
  const [cep, setCep] = useState('');
  const [cepError, setCepError] = useState<string | null>(null);
  const [cepCalculated, setCepCalculated] = useState(false);
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[] | null>(null);

  const handleCalculateCep = () => {
    try {
      cepSchema.validateSync(cep);
      setCepError(null);
      const clean = cep.replace(/\D/g, '');
      const options = calculateShippingOptions(clean);
      setShippingOptions(options);
      setCepCalculated(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'CEP inválido';
      setCepError(msg);
      setCepCalculated(false);
      setShippingOptions(null);
    }
  };

  return (
    <Box sx={{ pt: 0.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <Truck size={16} color="#2563eb" />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>
          Calcular frete e prazo de entrega
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <TextField
          size="small"
          variant="outlined"
          value={cep}
          placeholder="Ex: 01311-200"
          error={Boolean(cepError)}
          helperText={cepError}
          onChange={(e) => {
            const clean = e.target.value.replace(/\D/g, '').slice(0, 8);
            let formatted = clean;
            if (clean.length > 5) formatted = `${clean.slice(0, 5)}-${clean.slice(5)}`;
            setCep(formatted);
            if (cepError) setCepError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleCalculateCep();
            }
          }}
          slotProps={{
            input: {
              sx: { borderRadius: '12px', bgcolor: '#ffffff', fontSize: '0.875rem', height: '44px' },
            },
            htmlInput: {
              maxLength: 9,
              'aria-label': 'CEP para cálculo de frete',
            },
          }}
          sx={{ flexGrow: 1 }}
        />
        <Button
          onClick={handleCalculateCep}
          variant="contained"
          sx={shippingCepConsultButtonStyle}
        >
          Consultar
        </Button>
      </Box>

      {cepCalculated && shippingOptions && shippingOptions.length > 0 && (
        <Box sx={shippingSimulationContainerStyle}>
          {shippingOptions.map((opt) => (
            <Box key={opt.id} sx={shippingSimulationOptionCardStyle}>
              <Box sx={shippingSimulationTextColStyle}>
                <Typography variant="body2" sx={shippingSimulationOptionNameStyle}>
                  {opt.name}
                </Typography>
                <Typography variant="caption" sx={shippingSimulationOptionDaysStyle}>
                  Chega em até {opt.days} {opt.days === 1 ? 'dia útil' : 'dias úteis'}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={getShippingSimulationPriceStyle(opt.price === 0)}
              >
                {opt.price === 0 ? 'Grátis' : formatCurrencyBRL(opt.price)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

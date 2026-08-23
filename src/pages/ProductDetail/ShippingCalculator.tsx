import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';
import { formatCurrencyBRL } from '../../utils/formatters';
import {
  shippingContainerStyle,
  shippingLabelStyle,
  shippingFormGroupStyle,
  shippingResultsContainerStyle,
  shippingResultItemStyle,
} from './ShippingCalculator.styles';

interface ShippingOption {
  name: string;
  price: number;
  days: number;
}

interface ShippingResult {
  calculated: boolean;
  options: ShippingOption[];
}

export const ShippingCalculator: React.FC = () => {
  const [cep, setCep] = useState('');
  const [cepError, setCepError] = useState<string | null>(null);
  const [shippingResult, setShippingResult] = useState<ShippingResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanCep = cep.replace(/\D/g, '');

    if (!cep) {
      const errMsg = 'Campo obrigatório';
      setCepError(errMsg);
      setShippingResult(null);
      return;
    }

    if (cleanCep.length !== 8) {
      const errMsg = 'CEP inválido. Deve conter exatamente 8 números.';
      setCepError(errMsg);
      setShippingResult(null);
      return;
    }

    const isRepeating = /^(.)\1+$/.test(cleanCep);
    const isInvalidOrNotFound = 
      cleanCep.startsWith('00') || 
      cleanCep.startsWith('99') || 
      cleanCep.endsWith('999') ||
      isRepeating;

    if (isInvalidOrNotFound) {
      const errMsg = 'CEP não encontrado. Por favor, verifique se o número digitado está correto.';
      setCepError(errMsg);
      setShippingResult(null);
      return;
    }

    const formatted = `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`;
    setCep(formatted);
    setCepError(null);

    let pacPrice = 12.90;
    let expressPrice = 24.90;
    let expressDays = 2;
    let pacDays = 6;

    if (cleanCep.startsWith('0') || cleanCep.startsWith('1')) {
      pacPrice = 0.00;
      expressPrice = 9.90;
      expressDays = 1;
      pacDays = 3;
    } 
    else if (cleanCep.startsWith('5') || cleanCep.startsWith('6')) {
      pacPrice = 18.90;
      expressPrice = 34.90;
      expressDays = 4;
      pacDays = 8;
    } 
    else if (cleanCep.startsWith('8') || cleanCep.startsWith('9')) {
      pacPrice = 14.50;
      expressPrice = 29.90;
      expressDays = 3;
      pacDays = 5;
    }

    setShippingResult({
      calculated: true,
      options: [
        { name: 'Entrega Padrão (PAC)', price: pacPrice, days: pacDays },
        { name: 'Entrega Expressa (SEDEX)', price: expressPrice, days: expressDays }
      ]
    });
  };

  return (
    <Box sx={shippingContainerStyle}>
      <form onSubmit={handleCalculate}>
        <Typography sx={shippingLabelStyle}>
          <Truck size={18} />
          Calcular frete e prazo de entrega
        </Typography>
        
        <Box sx={shippingFormGroupStyle}>
          <TextField
            size="small"
            placeholder="Ex: 01311-200"
            value={cep}
            error={!!cepError}
            helperText={cepError}
            onChange={(e) => {
              const raw = e.target.value;
              const clean = raw.replace(/\D/g, '').slice(0, 8);
              let formatted = clean;
              
              if (clean.length > 5) {
                formatted = `${clean.slice(0, 5)}-${clean.slice(5)}`;
              }
              setCep(formatted);
              setCepError(null);
            }}
            slotProps={{
              input: {
                sx: { borderRadius: '10px' }
              }
            }}
            sx={{ flex: 1 }}
          />
          <Button 
            type="submit" 
            variant="contained"
            disabled={!cep || cep.replace(/\D/g, '').length !== 8}
            sx={{ borderRadius: '10px', px: 3, fontWeight: 700 }}
          >
            Consultar
          </Button>
        </Box>
      </form>

      {shippingResult?.calculated && (
        <Box sx={shippingResultsContainerStyle}>
          <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary', display: 'block', mb: 1.5 }}>
            Opções disponíveis para CEP: {cep}
          </Typography>
          {shippingResult.options.map((opt, i) => (
            <Box key={i} sx={shippingResultItemStyle}>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {opt.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Chega em até {opt.days} dias úteis
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: opt.price === 0 ? 'success.main' : 'primary.main' }}>
                {opt.price === 0 ? 'Frete Grátis' : formatCurrencyBRL(opt.price)}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};


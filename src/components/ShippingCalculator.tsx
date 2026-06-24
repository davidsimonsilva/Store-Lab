import React, { useState } from 'react';
import { Truck } from 'lucide-react';
import { button } from '../utils/buttonStyles';

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
    <div className="shipping-container">
      <div className="mb-4">
        <form onSubmit={handleCalculate}>
          <label className="shipping-label">
            <Truck size={16} className="shipping-icon" />
            Calcular frete e prazo de entrega
          </label>
          
          <div className="shipping-input-group">
            <div className="shipping-input-wrapper">
              <input 
                type="text"
                name="cep"
                value={cep}
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
                placeholder="Ex: 01311-200" 
                className={`shipping-input ${cepError ? 'shipping-input-error' : ''}`}
              />
            </div>
            <button 
              type="submit" 
              disabled={!cep || cep.replace(/\D/g, '').length !== 8}
              className={button.primary}
            >
              Consultar
            </button>
          </div>

          {cepError && (
            <span className="shipping-error">
              {cepError}
            </span>
          )}
        </form>
      </div>

      {shippingResult?.calculated && (
        <div className="shipping-results">
          <span className="shipping-results-title">
            Opções disponíveis para CEP: {cep}
          </span>
          {shippingResult.options.map((opt, i) => (
            <div 
              key={i} 
              className={`shipping-results-item ${i === 0 ? 'border-b' : ''}`}
            >
              <p className="shipping-results-name">
                {opt.name}
              </p>
              <span className="shipping-results-days">
                Chega em até {opt.days} dias úteis
              </span>
              <p className={`shipping-results-price ${opt.price === 0 ? 'free' : ''}`}>
                {opt.price === 0 ? 'Frete Grátis' : opt.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewCreditCardForm } from '../../pages/Checkout/Payment/components/NewCreditCardForm';

describe('NewCreditCardForm - Componente de Formulário de Cartão de Crédito', () => {
  const initialCardData = {
    isUsingSavedCard: false,
    savedCardId: null,
    holderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    installments: 1,
  };

  const mockInstallments = [
    { number: 1, label: '1x de R$ 100,00 sem juros', total: 100 },
    { number: 2, label: '2x de R$ 50,00 sem juros', total: 100 },
  ];

  test('renderiza os campos de nome, número do cartão, validade, CVV e parcelamento', () => {
    const handleChange = jest.fn();

    render(
      <NewCreditCardForm
        cardData={initialCardData}
        onChangeCardData={handleChange}
        installmentOptions={mockInstallments}
      />
    );

    expect(screen.getByLabelText(/nome impresso no cartão/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número do cartão/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/validade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/cvv/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/opções de parcelamento/i)).toBeInTheDocument();
  });

  test('formata e converte o nome para caixa alta ao digitar', () => {
    let cardData = { ...initialCardData };
    const handleChange = jest.fn((updater) => {
      cardData = updater(cardData);
    });

    const { rerender } = render(
      <NewCreditCardForm
        cardData={cardData}
        onChangeCardData={handleChange}
        installmentOptions={mockInstallments}
      />
    );

    const nameInput = screen.getByLabelText(/nome impresso no cartão/i);
    fireEvent.change(nameInput, { target: { value: 'carlos oliveira' } });

    expect(handleChange).toHaveBeenCalled();
    expect(cardData.holderName).toBe('CARLOS OLIVEIRA');

    rerender(
      <NewCreditCardForm
        cardData={cardData}
        onChangeCardData={handleChange}
        installmentOptions={mockInstallments}
      />
    );

    expect(screen.getByDisplayValue('CARLOS OLIVEIRA')).toBeInTheDocument();
  });

  test('detecta a bandeira Elo quando o número inicia com 6504', () => {
    const cardData = {
      ...initialCardData,
      cardNumber: '6504 1234 5678 9012',
    };

    render(
      <NewCreditCardForm
        cardData={cardData}
        onChangeCardData={jest.fn()}
        installmentOptions={mockInstallments}
      />
    );

    expect(screen.getByText('ELO')).toBeInTheDocument();
  });
});

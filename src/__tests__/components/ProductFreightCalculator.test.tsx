import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductFreightCalculator } from '../../pages/ProductDetail/components/ProductFreightCalculator';

describe('ProductFreightCalculator - Calculadora de Frete', () => {
  test('renderiza os campos de CEP e botão de consultar', () => {
    render(<ProductFreightCalculator />);

    expect(screen.getByPlaceholderText(/ex: 01311-200/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /consultar/i })).toBeInTheDocument();
  });

  test('calcula opções de frete ao informar um CEP válido e clicar em consultar', () => {
    render(<ProductFreightCalculator />);

    const cepInput = screen.getByPlaceholderText(/ex: 01311-200/i);
    const consultBtn = screen.getByRole('button', { name: /consultar/i });

    fireEvent.change(cepInput, { target: { value: '01311-200' } });
    fireEvent.click(consultBtn);

    expect(screen.getByText(/envio padrão/i)).toBeInTheDocument();
    expect(screen.getByText(/envio expresso/i)).toBeInTheDocument();
  });
});

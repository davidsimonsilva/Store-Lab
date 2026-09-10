import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CouponSection from '../../components/CouponSection/CouponSection';

describe('CouponSection Component', () => {
  const defaultProps = {
    couponCode: '',
    discountApplied: false,
    couponError: null,
    onApplyCoupon: jest.fn(),
    onRemoveCoupon: jest.fn(),
    onClearError: jest.fn(),
    disabled: false,
    compact: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza o campo de input e botão aplicar inicialmente', () => {
    render(<CouponSection {...defaultProps} />);

    expect(screen.getByText(/cupom de desconto/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/ex:\s*lab10/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /aplicar/i })).toBeInTheDocument();
  });

  test('permite digitar um código e acionar onApplyCoupon ao clicar em Aplicar', () => {
    render(<CouponSection {...defaultProps} />);

    const input = screen.getByPlaceholderText(/ex:\s*lab10/i);
    const button = screen.getByRole('button', { name: /aplicar/i });

    fireEvent.change(input, { target: { value: 'LAB10' } });
    fireEvent.click(button);

    expect(defaultProps.onApplyCoupon).toHaveBeenCalledWith('LAB10');
  });

  test('permite acionar onApplyCoupon ao pressionar Enter no input', () => {
    render(<CouponSection {...defaultProps} />);

    const input = screen.getByPlaceholderText(/ex:\s*lab10/i);

    fireEvent.change(input, { target: { value: 'STORELAB10' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(defaultProps.onApplyCoupon).toHaveBeenCalledWith('STORELAB10');
  });

  test('quando cupom está aplicado, o botão ao lado do input vira Remover e aciona onRemoveCoupon', () => {
    render(
      <CouponSection
        {...defaultProps}
        couponCode="LAB10"
        discountApplied={true}
      />
    );

    const removeButton = screen.getByRole('button', { name: /remover/i });
    expect(removeButton).toBeInTheDocument();

    fireEvent.click(removeButton);
    expect(defaultProps.onRemoveCoupon).toHaveBeenCalledTimes(1);
  });

  test('remove o cupom automaticamente se o usuário digitar ou apagar qualquer caractere no input', () => {
    render(
      <CouponSection
        {...defaultProps}
        couponCode="LAB10"
        discountApplied={true}
      />
    );

    const input = screen.getByPlaceholderText(/ex:\s*lab10/i);

    fireEvent.change(input, { target: { value: 'LAB1' } });

    expect(defaultProps.onRemoveCoupon).toHaveBeenCalledTimes(1);
  });

  test('exibe erro de validação caso tente aplicar com campo vazio ou inválido', () => {
    render(<CouponSection {...defaultProps} />);

    const button = screen.getByRole('button', { name: /aplicar/i });
    fireEvent.click(button);

    expect(screen.getByText(/informe o código do cupom/i)).toBeInTheDocument();
    expect(defaultProps.onApplyCoupon).not.toHaveBeenCalled();
  });

  test('exibe mensagem de erro externa vinda da prop couponError', () => {
    render(
      <CouponSection
        {...defaultProps}
        couponError="Cupom expirado ou inválido"
      />
    );

    expect(screen.getByText(/cupom expirado ou inválido/i)).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddressFormFields } from '../../components/AddressFormModal/AddressFormFields';

describe('AddressFormFields - Componente de Campos de Endereço', () => {
  const mockFormik: any = {
    values: {
      label: 'Casa',
      recipientName: 'João da Silva',
      cep: '38010-200',
      street: 'Av. Guilherme Ferreira',
      number: '100',
      complement: 'Apto 101',
      neighborhood: 'Centro',
      city: 'Uberaba',
      state: 'MG',
      referencePoint: 'Próximo ao mercado',
      isDefault: true,
    },
    touched: {},
    errors: {},
    handleBlur: jest.fn(),
    handleChange: jest.fn(),
    setFieldValue: jest.fn(),
  };

  test('renderiza corretamente todos os campos do formulário de endereço', () => {
    render(
      <AddressFormFields
        formik={mockFormik}
        isSearchingCep={false}
        onCepChange={jest.fn()}
      />
    );

    expect(screen.getByDisplayValue('38010-200')).toBeInTheDocument();
    expect(screen.getByDisplayValue('João da Silva')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Av. Guilherme Ferreira')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Centro')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Uberaba')).toBeInTheDocument();
  });

  test('permite alterar a seleção do tipo de endereço para Comercial', () => {
    render(
      <AddressFormFields
        formik={mockFormik}
        isSearchingCep={false}
        onCepChange={jest.fn()}
      />
    );

    const comercialBtn = screen.getByRole('button', { name: /comercial/i });
    fireEvent.click(comercialBtn);

    expect(mockFormik.setFieldValue).toHaveBeenCalledWith('label', 'Comercial');
  });
});

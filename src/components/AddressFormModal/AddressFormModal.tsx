import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Check } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Address } from '../../types';
import { formatCEP } from '../../utils/formatters';
import { fetchAddressDetailsByCep } from '../../services/cepService';
import { BRAZILIAN_UFS } from '../../schemas/commonSchemas';
import { BaseModal } from '../BaseModal/BaseModal';
import { AddressFormFields, AddressFormValues } from './AddressFormFields';

const addressFormValidationSchema = Yup.object().shape({
  label: Yup.string()
    .required('Tipo de endereço é obrigatório')
    .max(40, 'Máximo de 40 caracteres'),
  recipientName: Yup.string()
    .required('Nome do destinatário é obrigatório')
    .min(3, 'Mínimo de 3 caracteres')
    .max(150, 'Nome do destinatário deve ter no máximo 150 caracteres')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s-]+$/, 'O nome deve conter apenas letras e acentuação'),
  cep: Yup.string()
    .required('CEP é obrigatório')
    .test('cep-completo', 'CEP deve conter 8 dígitos', (val) => {
      if (!val) return false;
      return val.replace(/\D/g, '').length === 8;
    }),
  street: Yup.string()
    .required('Logradouro / Rua é obrigatório')
    .min(3, 'Mínimo de 3 caracteres')
    .max(160, 'Máximo de 160 caracteres')
    .matches(/^[A-Za-z0-9À-ÖØ-öø-ÿ\s/.,\-–ºª°]+$/, 'Logradouro não pode conter aspas ou símbolos especiais'),
  number: Yup.string()
    .required('Número é obrigatório')
    .max(20, 'Máximo de 20 caracteres')
    .matches(/^[A-Za-z0-9\s/.,\-–ºª°]+$/, 'Número inválido. Use apenas números ou identificação (ex: 123, S/N)')
    .test('no-quotes', 'Número não pode conter aspas ou caracteres especiais', (val) => {
      if (!val) return false;
      return !/['"`<>[\]\\]/.test(val);
    }),
  complement: Yup.string()
    .max(120, 'Máximo de 120 caracteres')
    .test('no-quotes-complement', 'Complemento não pode conter aspas ou caracteres especiais', (val) => {
      if (!val) return true;
      return !/['"`<>[\]\\]/.test(val);
    })
    .optional(),
  neighborhood: Yup.string()
    .required('Bairro é obrigatório')
    .min(2, 'Mínimo de 2 caracteres')
    .max(100, 'Máximo de 100 caracteres')
    .matches(/^[A-Za-z0-9À-ÖØ-öø-ÿ\s/.,\-–ºª°]+$/, 'Bairro não pode conter aspas ou símbolos especiais'),
  city: Yup.string()
    .required('Cidade é obrigatória')
    .min(2, 'Mínimo de 2 caracteres')
    .max(80, 'Máximo de 80 caracteres')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s/.,\-–]+$/, 'Cidade inválida'),
  state: Yup.string()
    .required('UF é obrigatória')
    .oneOf([...BRAZILIAN_UFS], 'Selecione um estado brasileiro válido'),
  referencePoint: Yup.string()
    .max(150, 'Máximo de 150 caracteres')
    .test('no-quotes-ref', 'Ponto de referência não pode conter aspas', (val) => {
      if (!val) return true;
      return !/['"`<>[\]\\]/.test(val);
    })
    .optional(),
  isDefault: Yup.boolean().optional(),
});

export interface AddressFormModalProps {
  open: boolean;
  addressToEdit?: Address | null;
  defaultRecipientName?: string;
  onClose: () => void;
  onSave: (addressData: Omit<Address, 'id' | 'userId'> & { id?: string }) => void;
}

export const AddressFormModal: React.FC<AddressFormModalProps> = ({
  open,
  addressToEdit,
  defaultRecipientName = '',
  onClose,
  onSave,
}) => {
  const [isSearchingCep, setIsSearchingCep] = useState(false);

  const getInitialLabel = (rawLabel?: string) => {
    if (!rawLabel) return 'Casa';
    if (rawLabel === 'Apartamento' || rawLabel === 'Apto' || rawLabel === 'Residencial') return 'Casa';
    if (rawLabel === 'Trabalho' || rawLabel === 'Comercial') return 'Comercial';
    return rawLabel;
  };

  const cleanRecipientName = (name?: string) => {
    if (!name || name.trim().toLowerCase() === 'teste') return '';
    return name;
  };

  const getInitialValues = (): AddressFormValues => ({
    label: getInitialLabel(addressToEdit?.label),
    recipientName: cleanRecipientName(addressToEdit?.recipientName) || cleanRecipientName(defaultRecipientName),
    cep: addressToEdit?.cep ? formatCEP(addressToEdit.cep) : '',
    street: addressToEdit?.street || '',
    number: addressToEdit?.number || '',
    complement: addressToEdit?.complement || '',
    neighborhood: addressToEdit?.neighborhood || '',
    city: addressToEdit?.city || '',
    state: addressToEdit?.state || '',
    referencePoint: addressToEdit?.referencePoint || '',
    isDefault: addressToEdit?.isDefault ?? false,
  });

  const formik = useFormik<AddressFormValues>({
    enableReinitialize: true,
    initialValues: getInitialValues(),
    validationSchema: addressFormValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      onSave({
        id: addressToEdit?.id,
        label: values.label,
        recipientName: cleanRecipientName(values.recipientName) || cleanRecipientName(defaultRecipientName) || 'Destinatário',
        cep: formatCEP(values.cep),
        street: values.street,
        number: values.number,
        complement: values.complement,
        neighborhood: values.neighborhood,
        city: values.city,
        state: values.state.toUpperCase(),
        referencePoint: values.referencePoint,
        isDefault: values.isDefault,
      });
      setSubmitting(false);
      resetForm();
      onClose();
    },
  });

  useEffect(() => {
    if (open) {
      formik.resetForm({ values: getInitialValues() });
    } else {
      formik.resetForm();
    }
  }, [open, addressToEdit]);

  const handleCloseModal = () => {
    formik.resetForm();
    onClose();
  };

  const handleCepLookup = async (cepValue: string) => {
    const clean = cepValue.replace(/\D/g, '');
    if (clean.length === 8) {
      setIsSearchingCep(true);
      const result = await fetchAddressDetailsByCep(clean);
      setIsSearchingCep(false);
      if (result.success && result.data) {
        formik.setFieldValue('street', result.data.street);
        formik.setFieldValue('neighborhood', result.data.neighborhood);
        formik.setFieldValue('city', result.data.city);
        formik.setFieldValue('state', result.data.state.toUpperCase());

        formik.setFieldTouched('street', false, false);
        formik.setFieldTouched('neighborhood', false, false);
        formik.setFieldTouched('city', false, false);
        formik.setFieldTouched('state', false, false);

        formik.setFieldError('street', undefined);
        formik.setFieldError('neighborhood', undefined);
        formik.setFieldError('city', undefined);
        formik.setFieldError('state', undefined);
        formik.setFieldError('cep', undefined);
      } else if (result.errorMessage) {
        formik.setFieldError('cep', result.errorMessage);
        formik.setFieldTouched('cep', true, false);
      }
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = formatCEP(e.target.value);
    formik.setFieldValue('cep', masked);
    const clean = masked.replace(/\D/g, '');
    if (clean.length === 8) {
      handleCepLookup(masked);
    }
  };

  return (
    <BaseModal
      open={open}
      onClose={handleCloseModal}
      title={addressToEdit ? 'Editar Endereço' : 'Cadastrar Novo Endereço'}
      maxWidth="580px"
      secondaryActionText="Cancelar"
      onSecondaryAction={handleCloseModal}
      primaryActionText="Salvar endereço"
      onPrimaryAction={() => formik.handleSubmit()}
      primaryActionIcon={<Check size={18} />}
      primaryActionDisabled={formik.isSubmitting}
      primaryActionLoading={formik.isSubmitting}
    >
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <AddressFormFields
          formik={formik}
          isSearchingCep={isSearchingCep}
          onCepChange={handleCepChange}
        />
      </Box>
    </BaseModal>
  );
};

import * as Yup from 'yup';
import { validateCPF } from '../utils/formatters';
import { BRAZILIAN_UFS } from './commonSchemas';

export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Nome muito curto (mínimo 3 caracteres)')
    .max(150, 'Nome deve ter no máximo 150 caracteres')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'Nome deve conter apenas letras e acentuação'),
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Insira um e-mail válido')
    .max(254, 'E-mail deve ter no máximo 254 caracteres'),
  cpf: Yup.string()
    .required('CPF é obrigatório')
    .test('cpf-valid', 'CPF inválido', (val) => Boolean(val && validateCPF(val))),
  phone: Yup.string()
    .optional()
    .test('phone-valid', 'Telefone inválido. Formato esperado: (DD) 9XXXX-XXXX ou (DD) XXXX-XXXX', (val) => {
      if (!val || !val.trim()) return true;
      const digits = val.replace(/\D/g, '');
      return digits.length === 10 || digits.length === 11;
    }),
});

export const addressSchema = Yup.object().shape({
  label: Yup.string()
    .optional()
    .max(40, 'Tipo de endereço deve ter no máximo 40 caracteres'),
  recipientName: Yup.string()
    .optional()
    .min(3, 'Nome do destinatário muito curto')
    .max(150, 'Nome do destinatário deve ter no máximo 150 caracteres'),
  cep: Yup.string()
    .required('CEP é obrigatório')
    .test('cep-length', 'CEP incompleto', (val) => {
      if (!val) return false;
      return val.replace(/\D/g, '').length === 8;
    }),
  street: Yup.string()
    .required('Logradouro é obrigatório')
    .min(3, 'Logradouro muito curto')
    .max(160, 'Logradouro deve ter no máximo 160 caracteres'),
  number: Yup.string()
    .required('Número é obrigatório')
    .max(20, 'Número deve ter no máximo 20 caracteres')
    .matches(/^[A-Za-z0-9\s/.,\-–ºª°]+$/, 'Número inválido. Use apenas números ou identificação (ex: 123, S/N)')
    .test('no-quotes', 'Número não pode conter aspas ou caracteres especiais', (val) => {
      if (!val) return false;
      return !/['"`<>[\]\\]/.test(val);
    }),
  complement: Yup.string()
    .optional()
    .max(120, 'Complemento deve ter no máximo 120 caracteres'),
  neighborhood: Yup.string()
    .required('Bairro é obrigatório')
    .min(2, 'Bairro muito curto')
    .max(100, 'Bairro deve ter no máximo 100 caracteres'),
  city: Yup.string()
    .required('Cidade é obrigatória')
    .min(2, 'Cidade muito curta')
    .max(80, 'Cidade deve ter no máximo 80 caracteres'),
  state: Yup.string()
    .required('Estado deve conter 2 letras')
    .oneOf([...BRAZILIAN_UFS], 'Estado brasileiro inválido'),
  referencePoint: Yup.string()
    .optional()
    .max(150, 'Ponto de referência deve ter no máximo 150 caracteres'),
  isDefault: Yup.boolean().optional(),
});

export type ProfileSchemaType = Yup.InferType<typeof profileSchema>;
export type AddressSchemaType = Yup.InferType<typeof addressSchema>;


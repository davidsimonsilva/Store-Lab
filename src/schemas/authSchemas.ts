import * as Yup from 'yup';
import { validateCPF } from '../utils/formatters';

export const loginSchema = Yup.object().shape({
  email: Yup.string().required('E-mail é obrigatório').email('Insira um e-mail válido'),
  password: Yup.string().required('Senha é obrigatória').min(6, 'A senha deve conter no mínimo 6 caracteres'),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório').min(3, 'Nome muito curto (mínimo 3 caracteres)'),
  email: Yup.string().required('E-mail é obrigatório').email('Insira um e-mail válido'),
  password: Yup.string().required('Senha é obrigatória').min(6, 'A senha deve conter no mínimo 6 caracteres'),
  confirmPassword: Yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
});

export const profileSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório').min(3, 'Nome muito curto (mínimo 3 caracteres)'),
  email: Yup.string().required('E-mail é obrigatório').email('Insira um e-mail válido'),
  cpf: Yup.string()
    .optional()
    .test('cpf-valid', 'CPF inválido ou com dígitos repetidos', (val) => !val || validateCPF(val)),
  cep: Yup.string().optional(),
  card: Yup.string().optional(),
});

export const checkoutSchema = Yup.object().shape({
  cep: Yup.string().required('CEP é obrigatório').min(8, 'CEP incompleto'),
  address: Yup.string().required('Endereço é obrigatório'),
  paymentMethod: Yup.string().oneOf(['credit_card', 'pix', 'boleto']).required(),
  cardNumber: Yup.string().optional(),
});

export type LoginSchemaType = Yup.InferType<typeof loginSchema>;
export type RegisterSchemaType = Yup.InferType<typeof registerSchema>;
export type ProfileSchemaType = Yup.InferType<typeof profileSchema>;
export type CheckoutSchemaType = Yup.InferType<typeof checkoutSchema>;


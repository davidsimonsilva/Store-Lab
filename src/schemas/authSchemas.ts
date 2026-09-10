import * as Yup from 'yup';
import { validateCPF } from '../utils/formatters';

export const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Insira um e-mail válido')
    .max(254, 'E-mail deve conter no máximo 254 caracteres'),
  password: Yup.string()
    .required('Senha é obrigatória')
    .max(128, 'A senha deve conter no máximo 128 caracteres'),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('Nome completo é obrigatório')
    .min(3, 'O nome deve conter pelo menos 3 caracteres')
    .max(150, 'O nome deve conter no máximo 150 caracteres')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'O nome deve conter apenas letras e acentuação'),
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Insira um e-mail válido')
    .max(254, 'E-mail deve conter no máximo 254 caracteres'),
  cpf: Yup.string()
    .required('CPF é obrigatório')
    .test('cpf-valido', 'CPF inválido', (value) => {
      if (!value) return false;
      return validateCPF(value);
    }),
  password: Yup.string()
    .required('Senha é obrigatória')
    .min(10, 'A senha deve conter no mínimo 10 caracteres')
    .max(128, 'A senha deve conter no máximo 128 caracteres')
    .matches(
      strongPasswordRegex,
      'A senha deve conter no mínimo 10 caracteres, 1 maiúscula, 1 minúscula, 1 número e 1 caractere especial'
    ),
  confirmPassword: Yup.string()
    .required('Confirmação de senha é obrigatória')
    .max(128, 'A confirmação de senha deve ter no máximo 128 caracteres')
    .oneOf([Yup.ref('password')], 'As senhas não coincidem'),
});

export const profileSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório').min(3, 'Nome muito curto (mínimo 3 caracteres)'),
  email: Yup.string().required('E-mail é obrigatório').email('Insira um e-mail válido'),
  cpf: Yup.string()
    .optional()
    .test('cpf-valid', 'CPF inválido', (val) => !val || validateCPF(val)),
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


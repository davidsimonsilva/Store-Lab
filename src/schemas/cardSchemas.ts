import * as Yup from 'yup';
import { validateLuhn, validateExpiryDate } from '../services/cardValidationService';

export const creditCardSchema = Yup.object().shape({
  holderName: Yup.string()
    .required('Nome do titular é obrigatório')
    .min(3, 'Mínimo de 3 caracteres')
    .max(60, 'Nome do titular deve ter no máximo 60 caracteres')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, 'O nome deve conter apenas letras e acentuação'),
  cardNumber: Yup.string()
    .required('Número do cartão é obrigatório')
    .test('card-length', 'Número de cartão deve ter entre 13 e 19 dígitos', (val) => {
      if (!val) return false;
      const digits = val.replace(/\D/g, '');
      return digits.length >= 13 && digits.length <= 19;
    })
    .test('luhn-test', 'Número de cartão inválido', (value) => {
      if (!value) return false;
      return validateLuhn(value);
    }),
  expiryDate: Yup.string()
    .required('Validade é obrigatória')
    .test('expiry-test', 'Validade inválida', (value) => {
      if (!value) return false;
      return validateExpiryDate(value);
    }),
  cvv: Yup.string()
    .required('CVV é obrigatório')
    .matches(/^\d{3,4}$/, 'CVV deve conter 3 ou 4 dígitos numéricos'),
  nickname: Yup.string()
    .optional()
    .max(40, 'Apelido do cartão deve ter no máximo 40 caracteres'),
  isDefault: Yup.boolean().optional(),
});

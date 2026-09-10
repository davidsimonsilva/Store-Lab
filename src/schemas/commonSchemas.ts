import * as Yup from 'yup';

export const BRAZILIAN_UFS = [
  'AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN',
  'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'
] as const;

export type BrazilianUF = typeof BRAZILIAN_UFS[number];

export const cepSchema = Yup.string()
  .required('CEP é obrigatório')
  .test('cep-valid', 'CEP deve conter exatamente 8 dígitos numéricos', (val) => {
    if (!val) return false;
    const digits = val.replace(/\D/g, '');
    return digits.length === 8;
  });

export const couponSchema = Yup.string()
  .trim()
  .required('Informe o código do cupom')
  .min(3, 'O cupom deve conter pelo menos 3 caracteres')
  .max(20, 'O cupom deve conter no máximo 20 caracteres')
  .matches(/^[A-Za-z0-9_-]+$/, 'O cupom deve conter apenas letras, números, hífen ou underline');

export const productQuantitySchema = Yup.number()
  .typeError('A quantidade deve ser um número')
  .integer('A quantidade deve ser um número inteiro')
  .min(1, 'Quantidade mínima é 1 unidade')
  .max(3, 'Quantidade máxima permitida é de 3 unidades por produto')
  .required('Quantidade é obrigatória');

export const newsletterSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required('Informe seu e-mail')
    .email('Informe um e-mail válido')
    .max(254, 'E-mail deve ter no máximo 254 caracteres'),
});

export const searchQuerySchema = Yup.string()
  .trim()
  .max(100, 'Termo de busca deve ter no máximo 100 caracteres');

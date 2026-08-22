import * as Yup from 'yup';
import { validateCPF } from '../utils/formatters';

export const profileSchema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório').min(3, 'Nome muito curto (mínimo 3 caracteres)'),
  email: Yup.string().required('E-mail é obrigatório').email('Insira um e-mail válido'),
  cpf: Yup.string()
    .optional()
    .test('cpf-valid', 'CPF inválido ou com dígitos repetidos', (val) => !val || validateCPF(val)),
  phone: Yup.string().optional(),
});

export const addressSchema = Yup.object().shape({
  cep: Yup.string().required('CEP é obrigatório').min(8, 'CEP incompleto'),
  street: Yup.string().required('Logradouro é obrigatório'),
  number: Yup.string().required('Número é obrigatório'),
  neighborhood: Yup.string().required('Bairro é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado deve conter 2 letras').min(2, 'Estado deve conter 2 letras').max(2, 'Estado deve conter 2 letras'),
});

export type ProfileSchemaType = Yup.InferType<typeof profileSchema>;
export type AddressSchemaType = Yup.InferType<typeof addressSchema>;


import * as Yup from 'yup';

export const reviewSchema = Yup.object().shape({
  rating: Yup.number()
    .required('Selecione uma nota de 1 a 5 estrelas')
    .min(1, 'A nota mínima é 1 estrela')
    .max(5, 'A nota máxima é 5 estrelas'),
  userName: Yup.string()
    .trim()
    .required('Informe seu nome')
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(60, 'O nome deve ter no máximo 60 caracteres'),
  comment: Yup.string()
    .trim()
    .required('Escreva sua avaliação sobre o produto')
    .min(10, 'A avaliação deve conter pelo menos 10 caracteres')
    .max(500, 'A avaliação não pode exceder 500 caracteres'),
});

export type ReviewFormData = Yup.InferType<typeof reviewSchema>;

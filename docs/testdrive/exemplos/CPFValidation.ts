import * as Yup from "yup";

/**
 * ============================================================================
 * 🛡️ PARTE 1: A ESPECIFICAÇÃO (SPEC) - Validação Matemática Imutável
 * ============================================================================
 * Esta camada define o contrato rígido, lógico e matemático de validação do CPF.
 * Ela é independente de componentes visuais, efeitos ou ações do usuário.
 */

/**
 * Função pura que calcula os dígitos verificadores do CPF e atesta validade lógica.
 * Utiliza o algoritmo matemático oficial da Receita Federal.
 */
export function validateCPF(cpf: string): boolean {
  const cleanCPF = cpf.replace(/[^\d]/g, "");

  // CPFs com todos os números iguais são inválidos
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }

  let sum = 0;
  let remainder;

  // Validação do primeiro dígito verificador
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

  return true;
}

/**
 * Schema de validação Yup unificado (usado no cadastro e login do StoreLab).
 * Integra a função pura de validação matemática do CPF como teste estático.
 */
export const registerUserSchemaSpec = Yup.object().shape({
  nome: Yup.string()
    .required("O nome completo é obrigatório")
    .min(3, "O nome deve conter pelo menos 3 caracteres"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  cpf: Yup.string()
    .required("O CPF é obrigatório")
    .test("cpf-valido", "CPF informado é matematicamente inválido", (value) => {
      if (!value) return false;
      return validateCPF(value);
    }),
});


/**
 * ============================================================================
 * 🔄 PARTE 2: O CICLO DE FEEDBACK (LOOP) - Experiência de Uso e Reatividade
 * ============================================================================
 * Esta camada lida com a reatividade visual em tempo real, capturando as teclas
 * do usuário, aplicando formatação visual instantânea e respondendo a erros.
 */

/**
 * Função utilitária que aplica máscara de formatação em tempo real à medida que
 * o usuário digita no campo, garantindo excelente experiência visual (UX).
 */
export function formatCPFMask(value: string): string {
  // Remove qualquer caractere que não seja número
  const numbersOnly = value.replace(/\D/g, "");

  // Limita o tamanho máximo para 11 dígitos
  const truncated = numbersOnly.slice(0, 11);

  // Aplica as pontuações e traços progressivamente
  if (truncated.length <= 3) {
    return truncated;
  }
  if (truncated.length <= 6) {
    return `${truncated.slice(0, 3)}.${truncated.slice(3)}`;
  }
  if (truncated.length <= 9) {
    return `${truncated.slice(0, 3)}.${truncated.slice(3, 6)}.${truncated.slice(6)}`;
  }
  return `${truncated.slice(0, 3)}.${truncated.slice(3, 6)}.${truncated.slice(6, 9)}-${truncated.slice(9)}`;
}

/**
 * Demonstração conceitual do componente React (MUI + Formik) consumindo
 * a Spec e executando o Loop de feedback instantâneo.
 * 
 * NOTA: O fluxo de digitação é interrompido ou formatado dinamicamente
 * no campo onChange, alimentando o ciclo com dados higienizados e formatados.
 */
export const ExemploFormularioCPFReact = `
import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Box } from "@mui/material";
import { registerUserSchemaSpec, formatCPFMask } from "./CPFValidation";

export function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      nome: "",
      email: "",
      cpf: "",
    },
    validationSchema: registerUserSchemaSpec,
    onSubmit: (values) => {
      console.log("Dados Higienizados salvos com sucesso!", values);
    },
  });

  // O "Loop" de Digitação Reativa: Intercepta a alteração de estado para formatar
  const handleCPFChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const maskedValue = formatCPFMask(rawValue);
    
    // Atualiza o estado do Formik com o valor formatado
    formik.setFieldValue("cpf", maskedValue);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
      <TextField
        id="nome"
        name="nome"
        label="Nome Completo"
        value={formik.values.nome}
        onChange={formik.handleChange}
        error={formik.touched.nome && Boolean(formik.errors.nome)}
        helperText={formik.touched.nome && formik.errors.nome}
      />
      
      <TextField
        id="cpf"
        name="cpf"
        label="CPF"
        value={formik.values.cpf}
        onChange={handleCPFChange} // Executa o Loop de formatação reativa em tempo real
        error={formik.touched.cpf && Boolean(formik.errors.cpf)}
        helperText={(formik.touched.cpf && formik.errors.cpf) || "Formato: 000.000.000-00"}
      />

      <Button type="submit" variant="contained" color="primary">
        Cadastrar Usuário
      </Button>
    </Box>
  );
}
`;

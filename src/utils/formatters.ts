/**
 * Utilitários de Formatação Centralizada para o Store-lab
 */

/**
 * Formata um valor numérico para a moeda Real Brasileiro (R$).
 */
export const formatCurrencyBRL = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

/**
 * Aplica a máscara no formato CPF (000.000.000-00) progressivamente.
 */
export const formatCPF = (cpf: string): string => {
  if (!cpf) return '';
  const clean = cpf.replace(/\D/g, '').slice(0, 11);
  if (clean.length <= 3) {
    return clean;
  }
  if (clean.length <= 6) {
    return `${clean.slice(0, 3)}.${clean.slice(3)}`;
  }
  if (clean.length <= 9) {
    return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6)}`;
  }
  return `${clean.slice(0, 3)}.${clean.slice(3, 6)}.${clean.slice(6, 9)}-${clean.slice(9)}`;
};

/**
 * Aplica a máscara no formato CEP (00000-000) progressivamente.
 */
export const formatCEP = (cep: string): string => {
  if (!cep) return '';
  const clean = cep.replace(/\D/g, '').slice(0, 8);
  if (clean.length <= 5) {
    return clean;
  }
  return `${clean.slice(0, 5)}-${clean.slice(5)}`;
};

/**
 * Valida a integridade matemática de um CPF.
 */
export function validateCPF(cpf: string): boolean {
  if (!cpf) return false;
  const clean = cpf.replace(/[^\d]/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(clean.charAt(i)) * (10 - i);
  }
  let rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i)) * (11 - i);
  }
  rev = 11 - (sum % 11);
  if (rev === 10 || rev === 11) rev = 0;
  if (rev !== parseInt(clean.charAt(10))) return false;

  return true;
}

/**
 * Formata datas no padrão brasileiro (DD/MM/AAAA).
 */
export const formatDateBR = (date: string | Date): string => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) return '';
  return parsedDate.toLocaleDateString('pt-BR');
};

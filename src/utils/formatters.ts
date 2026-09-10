

export const formatCurrencyBRL = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

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

export const formatCEP = (cep: string): string => {
  if (!cep) return '';
  const clean = cep.replace(/\D/g, '').slice(0, 8);
  if (clean.length <= 5) {
    return clean;
  }
  return `${clean.slice(0, 5)}-${clean.slice(5)}`;
};

export function validateCPF(cpf: string): boolean {
  if (!cpf) return false;
  const clean = cpf.replace(/[^\d]/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(clean.substring(i - 1, i)) * (11 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(clean.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(clean.substring(i - 1, i)) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(clean.substring(10, 11))) return false;

  return true;
}

export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  const clean = phone.replace(/\D/g, '').slice(0, 11);
  if (clean.length <= 2) {
    return clean.length ? `(${clean}` : '';
  }
  if (clean.length <= 6) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
  }
  if (clean.length <= 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }
  return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
};

export const formatDateBR = (date: string | Date): string => {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(parsedDate.getTime())) return '';
  return parsedDate.toLocaleDateString('pt-BR');
};

export const formatUrlName = (name: string): string => {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

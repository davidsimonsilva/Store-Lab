

export interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
  erro?: boolean;
}

export interface AddressFromCep {
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
}

export type CepErrorType = 'INVALID_FORMAT' | 'NOT_FOUND' | 'NETWORK_ERROR' | 'TIMEOUT';

export interface CepLookupResult {
  success: boolean;
  data: AddressFromCep | null;
  errorType?: CepErrorType;
  errorMessage?: string;
}

export async function fetchAddressDetailsByCep(cep: string): Promise<CepLookupResult> {
  const cleanCep = (cep || '').replace(/\D/g, '');
  if (cleanCep.length !== 8) {
    return {
      success: false,
      data: null,
      errorType: 'INVALID_FORMAT',
      errorMessage: 'CEP inválido. Deve conter exatamente 8 dígitos numéricos.',
    };
  }

  const isRepeating = /^(.)\1+$/.test(cleanCep);
  if (isRepeating || cleanCep.startsWith('00') || cleanCep.startsWith('99') || cleanCep.endsWith('999')) {
    return {
      success: false,
      data: null,
      errorType: 'NOT_FOUND',
      errorMessage: 'CEP não encontrado na base dos Correios.',
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      return {
        success: false,
        data: null,
        errorType: 'NETWORK_ERROR',
        errorMessage: 'Serviço dos Correios temporariamente indisponível. Preencha o endereço manualmente.',
      };
    }

    const data: ViaCepResponse = await response.json();
    if (data.erro) {
      return {
        success: false,
        data: null,
        errorType: 'NOT_FOUND',
        errorMessage: 'CEP não encontrado nos Correios. Verifique o número digitado.',
      };
    }

    return {
      success: true,
      data: {
        cep: data.cep || cleanCep,
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || '',
      },
    };
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    const isAbort = (err as Error)?.name === 'AbortError';
    console.warn(`[cepService] Falha ao consultar ViaCEP para o CEP ${cleanCep}:`, err);
    return {
      success: false,
      data: null,
      errorType: isAbort ? 'TIMEOUT' : 'NETWORK_ERROR',
      errorMessage: isAbort
        ? 'A consulta de CEP excedeu o tempo limite. Verifique sua conexão ou preencha manualmente.'
        : 'Falha de conexão ao consultar o CEP. Você pode digitar o endereço manualmente.',
    };
  }
}

export async function fetchAddressByCep(cep: string): Promise<AddressFromCep | null> {
  const result = await fetchAddressDetailsByCep(cep);
  return result.data;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  days: number;
}

export function validateCepString(cep: string): { valid: boolean; error?: string; errorType?: CepErrorType; cleanCep: string } {
  const cleanCep = (cep || '').replace(/\D/g, '');
  if (!cep) {
    return { valid: false, error: 'Campo obrigatório', errorType: 'INVALID_FORMAT', cleanCep: '' };
  }
  if (cleanCep.length !== 8) {
    return { valid: false, error: 'CEP inválido. Deve conter exatamente 8 números.', errorType: 'INVALID_FORMAT', cleanCep };
  }
  const isRepeating = /^(.)\1+$/.test(cleanCep);
  const isInvalidOrNotFound = 
    cleanCep.startsWith('00') || 
    cleanCep.startsWith('99') || 
    cleanCep.endsWith('999') ||
    isRepeating;

  if (isInvalidOrNotFound) {
    return { valid: false, error: 'CEP não encontrado na base dos Correios. Verifique o número digitado.', errorType: 'NOT_FOUND', cleanCep };
  }

  return { valid: true, cleanCep };
}

export async function validateAndFetchCep(cep: string): Promise<{
  valid: boolean;
  error?: string;
  errorType?: CepErrorType;
  cleanCep: string;
  formattedCep: string;
  address?: AddressFromCep;
  options?: ShippingOption[];
}> {
  const basicVal = validateCepString(cep);
  if (!basicVal.valid) {
    return {
      valid: false,
      error: basicVal.error,
      errorType: basicVal.errorType,
      cleanCep: basicVal.cleanCep,
      formattedCep: '',
    };
  }

  const result = await fetchAddressDetailsByCep(basicVal.cleanCep);
  if (!result.success || !result.data) {
    return {
      valid: false,
      error: result.errorMessage || 'CEP não encontrado.',
      errorType: result.errorType || 'NOT_FOUND',
      cleanCep: basicVal.cleanCep,
      formattedCep: '',
    };
  }

  const formattedCep = `${basicVal.cleanCep.slice(0, 5)}-${basicVal.cleanCep.slice(5)}`;
  const options = calculateShippingOptions(basicVal.cleanCep);

  return {
    valid: true,
    cleanCep: basicVal.cleanCep,
    formattedCep,
    address: result.data,
    options,
  };
}

export function getDistanceInKmFromSaoPaulo(cleanCep: string): number {
  if (!cleanCep || cleanCep.length < 2) return 0;
  const prefix2 = parseInt(cleanCep.slice(0, 2), 10);
  const prefix3 = parseInt(cleanCep.slice(0, 3), 10);

  if (prefix2 <= 5) {
    return 0;
  }

  if (prefix2 <= 9) {
    return 25;
  }

  if (prefix2 === 11) {
    return 75;
  }

  if (prefix2 === 12) {
    return 130;
  }

  if (prefix2 === 13) {
    return 95;
  }

  if (prefix2 === 14) {
    return 315;
  }

  if (prefix2 === 15) {
    return 440;
  }

  if (prefix2 === 16) {
    return 520;
  }

  if (prefix2 === 17) {
    return 330;
  }

  if (prefix2 === 18) {
    return 100;
  }

  if (prefix2 === 19) {
    return 560;
  }

  if (prefix2 >= 20 && prefix2 <= 28) {
    return 435;
  }

  if (prefix2 === 29) {
    return 880;
  }

  if (prefix2 >= 30 && prefix2 <= 39) {
    return 585;
  }

  if (prefix2 >= 40 && prefix2 <= 48) {
    return 1450;
  }

  if (prefix2 === 49) {
    return 1730;
  }

  if (prefix2 >= 50 && prefix2 <= 56) {
    return 2130;
  }

  if (prefix2 === 57) {
    return 1930;
  }

  if (prefix2 === 58) {
    return 2210;
  }

  if (prefix2 === 59) {
    return 2320;
  }

  if (prefix2 >= 60 && prefix2 <= 63) {
    return 2370;
  }

  if (prefix2 === 64) {
    return 2090;
  }

  if (prefix2 === 65) {
    return 2350;
  }

  if (prefix2 >= 66 && prefix2 <= 68 && prefix3 <= 688) {
    return 2460;
  }

  if (prefix3 >= 689 && prefix3 <= 689) {
    return 2660;
  }

  if (prefix2 === 69 && prefix3 !== 693 && prefix3 !== 699) {
    return 2690;
  }

  if (prefix3 === 693) {
    return 4400;
  }

  if (prefix3 === 699) {
    return 4100;
  }

  if (prefix2 === 70 || prefix2 === 71 || (prefix2 === 72 && prefix3 <= 727)) {
    return 870;
  }

  if ((prefix2 === 72 && prefix3 >= 728) || (prefix2 >= 73 && prefix2 <= 76 && prefix3 <= 767)) {
    return 900;
  }

  if (prefix2 === 76 && prefix3 >= 768) {
    return 2470;
  }

  if (prefix2 === 77) {
    return 1490;
  }

  if (prefix2 === 78) {
    return 1330;
  }

  if (prefix2 === 79) {
    return 890;
  }

  if (prefix2 >= 80 && prefix2 <= 87) {
    return 410;
  }

  if (prefix2 >= 88 && prefix2 <= 89) {
    return 520;
  }

  if (prefix2 >= 90 && prefix2 <= 99) {
    return 855;
  }

  return 500;
}

export function calculateShippingOptions(cleanCep: string): ShippingOption[] {
  const distance = getDistanceInKmFromSaoPaulo(cleanCep);

  const standardCost = Number((8 + Math.log(distance + 1) * 1.48 + distance * 0.0082).toFixed(2));

  const expressCost = Number((standardCost * 1.45).toFixed(2));

  let standardDays = 3;
  let expressDays = 1;

  if (distance === 0) {

    standardDays = 2;
    expressDays = 1;
  } else if (distance <= 100) {

    standardDays = 3;
    expressDays = 1;
  } else if (distance <= 450) {

    standardDays = 4;
    expressDays = 2;
  } else if (distance <= 1000) {

    standardDays = 6;
    expressDays = 3;
  } else if (distance <= 2000) {

    standardDays = 8;
    expressDays = 4;
  } else {

    standardDays = 11;
    expressDays = 5;
  }

  return [
    {
      id: 'padrao',
      name: 'Envio Padrão',
      price: standardCost,
      days: standardDays,
    },
    {
      id: 'expresso',
      name: 'Envio Expresso',
      price: expressCost,
      days: expressDays,
    },
  ];
}


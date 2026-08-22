/**
 * Utilitários avançados de normalização e busca por equivalência para e-commerce.
 * Suporta:
 * - Remoção de acentuação e diacríticos (ex: "Eletrônicos" -> "eletronicos")
 * - Equivalência de símbolos (ex: "&" <-> "e")
 * - Equivalência singular/plural (ex: "eletronico" <-> "eletrônicos", "jaquetas" <-> "jaqueta")
 * - Tolerância a pequenos erros de digitação (fuzzy matching para palavras >= 4 caracteres)
 * - Busca multi-termo (todos os termos da busca devem corresponder)
 */

export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .toLowerCase()
    .replace(/&/g, ' e ') // equivalência de & por e
    .replace(/[^a-z0-9\s]/g, ' ') // substitui pontuações por espaço
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Remove sufixos comuns de plural em português para comparação de raiz.
 */
export function getStem(word: string): string {
  if (!word || word.length <= 3) return word;
  
  // Casos especiais comuns em português
  if (word.endsWith('oes')) return word.slice(0, -3) + 'ao';
  if (word.endsWith('aes')) return word.slice(0, -3) + 'ao';
  if (word.endsWith('ais') || word.endsWith('eis') || word.endsWith('ois') || word.endsWith('uis')) {
    return word.slice(0, -2); // moveis -> mov, etc.
  }
  if (word.endsWith('res') || word.endsWith('zes') || word.endsWith('nes')) {
    return word.slice(0, -2);
  }
  // Se termina em 's' e não é palavra invariável (ex: tenis, virus, lapis)
  if (word.endsWith('s') && !['tenis', 'virus', 'lapis', 'cais', 'status'].includes(word)) {
    return word.slice(0, -1);
  }
  return word;
}

/**
 * Calcula distância Levenshtein simples para tolerância a pequenos erros de digitação (typos).
 */
export function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substituição
          matrix[i][j - 1] + 1,     // inserção
          matrix[i - 1][j] + 1      // deleção
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Verifica se um token de busca corresponde a uma palavra alvo com equivalência e tolerância.
 */
export function tokenMatchesWord(queryToken: string, targetWord: string): boolean {
  if (!queryToken || !targetWord) return false;

  // Correspondência exata normalizada
  if (queryToken === targetWord) return true;

  // A palavra do produto começa com o termo de busca (ex: "smart" corresponde a "smartphone")
  if (targetWord.startsWith(queryToken)) return true;

  // Se o termo digitado tiver pelo menos 3 letras e estiver contido na palavra do produto
  if (queryToken.length >= 3 && targetWord.includes(queryToken)) return true;

  // Comparação por raiz (stemming singular / plural, ex: "eletronico" <-> "eletronicos")
  const queryStem = getStem(queryToken);
  const targetStem = getStem(targetWord);

  if (queryStem === targetStem) return true;
  if (queryStem.length >= 3 && targetStem.startsWith(queryStem)) return true;

  // Tolerância a pequenos erros de digitação (1 caractere para palavras com 4+ letras e tamanho similar)
  if (queryToken.length >= 4 && targetWord.length >= 4 && Math.abs(queryToken.length - targetWord.length) <= 2) {
    const distance = levenshteinDistance(queryToken, targetWord);
    if (distance <= 1) return true;
    
    // Também testa distância nas raízes
    if (levenshteinDistance(queryStem, targetStem) <= 1) return true;
  }

  return false;
}

/**
 * Mapeamento de sinônimos e termos equivalentes de cada categoria para garantir
 * que buscas por "escritório", "eletrônicos", "beleza", "moda", etc. encontrem todos os itens.
 */
export const CATEGORY_SYNONYMS: Record<string, string[]> = {
  'Eletrônicos / Mobile': [
    'eletronicos',
    'eletronico',
    'mobile',
    'celular',
    'smartphone',
    'tecnologia',
    'tech',
    'gadget',
    'gadgets'
  ],
  'Móveis / Office': [
    'moveis',
    'movel',
    'office',
    'escritorio',
    'escritorios',
    'workstation',
    'home office',
    'decoracao',
    'corporativo'
  ],
  'Vestuário / Moda Esportiva': [
    'vestuario',
    'moda',
    'esportiva',
    'esporte',
    'esportes',
    'roupa',
    'roupas',
    'fitness',
    'treino',
    'atletico'
  ],
  'Cuidados Pessoais / Beleza': [
    'cuidados',
    'pessoais',
    'cuidado',
    'pessoal',
    'beleza',
    'skincare',
    'cosmeticos',
    'estetica',
    'saude',
    'bem estar'
  ]
};

/**
 * Função principal para busca de produtos por equivalência.
 * Retorna true se todos os termos significativos da busca forem encontrados nos campos do produto.
 */
export function productMatchesSearch(
  product: { name: string; description?: string; category?: string },
  searchQuery: string
): boolean {
  if (!searchQuery || searchQuery.trim() === '') return true;

  const normalizedQuery = normalizeText(searchQuery);
  const rawTokens = normalizedQuery.split(' ').filter(t => t.length > 0);

  if (rawTokens.length === 0) return true;

  // Palavras de parada / preposições muito curtas em português que não devem barrar a busca se houver outros termos
  const stopWords = new Set(['e', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'com', 'para', 'por', 'o', 'a', 'os', 'as', 'um', 'uma']);
  const queryTokens = rawTokens.length > 1 ? rawTokens.filter(t => !stopWords.has(t) || rawTokens.length === 1) : rawTokens;

  const finalTokens = queryTokens.length > 0 ? queryTokens : rawTokens;

  // Adiciona sinônimos da categoria associada
  const categorySynonyms = product.category && CATEGORY_SYNONYMS[product.category]
    ? CATEGORY_SYNONYMS[product.category].join(' ')
    : '';

  // Texto completo pesquisável do produto
  const searchableText = `${product.name} ${product.category || ''} ${categorySynonyms} ${product.description || ''}`;
  const normalizedTarget = normalizeText(searchableText);
  
  // Se a frase inteira normalizada contiver a busca normalizada, match imediato
  if (normalizedTarget.includes(normalizedQuery)) {
    return true;
  }

  const targetWords = normalizedTarget.split(' ').filter(w => w.length > 0);

  // Cada termo digitado na busca precisa ser satisfeito por alguma palavra do produto
  return finalTokens.every(queryToken => {
    return targetWords.some(targetWord => tokenMatchesWord(queryToken, targetWord));
  });
}


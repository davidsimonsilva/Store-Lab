

export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') 
    .toLowerCase()
    .replace(/&/g, ' e ') 
    .replace(/[^a-z0-9\s]/g, ' ') 
    .replace(/\s+/g, ' ')
    .trim();
}

export function getStem(word: string): string {
  if (!word || word.length <= 3) return word;

  if (word.endsWith('oes')) return word.slice(0, -3) + 'ao';
  if (word.endsWith('aes')) return word.slice(0, -3) + 'ao';
  if (word.endsWith('ais') || word.endsWith('eis') || word.endsWith('ois') || word.endsWith('uis')) {
    return word.slice(0, -2); 
  }
  if (word.endsWith('res') || word.endsWith('zes') || word.endsWith('nes')) {
    return word.slice(0, -2);
  }

  if (word.endsWith('s') && !['tenis', 'virus', 'lapis', 'cais', 'status'].includes(word)) {
    return word.slice(0, -1);
  }
  return word;
}

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
          matrix[i - 1][j - 1] + 1, 
          matrix[i][j - 1] + 1,     
          matrix[i - 1][j] + 1      
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export function tokenMatchesWord(queryToken: string, targetWord: string): boolean {
  if (!queryToken || !targetWord) return false;

  if (queryToken === targetWord) return true;

  if (targetWord.startsWith(queryToken)) return true;

  if (queryToken.length >= 3 && targetWord.includes(queryToken)) return true;

  const queryStem = getStem(queryToken);
  const targetStem = getStem(targetWord);

  if (queryStem === targetStem) return true;
  if (queryStem.length >= 3 && targetStem.startsWith(queryStem)) return true;

  if (queryToken.length >= 4 && targetWord.length >= 4 && Math.abs(queryToken.length - targetWord.length) <= 2) {
    const distance = levenshteinDistance(queryToken, targetWord);
    if (distance <= 1) return true;

    if (levenshteinDistance(queryStem, targetStem) <= 1) return true;
  }

  return false;
}

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

export function productMatchesSearch(
  product: { name: string; description?: string; category?: string },
  searchQuery: string
): boolean {
  if (!searchQuery || searchQuery.trim() === '') return true;

  const normalizedQuery = normalizeText(searchQuery);
  const rawTokens = normalizedQuery.split(' ').filter(t => t.length > 0);

  if (rawTokens.length === 0) return true;

  const stopWords = new Set(['e', 'de', 'do', 'da', 'dos', 'das', 'em', 'no', 'na', 'nos', 'nas', 'com', 'para', 'por', 'o', 'a', 'os', 'as', 'um', 'uma']);
  const queryTokens = rawTokens.length > 1 ? rawTokens.filter(t => !stopWords.has(t) || rawTokens.length === 1) : rawTokens;

  const finalTokens = queryTokens.length > 0 ? queryTokens : rawTokens;

  const categorySynonyms = product.category && CATEGORY_SYNONYMS[product.category]
    ? CATEGORY_SYNONYMS[product.category].join(' ')
    : '';

  const searchableText = `${product.name} ${product.category || ''} ${categorySynonyms} ${product.description || ''}`;
  const normalizedTarget = normalizeText(searchableText);

  if (normalizedTarget.includes(normalizedQuery)) {
    return true;
  }

  const targetWords = normalizedTarget.split(' ').filter(w => w.length > 0);

  return finalTokens.every(queryToken => {
    return targetWords.some(targetWord => tokenMatchesWord(queryToken, targetWord));
  });
}


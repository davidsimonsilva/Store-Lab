import { Product, Review } from '../types';

const REVIEW_POOL: Record<string, string[]> = {
  "Eletrônicos / Mobile": [
    "Excelente produto, superou minhas expectativas. A bateria dura bastante.",
    "O desempenho é sensacional! Muito rápido e a tela tem cores incríveis.",
    "Boa relação custo-benefício. Recomendo.",
    "Design muito elegante e leve. A câmera é um diferencial positivo.",
    "Chegou muito rápido e muito bem embalado. Store-lab está de parabéns."
  ],
  "Móveis / Office": [
    "Extremamente ergonômica, ajudou muito nas minhas dores nas costas.",
    "Acabamento impecável. Muito fácil de montar e regular.",
    "O material parece ser muito durável. Design moderno e elegante.",
    "Ficou perfeita na minha estação de trabalho. Recomendo de olhos fechados.",
    "Muito robusta e confortável para passar o dia trabalhando."
  ],
  "Moda Esportiva": [
    "Material muito confortável e leve, ótimo para dias frios ou treinos intensos.",
    "A blusa de lã merino é super macia, mantém a temperatura de forma ideal.",
    "Caimento perfeito no corpo. Qualidade premium impecável.",
    "Perfeita para caminhadas e esportes de aventura. Muito respirável.",
    "Amei! Seca super rápido e é incrivelmente macia."
  ],
  "Cuidados & Beleza": [
    "Minha pele ficou com uma textura maravilhosa após poucas semanas de uso.",
    "Produto de altíssima qualidade, sinto minha pele muito mais hidratada.",
    "O cheiro é muito suave and agradável. Embalagem linda e prática.",
    "Uso todos os dias na minha rotina de skincare. Resultados visíveis rápidos.",
    "Excelente sérum, textura leve e absorve super rápido."
  ]
};

const NAMES = [
  "Mariana Silva", "Carlos Souza", "Ana Oliveira", "Bruno Santos", "Julia Lima",
  "Rodrigo Costa", "Beatriz Rocha", "Gabriel Almeida", "Amanda Ferreira", "Lucas Pereira"
];

export function generateReviewsForProduct(productId: string | number, category: string, baseRating: number): Review[] {
  const numericId = typeof productId === 'number' ? productId : productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const totalReviews = (numericId * 7 + 3) % 8 + 3;
  const reviews: Review[] = [];
  const pool = REVIEW_POOL[category] || REVIEW_POOL["Eletrônicos / Mobile"];

  for (let i = 0; i < totalReviews; i++) {
    const seed = numericId + i;
    const ratingSeed = (seed * 13) % 3;
    let rating = Math.round(baseRating);
    if (ratingSeed === 0 && rating > 3) rating -= 1;
    if (ratingSeed === 2 && rating < 5) rating += 1;

    const nameIdx = seed % NAMES.length;
    const commentIdx = seed % pool.length;
    const daysAgo = (seed * 3) % 30 + 1;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    const dateStr = date.toLocaleDateString('pt-BR');

    reviews.push({
      id: `${productId}-rev-${i}`,
      userName: NAMES[nameIdx],
      rating,
      date: dateStr,
      comment: pool[commentIdx],
      verified: seed % 2 === 0,
    });
  }

  return reviews.sort((a, b) => b.rating - a.rating);
}

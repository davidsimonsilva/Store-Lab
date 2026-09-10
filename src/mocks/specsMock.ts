import { Product } from '../types';

export const getBasicDescription = (prod: Product): string => {
  const categoryLower = prod.category.toLowerCase();

  if (categoryLower.includes('móveis') || categoryLower.includes('office') || prod.name.toLowerCase().includes('mesa') || prod.name.toLowerCase().includes('cadeira')) {
    return `Uma peça com design assinado, perfeita para quem busca conforto absoluto, elegância e ergonomia superior no dia a dia. Desenvolvido meticulosamente para integrar-se ao seu ambiente com equilíbrio estético impecável e aproveitamento fluido do espaço.

Combinando durabilidade extrema e sofisticação em cada detalhe, sua estrutura de sustentação robusta garante estabilidade rigorosa, tornando este item o verdadeiro destaque decorativo e funcional de sua residência ou escritório.`;
  }
  if (categoryLower.includes('eletrônicos') || categoryLower.includes('mobile')) {
    return `Desenvolvido com tecnologia de ponta de última geração, este dispositivo entrega um desempenho incomparável, velocidade surpreendente e uma fluidez fora de série para a sua rotina diária. Sua arquitetura de alta performance possibilita executar múltiplos processos simultâneos sem qualquer lentidão ou travamento.

Uma síntese magnífica de design moderno, display brilhante de altíssima fidelidade e acabamento premium refinado para elevar sua experiência e produtividade ao mais alto nível.`;
  }
  if (categoryLower.includes('cuidados') || categoryLower.includes('beleza')) {
    return `Um verdadeiro divisor de águas para a sua rotina diária de autocuidado. Este produto de qualidade premium foi formulado com ingredientes nobres cuidadosamente selecionados para promover hidratação intensa, revitalização e uma luminosidade radiante na pele.

Com textura inovadora extremamente leve e um toque seco aveludado de altíssima absorção, ele nutre as camadas da derme delicadamente, revelando um visual de vitalidade e bem-estar saudável.`;
  }
  return `Desenvolvido para superar todas as suas expectativas, este produto combina versatilidade inteligente, durabilidade impecável e alto rendimento em cada detalhe. Com acabamentos minuciosos e design vanguardista, oferece excelente usabilidade para o seu cotidiano.

Uma escolha de prestígio e segura para clientes que exigem o melhor em elegância, qualidade construtiva e custo-benefício.`;
};

export const getTechnicalSpecifications = (prod: Product) => {
  const categoryLower = prod.category.toLowerCase();

  if (categoryLower.includes('móveis') || categoryLower.includes('office') || prod.name.toLowerCase().includes('mesa') || prod.name.toLowerCase().includes('cadeira')) {
    return [
      { label: 'Dimensões (Metros)', value: '1,62m x 0,90m x 0,76m (C x L x A)' },
      { label: 'Largura', value: '90 cm (Perfeito para acomodação)' },
      { label: 'Peso Líquido', value: '25,4 kg (Super robusto)' },
      { label: 'Material Principal', value: 'Carvalho maciço certificado FSC com acabamento polido satinado' },
      { label: 'Capacidade de Carga', value: 'Até 120 kg de forma distribuída estruturalmente' },
      { label: 'Garantia de Fábrica', value: '24 meses' },
      { label: 'Atendimento ISO', value: 'Certificado ISO 14001 de Meio Ambiente' }
    ];
  }
  if (categoryLower.includes('eletrônicos') || categoryLower.includes('mobile')) {
    return [
      { label: 'Dimensões Físicas', value: '162,5mm x 76,7mm x 8,1mm' },
      { label: 'Largura de Display', value: '7.6 cm de manuseio ergonômico unilateral' },
      { label: 'Peso Líquido', value: '189g (Liga de titânio aeroespacial e vidro protetor)' },
      { label: 'Processamento de Borda', value: 'Octa-core 3.4GHz com IA embutida na matriz' },
      { label: 'Bateria e Autonomia', value: '5000 mAh com Super-Carga de 65W (100% em 38min)' },
      { label: 'Garantia de Fábrica', value: '12 meses contra defeitos técnicos de fabricação' },
      { label: 'Resistência a Líquidos', value: 'Certificado IP68 à prova de água e poeira total' }
    ];
  }
  if (categoryLower.includes('cuidados') || categoryLower.includes('beleza')) {
    return [
      { label: 'Volume Líquido', value: '150 ml (Rendimento prolongado de até 90 aplicações)' },
      { label: 'Dimensões da Embalagem', value: '14,0cm de Altura x 4,5cm de Largura' },
      { label: 'Peso com Embalagem', value: '185g' },
      { label: 'Princípio Ativo', value: 'Ácido Hialurônico de múltiplos pesos moleculares + Niacinamida 5%' },
      { label: 'pH de Controle', value: '5.5 (Altamente fisiológico e neutro para pele sensível)' },
      { label: 'Lote e Certificação', value: 'Lote Regulado por Anvisa Grau II de Eficácia Estrita' },
      { label: 'Cruelty-Free / Vegano', value: 'Sim, fórmula 100% vegana não testada em animais' }
    ];
  }
  return [
    { label: 'Dimensões Técnicas', value: 'Padrão compacto ergonômico de alta integração' },
    { label: 'Largura Nominal', value: 'Consistente com especificações premium da categoria' },
    { label: 'Peso Embalado', value: '450g aproximadamente' },
    { label: 'Material Base', value: 'Compósitos nobres com liga de aço inoxidável ou têxteis premium' },
    { label: 'Garantia do Fornecedor', value: '12 meses contra quaisquer vícios de performance' },
    { label: 'Procedência', value: 'Importado com desembaraço alfandegário e selo de qualidade' }
  ];
};

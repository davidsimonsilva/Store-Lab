import { Product } from '../types';

const RAW_PRODUCTS: any[] = [
  {
    id: 0,
    name: "Nexus Prime Smartphone",
    category: "Eletrônicos / Mobile",
    price: 5999.90,
    description: "Experiência mobile definitiva com tela LTPO de 120Hz, câmera de 200MP e bateria de longa duração para o dia todo.",
    image: "/images/products/nexus_prime_smartphone.png",
    rating: 4.9,
    featured: true
  },
  {
    id: 1,
    name: "Minimalist Workstation 2.0",
    category: "Móveis / Office",
    price: 2499.90,
    description: "Mesa ergonômica em carvalho maciço com sistema de gestão de cabos invisível e acabamento premium acetinado.",
    image: "/images/products/minimalist_workstation.png",
    rating: 4.8,
    featured: true
  },
  {
    id: 2,
    name: "Performance Athleisure Set",
    category: "Vestuário / Moda Esportiva",
    price: 459.90,
    description: "Tecido tecnológico respirável com compressão inteligente que melhora a circulação e o desempenho nos treinos.",
    image: "/images/products/performance_athleisure.png",
    rating: 4.7,
    featured: false
  },
  {
    id: 3,
    name: "Laboratory Formula Skincare Kit",
    category: "Cuidados Pessoais / Beleza",
    price: 289.90,
    description: "Fórmula laboratorial com ácido hialurônico e niacinamida para hidratação profunda e renovação celular diária.",
    image: "/images/products/skincare_kit.png",
    rating: 4.9,
    featured: true
  },
  {
    id: 4,
    name: "Fone Acoustic Pro Noise-Cancelling",
    category: "Eletrônicos / Mobile",
    price: 1899.00,
    description: "Cancelamento de ruído ativo híbrido avançado, drivers de 40mm premium e conforto acústico inigualável por mais de 40 horas.",
    image: "/images/products/acoustic_headphones.png",
    rating: 4.8,
    featured: true
  },
  {
    id: 5,
    name: "Smartwatch Aura Active HR",
    category: "Eletrônicos / Mobile",
    price: 1290.00,
    description: "Monitoramento de saúde inteligente 24 horas por dia, GPS de alta precisão e tela AMOLED sempre ativa sob vidro de safira.",
    image: "/images/products/aura_smartwatch.png",
    rating: 4.6,
    featured: false
  },
  {
    id: 6,
    name: "Mochila Nomad Roll-Top resistente à água",
    category: "Móveis / Office",
    price: 389.00,
    description: "Feita com náilon balístico reciclado, compartimento acolchoado para laptop de 16 polegadas e fecho magnético de confiança.",
    image: "/images/products/nomad_backpack.png",
    rating: 4.5,
    featured: false
  },
  {
    id: 7,
    name: "Cadeira Ergonômica Lab-Grid",
    category: "Móveis / Office",
    price: 1799.90,
    description: "Design biomecanicamente correto com suporte lombar auto-ajustável e tela mesh respirável cinza-platina de alta resistência.",
    image: "/images/products/ergonomic_chair.png",
    rating: 4.9,
    featured: true
  },
  {
    id: 8,
    name: "Luminária de Mesa Arc Minimal",
    category: "Móveis / Office",
    price: 249.00,
    description: "Feixe de luz LED difusa ajustável por toque com controle de temperatura de cor e carregador sem fio embutido na base.",
    image: "/images/products/desk_lamp.png",
    rating: 4.7,
    featured: false
  },
  {
    id: 9,
    name: "Garrafa Térmica Lab-Flask Inox",
    category: "Cuidados Pessoais / Beleza",
    price: 189.90,
    description: "Isolamento a vácuo de parede dupla de aço inoxidável que mantém bebidas geladas por 24h ou quentes por 12h.",
    image: "/images/products/thermal_flask.png",
    rating: 4.8,
    featured: false
  },
  {
    id: 10,
    name: "Tênis AeroPulse Carbon Pro",
    category: "Vestuário / Moda Esportiva",
    price: 899.90,
    description: "Tênis de alta performance com placa de fibra de carbono embutida e entressola reativa amortecedora para corrida.",
    image: "/images/products/running_shoes.png",
    rating: 4.9,
    featured: false
  },
  {
    id: 11,
    name: "Blusa Térmica de Lã Merino Macia",
    category: "Vestuário / Moda Esportiva",
    price: 349.90,
    description: "Lã merino ultra fina natural e respirável para proteção extrema contra o frio com o mínimo de peso e volume.",
    image: "/images/products/merino_sweater.png",
    rating: 4.7,
    featured: false
  },
  {
    id: 12,
    name: "Base de Carregamento Rápido OmniPad",
    category: "Eletrônicos / Mobile",
    price: 299.90,
    description: "Carregamento por indução multi-dispositivo de 15W com acabamento em couro ecológico e liga de alumínio escovado.",
    image: "/images/products/wireless_charger.png",
    rating: 4.4,
    featured: false
  },
  {
    id: 13,
    name: "Sérum Facial Bio-Ativo Vitamina C",
    category: "Cuidados Pessoais / Beleza",
    price: 159.00,
    description: "Vitamina C pura estabilizada a 15% com ácido ferúlico e vitamina E para clarear manchas e uniformizar a textura da pele.",
    image: "/images/products/face_serum.png",
    rating: 4.8,
    featured: false
  },
  {
    id: 14,
    name: "Vela Aromática Zen Lab Lavanda",
    category: "Cuidados Pessoais / Beleza",
    price: 79.90,
    description: "Cera de soja 100% natural com óleo essencial premium em pote de vidro âmbar reciclado para meditação.",
    image: "/images/products/scented_candle.png",
    rating: 4.6,
    featured: false
  },
  {
    id: 15,
    name: "Teclado Mecânico Tactile Lab",
    category: "Eletrônicos / Mobile",
    price: 649.90,
    description: "Layout compacto 75%, switches táteis pré-lubrificados de fábrica e teclas de perfil PBT premium com iluminação branca fria.",
    image: "/images/products/mech_keyboard.png",
    rating: 4.9,
    featured: false
  },
  {
    id: 16,
    name: "Suporte Articulado de Alumínio",
    category: "Móveis / Office",
    price: 450.00,
    description: "Suporte versátil a pistão a gás para monitores de até 32 polegadas com rotação completa e fácil passagem de cabos.",
    image: "/images/products/monitor_arm.png",
    rating: 4.5,
    featured: false
  },
  {
    id: 17,
    name: "Mesa Lateral Tapered Ash",
    category: "Móveis / Office",
    price: 699.00,
    description: "Mesa lateral minimalista em freixo sólido com pernas afuniladas elegantes inspiradas no design escandinavo.",
    image: "/images/products/coffee_table.png",
    rating: 4.6,
    featured: false
  },
  {
    id: 18,
    name: "Shorts de Treino Pro-Breathe",
    category: "Vestuário / Moda Esportiva",
    price: 129.90,
    description: "Modelagem anatômica com cós ultra elástico e bolsos laterais invisíveis ideais para treinos de alta mobilidade.",
    image: "/images/products/training_shorts.png",
    rating: 4.5,
    featured: false
  },
  {
    id: 19,
    name: "Stojo Lab Nécessaire Compacta",
    category: "Cuidados Pessoais / Beleza",
    price: 119.00,
    description: "Nécessaire em lona impermeável encerada com divisórias internas elásticas organizadoras e design minimalista em azul marinho.",
    image: "/images/products/grooming_kit.png",
    rating: 4.7,
    featured: false
  }
];

/**
 * MAP DE PRODUTOS SIMULADOS (MOCK_PRODUCTS)
 * Adiciona uma propriedade 'productID' duplicada apontando para o ID molecular alfa-numérico
 * de 10 caracteres para garantir total compatibilidade e redundância com chamadas.
 */
export const PRODUCT_ID_MAP: Record<number, string> = {
  0: "nxp7s9h1p2",
  1: "mnw2o8s3t4",
  2: "pfa3t5l1s6",
  3: "lfs4k2s7t8",
  4: "acp5h3n1c9",
  5: "swa6a9h2r3",
  6: "nmb7b3r4w1",
  7: "lbc8g4c1h2",
  8: "lam9d5l2p3",
  9: "gbf1i6n3x4",
  10: "tap2s4c1p5",
  11: "bts3s5m2l1",
  12: "bco4p6v7m8",
  13: "sfb5a3v1c2",
  14: "vaz6l8v1a2",
  15: "tml7k4b1t2",
  16: "sua8a9m2l1",
  17: "mta9a5p2h3",
  18: "stb0b3e5r1",
  19: "snc1k4o7l2"
};

export const MOCK_PRODUCTS: Product[] = RAW_PRODUCTS.map(p => {
  const codeId = PRODUCT_ID_MAP[p.id] || `prd${p.id}ab12cd`.substring(0, 10);
  return {
    ...p,
    id: codeId,
    productID: codeId
  };
});

/**
 * SELEÇÃO DETERMINÍSTICA DE IMAGEM DE FALLBACK (getProductFallbackImage)
 * Seleciona imagens reais de alta resolução no Unsplash de forma determinística
 * baseada no ID do produto. Garante que cada produto receba sempre a mesma imagem correspondente
 * ao seu nicho sem carregar duplicatas ou requisições desordenadas.
 */
export function getProductFallbackImage(id: string | number, category: string): string {
  const idStr = String(id).toLowerCase();
  if (idStr.includes('swa') || idStr === '5' || id === 5) {
    return "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop"; // Smartwatch Aura Active HR
  }
  if (idStr.includes('merino') || idStr === '11' || id === 11 || idStr === 'bts3s5m2l1') {
    return "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop"; // Blusa Térmica de Lã Merino Macia
  }

  const images: Record<string, string[]> = {
    "Eletrônicos / Mobile": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop", // smartphone
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop", // headphones
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop", // smartwatch
      "https://images.unsplash.com/photo-1622445262465-2481c4574875?q=80&w=600&auto=format&fit=crop", // charger pad
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop"  // keyboard
    ],
    "Móveis / Office": [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop", // desk / workspace
      "https://images.unsplash.com/photo-1551298370-9d3d53740c72?q=80&w=600&auto=format&fit=crop", // backpack
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600&auto=format&fit=crop", // office chair
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop", // desk lamp
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600&auto=format&fit=crop", // monitor stand
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop"  // side table
    ],
    "Vestuário / Moda Esportiva": [
      "https://images.unsplash.com/photo-1483721310020-03333e577076?q=80&w=600&auto=format&fit=crop", // athletic clothing
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop", // running shoes
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop", // merino pullover
      "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=600&auto=format&fit=crop"  // shorts
    ],
    "Cuidados Pessoais / Beleza": [
      "https://images.unsplash.com/photo-1608248597481-496100c80836?q=80&w=600&auto=format&fit=crop", // skincare kit
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop", // water flask
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", // face serum
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop", // scented candle
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop"  // grooming bag
    ]
  };

  const pool = images[category] || images["Eletrônicos / Mobile"];
  let numericId = 0;
  if (typeof id === 'number') {
    numericId = id;
  } else {
    for (let i = 0; i < id.length; i++) {
      numericId += id.charCodeAt(i);
    }
  }
  const index = numericId % pool.length;
  return pool[index];
}

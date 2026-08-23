import { Product } from '../types';
import shortsYogaManequimImg from '../assets/images/shorts_yoga_manequim.jpg';

interface RawProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  featured?: boolean;
}

const RAW_PRODUCTS: RawProduct[] = [
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
    description: "Mesa ergonômica de escritório em carvalho maciço com sistema de gestão de cabos invisível e acabamento premium acetinado para home office.",
    image: "/images/products/minimalist_workstation.png",
    rating: 4.8,
    featured: true
  },
  {
    id: 2,
    name: "Jaqueta Corta-Vento Lab-Run Pro",
    category: "Vestuário / Moda Esportiva",
    price: 389.90,
    description: "Jaqueta esportiva técnica corta-vento ultraleve com acabamento repelente à água, ventilação respirável nas axilas e detalhes refletivos para treinos e corridas.",
    image: "/images/products/performance_athleisure.png",
    rating: 4.8,
    featured: false
  },
  {
    id: 3,
    name: "Kit Facial Botânico com Sérum & Gua Sha",
    category: "Cuidados Pessoais / Beleza",
    price: 249.90,
    description: "Conjunto botânico para rotina diária de skincare, incluindo sérum facial regenerador com óleos essenciais puros e aplicador massageador em pedra jade gua sha natural.",
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
    name: "Caderno Executivo & Planner em Couro",
    category: "Móveis / Office",
    price: 119.90,
    description: "Caderno e planner com capa rígida em couro nobre, 192 páginas pautadas em papel pólen 90g e acabamento refinado para reuniões e anotações de escritório.",
    image: "/images/products/desk_organizer.png",
    rating: 4.8,
    featured: false
  },
  {
    id: 7,
    name: "Cadeira Ergonômica Lab-Grid",
    category: "Móveis / Office",
    price: 1799.90,
    description: "Cadeira ergonômica biomecânica de escritório com suporte lombar auto-ajustável e tela mesh respirável cinza-platina de alta resistência para home office.",
    image: "/images/products/ergonomic_chair.png",
    rating: 4.9,
    featured: true
  },
  {
    id: 8,
    name: "Luminária de Mesa Arc Minimal",
    category: "Móveis / Office",
    price: 249.00,
    description: "Luminária de mesa para escritório com feixe de luz LED difusa ajustável por toque, controle de temperatura de cor e carregador sem fio embutido na base.",
    image: "/images/products/desk_lamp.png",
    rating: 4.7,
    featured: false
  },
  {
    id: 9,
    name: "Garrafa Térmica em Aço Inox com Isolamento a Vácuo",
    category: "Cuidados Pessoais / Beleza",
    price: 189.90,
    description: "Garrafa térmica com isolamento a vácuo de parede dupla em aço inoxidável 18/8, mantendo bebidas geladas por até 24h ou quentes por 12h, com acabamento fosco elegante e tampa antivazamento.",
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
    name: "Kit Duo Mouse Lab (Sem Fio & USB)",
    category: "Eletrônicos / Mobile",
    price: 269.90,
    description: "Kit com 2 mouses de alta precisão: 1 modelo ergonômico sem fio Bluetooth / 2.4GHz e 1 modelo gamer com fio USB ultra leve.",
    image: "/images/products/wireless_charger.png",
    rating: 4.8,
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
    name: "Vela Aromática de Cera Vegetal & Lavanda Francesa",
    category: "Cuidados Pessoais / Beleza",
    price: 79.90,
    description: "Vela perfumada 100% em cera de soja vegetal com óleos essenciais puros de lavanda francesa e notas sutis de bergamota em pote de vidro âmbar.",
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
    name: "Armário Balcão em Madeira Maciça",
    category: "Móveis / Office",
    price: 899.00,
    description: "Armário organizador de escritório com estrutura sólida em madeira de acabamento natural, portas com fechamento suave e amplo espaço interno para documentos e acessórios.",
    image: "/images/products/office_drawer.png",
    rating: 4.8,
    featured: false
  },
  {
    id: 17,
    name: "Kit Social de Cadeiras de Descanso de Escritório",
    category: "Móveis / Office",
    price: 1489.00,
    description: "Conjunto elegante de cadeiras e poltronas de descanso para lounge corporativo e sala de convivência, com estofamento confortável e design arquitetônico moderno.",
    image: "/images/products/coffee_table.png",
    rating: 4.9,
    featured: false
  },
  {
    id: 18,
    name: "Shorts de Treino Pro-Breathe",
    category: "Vestuário / Moda Esportiva",
    price: 129.90,
    description: "Modelagem anatômica com cós ultra elástico e bolsos laterais invisíveis ideais para treinos de alta mobilidade.",
    image: shortsYogaManequimImg,
    rating: 4.5,
    featured: false
  },
  {
    id: 19,
    name: "Nécessaire Organizadora de Viagem",
    category: "Cuidados Pessoais / Beleza",
    price: 119.00,
    description: "Nécessaire sofisticada em lona encerada impermeável com divisórias internas elásticas, acabamento refinado e formato compacto para viagens e dia a dia.",
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
 * Mapeia de forma explícita e determinística cada produto ao seu asset correto no Unsplash
 * de alta resolução, evitando trocas acidentais de imagens entre categorias e produtos.
 */
const EXACT_PRODUCT_IMAGES: Record<string, string> = {
  // 1. Eletrônicos (5 itens)
  "0": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop", // Nexus Prime Smartphone
  "nxp7s9h1p2": "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
  "4": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop", // Fone Acoustic Pro Noise-Cancelling
  "acp5h3n1c9": "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop",
  "5": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop", // Smartwatch Aura Active HR
  "swa6a9h2r3": "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
  "12": "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?q=80&w=600&auto=format&fit=crop", // Kit Duo Mouse Lab (Sem Fio & USB)
  "bco4p6v7m8": "https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?q=80&w=600&auto=format&fit=crop",
  "15": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop", // Teclado Mecânico Tactile Lab
  "tml7k4b1t2": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",

  // 2. Móveis / Office (6 itens)
  "1": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&auto=format&fit=crop", // Minimalist Workstation 2.0 (Mesa de Escritório)
  "mnw2o8s3t4": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&auto=format&fit=crop",
  "6": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop", // Caderno Executivo & Planner em Couro
  "nmb7b3r4w1": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
  "7": "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600&auto=format&fit=crop", // Cadeira Ergonômica Lab-Grid
  "lbc8g4c1h2": "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600&auto=format&fit=crop",
  "8": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop", // Luminária de Mesa Arc Minimal
  "lam9d5l2p3": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop",
  "16": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop", // Armário Balcão em Madeira Maciça
  "sua8a9m2l1": "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop",
  "17": "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80&w=600&auto=format&fit=crop", // Kit Social de Cadeiras de Descanso de Escritório (rRiAzFkJPMo)
  "mta9a5p2h3": "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?q=80&w=600&auto=format&fit=crop",

  // 3. Vestuário / Moda Esportiva (4 itens)
  "2": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop", // Jaqueta Corta-Vento Lab-Run Pro
  "pfa3t5l1s6": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=600&auto=format&fit=crop",
  "10": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop", // Tênis AeroPulse Carbon Pro
  "tap2s4c1p5": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
  "11": "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop", // Blusa Térmica de Lã Merino Macia
  "bts3s5m2l1": "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600&auto=format&fit=crop",
  "18": shortsYogaManequimImg, // Shorts de Treino Pro-Breathe (austin-GnPrd06qrQU-unsplash)
  "stb0b3e5r1": shortsYogaManequimImg,

  // 4. Cuidados Pessoais / Beleza (5 itens)
  "3": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop", // Kit Facial Botânico com Sérum & Gua Sha
  "lfs4k2s7t8": "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
  "9": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop", // Garrafa Térmica em Aço Inox com Isolamento a Vácuo
  "gbf1i6n3x4": "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=600&auto=format&fit=crop",
  "13": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop", // Sérum Facial Bio-Ativo Vitamina C
  "sfb5a3v1c2": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop",
  "14": "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop", // Vela Aromática de Cera Vegetal & Lavanda Francesa
  "vaz6l8v1a2": "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=600&auto=format&fit=crop",
  "19": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop", // Nécessaire Organizadora de Viagem
  "snc1k4o7l2": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop"
};

export function getProductFallbackImage(id: string | number, category: string): string {
  const idStr = String(id).toLowerCase();
  
  if (EXACT_PRODUCT_IMAGES[idStr]) {
    return EXACT_PRODUCT_IMAGES[idStr];
  }

  const images: Record<string, string[]> = {
    "Eletrônicos / Mobile": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop", // smartphone
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=600&auto=format&fit=crop", // headphones
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop", // smartwatch
      "https://images.unsplash.com/photo-1622445262464-84b14e47de1e?q=80&w=600&auto=format&fit=crop", // charger pad
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

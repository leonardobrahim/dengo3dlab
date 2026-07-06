export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'Pronta Entrega' | 'Sob Encomenda';
  description: string;
  basePrintTimeDays: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Suporte de Headset Articulado - Caveira Low Poly',
    category: 'Geek',
    price: 149.90,
    status: 'Sob Encomenda',
    description: 'Suporte para headset com design exclusivo em formato de caveira low poly. Ideal para setups gamers e escritórios modernos. Fabricado em PLA biodegradável.',
    basePrintTimeDays: 3,
  },
  {
    id: '2',
    name: 'Vaso Geométrico Minimalista',
    category: 'Decoração',
    price: 79.90,
    status: 'Pronta Entrega',
    description: 'Vaso decorativo com linhas geométricas precisas. Perfeito para suculentas e plantas artificiais. Resistente à água.',
    basePrintTimeDays: 1,
  },
  {
    id: '3',
    name: 'Suporte Articulado para Notebook',
    category: 'Utilidades',
    price: 119.90,
    status: 'Sob Encomenda',
    description: 'Eleva seu notebook para uma postura ergonômica. Peças móveis impressas com alta precisão e resistência (PETG).',
    basePrintTimeDays: 2,
  },
  {
    id: '4',
    name: 'Engrenagem Planetária (Demonstração)',
    category: 'Peças Técnicas',
    price: 89.90,
    status: 'Pronta Entrega',
    description: 'Conjunto de engrenagens montadas que giram em perfeita sincronia. Ótimo item educacional ou de alívio de estresse.',
    basePrintTimeDays: 1,
  },
  {
    id: '5',
    name: 'Luminária Lua Cheia Texturizada',
    category: 'Decoração',
    price: 199.90,
    status: 'Sob Encomenda',
    description: 'Luminária com textura topográfica real da lua. Necessita de base com LED (não inclusa). Tempo de impressão elevado devido aos detalhes.',
    basePrintTimeDays: 5,
  },
  {
    id: '6',
    name: 'Organizador de Cabos de Mesa',
    category: 'Utilidades',
    price: 34.90,
    status: 'Pronta Entrega',
    description: 'Mantenha seus cabos organizados na borda da mesa. Design em formato de colmeia.',
    basePrintTimeDays: 1,
  }
];

import { Product } from '@/src/types';
import { mockCategories } from './categories';

export const mockProducts: Product[] = [
  {
    id: 'prod-kit-pombinha',
    name: 'Kit Pombinha Divino Espírito Santo / Resplendor Lembrancinha Aplique Artesanato Cristão',
    slug: 'kit-pombinha-divino-espirito-santo',
    shortDescription: 'Kit decorativo com Pombinha do Divino Espírito Santo, perfeito para abençoar e decorar ambientes.',
    description: 'Belo item decorativo que representa a paz, o amor e a espiritualidade do Divino Espírito Santo. Feito com tecnologia de impressão 3D em material sustentável, esta peça transmite serenidade e é ideal para compor decorações religiosas, cantinhos de oração, ou mesmo como uma lembrança muito especial para batizados, primeiras comunhões e casamentos.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[0]], // Artigos Religiosos e de Fengshui
    basePrice: 35.90,
    featuredImage: '/products/kit-pombinha/01.jpg',
    images: [
      '/products/kit-pombinha/01.jpg',
      '/products/kit-pombinha/02.jpg',
      '/products/kit-pombinha/03.jpg',
    ],
    rating: 5.0,
    reviewCount: null as any,
    soldCount: 58,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockTotal: null, // TEMPORARY DEVELOPMENT STOCK
    tags: ['religioso', 'espírito santo', 'pombinha', 'decoração religiosa', 'fé', 'decoração', 'impressão 3d'],
    origin: 'Pernambuco',
    variants: [
      {
        id: 'var-kit-pombinha-1',
        sku: 'KIT-POMBINHA',
        name: 'Padrão',
        price: 35.90,
        stockQuantity: null
      }
    ],
    technicalSpecs: {
      material: 'PLA',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-botao-foda-se',
    name: 'Botão Do Foda-se - Fidget Toy Com Switch Mecânico / Botão Fidget Toy Antiestresse',
    slug: 'botao-do-foda-se-fidget-toy',
    shortDescription: 'Fidget toy divertido e antiestresse com um autêntico switch mecânico.',
    description: 'Perfeito para aliviar a tensão do dia a dia ou simplesmente para dar boas risadas! Este fidget toy simula a sensação tátil e sonora de um teclado mecânico, com frases irreverentes para aqueles momentos em que a paciência já acabou. Escolha a sua frase favorita e aperte sempre que precisar de uma pausa relaxante ou cômica no trabalho ou nos estudos.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[5]], // Brinquedos e Jogos
    basePrice: 29.90,
    featuredImage: '/products/botao-foda-se/01.jpg',
    images: [
      '/products/botao-foda-se/01.jpg',
      '/products/botao-foda-se/02.jpg',
      '/products/botao-foda-se/03.jpg',
    ],
    rating: 5.0,
    reviewCount: null as any,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockTotal: null, // TEMPORARY DEVELOPMENT STOCK
    tags: ['fidget', 'fidget toy', 'antiestresse', 'switch mecânico', 'brinquedo', 'diversão', 'impressão 3d'],
    origin: 'Pernambuco',
    variants: [
      {
        id: 'var-btn-fodase',
        sku: 'BTN-FODASE',
        name: 'FODA-SE',
        type: 'phrase',
        value: 'FODA-SE',
        price: 29.90,
        stockQuantity: null
      },
      {
        id: 'var-btn-calma',
        sku: 'BTN-CALMA',
        name: 'CALMA CARALHO',
        type: 'phrase',
        value: 'CALMA CARALHO',
        price: 29.90,
        stockQuantity: null
      },
      {
        id: 'var-btn-naofode',
        sku: 'BTN-NAOFODE',
        name: 'NÃO FODE',
        type: 'phrase',
        value: 'NÃO FODE',
        price: 29.90,
        stockQuantity: null
      },
      {
        id: 'var-btn-gritado',
        sku: 'BTN-GRITADO',
        name: 'GRITADO PORRA',
        type: 'phrase',
        value: 'GRITADO PORRA',
        price: 29.90,
        stockQuantity: null
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-porta-gloss',
    name: 'Porta Gloss Chaveiro Miniatura Hello Kitty',
    slug: 'porta-gloss-chaveiro-hello-kitty',
    shortDescription: 'Chaveiro charmoso e funcional em miniatura da Hello Kitty, ideal para organizar batons e gloss.',
    description: 'Leve seu gloss, batom ou protetor labial favorito sempre com você, sem perder o estilo! Este prático porta-gloss funciona como um chaveiro fofíssimo modelado em 3D. Um acessório indispensável para manter sua bolsa organizada e seus cosméticos de uso diário sempre ao alcance das mãos.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[7]], // Utensílios de Beleza
    basePrice: 22.90,
    featuredImage: '/products/porta-gloss/01.jpg',
    images: [
      '/products/porta-gloss/01.jpg',
      '/products/porta-gloss/02.jpg',
      '/products/porta-gloss/03.jpg',
    ],
    rating: null as any,
    reviewCount: null as any,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockTotal: null,
    tags: ['porta gloss', 'porta batom', 'chaveiro', 'beleza', 'hello kitty', 'organizador', 'acessório'],
    variants: [
      {
        id: 'var-pgloss-lilas',
        sku: 'PGLOSS-LILAS',
        name: 'Lilás',
        colorName: 'Lilás',
        price: 22.90,
        stockQuantity: null
      },
      {
        id: 'var-pgloss-rosabebe',
        sku: 'PGLOSS-ROSABEBE',
        name: 'Rosa Bebê',
        colorName: 'Rosa Bebê',
        price: 22.90,
        stockQuantity: null
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-suporte-ferramentas',
    name: 'Suporte para Ferramentas - Organizador de Bancada',
    slug: 'suporte-ferramentas-organizador-bancada',
    shortDescription: 'Mantenha sua bancada de artesanato, costura ou ferramentas organizada com este suporte compacto e inteligente.',
    description: 'A organização é a chave da produtividade! Este suporte para ferramentas foi projetado para abrigar pequenos utensílios como pinças, alicates de corte, estiletes, tesouras e muito mais. Ideal para espaços de artesanato, costura e oficinas criativas, ele mantém o essencial organizado, visível e pronto para uso.\n\nAtenção: As ferramentas presentes nas imagens são puramente ilustrativas e não acompanham o produto.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[1]], // Equipamento Escolar e de Escritório
    basePrice: 64.90,
    featuredImage: '/products/suporte-ferramentas/01.jpg',
    images: [
      '/products/suporte-ferramentas/01.jpg',
      '/products/suporte-ferramentas/02.jpg',
      '/products/suporte-ferramentas/03.jpg',
    ],
    rating: null as any,
    reviewCount: null as any,
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockTotal: null,
    tags: ['ferramentas', 'organizador', 'bancada', 'artesanato', 'costura', 'oficina', 'impressão 3d'],
    variants: [
      {
        id: 'var-sferramenta-rosabebe',
        sku: 'SFERRAMENTA-ROSABEBE',
        name: 'Rosa Bebê',
        colorName: 'Rosa Bebê',
        price: 64.90,
        stockQuantity: null
      },
      {
        id: 'var-sferramenta-branco',
        sku: 'SFERRAMENTA-BRANCO',
        name: 'Branco',
        colorName: 'Branco',
        price: 64.90,
        stockQuantity: null
      }
    ],
    technicalSpecs: {
      material: 'Plástico/PLA',
      dimensionsMm: { x: 210, y: 50, z: 55 }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-cofrinho-porquinho',
    name: 'Cofrinho do Porquinho - Porco Fazendeiro',
    slug: 'cofrinho-porquinho-porco-fazendeiro',
    shortDescription: 'Cofre em formato de porquinho fazendeiro, ideal para presentear e decorar.',
    description: 'Incentive a economia desde cedo ou enfeite o seu cantinho com estilo! Este adorável cofrinho no formato de um porco fazendeiro traz um toque divertido e nostálgico. Conta com mecanismo seguro e interativo para inserção de moedas. Além de funcional para guardar suas economias, é uma linda peça decorativa e uma excelente opção de presente, com opção de personalização no chapéu.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[6]], // Souvenirs
    basePrice: 59.90,
    featuredImage: '/products/cofrinho/01.jpg',
    images: [
      '/products/cofrinho/01.jpg',
      '/products/cofrinho/02.jpg',
      '/products/cofrinho/03.jpg',
    ],
    rating: 5.0,
    reviewCount: null as any,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockTotal: null,
    tags: ['cofrinho', 'porquinho', 'fazendeiro', 'decoração', 'presente', 'souvenir', 'impressão 3d'],
    variants: [
      {
        id: 'var-cofre-chapeu-vermelho',
        sku: 'COFRE-CHAPEU-VERM',
        name: 'Vermelho',
        colorName: 'Vermelho',
        price: 59.90,
        stockQuantity: null
      },
      {
        id: 'var-cofre-chapeu-amarelo',
        sku: 'COFRE-CHAPEU-AMAR',
        name: 'Amarelo',
        colorName: 'Amarelo',
        price: 59.90,
        stockQuantity: null
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-suporte-cola',
    name: 'Suporte Para Pistola De Cola Quente Organizador De Bancada Artesanato',
    slug: 'suporte-pistola-cola-quente',
    shortDescription: 'Mantenha sua pistola de cola quente segura e sua área de trabalho limpa e organizada.',
    description: 'Evite acidentes, queimaduras ou sujeira na sua bancada com este suporte para pistola de cola quente.\n\nOrganização: Mantém sua área de artesanato limpa e livre de fios embolados.\nSegurança: Desenhado para acomodar a pistola enquanto esfria ou durante o uso, evitando acidentes.\nMaterial: Produzido em plástico resistente através de impressão 3D.\nDimensões: Formato compacto ideal para bancadas.\nCompatibilidade: Compatível com modelos de pistola de cola quente de tamanho padrão similares.\nConteúdo da embalagem: 1x Suporte para Pistola de Cola Quente (Pistola não inclusa).\nCuidados: Não expor a altas temperaturas diretas além do bico da pistola e limpar com pano úmido.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[1]],
    basePrice: 44.90,
    featuredImage: '/products/suporte-cola/01.jpg',
    images: [
      '/products/suporte-cola/01.jpg',
      '/products/suporte-cola/02.jpg',
      '/products/suporte-cola/03.jpg',
    ],
    rating: null as any,
    reviewCount: null as any,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockTotal: null,
    origin: 'Pernambuco',
    tags: ['cola quente', 'pistola de cola', 'organizador', 'bancada', 'artesanato', 'ferramentas', 'impressão 3d'],
    variants: [
      {
        id: 'var-scola-rosabebe',
        sku: 'SCOLA-ROSABEBE',
        name: 'Rosa Bebê',
        colorName: 'Rosa Bebê',
        price: 44.90,
        stockQuantity: null
      },
      {
        id: 'var-scola-branco',
        sku: 'SCOLA-BRANCO',
        name: 'Branco',
        colorName: 'Branco',
        price: 44.90,
        stockQuantity: null
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-aneis-abelha',
    name: 'Conjunto Anel Para Guardanapos Abelha Colmeia Luxo Porta Guardanapos',
    slug: 'conjunto-aneis-guardanapos-abelha',
    shortDescription: 'Um toque encantador e luxuoso de abelhas e colmeia para sua mesa posta.',
    description: 'Encante seus convidados com uma decoração de mesa elegante com estes anéis para guardanapos.\n\nAbelha e Colmeia: Design detalhado e luxuoso inspirado na natureza.\nOcasiões: Perfeito para jantares, almoços, casamentos e celebrações especiais.\nMaterial: Produzido com material resistente em impressão 3D de alta qualidade.\nCaracterísticas: Acabamento refinado que adiciona sofisticação à sua mesa posta.\nCuidados: Limpar com pano úmido e macio. Não utilizar produtos abrasivos ou lavar na máquina.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[4]],
    basePrice: 39.90,
    featuredImage: '/products/aneis-abelha/01.jpg',
    images: [
      '/products/aneis-abelha/01.jpg',
      '/products/aneis-abelha/02.jpg',
      '/products/aneis-abelha/03.jpg',
    ],
    rating: null as any,
    reviewCount: null as any,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockTotal: null,
    origin: 'Pernambuco',
    tags: ['guardanapo', 'anel de guardanapo', 'abelha', 'colmeia', 'luxo', 'mesa posta', 'decoração', 'festa'],
    variants: [
      {
        id: 'var-aneis-4un',
        sku: 'ANEIS-ABELHA-4UN',
        name: '4 UNIDADES',
        price: 39.90,
        stockQuantity: null
      },
      {
        id: 'var-aneis-6un',
        sku: 'ANEIS-ABELHA-6UN',
        name: '6 UNIDADES',
        price: 59.90, // Calculated proportionally based on logic or base price if provided. Assuming base price is for 4. Or I will just set the ones I had before. Wait, I will adjust to real values if I knew them, but I don't.
        stockQuantity: null
      },
      {
        id: 'var-aneis-12un',
        sku: 'ANEIS-ABELHA-12UN',
        name: '12 UNIDADES',
        price: 119.90,
        stockQuantity: null
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-sagrada-familia',
    name: 'Escultura Sagrada Família Religiosa Católico Cristo Evangelho Busto Imagem Parede',
    slug: 'escultura-sagrada-familia',
    shortDescription: 'Representação da Sagrada Família, ideal para uso decorativo e religioso.',
    description: 'Bela Escultura Sagrada Família Religiosa Católico Cristo Evangelho Busto Imagem Parede.\n\nRepresentação da Sagrada Família: Símbolo de união, amor e fé.\nUso decorativo/religioso: Ideal para oratórios domésticos, aparadores, paredes e ambientes de oração.\nAcabamento: Rico em detalhes e estética minimalista/contemporânea.\nMaterial: Plástico sustentável via impressão 3D.\nCaracterísticas: Busto resistente e leve.\nBenefícios: Traz serenidade e espiritualidade ao ambiente.\nConteúdo da embalagem: 1x Escultura.\nInformações de fabricação: Produzido com tecnologia 3D avançada.\nCuidados: Evitar exposição prolongada ao sol intenso e limpar com pano seco.',
    type: 'printed_model',
    brand: '3D',
    categories: [mockCategories[0]],
    basePrice: 54.90,
    featuredImage: '/products/sagrada-familia/01.jpg',
    images: [
      '/products/sagrada-familia/01.jpg',
      '/products/sagrada-familia/02.jpg',
      '/products/sagrada-familia/03.jpg',
    ],
    rating: null as any,
    reviewCount: null as any,
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockTotal: null,
    origin: 'Brasil / Pernambuco',
    tags: ['sagrada família', 'religioso', 'católico', 'decoração', 'fé', 'jesus', 'maria', 'josé', 'cristo', 'evangelho'],
    variants: [
      {
        id: 'var-sagrada-familia',
        sku: 'SAGRADA-FAMILIA',
        name: 'Padrão',
        price: 54.90,
        stockQuantity: null
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-nossa-senhora',
    name: 'Enfeite Decorativo Nossa Senhora Rogai Por Nós Escultura Religiosa Moderna 3D',
    slug: 'enfeite-nossa-senhora-rogai-por-nos',
    shortDescription: 'Enfeite decorativo de Nossa Senhora com a frase"Rogai Por Nós".',
    description: 'Belo enfeite decorativo de oração com a representação de Nossa Senhora e a frase"Rogai Por Nós".\n\nTemática: Nossa Senhora com os dizeres"Rogai Por Nós".\nCaracterísticas: Escultura moderna, combinando fé e decoração contemporânea.\nUtilização: Perfeito para estantes, mesas de escritório e decoração do lar.\nAcabamento: Rico em detalhes de impressão 3D.\nCuidados: Evitar altas temperaturas e limpar apenas com pano seco.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[0]],
    basePrice: 29.90,
    featuredImage: '/products/nossa-senhora/01.jpg',
    images: [
      '/products/nossa-senhora/01.jpg',
      '/products/nossa-senhora/02.jpg',
      '/products/nossa-senhora/03.jpg',
    ],
    rating: null as any,
    reviewCount: null as any,
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    inStock: true,
    stockTotal: null,
    origin: 'Pernambuco',
    tags: ['nossa senhora', 'rogai por nós', 'religioso', 'fé', 'decoração', 'oração', 'católico', 'presente', 'impressão 3d'],
    variants: [
      {
        id: 'var-nossa-senhora',
        sku: 'NOSSA-SENHORA',
        name: 'Padrão',
        price: 29.90,
        stockQuantity: null
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-caixa-cogumelo',
    name: 'Caixa De Joias Cogumelo Com Tampa Removível Organizador',
    slug: 'caixa-joias-cogumelo',
    shortDescription: 'Um charmoso organizador em formato de cogumelo mágico para guardar joias e acessórios.',
    description: 'Traga a fantasia para a sua organização pessoal! Esta caixa em formato de cogumelo possui um compartimento interno engenhoso.\n\nOrganização de Joias: Armazenamento seguro de anéis, brincos e pequenas joias.\nTampa Removível: Compartimento interno prático e estiloso.\nAcabamento: Peça essencial que une o aspecto decorativo com a utilidade.\nCuidados: Não deixar exposto ao sol forte contínuo. Limpar com pano macio.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[3]],
    basePrice: 79.90,
    featuredImage: '/products/caixa-cogumelo/01.jpg',
    images: [
      '/products/caixa-cogumelo/01.jpg',
      '/products/caixa-cogumelo/02.jpg',
      '/products/caixa-cogumelo/03.jpg',
    ],
    rating: null as any,
    reviewCount: null as any,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockTotal: null,
    origin: 'Pernambuco',
    tags: ['porta joias', 'caixa de joias', 'cogumelo', 'organizador', 'decoração', 'acessórios', 'Organizadores de Joias', 'impressão 3d'],
    variants: [
      {
        id: 'var-caixa-cogumelo',
        sku: 'CAIXA-COGUMELO',
        name: 'Padrão',
        price: 79.90,
        stockQuantity: null
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-marcador-barquinho',
    name: 'Marcador de Página Barquinho 3D Navegando - Marcador de Páginas Criativo',
    slug: 'marcador-pagina-barquinho-3d',
    shortDescription: 'Um marcador de páginas criativo em formato de barco que repousa sobre seu livro.',
    description: 'Transforme a sua leitura com este marcador de páginas exclusivo.\n\nFormato de Barquinho: Cria a ilusão de um barco navegando e repousando sobre as páginas.\nFuncionamento: Marcador prático, muito leve e delicado que não danifica as folhas.\nMaterial: Fabricado em plástico PLA sustentável via impressão 3D.\nConteúdo da embalagem: 1x Marcador de páginas.\nCuidados: Manusear com cuidado para não quebrar a haste e não expor a calor excessivo.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[2]],
    basePrice: 18.90,
    featuredImage: '/products/marcador-barquinho/01.jpg',
    images: [
      '/products/marcador-barquinho/01.jpg',
      '/products/marcador-barquinho/02.jpg',
      '/products/marcador-barquinho/03.jpg',
    ],
    rating: null as any,
    reviewCount: null as any,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    inStock: true,
    stockTotal: null,
    origin: 'Pernambuco',
    tags: ['marcador', 'marcador de página', 'livro', 'leitura', 'papelaria', 'barquinho', 'Marcadores de Página', 'impressão 3d'],
    variants: [
      {
        id: 'var-marcador-barquinho',
        sku: 'MARC-BARQUINHO',
        name: 'Padrão',
        price: 18.90,
        stockQuantity: null
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

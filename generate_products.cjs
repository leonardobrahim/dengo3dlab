const fs = require('fs');

const content = `import { Product } from '@/src/types';
import { mockCategories } from './categories';

export const mockProducts: Product[] = [
  {
    id: 'prod-kit-pombinha',
    name: 'Kit Pombinha Divino Espírito Santo',
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
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    inStock: true,
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['religioso', 'espírito santo', 'pombinha', 'decoração religiosa', 'fé', 'decoração', 'impressão 3d'],
    variants: [
      {
        id: 'var-kit-pombinha-1',
        sku: 'KIT-POMBINHA',
        name: 'Padrão',
        price: 35.90,
        stockQuantity: 999
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
    name: 'Botão Do Foda-se - Fidget Toy com Switch Mecânico',
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['fidget', 'fidget toy', 'antiestresse', 'switch mecânico', 'brinquedo', 'diversão', 'impressão 3d'],
    variants: [
      {
        id: 'var-btn-fodase',
        sku: 'BTN-FODASE',
        name: 'FODA-SE',
        price: 29.90,
        stockQuantity: 999
      },
      {
        id: 'var-btn-calma',
        sku: 'BTN-CALMA',
        name: 'CALMA CARALHO',
        price: 29.90,
        stockQuantity: 999
      },
      {
        id: 'var-btn-naofode',
        sku: 'BTN-NAOFODE',
        name: 'NÃO FODE',
        price: 29.90,
        stockQuantity: 999
      },
      {
        id: 'var-btn-gritado',
        sku: 'BTN-GRITADO',
        name: 'GRITADO PORRA',
        price: 29.90,
        stockQuantity: 999
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['porta gloss', 'porta batom', 'chaveiro', 'beleza', 'hello kitty', 'organizador', 'acessório'],
    variants: [
      {
        id: 'var-pgloss-lilas',
        sku: 'PGLOSS-LILAS',
        name: 'Lilás',
        colorName: 'Lilás',
        price: 22.90,
        stockQuantity: 999
      },
      {
        id: 'var-pgloss-rosabebe',
        sku: 'PGLOSS-ROSABEBE',
        name: 'Rosa Bebê',
        colorName: 'Rosa Bebê',
        price: 22.90,
        stockQuantity: 999
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
    description: 'A organização é a chave da produtividade! Este suporte para ferramentas foi projetado para abrigar pequenos utensílios como pinças, alicates de corte, estiletes, tesouras e muito mais. Ideal para espaços de artesanato, costura e oficinas criativas, ele mantém o essencial organizado, visível e pronto para uso.\\n\\nAtenção: As ferramentas presentes nas imagens são puramente ilustrativas e não acompanham o produto.',
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['ferramentas', 'organizador', 'bancada', 'artesanato', 'costura', 'oficina', 'impressão 3d'],
    variants: [
      {
        id: 'var-sferramenta-rosabebe',
        sku: 'SFERRAMENTA-ROSABEBE',
        name: 'Rosa Bebê',
        colorName: 'Rosa Bebê',
        price: 64.90,
        stockQuantity: 999
      },
      {
        id: 'var-sferramenta-branco',
        sku: 'SFERRAMENTA-BRANCO',
        name: 'Branco',
        colorName: 'Branco',
        price: 64.90,
        stockQuantity: 999
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['cofrinho', 'porquinho', 'fazendeiro', 'decoração', 'presente', 'souvenir', 'impressão 3d'],
    variants: [
      {
        id: 'var-cofre-chapeu-vermelho',
        sku: 'COFRE-CHAPEU-VERM',
        name: 'Chapéu Vermelho',
        colorName: 'Vermelho',
        price: 59.90,
        stockQuantity: 999
      },
      {
        id: 'var-cofre-chapeu-amarelo',
        sku: 'COFRE-CHAPEU-AMAR',
        name: 'Chapéu Amarelo',
        colorName: 'Amarelo',
        price: 59.90,
        stockQuantity: 999
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-suporte-cola',
    name: 'Suporte para Pistola de Cola Quente - Organizador de Bancada',
    slug: 'suporte-pistola-cola-quente',
    shortDescription: 'Mantenha sua pistola de cola quente segura e sua área de trabalho limpa.',
    description: 'Evite acidentes, queimaduras ou sujeira na sua bancada! Este suporte organizador foi especialmente desenhado para acomodar pistolas de cola quente enquanto elas esfriam ou durante o uso. Um acessório robusto, prático e que mantém sua área de artesanato organizada.\\n\\nAtenção: O produto é compatível com modelos de tamanho padrão similares. A pistola de cola quente não acompanha o suporte.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[1]], // Equipamento Escolar e de Escritório
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['cola quente', 'pistola de cola', 'organizador', 'bancada', 'artesanato', 'ferramentas', 'impressão 3d'],
    variants: [
      {
        id: 'var-scola-rosabebe',
        sku: 'SCOLA-ROSABEBE',
        name: 'Rosa Bebê',
        colorName: 'Rosa Bebê',
        price: 44.90,
        stockQuantity: 999
      },
      {
        id: 'var-scola-branco',
        sku: 'SCOLA-BRANCO',
        name: 'Branco',
        colorName: 'Branco',
        price: 44.90,
        stockQuantity: 999
      }
    ],
    technicalSpecs: {
      dimensionsMm: { x: 180, y: 90, z: 60 }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-aneis-abelha',
    name: 'Conjunto de Anéis para Guardanapos Abelha',
    slug: 'conjunto-aneis-guardanapos-abelha',
    shortDescription: 'Um toque encantador e delicado de abelhinhas para sua mesa posta.',
    description: 'Encante seus convidados com uma decoração de mesa super carinhosa e elegante. Nossos anéis de guardanapo com design 3D de abelha dão um toque de natureza e sofisticação para jantares, celebrações, casamentos ou almoços especiais. Fabricados com requinte e material de qualidade, são perfeitos para trazer ainda mais vida e alegria para os momentos em volta da mesa.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[4]], // Louça
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['guardanapo', 'anel de guardanapo', 'abelha', 'mesa posta', 'decoração', 'festa', 'casamento', 'impressão 3d'],
    variants: [
      {
        id: 'var-aneis-4un',
        sku: 'ANEIS-ABELHA-4UN',
        name: '4 unidades',
        price: 39.90,
        stockQuantity: 999
      },
      {
        id: 'var-aneis-6un',
        sku: 'ANEIS-ABELHA-6UN',
        name: '6 unidades',
        price: 59.90,
        stockQuantity: 999
      },
      {
        id: 'var-aneis-12un',
        sku: 'ANEIS-ABELHA-12UN',
        name: '12 unidades',
        price: 119.90,
        stockQuantity: 999
      }
    ],
    technicalSpecs: {
      material: 'PLA',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-sagrada-familia',
    name: 'Escultura Sagrada Família Religiosa',
    slug: 'escultura-sagrada-familia',
    shortDescription: 'Escultura decorativa de Jesus, Maria e José, símbolo de união, amor e fé.',
    description: 'Esta delicada escultura retrata de forma minimalista a Sagrada Família (Jesus, Maria e José). Uma peça que enriquece a decoração da sua casa com os símbolos de afeto, união e fé cristã. Ideal para oratórios domésticos, aparadores e mesas laterais, e uma lembrança extremamente marcante para presentear em casamentos, batizados e festividades religiosas.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[0]], // Artigos Religiosos e de Fengshui
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['sagrada família', 'religioso', 'católico', 'decoração', 'fé', 'jesus', 'maria', 'josé', 'presente religioso', 'impressão 3d'],
    variants: [
      {
        id: 'var-sagrada-familia',
        sku: 'SAGRADA-FAMILIA',
        name: 'Padrão',
        price: 54.90,
        stockQuantity: 999
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-nossa-senhora',
    name: 'Enfeite Decorativo Nossa Senhora Rogai por Nós',
    slug: 'enfeite-nossa-senhora-rogai-por-nos',
    shortDescription: 'Enfeite de oração com a frase "Rogai por Nós", combinando fé e decoração contemporânea.',
    description: 'Adicione serenidade e propósito ao seu espaço de trabalho ou cantinho de oração. Este enfeite apresenta uma belíssima representação de Nossa Senhora com os dizeres "Rogai por Nós". Perfeito para estantes, mesas de escritório e decoração da casa para lembrar do poder da oração e da fé diariamente, sendo também uma linda opção de presente espiritual.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[0]], // Artigos Religiosos e de Fengshui
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['nossa senhora', 'rogai por nós', 'religioso', 'fé', 'decoração', 'oração', 'católico', 'presente', 'impressão 3d'],
    variants: [
      {
        id: 'var-nossa-senhora',
        sku: 'NOSSA-SENHORA',
        name: 'Padrão',
        price: 29.90,
        stockQuantity: 999
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-caixa-cogumelo',
    name: 'Caixa de Joias Cogumelo com Tampa Removível',
    slug: 'caixa-joias-cogumelo',
    shortDescription: 'Um charmoso organizador em formato de cogumelo mágico para guardar pequenos acessórios.',
    description: 'Traga a fantasia do bosque para a sua organização pessoal! Esta caixa em formato de cogumelo mágico possui um compartimento interno engenhoso, com tampa superior removível para o armazenamento seguro e estiloso de anéis, brincos, pequenas joias e miudezas. Uma peça essencial que une o aspecto decorativo fantástico com a praticidade de um mini porta-joias funcional.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[3]], // Organizadores para Casa
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['porta joias', 'caixa de joias', 'cogumelo', 'organizador', 'decoração', 'acessórios', 'presente', 'impressão 3d'],
    variants: [
      {
        id: 'var-caixa-cogumelo',
        sku: 'CAIXA-COGUMELO',
        name: 'Padrão',
        price: 79.90,
        stockQuantity: 999
      }
    ],
    technicalSpecs: {
      material: 'PLA',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-marcador-barquinho',
    name: 'Marcador de Página Barquinho 3D Navegando',
    slug: 'marcador-pagina-barquinho-3d',
    shortDescription: 'Um marcador encantador que repousa sobre seu livro como um barco no mar de páginas.',
    description: 'Transforme a sua leitura em uma verdadeira aventura com este marcador de páginas exclusivo. O marcador cria a ilusão maravilhosa de um pequeno barquinho 3D navegando e repousando elegantemente sobre o topo do seu livro. Muito leve e delicado, ele não danifica as páginas, sendo o presente ideal para amigos leitores, estudantes e entusiastas da papelaria criativa.',
    type: 'printed_model',
    brand: 'Dengo 3D',
    categories: [mockCategories[2]], // Cadernos e Papéis
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['marcador', 'marcador de página', 'livro', 'leitura', 'papelaria', 'barquinho', 'presente', 'impressão 3d'],
    variants: [
      {
        id: 'var-marcador-barquinho',
        sku: 'MARC-BARQUINHO',
        name: 'Padrão',
        price: 18.90,
        stockQuantity: 999
      }
    ],
    technicalSpecs: {
      material: 'PLA',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];
`;

fs.writeFileSync('src/mocks/products.ts', content, 'utf8');
console.log('Done!');

const fs = require('fs');

const path = 'src/mocks/products.ts';
let content = fs.readFileSync(path, 'utf8');

const regexKit = /\{\s*id: 'prod-kit-pombinha',[\s\S]*?updatedAt: new Date\(\)\.toISOString\(\),\s*\}/;

const newKit = `{
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
    tags: ['religioso', 'espírito santo', 'pombinha', 'decoração religiosa', 'fé', 'decoração', 'impressão 3d'],
    origin: 'Pernambuco',
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
  }`;

content = content.replace(regexKit, newKit);

const regexBotao = /\{\s*id: 'prod-botao-foda-se',[\s\S]*?updatedAt: new Date\(\)\.toISOString\(\),\s*\}/;

const newBotao = `{
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
    stockTotal: 999, // TEMPORARY DEVELOPMENT STOCK
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
        stockQuantity: 999
      },
      {
        id: 'var-btn-calma',
        sku: 'BTN-CALMA',
        name: 'CALMA CARALHO',
        type: 'phrase',
        value: 'CALMA CARALHO',
        price: 29.90,
        stockQuantity: 999
      },
      {
        id: 'var-btn-naofode',
        sku: 'BTN-NAOFODE',
        name: 'NÃO FODE',
        type: 'phrase',
        value: 'NÃO FODE',
        price: 29.90,
        stockQuantity: 999
      },
      {
        id: 'var-btn-gritado',
        sku: 'BTN-GRITADO',
        name: 'GRITADO PORRA',
        type: 'phrase',
        value: 'GRITADO PORRA',
        price: 29.90,
        stockQuantity: 999
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }`;

content = content.replace(regexBotao, newBotao);

fs.writeFileSync(path, content, 'utf8');

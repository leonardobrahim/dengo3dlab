const fs = require('fs');
const path = 'src/mocks/products.ts';
let content = fs.readFileSync(path, 'utf8');

const prod6_regex = /\{\s*id: 'prod-suporte-cola',[\s\S]*?updatedAt: new Date\(\)\.toISOString\(\),\s*\}/;
const prod6_new = `{
    id: 'prod-suporte-cola',
    name: 'Suporte Para Pistola De Cola Quente Organizador De Bancada Artesanato',
    slug: 'suporte-pistola-cola-quente',
    shortDescription: 'Mantenha sua pistola de cola quente segura e sua área de trabalho limpa e organizada.',
    description: 'Evite acidentes, queimaduras ou sujeira na sua bancada com este suporte para pistola de cola quente.\\n\\nOrganização: Mantém sua área de artesanato limpa e livre de fios embolados.\\nSegurança: Desenhado para acomodar a pistola enquanto esfria ou durante o uso, evitando acidentes.\\nMaterial: Produzido em plástico resistente através de impressão 3D.\\nDimensões: Formato compacto ideal para bancadas.\\nCompatibilidade: Compatível com modelos de pistola de cola quente de tamanho padrão similares.\\nConteúdo da embalagem: 1x Suporte para Pistola de Cola Quente (Pistola não inclusa).\\nCuidados: Não expor a altas temperaturas diretas além do bico da pistola e limpar com pano úmido.',
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
  }`;

const prod7_regex = /\{\s*id: 'prod-aneis-abelha',[\s\S]*?updatedAt: new Date\(\)\.toISOString\(\),\s*\}/;
const prod7_new = `{
    id: 'prod-aneis-abelha',
    name: 'Conjunto Anel Para Guardanapos Abelha Colmeia Luxo Porta Guardanapos',
    slug: 'conjunto-aneis-guardanapos-abelha',
    shortDescription: 'Um toque encantador e luxuoso de abelhas e colmeia para sua mesa posta.',
    description: 'Encante seus convidados com uma decoração de mesa elegante com estes anéis para guardanapos.\\n\\nAbelha e Colmeia: Design detalhado e luxuoso inspirado na natureza.\\nOcasiões: Perfeito para jantares, almoços, casamentos e celebrações especiais.\\nMaterial: Produzido com material resistente em impressão 3D de alta qualidade.\\nCaracterísticas: Acabamento refinado que adiciona sofisticação à sua mesa posta.\\nCuidados: Limpar com pano úmido e macio. Não utilizar produtos abrasivos ou lavar na máquina.',
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
  }`;

const prod8_regex = /\{\s*id: 'prod-sagrada-familia',[\s\S]*?updatedAt: new Date\(\)\.toISOString\(\),\s*\}/;
const prod8_new = `{
    id: 'prod-sagrada-familia',
    name: 'Escultura Sagrada Família Religiosa Católico Cristo Evangelho Busto Imagem Parede',
    slug: 'escultura-sagrada-familia',
    shortDescription: 'Representação da Sagrada Família, ideal para uso decorativo e religioso.',
    description: 'Bela Escultura Sagrada Família Religiosa Católico Cristo Evangelho Busto Imagem Parede.\\n\\nRepresentação da Sagrada Família: Símbolo de união, amor e fé.\\nUso decorativo/religioso: Ideal para oratórios domésticos, aparadores, paredes e ambientes de oração.\\nAcabamento: Rico em detalhes e estética minimalista/contemporânea.\\nMaterial: Plástico sustentável via impressão 3D.\\nCaracterísticas: Busto resistente e leve.\\nBenefícios: Traz serenidade e espiritualidade ao ambiente.\\nConteúdo da embalagem: 1x Escultura.\\nInformações de fabricação: Produzido com tecnologia 3D avançada.\\nCuidados: Evitar exposição prolongada ao sol intenso e limpar com pano seco.',
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
  }`;

content = content.replace(prod6_regex, prod6_new);
content = content.replace(prod7_regex, prod7_new);
content = content.replace(prod8_regex, prod8_new);

fs.writeFileSync(path, content, 'utf8');

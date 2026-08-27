const fs = require('fs');
const path = 'src/mocks/products.ts';
let content = fs.readFileSync(path, 'utf8');

const prod9_regex = /\{\s*id: 'prod-nossa-senhora',[\s\S]*?updatedAt: new Date\(\)\.toISOString\(\),\s*\}/;
const prod9_new = `{
    id: 'prod-nossa-senhora',
    name: 'Enfeite Decorativo Nossa Senhora Rogai Por Nós Escultura Religiosa Moderna 3D',
    slug: 'enfeite-nossa-senhora-rogai-por-nos',
    shortDescription: 'Enfeite decorativo de Nossa Senhora com a frase "Rogai Por Nós".',
    description: 'Belo enfeite decorativo de oração com a representação de Nossa Senhora e a frase "Rogai Por Nós".\\n\\nTemática: Nossa Senhora com os dizeres "Rogai Por Nós".\\nCaracterísticas: Escultura moderna, combinando fé e decoração contemporânea.\\nUtilização: Perfeito para estantes, mesas de escritório e decoração do lar.\\nAcabamento: Rico em detalhes de impressão 3D.\\nCuidados: Evitar altas temperaturas e limpar apenas com pano seco.',
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
  }`;

const prod10_regex = /\{\s*id: 'prod-caixa-cogumelo',[\s\S]*?updatedAt: new Date\(\)\.toISOString\(\),\s*\}/;
const prod10_new = `{
    id: 'prod-caixa-cogumelo',
    name: 'Caixa De Joias Cogumelo Com Tampa Removível Organizador',
    slug: 'caixa-joias-cogumelo',
    shortDescription: 'Um charmoso organizador em formato de cogumelo mágico para guardar joias e acessórios.',
    description: 'Traga a fantasia para a sua organização pessoal! Esta caixa em formato de cogumelo possui um compartimento interno engenhoso.\\n\\nOrganização de Joias: Armazenamento seguro de anéis, brincos e pequenas joias.\\nTampa Removível: Compartimento interno prático e estiloso.\\nAcabamento: Peça essencial que une o aspecto decorativo com a utilidade.\\nCuidados: Não deixar exposto ao sol forte contínuo. Limpar com pano macio.',
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
  }`;

const prod11_regex = /\{\s*id: 'prod-marcador-barquinho',[\s\S]*?updatedAt: new Date\(\)\.toISOString\(\)\s*\}/;
const prod11_new = `{
    id: 'prod-marcador-barquinho',
    name: 'Marcador de Página Barquinho 3D Navegando - Marcador de Páginas Criativo',
    slug: 'marcador-pagina-barquinho-3d',
    shortDescription: 'Um marcador de páginas criativo em formato de barco que repousa sobre seu livro.',
    description: 'Transforme a sua leitura com este marcador de páginas exclusivo.\\n\\nFormato de Barquinho: Cria a ilusão de um barco navegando e repousando sobre as páginas.\\nFuncionamento: Marcador prático, muito leve e delicado que não danifica as folhas.\\nMaterial: Fabricado em plástico PLA sustentável via impressão 3D.\\nConteúdo da embalagem: 1x Marcador de páginas.\\nCuidados: Manusear com cuidado para não quebrar a haste e não expor a calor excessivo.',
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
  }`;

content = content.replace(prod9_regex, prod9_new);
content = content.replace(prod10_regex, prod10_new);
content = content.replace(prod11_regex, prod11_new);

fs.writeFileSync(path, content, 'utf8');

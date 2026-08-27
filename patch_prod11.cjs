const fs = require('fs');
const path = 'src/mocks/products.ts';
let content = fs.readFileSync(path, 'utf8');

const prod11_regex = /\{\s*id: 'prod-marcador-barquinho',[\s\S]*?\}\s*\];/;
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
  }
];`;

content = content.replace(prod11_regex, prod11_new);
fs.writeFileSync(path, content, 'utf8');

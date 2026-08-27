const fs = require('fs');

const path = 'src/types/index.ts';
let content = fs.readFileSync(path, 'utf8');

// Replace Product interface
content = content.replace(
  /export interface Product \{[\s\S]*?updatedAt: string;\n\}/g,
  `export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  type: ProductType;
  brand: string;
  categories: Category[];
  variants: ProductVariant[];
  basePrice: number;
  basePromotionalPrice?: number;
  images: string[];
  featuredImage: string;
  rating: number | null;
  reviewCount: number | null;
  soldCount?: number | null;
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  inStock: boolean;
  stockTotal: number | null;
  technicalSpecs?: TechnicalSpecs;
  tags: string[];
  packageContents?: string[];
  careInstructions?: string[];
  faq?: { question: string; answer: string }[];
  seo?: { metaTitle?: string; metaDescription?: string; keywords?: string[] };
  createdAt: string;
  updatedAt: string;
}`
);

fs.writeFileSync(path, content, 'utf8');

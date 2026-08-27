const fs = require('fs');

const path = 'src/types/index.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /export interface ProductVariant \{[\s\S]*?imageUrl\?: string;\n\}/g,
  `export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  type?: string; // e.g., 'color', 'phrase', 'quantity'
  value?: string; // the value of the variant, e.g., 'FODA-SE', 'Lilás'
  colorHex?: string;
  colorName?: string;
  diameterMm?: number;
  weightGrams?: number;
  material?: string;
  price: number;
  promotionalPrice?: number;
  stockQuantity: number;
  imageUrl?: string;
}`
);

fs.writeFileSync(path, content, 'utf8');

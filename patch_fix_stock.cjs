const fs = require('fs');
const path = 'src/pages/public/ProductDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /const currentStock = selectedVariant \? selectedVariant\.stockQuantity : product\.stockTotal \|\| 0;/g,
  `const currentStock = (selectedVariant ? selectedVariant.stockQuantity : product.stockTotal) ?? 10; // Fallback to 10 if null`
);

content = content.replace(
  /const isInStock = v\.stockQuantity > 0;/g,
  `const isInStock = v.stockQuantity === null || v.stockQuantity > 0;`
);

fs.writeFileSync(path, content, 'utf8');

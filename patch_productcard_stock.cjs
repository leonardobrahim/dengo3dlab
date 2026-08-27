const fs = require('fs');
const path = 'src/components/business/ProductCard.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /!product\.inStock \|\| selectedVariant\.stockQuantity === 0\s*\?\s*'out_of_stock'\s*:\s*selectedVariant\.stockQuantity < 5\s*\?\s*'low_stock'\s*:\s*'in_stock'/g,
  `!product.inStock || selectedVariant.stockQuantity === 0 
                  ? 'out_of_stock' 
                  : (selectedVariant.stockQuantity !== null && selectedVariant.stockQuantity < 5)
                    ? 'low_stock' 
                    : 'in_stock'`
);

fs.writeFileSync(path, content, 'utf8');

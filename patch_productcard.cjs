const fs = require('fs');

const path = 'src/components/business/ProductCard.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /<Rating value=\{product\.rating \|\| 5\} reviewCount=\{product\.reviewCount \|\| 0\} size="sm" \/>/g,
  `{product.rating ? <Rating value={product.rating} reviewCount={product.reviewCount ?? undefined} size="sm" /> : null}`
);

fs.writeFileSync(path, content, 'utf8');

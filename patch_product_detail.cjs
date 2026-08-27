const fs = require('fs');
const path = 'src/pages/public/ProductDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add the missing states back
content = content.replace(
  /const \[selectedVariant, setSelectedVariant\] = React\.useState\(product\?\.variants\?\.\[0\] \|\| null\);/,
  `const [selectedVariant, setSelectedVariant] = React.useState(product?.variants?.[0] || null);
  const [selectedMaterial, setSelectedMaterial] = React.useState(MATERIAL_OPTIONS[0]);
  const [selectedSize, setSelectedSize] = React.useState(SIZE_OPTIONS[1]);
  const [selectedColor, setSelectedColor] = React.useState(COLOR_OPTIONS[0]);`
);

// We should also look at the modal alert references
content = content.replace(
  /Variação: \{selectedColor\.name\} • \{selectedSize\.label\}/g,
  `Variação: {selectedVariant?.name || 'Padrão'}`
);

content = content.replace(
  /selectedColor\.name/g,
  `(selectedVariant?.name || 'Padrão')`
);

content = content.replace(
  /selectedMaterial\./g,
  `(MATERIAL_OPTIONS[0]).`
);

content = content.replace(
  /selectedSize\./g,
  `(SIZE_OPTIONS[1]).`
);


fs.writeFileSync(path, content, 'utf8');
console.log('Done');

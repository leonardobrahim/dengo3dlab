const fs = require('fs');

const path = 'src/pages/public/ProductDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/const \[selectedMaterial, setSelectedMaterial\] = React\.useState\(MATERIAL_OPTIONS\[0\]\);\s*const \[selectedSize, setSelectedSize\] = React\.useState\(SIZE_OPTIONS\[1\]\);\s*const \[selectedColor, setSelectedColor\] = React\.useState\(COLOR_OPTIONS\[0\]\);/g, '');

fs.writeFileSync(path, content, 'utf8');

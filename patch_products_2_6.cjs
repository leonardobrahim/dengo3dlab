const fs = require('fs');
const path = 'src/mocks/products.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/stockTotal:\s*999\s*(,\s*\/\/\s*TEMPORARY DEVELOPMENT STOCK)?/g, 'stockTotal: null');
content = content.replace(/stockQuantity:\s*999/g, 'stockQuantity: null');
content = content.replace(/name: 'Chapéu Vermelho'/g, "name: 'Vermelho'");
content = content.replace(/name: 'Chapéu Amarelo'/g, "name: 'Amarelo'");

// Just in case, reviewCount to null where it's 0 or anything fake. (it's already null as any)
fs.writeFileSync(path, content, 'utf8');

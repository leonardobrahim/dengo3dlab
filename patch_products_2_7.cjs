const fs = require('fs');
const path = 'src/mocks/products.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/stockTotal: null\n\s*tags:/g, 'stockTotal: null,\n    tags:');
fs.writeFileSync(path, content, 'utf8');

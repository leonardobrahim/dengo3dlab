const fs = require('fs');
const path = 'src/mocks/products.ts';
let content = fs.readFileSync(path, 'utf8');

// Use regex to replace stockTotal: 999 and stockQuantity: 999 but ONLY for the first two products? No, it's safer to just run a quick string replace for those specific ones.

let start = content.indexOf('prod-kit-pombinha');
let end = content.indexOf('prod-porta-gloss');

let chunk = content.substring(start, end);

chunk = chunk.replace(/stockTotal: 999/g, 'stockTotal: null');
chunk = chunk.replace(/stockQuantity: 999/g, 'stockQuantity: null');

content = content.substring(0, start) + chunk + content.substring(end);
fs.writeFileSync(path, content, 'utf8');

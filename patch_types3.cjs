const fs = require('fs');
const path = 'src/types/index.ts';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/stockQuantity: number;/g, 'stockQuantity: number | null;');
fs.writeFileSync(path, content, 'utf8');

const fs = require('fs');
const path = 'src/pages/public/ProductDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/\{\/\* Stock Availability Alert \*\/\}/, '</div>\n\n            {/* Stock Availability Alert */}');
fs.writeFileSync(path, content, 'utf8');

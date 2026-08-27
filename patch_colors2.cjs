const fs = require('fs');
const path = 'src/pages/public/HomePage.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /<Badge variant="babyPink" className="font-bold text-xs uppercase tracking-wider">\s*Como Fazemos a Mágica Acontecer ✨\s*<\/Badge>/,
  '<Badge variant="default" className="text-xs bg-pink-500 text-white border-transparent hover:bg-pink-600 font-bold uppercase tracking-wider">\n              Como Fazemos a Mágica Acontecer ✨\n            </Badge>'
);

content = content.replace(
  /<Badge variant="babyBlue" className="font-bold text-xs uppercase tracking-wider">\s*Comunidade Maker Apaixonada\s*<\/Badge>/,
  '<Badge variant="default" className="text-xs bg-sky-500 text-white border-transparent hover:bg-sky-600 font-bold uppercase tracking-wider">\n              Comunidade Maker Apaixonada\n            </Badge>'
);

fs.writeFileSync(path, content, 'utf8');

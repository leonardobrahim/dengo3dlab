const fs = require('fs');
const path = 'src/pages/public/HomePage.tsx';
let content = fs.readFileSync(path, 'utf8');

const regexToRemove = /<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white\/90 dark:bg-card\/90 border border-pink-200 dark:border-pink-900\/60 shadow-2xs backdrop-blur-xs">[\s\S]*?Coleção Candy Silk 2026[\s\S]*?<\/div>\s*/;

content = content.replace(regexToRemove, '');

fs.writeFileSync(path, content, 'utf8');

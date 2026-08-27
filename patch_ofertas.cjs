const fs = require('fs');
const path = 'src/layouts/store/StoreHeader.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /bg-rose-100\/70 text-rose-700 dark:bg-rose-950\/60 dark:text-rose-300/g,
  'bg-white/20 text-white shadow-sm'
).replace(
  /text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950\/30/g,
  'text-white/90 hover:text-white hover:bg-white/10'
);

fs.writeFileSync(path, content, 'utf8');

const fs = require('fs');
const path = 'src/pages/public/HomePage.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  'rounded-full bg-pink-100 dark:bg-pink-950/60 items-center justify-center text-pink-600',
  'rounded-full bg-pink-500 items-center justify-center text-white shadow-sm'
).replace(
  'rounded-full bg-sky-100 dark:bg-sky-950/60 items-center justify-center text-sky-600',
  'rounded-full bg-sky-500 items-center justify-center text-white shadow-sm'
).replace(
  'rounded-full bg-rose-100 dark:bg-rose-950/60 items-center justify-center text-rose-600',
  'rounded-full bg-rose-500 items-center justify-center text-white shadow-sm'
);

fs.writeFileSync(path, content, 'utf8');

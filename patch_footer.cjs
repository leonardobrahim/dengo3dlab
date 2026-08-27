const fs = require('fs');
const path = 'src/layouts/store/StoreFooter.tsx';
let content = fs.readFileSync(path, 'utf8');

// Features
content = content.replace(
  'rounded-2xl bg-pink-100 dark:bg-pink-950/80 text-pink-500 shadow-2xs',
  'rounded-2xl bg-pink-500 text-white shadow-sm'
).replace(
  'rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-sky-500 shadow-2xs',
  'rounded-2xl bg-sky-500 text-white shadow-sm'
).replace(
  'rounded-2xl bg-pink-100 dark:bg-pink-950/80 text-pink-500 shadow-2xs',
  'rounded-2xl bg-pink-500 text-white shadow-sm'
).replace(
  'rounded-2xl bg-sky-100 dark:bg-sky-950/80 text-sky-500 shadow-2xs',
  'rounded-2xl bg-sky-500 text-white shadow-sm'
);

// Social Icons
content = content.replace(
  'rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 hover:bg-pink-200 transition-colors',
  'rounded-xl bg-pink-500 text-white hover:bg-pink-600 shadow-sm transition-colors'
).replace(
  'rounded-xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 hover:bg-sky-200 transition-colors',
  'rounded-xl bg-sky-500 text-white hover:bg-sky-600 shadow-sm transition-colors'
).replace(
  'rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 hover:bg-emerald-200 transition-colors',
  'rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm transition-colors'
);

fs.writeFileSync(path, content, 'utf8');

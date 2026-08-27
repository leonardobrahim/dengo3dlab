const fs = require('fs');
const path = 'src/pages/public/HomePage.tsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(
  /<Badge variant="cherry" className="text-xs">\s*Como Fazemos a Mágica Acontecer ✨\s*<\/Badge>/,
  '<Badge variant="default" className="text-xs bg-pink-500 text-white border-transparent hover:bg-pink-600">\n              Como Fazemos a Mágica Acontecer ✨\n            </Badge>'
);

// Fix numbers
content = content.replace(
  'rounded-2xl bg-pink-100 dark:bg-pink-950/70 text-pink-600',
  'rounded-2xl bg-pink-500 text-white shadow-sm'
).replace(
  'rounded-2xl bg-sky-100 dark:bg-sky-950/70 text-sky-600',
  'rounded-2xl bg-sky-500 text-white shadow-sm'
).replace(
  'rounded-2xl bg-purple-100 dark:bg-purple-950/70 text-purple-600',
  'rounded-2xl bg-purple-500 text-white shadow-sm'
).replace(
  'rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600',
  'rounded-2xl bg-emerald-500 text-white shadow-sm'
);

// Fix icons section (around line 410)
content = content.replace(
  'rounded-2xl bg-pink-100 text-pink-600',
  'rounded-2xl bg-pink-500 text-white shadow-sm'
).replace(
  'rounded-2xl bg-sky-100 text-sky-600',
  'rounded-2xl bg-sky-500 text-white shadow-sm'
).replace(
  'rounded-2xl bg-purple-100 text-purple-600',
  'rounded-2xl bg-purple-500 text-white shadow-sm'
).replace(
  'rounded-2xl bg-rose-100 text-rose-600',
  'rounded-2xl bg-rose-500 text-white shadow-sm'
);

fs.writeFileSync(path, content, 'utf8');

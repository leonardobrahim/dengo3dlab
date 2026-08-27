const fs = require('fs');
const path = 'src/layouts/store/StoreHeader.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Fix Wishlist Button
content = content.replace(
  'variant="outline"\n            size="icon-sm"\n            onClick={() => navigate(\'/minha-conta/favoritos\')}\n            className="relative border-white/30 hover:bg-white/20 text-white"',
  'variant="ghost"\n            size="icon-sm"\n            onClick={() => navigate(\'/minha-conta/favoritos\')}\n            className="relative border border-white/30 hover:bg-white/20 text-white"'
);

// 2. Add 'Início' to Desktop Nav
const navStart = `<nav className="hidden lg:flex items-center gap-1 font-medium text-xs">`;
const navHome = `
          <button
            onClick={() => navigate('/')}
            className={\`px-3.5 py-2 rounded-xl transition-all cursor-pointer select-none \${
              currentPath === '/'
                ? 'bg-white/20 text-white shadow-sm font-bold'
                : 'text-white/90 hover:text-white hover:bg-white/10'
            }\`}
          >
            Início
          </button>`;

content = content.replace(navStart, navStart + navHome);

fs.writeFileSync(path, content, 'utf8');

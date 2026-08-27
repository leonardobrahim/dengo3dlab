const fs = require('fs');
const path = 'src/pages/public/HomePage.tsx';
let content = fs.readFileSync(path, 'utf8');

const regexToRemove = /<div className="relative w-full max-w-sm rounded-full overflow-hidden shadow-2xl bg-white\/20 p-4 border-4 border-white\/50 backdrop-blur-sm">[\s\S]*?<\/div>\s*<\/div>/;

const newCard = `<button 
                onClick={() => navigate('/')}
                className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-[280px] md:h-[280px] rounded-full overflow-hidden shadow-2xl bg-white/20 p-3 sm:p-4 border-4 border-white/50 backdrop-blur-sm group cursor-pointer transition-all hover:shadow-pink-500/20 hover:border-white focus:outline-none focus:ring-4 focus:ring-white/80"
                aria-label="Ir para o início"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img src="/logo.jpg" alt="Dengo 3D Logo" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
              </button>`;

content = content.replace(regexToRemove, newCard);

fs.writeFileSync(path, content, 'utf8');

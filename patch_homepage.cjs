const fs = require('fs');
const path = 'src/pages/public/HomePage.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /\{\/\* Right Hero Visual Card \*\/\}([\s\S]*?)<\/section>/;

const newContent = `{/* Right Hero Visual Card */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative w-full max-w-sm rounded-full overflow-hidden shadow-2xl bg-white/20 p-4 border-4 border-white/50 backdrop-blur-sm">
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img src="/logo.jpg" alt="Dengo 3D Logo" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </section>`;

content = content.replace(regex, newContent);

fs.writeFileSync(path, content, 'utf8');

const fs = require('fs');

const path = 'src/pages/public/ProductDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /<table className="w-full text-left text-xs border-collapse">\s*<tbody>/s;

const replacement = `<table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    {product.origin && (
                      <tr className="border-b border-pink-100 bg-pink-50/50">
                        <td className="p-3.5 font-bold text-slate-700 w-1/3">Origem / Envio</td>
                        <td className="p-3.5 text-slate-800">{product.origin}</td>
                      </tr>
                    )}`;

content = content.replace(regex, replacement);
fs.writeFileSync(path, content, 'utf8');

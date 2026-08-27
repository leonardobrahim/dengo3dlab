const fs = require('fs');

const path = 'src/pages/public/ProductDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /\{\/\* 1\. Material Selector \*\/\}.*?\{\/\* Stock Availability Alert \*\/\}/s;

const newSection = `{product.variants && product.variants.length > 1 && (
              <div className="space-y-6 pt-2 pb-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">
                      Selecione a Variação:{' '}
                      <span className="text-pink-600 font-semibold">{selectedVariant?.name || 'Padrão'}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      const isInStock = v.stockQuantity > 0;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => isInStock && setSelectedVariant(v)}
                          disabled={!isInStock}
                          className={cn(
                            'p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1',
                            isSelected
                              ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-300/30 shadow-xs'
                              : 'border-pink-100 bg-white hover:border-pink-200',
                            !isInStock && 'opacity-50 cursor-not-allowed bg-slate-50'
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {v.colorHex && (
                                <span
                                  className="h-3 w-3 rounded-full border border-slate-300 inline-block shadow-2xs shrink-0"
                                  style={{ backgroundColor: v.colorHex }}
                                />
                              )}
                              <span className="text-xs font-bold text-slate-800">{v.name}</span>
                            </div>
                            {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-pink-500" />}
                          </div>
                          <p className="text-[10px] text-slate-600 line-clamp-1">
                            {!isInStock ? 'Esgotado' : (v.price > 0 ? \`Por R$ \${v.price.toFixed(2).replace('.', ',')}\` : 'Grátis')}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Stock Availability Alert */}`;

content = content.replace(regex, newSection);
fs.writeFileSync(path, content, 'utf8');

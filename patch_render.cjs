const fs = require('fs');

const path = 'src/pages/public/ProductDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

const targetSection = `            {/* ========================================== */}
            {/* CONFIGURATION OPTIONS                      */}
            {/* ========================================== */}
            <div className="space-y-6 pt-2">
              {/* 1. Material & Technology */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    1. Material & Tecnologia: <span className="text-pink-600 font-semibold">{selectedMaterial.name}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                  {MATERIAL_OPTIONS.map((mat) => {
                    const isSelected = selectedMaterial.id === mat.id;
                    return (
                      <button
                        key={mat.id}
                        type="button"
                        onClick={() => setSelectedMaterial(mat)}
                        className={cn(
                          'p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1',
                          isSelected
                            ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-300/30'
                            : 'border-pink-100 bg-white hover:border-pink-200'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">{mat.name}</span>
                          {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-pink-500" />}
                        </div>
                        <p className="text-[10px] text-slate-600 line-clamp-1">{mat.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Color Swatches */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    2. Cor Candy & Acabamento:{' '}
                    <span className="text-pink-600 font-semibold">{selectedColor.name}</span>
                  </span>
                  <span className="text-[11px]">
                    {selectedColor.inStock ? (
                      <span className="text-emerald-700 font-bold">✓ Em estoque</span>
                    ) : (
                      <span className="text-rose-700 font-bold">Esgotado nesta cor</span>
                    )}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {COLOR_OPTIONS.map((c) => {
                    const isSelected = selectedColor.id === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        title={\`\${c.name} \${!c.inStock ? '(Esgotado)' : ''}\`}
                        className={cn(
                          'group relative flex items-center gap-2 px-3 py-1.5 rounded-2xl border text-xs font-semibold transition-all cursor-pointer',
                          isSelected
                            ? 'border-pink-500 bg-pink-50 text-pink-800 ring-2 ring-pink-300/40 shadow-xs'
                            : 'border-pink-200 bg-white text-slate-700 hover:border-pink-300',
                          !c.inStock && 'opacity-60 grayscale-[30%]'
                        )}
                      >
                        <span
                          className="h-4 w-4 rounded-full border border-slate-300 inline-block shadow-2xs shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                        {!c.inStock && (
                          <span className="text-[9px] text-rose-500 font-bold uppercase">(Falta)</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Size / Dimension Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">
                    3. Tamanho & Escala:{' '}
                    <span className="text-pink-600 font-semibold">{selectedSize.label}</span>
                  </span>
                  <span className="text-[11px] text-slate-600">
                    Peso aprox: <strong className="text-slate-800">{selectedSize.weightGrams}g</strong>
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {SIZE_OPTIONS.map((s) => {
                    const isSelected = selectedSize.id === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={cn(
                          'flex flex-col items-center justify-center p-2 rounded-xl border transition-all cursor-pointer space-y-0.5',
                          isSelected
                            ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-300/30 text-pink-700'
                            : 'border-pink-100 bg-white hover:border-pink-200 text-slate-700'
                        )}
                      >
                        <span className="text-xs font-black">{s.label.split(' ')[0]}</span>
                        <span className="text-[9px] text-slate-500 line-clamp-1">{s.dimensions}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>`;

const newSection = `            {/* ========================================== */}
            {/* CONFIGURATION OPTIONS                      */}
            {/* ========================================== */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-6 pt-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">
                      Variações Disponíveis: <span className="text-pink-600 font-semibold">{selectedVariant?.name || 'Selecione'}</span>
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
                              ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-300/30'
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
            )}`;

if (content.includes('1. Material & Tecnologia:')) {
  // Try to find the boundaries
  const startIndex = content.indexOf('            {/* ========================================== */}\n            {/* CONFIGURATION OPTIONS');
  const endIndex = content.indexOf('            {/* ========================================== */}\n            {/* AVAILABILITY NOTIFICATION OR STOCK BADGE');
  
  if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + newSection + "\n\n" + content.substring(endIndex);
    fs.writeFileSync(path, content, 'utf8');
    console.log('Successfully replaced option renders!');
  } else {
    console.log('Could not find start or end index.');
  }
} else {
  console.log('Target text not found.');
}

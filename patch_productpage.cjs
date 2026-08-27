const fs = require('fs');

const path = 'src/pages/public/ProductDetailPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace state
content = content.replace(
  /const \[selectedMaterial, setSelectedMaterial\] = React\.useState\(MATERIAL_OPTIONS\[0\]\);\s*const \[selectedSize, setSelectedSize\] = React\.useState\(SIZE_OPTIONS\[1\]\);\s*\/\/ default M\s*const \[selectedColor, setSelectedColor\] = React\.useState\(COLOR_OPTIONS\[0\]\);/g,
  `const [selectedVariant, setSelectedVariant] = React.useState(product?.variants?.[0] || null);
  
  React.useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product?.id]);
`
);

// Remove the old reset hook
content = content.replace(
  /React\.useEffect\(\(\) => \{\s*if \(product\) \{\s*setSelectedMaterial\(MATERIAL_OPTIONS\[0\]\);\s*setSelectedSize\(SIZE_OPTIONS\[1\]\);\s*setSelectedColor\(COLOR_OPTIONS\[0\]\);\s*setQuantity\(1\);\s*\}\s*\}, \[product\?\.id\]\);/g,
  `React.useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product?.id]);`
);

// Fix pricing logic
content = content.replace(
  /const basePrice = product.variants\[0\]\?\.price \|\| 89\.9;\s*const baseCompareAtPrice = product.variants\[0\]\?\.promotionalPrice\s*\? product.variants\[0\]\?\.price\s*: \(product.variants\[0\]\?\.price \|\| 89\.9\) \* 1\.25;\s*const combinedMultiplier = selectedMaterial\.priceMultiplier \* selectedSize\.priceMultiplier;\s*const currentPrice = Number\(\(basePrice \* combinedMultiplier\)\.toFixed\(2\)\);\s*const currentCompareAtPrice = Number\(\(baseCompareAtPrice \* combinedMultiplier\)\.toFixed\(2\)\);/g,
  `const currentPrice = selectedVariant?.price || product.basePrice || 0;
  const currentCompareAtPrice = selectedVariant?.promotionalPrice || (currentPrice * 1.25);`
);

// Fix sku
content = content.replace(
  /const dynamicSku = `DNG-\$\{product.slug.slice\(0, 8\).toUpperCase\(\)\}-\$\{selectedMaterial.id.toUpperCase\(\)\}-\$\{selectedColor.name.slice\(0, 3\).toUpperCase\(\)\}-\$\{selectedSize.id.toUpperCase\(\)\}`;/g,
  `const dynamicSku = selectedVariant?.sku || \`DNG-\${product.slug.slice(0, 8).toUpperCase()}\`;`
);

// Fix stock
content = content.replace(
  /const isColorOutOfStock = !selectedColor.inStock;\s*const currentStock = isColorOutOfStock \? 0 : 8; \/\/ realistic stock/g,
  `const currentStock = selectedVariant ? selectedVariant.stockQuantity : product.stockTotal || 0;`
);

// Fix add to cart
content = content.replace(
  /const variantNameFormatted = `\$\{selectedMaterial.name\} • \$\{selectedColor.name\} • \$\{selectedSize.label\}`;/g,
  `const variantNameFormatted = selectedVariant?.name || 'Padrão';`
);

content = content.replace(
  /variantId: `\$\{product.id\}-\$\{selectedMaterial.id\}-\$\{selectedColor.id\}-\$\{selectedSize.id\}`/g,
  `variantId: selectedVariant?.id || 'default'`
);

content = content.replace(
  /colorHex: selectedColor.hex,\s*colorName: selectedColor.name,\s*material: selectedMaterial.name,/g,
  `colorHex: selectedVariant?.colorHex,
      colorName: selectedVariant?.colorName,
      material: selectedVariant?.material || product.technicalSpecs?.material,`
);

// Fix shipping calc
content = content.replace(
  /productWeightGrams=\{selectedSize.weightGrams\}/g,
  `productWeightGrams={selectedVariant?.weightGrams || product.technicalSpecs?.weightGrams || 200}`
);

// Write changes back
fs.writeFileSync(path, content, 'utf8');
console.log('Script done!');


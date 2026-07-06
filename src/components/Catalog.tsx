import { useState } from 'react';
import { Search, SlidersHorizontal, Package, ChevronRight, ShoppingCart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { Button } from './ui/Button';

interface CatalogProps {
  onProductSelect: (id: string) => void;
}

export function Catalog({ onProductSelect }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Utilidades', 'Geek', 'Decoração', 'Peças Técnicas'];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search and Filter Area */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar peças 3D, utilidades..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {category}
            </button>
          ))}
          <button className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center gap-2 md:hidden">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
            {/* Image Placeholder */}
            <div className="aspect-square bg-slate-100 relative flex items-center justify-center p-6 cursor-pointer" onClick={() => onProductSelect(product.id)}>
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md border backdrop-blur-sm ${
                  product.status === 'Pronta Entrega' 
                    ? 'bg-emerald-100/90 text-emerald-800 border-emerald-200' 
                    : 'bg-amber-100/90 text-amber-800 border-amber-200'
                }`}>
                  {product.status}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-md border bg-white/90 text-slate-700 border-slate-200 backdrop-blur-sm w-fit">
                  {product.category}
                </span>
              </div>
              
              <div className="w-32 h-32 bg-rose-500/20 rounded-xl transform group-hover:scale-110 transition-transform duration-500 rotate-12 shadow-inner border border-rose-500/30"></div>
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-semibold text-slate-900 leading-snug line-clamp-2 cursor-pointer hover:text-rose-600" onClick={() => onProductSelect(product.id)}>
                {product.name}
              </h3>
              
              <div className="mt-auto pt-4 flex items-end justify-between">
                <div>
                  <div className="text-xs text-slate-500 font-medium mb-0.5">A partir de</div>
                  <div className="font-black text-xl text-rose-600">R$ {product.price.toFixed(2).replace('.', ',')}</div>
                </div>
                
                <Button 
                  onClick={() => onProductSelect(product.id)}
                  className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                  title="Configurar Impressão"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-slate-900">Nenhum modelo encontrado</h3>
          <p className="text-slate-500">Tente buscar por outros termos ou categorias.</p>
        </div>
      )}
    </div>
  );
}

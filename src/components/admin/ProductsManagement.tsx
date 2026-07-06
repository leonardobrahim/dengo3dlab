import { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { MOCK_PRODUCTS, Product } from '../../data/products';

export function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'Todos' | 'Pronta Entrega' | 'Sob Encomenda'>('Todos');

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'Todos' || p.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produtos e Estoque</h1>
          <p className="text-slate-500">Gerencie seu catálogo, custos e tempos de impressão.</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Novo Produto
        </Button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar produto..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
          {['Todos', 'Pronta Entrega', 'Sob Encomenda'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                filter === f
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Produto</th>
                <th className="p-4 font-semibold">Categoria</th>
                <th className="p-4 font-semibold">Custo</th>
                <th className="p-4 font-semibold">Preço Final</th>
                <th className="p-4 font-semibold">Margem</th>
                <th className="p-4 font-semibold text-center">Estoque</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((product) => {
                const margin = ((product.price - product.cost) / product.price) * 100;
                return (
                  <tr key={product.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <div className="text-xs font-mono text-slate-500">#{product.id}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-900 text-sm line-clamp-1" title={product.name}>{product.name}</div>
                    </td>
                    <td className="p-4 text-sm text-slate-600">{product.category}</td>
                    <td className="p-4 text-sm text-slate-600">R$ {product.cost.toFixed(2).replace('.', ',')}</td>
                    <td className="p-4 font-semibold text-rose-600">R$ {product.price.toFixed(2).replace('.', ',')}</td>
                    <td className="p-4 text-sm text-emerald-600 font-medium">{margin.toFixed(1)}%</td>
                    <td className="p-4 text-center">
                      <span className={`font-bold ${product.stock > 0 ? 'text-slate-900' : 'text-slate-400'}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md border whitespace-nowrap ${
                        product.status === 'Pronta Entrega' 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-slate-400 hover:text-indigo-600 rounded bg-white border border-slate-200 shadow-sm" title="Editar">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-rose-600 rounded bg-white border border-slate-200 shadow-sm" title="Excluir">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-500">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

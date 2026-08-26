import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { mockProducts } from '@/src/mocks/products';
import { useToast } from '@/src/components/ui/Toast';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { Plus, Search, Edit2, Trash2, Copy, PowerOff } from 'lucide-react';
import { formatCurrency, formatDate } from '@/src/utils/formatters';

export const AdminProductsPage: React.FC = () => {
  const { toast } = useToast();
  const { navigate } = useNavigationStore();
  
  const [searchTerm, setSearchTerm] = React.useState('');
  const [products, setProducts] = React.useState(mockProducts);
  
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success('Produto 3D removido do catálogo');
  };
  
  const handleAction = (action: string, name: string) => {
    toast.info(`${action}: ${name}`);
  }

  return (
    <AdminLayout currentPageTitle="Catálogo de Peças & Filamentos" currentPageBreadcrumb="Produtos">
      <div className="space-y-6 text-left">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-foreground">Gerenciar Produtos</h1>
            <p className="text-xs text-muted-foreground">
              Cadastre e edite modelos 3D, variantes de filamento, especificações técnicas e estoque
            </p>
          </div>
          <Button
            variant="dengo"
            size="sm"
            onClick={() => navigate('/admin/produtos/novo')}
            className="text-xs font-bold gap-1.5 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Modelo 3D</span>
          </Button>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-2xl border border-pink-200/70 dark:border-pink-900/40 bg-card">
          <div className="relative max-w-md">
            <Input
              placeholder="Buscar por nome, categoria ou SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-9"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>

        {/* Product Table */}
        <div className="rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-pink-50/50 dark:bg-card border-b border-border text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Produto</th>
                <th className="p-4">SKU / ID</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Preço Base</th>
                <th className="p-4">Estoque</th>
                <th className="p-4">Status</th>
                <th className="p-4">Atualizado</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-pink-50/20 dark:hover:bg-card/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.featuredImage || prod.images[0]}
                        alt={prod.name}
                        className="h-10 w-10 rounded-xl object-cover border border-pink-100 dark:border-border shrink-0"
                      />
                      <div className="min-w-0 max-w-xs">
                        <p className="font-bold text-foreground truncate">{prod.name}</p>
                        <p className="text-[10px] text-muted-foreground">{prod.variants?.length || 0} variações</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-[10px] text-muted-foreground">
                    DNG-{prod.id.split('-').pop()?.toUpperCase()}
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground">{prod.categories[0]?.name || '-'}</span>
                  </td>
                  <td className="p-4 font-bold text-foreground">
                    {formatCurrency(prod.basePrice)}
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-emerald-600">
                      {prod.variants?.reduce((acc, v) => acc + (v.stockQuantity || 0), 0) || 12} un.
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant="candy">Ativo</Badge>
                  </td>
                  <td className="p-4 text-muted-foreground text-[10px]">
                    {formatDate(new Date().toISOString())}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        title="Editar"
                        onClick={() => navigate('/admin/produtos/novo')}
                        className="p-1.5 text-muted-foreground hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-colors"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        title="Duplicar"
                        onClick={() => handleAction('Duplicar', prod.name)}
                        className="p-1.5 text-muted-foreground hover:text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                      <button
                        title="Desativar"
                        onClick={() => handleAction('Desativar', prod.name)}
                        className="p-1.5 text-muted-foreground hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                      >
                        <PowerOff className="h-3.5 w-3.5" />
                      </button>
                      <button
                        title="Excluir"
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 text-muted-foreground hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

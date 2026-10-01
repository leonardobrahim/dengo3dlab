import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { OrderStatusBadge } from '@/src/components/business/OrderStatusBadge';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useToast } from '@/src/components/ui/Toast';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { mockOrders } from '@/src/mocks/orders';
import { Search, Eye, Filter } from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '@/src/utils/formatters';

export const AdminOrdersPage: React.FC = () => {
  const { toast } = useToast();
  const { navigate } = useNavigationStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  
  const filtered = mockOrders.filter((o) => {
    const matchSearch = o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        o.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">Pedidos</h1>
            <p className="text-xs text-muted-foreground">
              Acompanhe todos os pedidos da loja
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-2xl border border-border bg-card flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Input
              placeholder="Buscar por número do pedido ou cliente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-xs pl-9"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          </div>
          <div className="flex gap-2">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-background border border-border rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20"
            >
              <option value="all">Todos os Status</option>
              <option value="pending">Aguardando Pagamento</option>
              <option value="confirmed">Confirmado</option>
              <option value="in_production">Em Produção</option>
              <option value="ready_to_ship">Pronto para Envio</option>
              <option value="shipped">Enviado</option>
              <option value="delivered">Entregue</option>
              <option value="cancelled">Cancelado</option>
            </select>
            <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="rounded-3xl border border-border bg-card overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Pedido</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Data</th>
                <th className="p-4">Valor Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-mono font-bold text-foreground">
                    {order.orderNumber}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-foreground">{order.customerName}</p>
                    <p className="text-[10px] text-muted-foreground">{order.customerEmail}</p>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {formatDate(order.createdAt)} <br /> {formatTime(order.createdAt)}
                  </td>
                  <td className="p-4 font-bold text-foreground">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="p-4">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="p-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigate(`/admin/pedidos/${order.id}`)}
                      className="text-[10px]"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" /> Visualizar
                    </Button>
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

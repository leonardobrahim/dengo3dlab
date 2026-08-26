import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { Avatar } from '@/src/components/ui/Avatar';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { formatCurrency, formatDate } from '@/src/utils/formatters';
import { ArrowLeft, Mail, Phone, MapPin, ShoppingBag, Calendar, Lock } from 'lucide-react';

export interface AdminCustomerDetailPageProps {
  id?: string;
}

export const AdminCustomerDetailPage: React.FC<AdminCustomerDetailPageProps> = ({ id: propId }) => {
  const { params, navigate } = useNavigationStore();
  const customerId = propId || params.id;

  const mockCustomer = {
    id: customerId,
    name: 'Maria Maker Dengo',
    email: 'maker@dengo3d.com',
    phone: '(11) 98765-4321',
    createdAt: '2025-10-12T14:00:00Z',
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stats: {
      totalOrders: 5,
      totalSpent: 642.50,
      averageOrderValue: 128.50,
    },
    addresses: [
      { id: 1, type: 'Casa', street: 'Rua das Flores', number: '123', city: 'São Paulo', state: 'SP', zip: '01234-567', default: true }
    ],
    recentOrders: [
      { id: 'DENGO-8942', date: '2026-08-24T14:20:00Z', total: 164.80, status: 'in_production' },
      { id: 'DENGO-8120', date: '2026-06-15T10:00:00Z', total: 120.00, status: 'delivered' },
    ]
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/clientes')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-4">
              <Avatar src={mockCustomer.avatar} alt={mockCustomer.name} size="lg" />
              <div>
                <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
                  {mockCustomer.name}
                  {mockCustomer.status === 'active' ? <Badge variant="candy">Ativo</Badge> : <Badge variant="outline">Inativo</Badge>}
                </h1>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-3">
                  <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {mockCustomer.email}</span>
                  <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {mockCustomer.phone}</span>
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
              <Lock className="h-3.5 w-3.5 mr-1" /> Bloquear Usuário
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Stats & Orders */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-2xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Total Gasto</p>
                <p className="text-xl font-black text-emerald-600">{formatCurrency(mockCustomer.stats.totalSpent)}</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Pedidos</p>
                <p className="text-xl font-black text-foreground">{mockCustomer.stats.totalOrders}</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Ticket Médio</p>
                <p className="text-xl font-black text-foreground">{formatCurrency(mockCustomer.stats.averageOrderValue)}</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <ShoppingBag className="h-4 w-4" /> Histórico de Pedidos
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs whitespace-nowrap">
                  <thead className="bg-muted text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
                    <tr>
                      <th className="p-3">Pedido</th>
                      <th className="p-3">Data</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {mockCustomer.recentOrders.map(order => (
                      <tr key={order.id} className="hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => navigate(`/admin/pedidos/${order.id}`)}>
                        <td className="p-3 font-mono font-bold text-foreground">{order.id}</td>
                        <td className="p-3 text-muted-foreground">{formatDate(order.date)}</td>
                        <td className="p-3 font-bold">{formatCurrency(order.total)}</td>
                        <td className="p-3"><Badge variant="outline">{order.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Conta
              </h2>
              <div className="text-xs space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cliente desde</span>
                  <span className="font-bold">{formatDate(mockCustomer.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID do Usuário</span>
                  <span className="font-mono text-[10px] bg-muted px-1.5 py-0.5 rounded">{mockCustomer.id}</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Endereços
              </h2>
              <div className="space-y-4">
                {mockCustomer.addresses.map(addr => (
                  <div key={addr.id} className="text-xs bg-muted p-3 rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-foreground">{addr.type}</span>
                      {addr.default && <Badge variant="candy" className="text-[9px] px-1 py-0">Padrão</Badge>}
                    </div>
                    <p className="text-muted-foreground">{addr.street}, {addr.number}</p>
                    <p className="text-muted-foreground">{addr.city} - {addr.state}</p>
                    <p className="text-muted-foreground">CEP: {addr.zip}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

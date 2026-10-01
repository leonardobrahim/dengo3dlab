import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { Button } from '@/src/components/ui/Button';
import { OrderStatusBadge } from '@/src/components/business/OrderStatusBadge';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/components/ui/Toast';
import { mockOrders } from '@/src/mocks/orders';
import { formatCurrency, formatDate, formatTime } from '@/src/utils/formatters';
import { ArrowLeft, Printer, Box, CheckCircle, Truck, XCircle, RefreshCcw, MapPin, User, FileText } from 'lucide-react';
import { OrderStatus } from '@/src/types';

export interface AdminOrderDetailPageProps {
  id?: string;
}

export const AdminOrderDetailPage: React.FC<AdminOrderDetailPageProps> = ({ id: propId }) => {
  const { params, navigate } = useNavigationStore();
  const { toast } = useToast();
  
  const orderId = propId || params.id;
  const order = mockOrders.find(o => o.id === orderId) || mockOrders[0];

  const handleAction = (action: string) => {
    toast.success(`Ação registrada: ${action}`);
  };

  if (!order) return null;

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-20">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/pedidos')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-black text-foreground">Pedido {order.orderNumber}</h1>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Realizado em {formatDate(order.createdAt)} às {formatTime(order.createdAt)}
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {(order.status === 'pending' || order.status === 'confirmed') && (
              <Button variant="outline" size="sm" onClick={() => handleAction('Cancelar')}>
                <XCircle className="h-3.5 w-3.5 mr-1" /> Cancelar
              </Button>
            )}
            {(order.status === 'pending') && (
              <Button variant="dengo" size="sm" onClick={() => handleAction('Confirmar Pagamento')}>
                <CheckCircle className="h-3.5 w-3.5 mr-1" /> Confirmar
              </Button>
            )}
            {(order.status === 'confirmed') && (
              <Button variant="dengo" size="sm" onClick={() => handleAction('Enviar para Produção')}>
                <Printer className="h-3.5 w-3.5 mr-1" /> Produzir
              </Button>
            )}
            {(order.status === 'in_production') && (
              <Button variant="dengo" size="sm" onClick={() => handleAction('Marcar Pronto')}>
                <Box className="h-3.5 w-3.5 mr-1" /> Pronto
              </Button>
            )}
            {(order.status === 'ready_to_ship') && (
              <Button variant="dengo" size="sm" onClick={() => handleAction('Enviar')}>
                <Truck className="h-3.5 w-3.5 mr-1" /> Enviar
              </Button>
            )}
            {(order.status === 'shipped' || order.status === 'delivered') && (
              <Button variant="outline" size="sm" onClick={() => handleAction('Reembolsar')}>
                <RefreshCcw className="h-3.5 w-3.5 mr-1" /> Reembolsar
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Items */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-bold text-foreground mb-4">Itens do Pedido</h2>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img src={item.imageUrl} alt={item.name} className="h-16 w-16 object-cover rounded-xl border border-border shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.variantName}</p>
                      <p className="text-[10px] text-muted-foreground font-mono mt-1">SKU: {item.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">{formatCurrency(item.unitPrice)}</p>
                      <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frete</span>
                  <span>{formatCurrency(order.shippingCost)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Desconto</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base text-foreground pt-2">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Production */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Printer className="h-4 w-4" /> Produção
              </h2>
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-xs p-3 bg-muted rounded-xl">
                    <span>{item.name}</span>
                    <span className="font-bold text-pink-600">Aguardando...</span>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <User className="h-4 w-4" /> Cliente
              </h2>
              <p className="text-sm font-bold text-foreground">{order.customerName}</p>
              <p className="text-xs text-muted-foreground mt-1">{order.customerEmail}</p>
              <Button variant="link" size="sm" className="px-0 mt-2 h-auto text-sky-600" onClick={() => navigate(`/admin/clientes/${order.userId}`)}>Ver Perfil do Cliente</Button>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Endereço de Envio
              </h2>
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="text-sm font-bold text-foreground">{order.shippingAddress.recipientName}</p>
                <p>{order.shippingAddress.street}, {order.shippingAddress.number} {order.shippingAddress.complement}</p>
                <p>{order.shippingAddress.neighborhood}</p>
                <p>{order.shippingAddress.city} - {order.shippingAddress.state}</p>
                <p>CEP: {order.shippingAddress.zipCode}</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <Truck className="h-4 w-4" /> Envio & Rastreamento
              </h2>
              <p className="text-xs text-muted-foreground">Sem código de rastreamento ainda.</p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-4 w-4" /> Observações
              </h2>
              <textarea 
                className="w-full text-xs p-3 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500/20" 
                rows={3} 
                placeholder="Adicionar nota interna (cliente não vê)..."
              ></textarea>
              <Button variant="secondary" size="sm" className="w-full mt-2" onClick={() => handleAction('Salvar Observação')}>Salvar Nota</Button>
            </div>

          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { CheckCircle2, Package, MapPin, CreditCard, ArrowRight, Truck } from 'lucide-react';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { orderService } from '@/src/services/orders/orderService';
import { OrderTimeline } from '@/src/components/business/OrderTimeline';
import { formatCurrency } from '@/src/utils/formatters';
import { Order } from '@/src/types';

export const OrderSuccessPage: React.FC<{ orderId?: string }> = ({ orderId = '000000' }) => {
  const { navigate } = useNavigationStore();
  
  const [order, setOrder] = React.useState<Order | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getOrderById(orderId);
        setOrder(response.data);
      } catch (err) {
        // Fallback or error handled gracefully
        console.error('Pedido não encontrado', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <StoreLayout>
        <div className="flex h-screen items-center justify-center">
          <div className="flex items-center gap-2 text-pink-500 font-bold animate-pulse">
            <span className="h-4 w-4 rounded-full bg-pink-500 block"></span>
            Carregando Pedido...
          </div>
        </div>
      </StoreLayout>
    );
  }

  if (!order) {
    return (
      <StoreLayout>
        <div className="flex flex-col h-[60vh] items-center justify-center space-y-4">
          <h2 className="text-2xl font-black">Pedido não encontrado</h2>
          <Button variant="dengo" onClick={() => navigate('/')}>Voltar à Loja</Button>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="max-w-3xl mx-auto py-12 text-center space-y-8 px-4">
        <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-3xl bg-emerald-100 text-emerald-500 shadow-sm animate-in zoom-in duration-500">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>

        <div className="space-y-3">
          <Badge variant="emerald" className="font-bold text-xs uppercase px-3 py-1">
            Pedido Confirmado
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Acompanhe seu pedido
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto">
            O seu pedido <strong>#{order.orderNumber}</strong> foi processado. Você receberá atualizações por e-mail sobre a produção 3D e o envio.
          </p>
        </div>

        {/* Timeline / Rastreamento Publico */}
        <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 text-left shadow-sm mt-8">
          <h2 className="font-bold text-lg text-foreground border-b border-border pb-3 mb-6 flex items-center gap-2">
            <Truck className="h-5 w-5 text-sky-500" /> Status do Pedido
          </h2>
          <OrderTimeline order={order} />
        </div>

        {/* Resumo do Pedido */}
        <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 text-left shadow-sm mt-8 space-y-6">
          <h2 className="font-bold text-lg text-foreground border-b border-border pb-3">Resumo do Pedido</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <MapPin className="h-4 w-4 text-pink-500" /> Endereço
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {order.shippingAddress.recipientName}<br/>
                {order.shippingAddress.street}, {order.shippingAddress.number}<br/>
                {order.shippingAddress.city} - {order.shippingAddress.state}
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <CreditCard className="h-4 w-4 text-sky-500" /> Pagamento
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {order.payment?.method === 'pix' ? 'PIX' : order.payment?.method === 'boleto' ? 'Boleto' : 'Cartão de Crédito'}<br/>
                {formatCurrency(order.total)}<br/>
                {order.payment?.status === 'paid' ? 'Aprovado' : 'Aguardando Pagamento'}
              </p>
            </div>

            <div className="space-y-2 lg:col-span-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Package className="h-4 w-4 text-amber-500" /> Produtos
              </div>
              <div className="space-y-3 mt-2">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <img src={item.imageUrl} alt={item.name} className="h-10 w-10 rounded-lg object-cover bg-muted border border-border" />
                    <div>
                      <p className="font-bold text-foreground truncate">{item.name}</p>
                      <p className="text-muted-foreground">Qtd: {item.quantity} • {formatCurrency(item.totalPrice)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate('/minha-conta')}
            className="font-bold"
          >
            Acessar Minha Conta
          </Button>
          <Button
            variant="dengo"
            size="lg"
            onClick={() => navigate('/')}
            className="font-bold gap-2"
          >
            Continuar Comprando <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </StoreLayout>
  );
};

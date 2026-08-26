import * as React from 'react';
import { AccountLayout } from '@/src/layouts/account/AccountLayout';
import { Button } from '@/src/components/ui/Button';
import { OrderStatusBadge } from '@/src/components/business/OrderStatusBadge';
import { OrderTimeline } from '@/src/components/business/OrderTimeline';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { ArrowLeft, Package, Truck, Copy, ExternalLink, RotateCcw, MessageSquare, MapPin, CreditCard } from 'lucide-react';
import { formatCurrency, formatDate, formatTime } from '@/src/utils/formatters';
import { mockOrders } from '@/src/mocks/orders';
import { useToast } from '@/src/components/ui/Toast';
import { ReviewFormModal } from '@/src/components/business/ReviewFormModal';

export const OrderDetailPage: React.FC<{ orderId?: string }> = ({ orderId }) => {
  const { navigate, params } = useNavigationStore();
  const { toast } = useToast();
  const [reviewModalOpen, setReviewModalOpen] = React.useState(false);

  // If orderId isn't passed as prop, try to get from params
  const idToFind = orderId || params?.id;
  const order = mockOrders.find(o => o.id === idToFind);

  if (!order) {
    return (
      <AccountLayout currentPageTitle="Detalhes do Pedido" currentPageBreadcrumb="Detalhes do Pedido">
        <div className="text-center py-12 space-y-4">
          <Package className="h-12 w-12 text-slate-300 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">Pedido não encontrado</h2>
          <Button variant="outline" onClick={() => navigate('/minha-conta/pedidos')}>Voltar para Meus Pedidos</Button>
        </div>
      </AccountLayout>
    );
  }

  const handleCopyTracking = () => {
    if (order.shipment?.trackingCode) {
      navigator.clipboard.writeText(order.shipment.trackingCode);
      toast.success('Código copiado!', 'Código de rastreio copiado para a área de transferência.');
    }
  };

  const handleBuyAgain = () => {
    toast.success('Adicionado ao carrinho', 'Os itens foram adicionados ao carrinho novamente.');
    navigate('/carrinho');
  };

  const paymentMethodMap: Record<string, string> = {
    credit_card: 'Cartão de Crédito',
    pix: 'PIX',
    boleto: 'Boleto Bancário',
    installments: 'Parcelado',
  };

  return (
    <AccountLayout currentPageTitle={`Pedido ${order.orderNumber}`} currentPageBreadcrumb="Detalhes">
      <div className="space-y-6 text-left pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/minha-conta/pedidos')}
              className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-foreground">{order.orderNumber}</h1>
                <OrderStatusBadge status={order.status} />
              </div>
              <p className="text-xs text-muted-foreground">
                Realizado em {formatDate(order.createdAt)} às {formatTime(order.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleBuyAgain} className="gap-2">
              <RotateCcw className="h-4 w-4" /> Comprar Novamente
            </Button>
            {order.status === 'delivered' && (
              <Button variant="dengo" size="sm" onClick={() => setReviewModalOpen(true)} className="gap-2">
                <MessageSquare className="h-4 w-4" /> Avaliar Produto
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content: Tracking & Items */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Rastreamento Box */}
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-5">
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Truck className="h-5 w-5 text-sky-500" /> Acompanhamento
                </h2>
                {order.shipment?.trackingCode && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-slate-700 dark:text-slate-300">
                      {order.shipment.trackingCode}
                    </span>
                    <button 
                      onClick={handleCopyTracking}
                      className="text-slate-400 hover:text-sky-500 transition-colors p-1"
                      title="Copiar Código"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <OrderTimeline order={order} />
              
              {order.shipment?.trackingCode && (
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                  <Button variant="outline" size="sm" className="gap-2 text-xs">
                    Acompanhar na {order.shipment.carrierName} <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Itens */}
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
                <Package className="h-5 w-5 text-pink-500" /> Produtos do Pedido
              </h2>
              
              <div className="space-y-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 text-sm pb-4 border-b border-slate-50 dark:border-slate-800/50 last:border-0 last:pb-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-16 w-16 rounded-xl object-cover border border-slate-100 dark:border-slate-800 shrink-0 bg-slate-50"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{item.name}</p>
                      <p className="text-xs text-slate-500 truncate">{item.variantName}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-slate-900 dark:text-slate-100">{formatCurrency(item.totalPrice)}</p>
                      <p className="text-xs text-slate-500">Qtd: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar: Details */}
          <div className="space-y-6">
            
            {/* Resumo Financeiro */}
            <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-4">Resumo Financeiro</h3>
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete ({order.shipment?.carrierName || 'Padrão'})</span>
                  <span>{formatCurrency(order.shippingCost)}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Desconto</span>
                    <span>-{formatCurrency(order.discount)}</span>
                  </div>
                )}
                <div className="pt-2 mt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between font-black text-sm text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-pink-600">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" /> Endereço de Entrega
              </h3>
              <div className="text-xs text-slate-500 leading-relaxed">
                <p className="font-semibold text-slate-700 dark:text-slate-300">{order.shippingAddress.recipientName}</p>
                <p>{order.shippingAddress.street}, {order.shippingAddress.number} {order.shippingAddress.complement && `- ${order.shippingAddress.complement}`}</p>
                <p>{order.shippingAddress.neighborhood}</p>
                <p>{order.shippingAddress.city} - {order.shippingAddress.state}</p>
                <p>CEP: {order.shippingAddress.zipCode}</p>
              </div>
            </div>

            {/* Pagamento */}
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-3 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-slate-400" /> Pagamento
              </h3>
              <div className="text-xs text-slate-500 leading-relaxed">
                <p className="font-semibold text-slate-700 dark:text-slate-300">{paymentMethodMap[order.payment?.method || 'credit_card']}</p>
                {order.payment?.status === 'paid' ? (
                  <p className="text-emerald-600 font-medium">Aprovado em {order.payment.paidAt ? formatDate(order.payment.paidAt) : 'Data não disponível'}</p>
                ) : (
                  <p className="text-amber-600 font-medium">Aguardando Pagamento</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {reviewModalOpen && (
        <ReviewFormModal 
          orderId={order.id} 
          onClose={() => setReviewModalOpen(false)} 
          onSubmit={() => {
            toast.success('Avaliação enviada!', 'Obrigado pelo seu feedback.');
            setReviewModalOpen(false);
          }}
        />
      )}
    </AccountLayout>
  );
};

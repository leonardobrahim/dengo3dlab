import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { QuantitySelector } from '@/src/components/business/QuantitySelector';
import { CouponInput } from '@/src/components/business/CouponInput';
import { ShippingCalculator } from '@/src/components/business/ShippingCalculator';
import { EmptyState } from '@/src/components/feedback/EmptyState';
import { useCartStore } from '@/src/stores/cartStore';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/components/ui/Toast';
import { cartService } from '@/src/services/cart/cartService';
import { Trash2, ArrowRight, ShoppingBag, Tag, Sparkles, ShieldCheck, Truck } from 'lucide-react';
import { formatCurrency } from '@/src/utils/formatters';
import { ShippingQuoteOption } from '@/src/types';

export const CartPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    coupon,
    setCoupon,
    getSubtotal,
    getDiscount,
    getTotal,
    setShippingCost,
  } = useCartStore();

  const [cep, setCep] = React.useState('');
  const [shippingValue, setShippingValue] = React.useState<number>(0);
  const [selectedShipping, setSelectedShipping] = React.useState<ShippingQuoteOption | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  const handleShippingSelect = (option: ShippingQuoteOption) => {
    setSelectedShipping(option);
    setShippingValue(option.price);
    setShippingCost(option.price);
  };

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Carrinho de Compras', isCurrent: true },
  ];

  if (items.length === 0) {
    return (
      <StoreLayout>
        <div className="space-y-6 text-left">
          <Breadcrumb items={breadcrumbs} onNavigate={navigate} />
          <EmptyState
            title="Seu carrinho está vazio"
            description="Nossa lontrinha está esperando você escolher uma peça articulada fofa ou filamentos candy colors!"
            actionLabel="Explorar Catálogo"
            onAction={() => navigate('/produtos')}
          />
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="space-y-8 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="flex items-center justify-between pb-2 border-b border-pink-100 dark:border-pink-950/60">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Meu Carrinho ({items.length} itens)
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearCart}
            className="text-xs text-rose-500 hover:text-rose-600"
          >
            Limpar Carrinho
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List (Left Col) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-3xl border border-pink-100 bg-white"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="h-20 w-20 rounded-2xl object-cover border border-pink-100 shrink-0 bg-pink-50"
                  />
                  <div className="space-y-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{item.productName}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      {item.colorHex && (
                        <span
                          className="h-3.5 w-3.5 rounded-full border border-pink-200"
                          style={{ backgroundColor: item.colorHex }}
                        />
                      )}
                      <span>{item.variantName}</span>
                    </div>
                    <p className="text-xs font-black text-pink-600">
                      {formatCurrency(item.unitPrice)} cada
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <QuantitySelector
                    value={item.quantity}
                    max={item.maxStock}
                    size="sm"
                    onChange={(newQty) => updateQuantity(item.id, newQty)}
                  />

                  <div className="text-right min-w-20">
                    <span className="text-sm font-bold text-slate-900">
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Card (Right Col) */}
          <div className="lg:col-span-4 rounded-3xl border border-pink-100 bg-white p-6 space-y-6 shadow-xs sticky top-24">
            <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Resumo do Pedido
            </h2>

            {/* Coupon input */}
            <CouponInput />

            {/* Shipping calc */}
            <ShippingCalculator 
              productPrice={subtotal} 
              onSelectOption={handleShippingSelect}
              className="border-none shadow-none p-0 bg-transparent"
            />

            {/* Subtotal, discount & total */}
            <div className="space-y-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} produtos)</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-pink-600 font-bold">
                  <span>Desconto Dengo</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frete Estimado</span>
                <span>{shippingValue === 0 ? 'Grátis ou a calcular' : formatCurrency(shippingValue)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-pink-100">
                <span>Total Final</span>
                <span className="text-pink-600 text-lg">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <Button
              variant="dengo"
              size="lg"
              onClick={() => navigate('/checkout')}
              className="w-full font-bold text-sm gap-2 shadow-md hover:scale-[1.01] transition-transform"
            >
              <span>Avançar para o Checkout</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

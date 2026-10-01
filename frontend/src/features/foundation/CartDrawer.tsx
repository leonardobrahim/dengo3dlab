import * as React from 'react';
import { Drawer } from '@/src/components/ui/Drawer';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { PriceDisplay } from '@/src/components/business/PriceDisplay';
import { QuantitySelector } from '@/src/components/business/QuantitySelector';
import { CouponInput } from '@/src/components/business/CouponInput';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { useCartStore } from '@/src/stores/cartStore';
import { useUIStore } from '@/src/stores/uiStore';
import { useToast } from '@/src/hooks/useToast';
import { cartService } from '@/src/services/cart/cartService';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { Trash2, ShoppingBag, ArrowRight, Tag, Heart, Sparkles, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '@/src/utils/formatters';

export const CartDrawer: React.FC = () => {
  const { isCartDrawerOpen, setCartDrawerOpen } = useUIStore();
  const { navigate } = useNavigationStore();
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
  } = useCartStore();

  const { toast } = useToast();

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  return (
    <Drawer
      open={isCartDrawerOpen}
      onOpenChange={setCartDrawerOpen}
      title="Carrinho Dengo 3D Lab"
      description={`${items.length} item(s) selecionados com carinho`}
      side="right"
    >
      <div className="flex flex-col h-full justify-between">
        {/* Items List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {items.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="animate-float">
                <DengoLogo size="lg" variant="icon" />
              </div>
              <p className="text-sm font-bold text-slate-900">Seu carrinho está vazio</p>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Nossa lontrinha está esperando você escolher uma peça articulada fofa ou filamentos candy colors!
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-3 p-3.5 rounded-2xl border border-pink-200 bg-pink-50/40 text-left shadow-2xs"
              >
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="h-16 w-16 rounded-xl object-cover border border-pink-100 shrink-0 bg-white"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{item.productName}</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    {item.colorHex && (
                      <span
                        className="h-3 w-3 rounded-full border border-pink-200 inline-block shrink-0"
                        style={{ backgroundColor: item.colorHex }}
                      />
                    )}
                    <span className="truncate">{item.variantName}</span>
                  </div>
                  <div className="pt-1 flex items-center justify-between">
                    <span className="text-xs font-black text-pink-600">
                      {formatCurrency(item.unitPrice)}
                    </span>
                    <QuantitySelector
                      value={item.quantity}
                      max={item.maxStock}
                      size="sm"
                      onChange={(newQty) => updateQuantity(item.id, newQty)}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-slate-400 hover:text-rose-500 p-1 transition-colors cursor-pointer"
                  aria-label="Remover item"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Bottom Checkout & Coupon Section */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-pink-100 space-y-3">
            {/* Coupon input */}
            <CouponInput size="sm" />

            {/* Calculations summary */}
            <div className="space-y-1.5 text-xs text-slate-500 pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-pink-600 font-bold">
                  <span>Desconto Dengo</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t border-pink-100">
                <span>Total Estimado</span>
                <span className="text-pink-600 text-base">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Final Checkout & Full Cart Buttons */}
            <div className="space-y-2 pt-1">
              <Button
                variant="dengo"
                className="w-full h-11 rounded-2xl font-bold text-sm shadow-md"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/checkout');
                }}
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs font-semibold border-pink-200"
                onClick={() => {
                  setCartDrawerOpen(false);
                  navigate('/carrinho');
                }}
              >
                <span>Ver Carrinho Completo</span>
                <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

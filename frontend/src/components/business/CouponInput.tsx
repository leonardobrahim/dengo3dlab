import * as React from 'react';
import { Input } from '@/src/components/ui/Input';
import { Button } from '@/src/components/ui/Button';
import { Tag, Sparkles, XCircle } from 'lucide-react';
import { useCartStore } from '@/src/stores/cartStore';
import { cartService } from '@/src/services/cart/cartService';
import { useToast } from '@/src/hooks/useToast';
import { formatCurrency } from '@/src/utils/formatters';

export interface CouponInputProps {
  onCouponApplied?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const CouponInput: React.FC<CouponInputProps> = ({ onCouponApplied, size = 'md' }) => {
  const { coupon, setCoupon, getSubtotal, getDiscount } = useCartStore();
  const { toast } = useToast();
  
  const [couponCode, setCouponCode] = React.useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = React.useState(false);

  const subtotal = getSubtotal();
  const discount = getDiscount();

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    setIsApplyingCoupon(true);
    try {
      const res = await cartService.validateCoupon(couponCode, subtotal);
      setCoupon(res.data);
      toast.success('Cupom aplicado com carinho!', `${res.data.description}`);
      setCouponCode('');
      if (onCouponApplied) onCouponApplied();
    } catch (err: any) {
      toast.error('Erro no cupom', err.message || 'Cupom inválido');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleRemoveCoupon = () => {
    setCoupon(null);
    toast.info('Cupom removido', 'O cupom foi removido do seu carrinho.');
  };

  if (coupon) {
    return (
      <div className={`flex items-center justify-between text-xs p-2.5 rounded-2xl bg-pink-50 border border-pink-200 text-pink-700`}>
        <span className="flex items-center gap-1.5 font-bold">
          <Sparkles className="h-4 w-4 text-pink-500" />
          Cupom: {coupon.code}
        </span>
        <div className="flex items-center gap-3">
          <span className="font-bold">-{formatCurrency(discount)}</span>
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="text-pink-400 hover:text-rose-500 transition-colors"
            title="Remover cupom"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const hClass = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-12' : 'h-11';
  
  return (
    <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full">
      <Input
        placeholder="Insira seu cupom"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
        className={`flex-1 ${hClass}`}
        disabled={isApplyingCoupon}
      />
      <Button 
        type="submit" 
        variant="secondary" 
        size={size === 'sm' ? 'sm' : 'default'}
        isLoading={isApplyingCoupon} 
        className={`font-bold border-pink-200 text-pink-700 bg-pink-50 hover:bg-pink-100 ${hClass} ${size === 'sm' ? 'px-3 text-xs' : ''}`}
      >
        <Tag className={`${size === 'sm' ? 'h-3 w-3 mr-1' : 'h-4 w-4 mr-2'} text-pink-500`} />
        Aplicar
      </Button>
    </form>
  );
};

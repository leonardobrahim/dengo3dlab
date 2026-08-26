import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { ProductCard } from '@/src/components/business/ProductCard';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { mockProducts } from '@/src/mocks/products';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/components/ui/Toast';
import { Flame, Ticket, Copy, Check, Sparkles } from 'lucide-react';

export const OffersPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  const [copiedCoupon, setCopiedCoupon] = React.useState<string | null>(null);

  const offerProducts = mockProducts.filter(
    (p) => p.variants.some((v) => v.promotionalPrice && v.promotionalPrice < v.price) || p.basePromotionalPrice
  );

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(code);
    toast.success(`Cupom "${code}" copiado!`, 'Use no carrinho para desconto instantâneo.');
    setTimeout(() => setCopiedCoupon(null), 3000);
  };

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Ofertas & Cupons', isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="space-y-8 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        {/* Hero Header */}
        <div className="rounded-3xl border border-rose-200 dark:border-rose-900/50 bg-gradient-to-r from-rose-50 via-pink-50 to-amber-50 dark:from-rose-950/40 dark:via-pink-950/20 dark:to-card p-6 sm:p-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-300 text-xs font-bold">
            <Flame className="h-3.5 w-3.5 fill-current" />
            <span>Semana Candy Festival 3D</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">
            Ofertas Especiais & Cupons Exclusivos
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
            Aproveite descontos em filamentos silk candy, bonecos articulados e cortadores temáticos.
          </p>
        </div>

        {/* Active Coupons Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border-2 border-dashed border-pink-300 dark:border-pink-800 bg-card flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-pink-500" />
                <span className="font-mono font-black text-sm text-pink-600 dark:text-pink-400">
                  DENGO10
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">10% OFF em qualquer pedido acima de R$ 50</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCoupon('DENGO10')}
              className="text-xs font-bold shrink-0"
            >
              {copiedCoupon === 'DENGO10' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedCoupon === 'DENGO10' ? 'Copiado!' : 'Copiar'}</span>
            </Button>
          </div>

          <div className="p-4 rounded-2xl border-2 border-dashed border-sky-300 dark:border-sky-800 bg-card flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-sky-500" />
                <span className="font-mono font-black text-sm text-sky-600 dark:text-sky-400">
                  CANDY25
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">R$ 25 OFF em compras acima de R$ 150</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCoupon('CANDY25')}
              className="text-xs font-bold shrink-0"
            >
              {copiedCoupon === 'CANDY25' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedCoupon === 'CANDY25' ? 'Copiado!' : 'Copiar'}</span>
            </Button>
          </div>

          <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-300 dark:border-emerald-800 bg-card flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Ticket className="h-4 w-4 text-emerald-500" />
                <span className="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">
                  FRETEGRATIS
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground">Frete Grátis acima de R$ 199 para todo Brasil</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleCopyCoupon('FRETEGRATIS')}
              className="text-xs font-bold shrink-0"
            >
              {copiedCoupon === 'FRETEGRATIS' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedCoupon === 'FRETEGRATIS' ? 'Copiado!' : 'Copiar'}</span>
            </Button>
          </div>
        </div>

        {/* Promo Products */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-pink-500" />
            <span>Modelos e Filamentos em Promoção</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {offerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

import * as React from 'react';
import { Product, ProductVariant } from '@/src/types';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { PriceDisplay } from './PriceDisplay';
import { Rating } from './Rating';
import { StatusBadge } from './StatusBadge';
import { Heart, ShoppingBag, Sparkles, Eye, Check } from 'lucide-react';
import { useCartStore } from '@/src/stores/cartStore';
import { useWishlistStore } from '@/src/stores/wishlistStore';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/hooks/useToast';
import { cn } from '@/src/lib/utils';

export interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
  className?: string;
  showQuickView?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  className,
  showQuickView = true,
}) => {
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant>(
    product.variants?.[0] || {
      id: 'default',
      sku: 'SKU',
      name: 'Padrão',
      price: product.basePrice,
      stockQuantity: product.stockTotal,
    }
  );

  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const { navigate } = useNavigationStore();
  const { toast } = useToast();

  const isFavorite = isInWishlist(product.id);

  const currentPrice = selectedVariant.promotionalPrice || selectedVariant.price || product.basePrice;
  const regularPrice = selectedVariant.price || product.basePrice;
  const hasDiscount = (selectedVariant.promotionalPrice && selectedVariant.promotionalPrice < selectedVariant.price) ||
    (product.basePromotionalPrice && product.basePromotionalPrice < product.basePrice);

  const discountPercent = hasDiscount
    ? Math.round(((regularPrice - currentPrice) / regularPrice) * 100)
    : 0;

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(product);
    } else {
      navigate(`/produtos/${product.slug}`, { slug: product.slug });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      variantId: selectedVariant.id,
      productName: product.name,
      productSlug: product.slug,
      variantName: selectedVariant.name,
      colorName: selectedVariant.colorName,
      colorHex: selectedVariant.colorHex,
      material: selectedVariant.material || (product.type === 'filament' ? 'PLA Silk' : 'PLA+'),
      imageUrl: selectedVariant.imageUrl || product.featuredImage,
      unitPrice: currentPrice,
      quantity: 1,
      maxStock: selectedVariant.stockQuantity || product.stockTotal || 10,
      sku: selectedVariant.sku,
    });
    toast.success('Adicionado com dengo! 💖', `${product.name} (${selectedVariant.name})`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
    toast.info(
      isFavorite ? 'Removido dos favoritos' : 'Salvo na sua Lista de Desejos 💖',
      product.name
    );
  };

  return (
    <Card
      id={`product-card-${product.id}`}
      className={cn(
        'group flex flex-col justify-between overflow-hidden rounded-3xl border border-pink-200/70 dark:border-pink-900/40 bg-card transition-all duration-300 hover:border-pink-400 dark:hover:border-pink-500/60 hover:shadow-xl hover:shadow-pink-500/10 hover:-translate-y-1 cursor-pointer select-none',
        className
      )}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-tr from-pink-50/60 via-white to-sky-50/60 dark:from-zinc-900 dark:to-zinc-800">
        {/* Product Image with smooth skeleton backdrop */}
        <img
          src={selectedVariant.imageUrl || product.featuredImage || product.images?.[0]}
          alt={product.name}
          className={cn(
            'h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108',
            !imageLoaded && 'opacity-0 scale-95',
            imageLoaded && 'opacity-100 scale-100'
          )}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          referrerPolicy="no-referrer"
        />

        {/* Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <Badge variant="destructive" className="font-extrabold text-[10px] shadow-xs px-2 py-0.5 bg-rose-500 text-white animate-pulse">
              -{discountPercent}% OFF
            </Badge>
          )}
          {product.isFeatured && (
            <Badge variant="candyGradient" className="shadow-xs text-[10px] font-bold">
              Destaque ✨
            </Badge>
          )}
          {product.isBestSeller && !product.isFeatured && (
            <Badge variant="babyPink" className="shadow-xs text-[10px] font-bold">
              Mais Vendido 💖
            </Badge>
          )}
          {product.isNew && !product.isFeatured && !product.isBestSeller && (
            <Badge variant="babyBlue" className="shadow-xs text-[10px] font-bold">
              Novidade 🌟
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          className={cn(
            'absolute top-2.5 right-2.5 z-10 flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/95 dark:bg-card/95 backdrop-blur-xs shadow-xs transition-all hover:scale-115 cursor-pointer border border-pink-200/60 dark:border-pink-900/60',
            isFavorite
              ? 'text-pink-500 fill-pink-500 ring-2 ring-pink-300'
              : 'text-muted-foreground hover:text-pink-500 hover:border-pink-300'
          )}
          aria-label={isFavorite ? 'Remover dos favoritos' : 'Favoritar produto'}
        >
          <Heart className={cn('h-4 w-4 transition-transform active:scale-125', isFavorite && 'fill-current text-pink-500')} />
        </button>

        {/* Quick View Floating Hint on hover */}
        {showQuickView && (
          <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-card/95 backdrop-blur-md text-[11px] font-bold text-foreground shadow-md border border-pink-200/80 dark:border-pink-900/60 hover:bg-pink-500 hover:text-white transition-colors">
              <Eye className="h-3.5 w-3.5" />
              <span>Ver Detalhes</span>
            </span>
          </div>
        )}

        {/* Quick Tech Tag */}
        <div className="absolute bottom-2.5 left-2.5 z-5 sm:group-hover:opacity-0 transition-opacity">
          <Badge variant="outline" className="bg-white/90 dark:bg-card/90 backdrop-blur-xs text-[10px] font-semibold border-pink-200/60 shadow-2xs">
            {product.type === 'printed_model'
              ? 'Peça 3D Exclusiva'
              : product.type === 'filament'
              ? 'Filamento Silk'
              : 'Item Maker'}
          </Badge>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3 text-left">
        <div>
          {/* Brand & Stock Status */}
          <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1 gap-2">
            <span className="font-semibold text-pink-600 dark:text-pink-400 truncate">
              {product.brand || 'Dengo 3D Lab'}
            </span>
            <StatusBadge 
              status={
                !product.inStock || selectedVariant.stockQuantity === 0 
                  ? 'out_of_stock' 
                  : selectedVariant.stockQuantity < 5 
                    ? 'low_stock' 
                    : 'in_stock'
              } 
              stockCount={selectedVariant.stockQuantity} 
            />
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-xs sm:text-sm text-foreground line-clamp-2 leading-snug group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mt-1.5">
            <Rating value={product.rating || 5} reviewCount={product.reviewCount || 0} size="sm" />
          </div>
        </div>

        {/* Variant Swatches (Color Pickers) */}
        {product.variants && product.variants.length > 1 && (
          <div className="space-y-1 pt-1.5 border-t border-pink-100/70 dark:border-border/60">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Opções de cor:</span>
              <span className="font-semibold text-foreground truncate max-w-[120px]">{selectedVariant.name}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedVariant(variant);
                  }}
                  className={cn(
                    'relative h-5 w-5 rounded-full border transition-all cursor-pointer shadow-2xs',
                    selectedVariant.id === variant.id
                      ? 'ring-2 ring-pink-500 ring-offset-1 scale-110'
                      : 'hover:scale-105 opacity-80'
                  )}
                  style={{ backgroundColor: variant.colorHex || '#F472B6' }}
                  title={variant.name}
                  aria-label={`Selecionar cor ${variant.name}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Price & Action Button */}
        <div className="pt-2 flex items-center justify-between gap-2 border-t border-pink-100/70 dark:border-border/60">
          <div>
            <PriceDisplay
              price={selectedVariant.price || product.basePrice}
              promotionalPrice={selectedVariant.promotionalPrice || product.basePromotionalPrice}
              size="sm"
            />
            <span className="text-[10px] text-muted-foreground font-medium block">
              ou 3x de R$ {(currentPrice / 3).toFixed(2)}
            </span>
          </div>

          <Button
            variant="dengo"
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock || selectedVariant.stockQuantity === 0}
            className="h-9 px-3 gap-1.5 rounded-xl text-xs font-bold shrink-0 shadow-xs hover:scale-105 transition-transform"
            aria-label={`Comprar ${product.name}`}
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Comprar</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

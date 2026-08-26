import * as React from 'react';
import { Product } from '@/src/types';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { EmptyState } from '@/src/components/feedback/EmptyState';
import { cn } from '@/src/lib/utils';

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  skeletonCount?: number;
  columns?: 2 | 3 | 4;
  onSelectProduct?: (product: Product) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading = false,
  skeletonCount = 8,
  columns = 4,
  onSelectProduct,
  emptyTitle = 'Nenhum produto encontrado',
  emptyDescription = 'Tente ajustar os filtros ou pesquisar por outro termo.',
  emptyActionLabel = 'Limpar Filtros',
  onEmptyAction,
  className,
}) => {
  const getGridColsClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2';
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      case 4:
      default:
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  if (isLoading) {
    return (
      <div className={cn('grid gap-4 sm:gap-6', getGridColsClass(), className)}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <ProductCardSkeleton key={`skeleton-${index}`} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-8">
        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          actionLabel={emptyActionLabel}
          onAction={onEmptyAction}
        />
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4 sm:gap-6', getGridColsClass(), className)}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
};

import * as React from 'react';
import { formatCurrency } from '@/src/utils/formatters';
import { cn } from '@/src/lib/utils';

export interface PriceDisplayProps {
  price: number;
  promotionalPrice?: number;
  installments?: number;
  showInstallments?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  promotionalPrice,
  installments = 12,
  showInstallments = true,
  size = 'md',
  className,
}) => {
  const hasDiscount = promotionalPrice !== undefined && promotionalPrice < price;
  const currentPrice = hasDiscount ? promotionalPrice : price;
  const discountPercent = hasDiscount ? Math.round(((price - promotionalPrice) / price) * 100) : 0;
  const installmentValue = currentPrice / installments;

  const sizeClasses = {
    sm: { current: 'text-sm font-semibold', old: 'text-xs', disc: 'text-[10px]' },
    md: { current: 'text-lg font-bold', old: 'text-xs', disc: 'text-xs' },
    lg: { current: 'text-2xl font-bold', old: 'text-sm', disc: 'text-xs' },
    xl: { current: 'text-3xl font-extrabold', old: 'text-base', disc: 'text-sm' },
  };

  return (
    <div className={cn('flex flex-col text-left', className)}>
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className={cn('text-foreground tracking-tight', sizeClasses[size].current)}>
          {formatCurrency(currentPrice)}
        </span>

        {hasDiscount && (
          <>
            <span className={cn('text-muted-foreground line-through font-normal', sizeClasses[size].old)}>
              {formatCurrency(price)}
            </span>
            <span
              className={cn(
                'rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-1.5 py-0.5',
                sizeClasses[size].disc
              )}
            >
              -{discountPercent}%
            </span>
          </>
        )}
      </div>

      {showInstallments && installments > 1 && (
        <span className="text-[11px] text-muted-foreground mt-0.5">
          ou até {installments}x de <strong className="font-semibold text-foreground/90">{formatCurrency(installmentValue)}</strong> sem juros
        </span>
      )}
    </div>
  );
};

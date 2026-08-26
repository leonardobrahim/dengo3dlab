import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface RatingProps {
  rating?: number; // e.g. 4.8
  value?: number;  // alias for rating
  maxRating?: number;
  max?: number;    // alias for maxRating
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showNumber?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  value,
  maxRating = 5,
  max,
  reviewCount,
  size = 'sm',
  showNumber = true,
  className,
}) => {
  const ratingValue = Number(rating ?? value ?? 0);
  const maxStars = max ?? maxRating ?? 5;

  const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <div className={cn('inline-flex items-center gap-1 text-xs select-none', className)}>
      <div className="flex items-center text-amber-500">
        {Array.from({ length: maxStars }).map((_, index) => {
          const isFilled = index + 1 <= Math.floor(ratingValue);
          const isHalf = !isFilled && index < ratingValue;

          return (
            <Star
              key={index}
              className={cn(
                iconSizes[size],
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'fill-transparent text-muted-foreground/40'
              )}
            />
          );
        })}
      </div>

      {showNumber && (
        <span className="font-semibold text-foreground ml-0.5">{ratingValue.toFixed(1)}</span>
      )}

      {reviewCount !== undefined && (
        <span className="text-muted-foreground text-[11px]">({reviewCount})</span>
      )}
    </div>
  );
};

import * as React from 'react';
import { Card } from '@/src/components/ui/Card';
import { Skeleton } from '@/src/components/ui/Skeleton';
import { cn } from '@/src/lib/utils';

export interface ProductCardSkeletonProps {
  className?: string;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ className }) => {
  return (
    <Card
      className={cn(
        'flex flex-col justify-between overflow-hidden rounded-3xl border border-pink-200/50 dark:border-pink-900/30 bg-card p-0 shadow-2xs',
        className
      )}
    >
      {/* Image Skeleton */}
      <div className="relative aspect-square w-full bg-pink-50/50 dark:bg-muted/40 overflow-hidden">
        <Skeleton className="h-full w-full rounded-none" />
      </div>

      {/* Details Skeleton */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20 rounded-full" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>

        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>

        <Skeleton className="h-3 w-28 rounded-full" />

        <div className="flex items-center gap-1.5 pt-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>

        <div className="pt-2 flex items-center justify-between border-t border-pink-100/50 dark:border-border/50">
          <div className="space-y-1">
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-3 w-14 rounded-md" />
          </div>
          <Skeleton className="h-8 w-20 rounded-xl" />
        </div>
      </div>
    </Card>
  );
};

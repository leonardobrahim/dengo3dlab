import * as React from 'react';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse text-left">
      {/* Breadcrumb Skeleton */}
      <div className="h-4 w-64 bg-pink-100/70 rounded-full" />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square w-full rounded-3xl bg-pink-100/60" />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 w-20 rounded-2xl bg-pink-100/50 shrink-0" />
            ))}
          </div>
        </div>

        {/* Info Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="h-4 w-28 bg-pink-100/80 rounded-full" />
            <div className="h-8 w-3/4 bg-pink-200/60 rounded-2xl" />
            <div className="h-4 w-40 bg-pink-100/70 rounded-full" />
          </div>

          <div className="h-24 w-full rounded-3xl bg-pink-50 border border-pink-100" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-pink-100/50 rounded-md" />
            <div className="h-4 w-5/6 bg-pink-100/50 rounded-md" />
          </div>

          {/* Variants Skeleton */}
          <div className="space-y-3">
            <div className="h-4 w-32 bg-pink-100/80 rounded-full" />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-24 rounded-2xl bg-pink-100/60" />
              ))}
            </div>
          </div>

          {/* Actions Skeleton */}
          <div className="flex gap-3 pt-2">
            <div className="h-12 w-28 rounded-2xl bg-pink-100/70" />
            <div className="h-12 flex-1 rounded-2xl bg-pink-200/60" />
          </div>

          {/* Shipping Box Skeleton */}
          <div className="h-32 rounded-3xl bg-pink-50 border border-pink-100" />
        </div>
      </div>
    </div>
  );
};

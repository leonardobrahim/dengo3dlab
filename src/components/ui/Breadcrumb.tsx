import * as React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  onNavigate?: (href: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className,
  onNavigate,
}) => {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center text-xs text-muted-foreground', className)}>
      <ol className="flex items-center gap-1.5 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.isCurrent;

          return (
            <li key={index} className="inline-flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3 w-3 text-muted-foreground/60" />}
              {isLast ? (
                <span className="font-semibold text-foreground" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => item.href && onNavigate?.(item.href)}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

import * as React from 'react';
import { cn } from '@/src/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
  icon?: React.ReactNode;
  description?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  description,
  className,
}) => {
  return (
    <div
      className={cn(
        'p-5 rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card shadow-2xs space-y-3',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-muted-foreground">{title}</span>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-pink-100/80 dark:bg-pink-950/80 text-pink-600">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-xl sm:text-2xl font-black text-foreground">{value}</p>
        <div className="flex items-center gap-2 text-xs">
          {change && (
            <span
              className={cn(
                'inline-flex items-center font-bold',
                trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'
              )}
            >
              {trend === 'up' ? (
                <TrendingUp className="h-3.5 w-3.5 mr-0.5 inline" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 mr-0.5 inline" />
              )}
              {change}
            </span>
          )}
          {description && <span className="text-muted-foreground">{description}</span>}
        </div>
      </div>
    </div>
  );
};

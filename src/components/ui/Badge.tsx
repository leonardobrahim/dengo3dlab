import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/src/lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap shadow-2xs',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-pink-500 text-white shadow-sm hover:bg-pink-600',
        secondary: 'border-transparent bg-sky-100 text-sky-800 dark:bg-sky-950/80 dark:text-sky-300',
        destructive: 'border-transparent bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/25',
        outline: 'text-foreground border-border bg-background/50',
        success: 'border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
        warning: 'border-transparent bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/25',
        // Dengo 3D special variants:
        babyPink: 'border-pink-300/60 bg-pink-50 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 dark:border-pink-800/80 font-medium',
        babyBlue: 'border-sky-300/60 bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800/80 font-medium',
        cherry: 'border-rose-300/60 bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/80 font-medium',
        candyGradient: 'border-transparent bg-gradient-to-r from-pink-400 to-sky-400 text-white font-bold shadow-xs',
        filament: 'border-pink-300/60 bg-pink-100/60 text-pink-700 dark:bg-pink-950/70 dark:text-pink-300 font-mono text-[11px]',
        tech: 'border-sky-300/50 bg-sky-50 text-sky-800 dark:bg-zinc-900 dark:text-sky-300 dark:border-sky-800/60 font-mono text-[10px] tracking-wider uppercase',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  dot?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ className, variant, dot, children, ...props }) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current animate-pulse" />}
      {children}
    </div>
  );
};

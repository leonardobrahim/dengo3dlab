import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-pink-600 hover:shadow-md hover:shadow-pink-500/20',
        secondary:
          'bg-sky-100 text-sky-900 dark:bg-sky-950/80 dark:text-sky-200 shadow-xs hover:bg-sky-200 dark:hover:bg-sky-900 border border-sky-200 dark:border-sky-800',
        dengo:
          'bg-gradient-to-r from-pink-500 via-pink-400 to-sky-400 text-white font-bold shadow-md shadow-pink-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:opacity-95',
        babyBlue:
          'bg-sky-400 text-white font-semibold shadow-sm hover:bg-sky-500 hover:shadow-md hover:shadow-sky-400/25',
        babyPink:
          'bg-pink-400 text-white font-semibold shadow-sm hover:bg-pink-500 hover:shadow-md hover:shadow-pink-400/25',
        outline:
          'border border-pink-200 dark:border-border bg-background hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:text-pink-600 dark:hover:text-pink-300 hover:border-pink-300',
        ghost: 'hover:bg-pink-50 dark:hover:bg-pink-950/30 hover:text-pink-600 dark:hover:text-pink-300',
        destructive:
          'bg-rose-500 text-white shadow-sm hover:bg-rose-600',
        industrial:
          'bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 border border-zinc-700 dark:border-zinc-300 hover:bg-zinc-800 dark:hover:bg-zinc-200 font-semibold tracking-wide text-xs',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 rounded-lg px-3 text-xs',
        lg: 'h-11 rounded-2xl px-7 text-base font-semibold',
        icon: 'h-10 w-10 p-0 rounded-xl',
        'icon-sm': 'h-8 w-8 p-0 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
        ) : (
          leftIcon && <span className="mr-2 inline-flex items-center">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex items-center">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

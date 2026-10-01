import * as React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface QuantitySelectorProps {
  value: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  onChange,
  min = 1,
  max = 99,
  disabled = false,
  size = 'md',
  className,
}) => {
  const handleDecrement = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const sizeClasses = {
    sm: 'h-7 text-xs',
    md: 'h-9 text-sm',
  };

  const btnClasses = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border border-input bg-background select-none',
        sizeClasses[size],
        disabled && 'opacity-50 pointer-events-none',
        className
      )}
    >
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min || disabled}
        className={cn(
          'flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer rounded-l-md',
          btnClasses[size]
        )}
        aria-label="Diminuir quantidade"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>

      <span className="w-9 text-center font-mono font-medium text-foreground">
        {value}
      </span>

      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max || disabled}
        className={cn(
          'flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer rounded-r-md',
          btnClasses[size]
        )}
        aria-label="Aumentar quantidade"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  description?: string;
  className?: string;
  id?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  label,
  description,
  className,
  id,
}) => {
  const switchId = id || React.useId();
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);

  const isChecked = checked !== undefined ? checked : internalChecked;

  const toggle = () => {
    if (disabled) return;
    const next = !isChecked;
    if (checked === undefined) {
      setInternalChecked(next);
    }
    onCheckedChange?.(next);
  };

  return (
    <div className={cn('flex items-center justify-between gap-3 text-left', className)}>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                'text-sm font-medium leading-none text-foreground cursor-pointer',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
          {description && <span className="text-xs text-muted-foreground mt-1">{description}</span>}
        </div>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        id={switchId}
        disabled={disabled}
        onClick={toggle}
        className={cn(
          'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          isChecked ? 'bg-primary' : 'bg-muted-foreground/30',
          disabled && 'cursor-not-allowed opacity-50'
        )}
      >
        <span
          className={cn(
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out',
            isChecked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </button>
    </div>
  );
};

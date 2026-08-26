import * as React from 'react';
import { cn } from '@/src/lib/utils';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  label,
  error,
  className,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || options[0]?.value);

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const handleChange = (val: string) => {
    if (value === undefined) {
      setSelectedValue(val);
    }
    onChange?.(val);
  };

  return (
    <div className={cn('space-y-2 text-left', className)}>
      {label && <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>}
      <div className="space-y-2">
        {options.map((option) => {
          const optionId = `${name}-${option.value}`;
          const isChecked = selectedValue === option.value;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                'flex items-start gap-3 p-3 rounded-md border border-border cursor-pointer transition-all hover:bg-muted/50',
                isChecked && 'border-primary bg-primary/5',
                option.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                disabled={option.disabled}
                onChange={() => handleChange(option.value)}
                className="sr-only peer"
              />
              <div
                className={cn(
                  'h-4 w-4 mt-0.5 rounded-full border border-input flex items-center justify-center transition-colors',
                  isChecked && 'border-primary'
                )}
              >
                {isChecked && <div className="h-2 w-2 rounded-full bg-primary" />}
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-foreground block">{option.label}</span>
                {option.description && (
                  <span className="text-xs text-muted-foreground mt-0.5 block">{option.description}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>
      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
};

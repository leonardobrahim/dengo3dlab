import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: React.ReactNode;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error,
      id,
      checked,
      defaultChecked,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const checkboxId = id || React.useId();
    const [isChecked, setIsChecked] = React.useState(
      checked || defaultChecked || false,
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (checked === undefined) {
        setIsChecked(e.target.checked);
      }
      onChange?.(e);
    };

    return (
      <div className="space-y-1 text-left">
        <label
          htmlFor={checkboxId}
          className={cn(
            "flex items-start gap-2.5 cursor-pointer select-none group",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <div className="relative flex items-center justify-center mt-0.5">
            <input
              id={checkboxId}
              type="checkbox"
              ref={ref}
              checked={isChecked}
              disabled={disabled}
              onChange={handleChange}
              className="peer sr-only"
              {...props}
            />
            <div
              className={cn(
                "h-4 w-4 shrink-0 rounded-sm border border-input bg-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 peer-checked:bg-primary peer-checked:border-primary peer-checked:text-primary-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-ring flex items-center justify-center",
                error && "border-destructive",
                className,
              )}
            >
              {isChecked && <Check className="h-3 w-3 stroke-3" />}
            </div>
          </div>
          {(label || description) && (
            <div className="flex flex-col">
              {label && (
                <span className="text-sm font-medium leading-none text-foreground">
                  {label}
                </span>
              )}
              {description && (
                <span className="text-xs text-muted-foreground mt-1">
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
        {error && (
          <p className="text-xs text-destructive font-medium pl-6">{error}</p>
        )}
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";

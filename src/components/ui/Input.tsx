import React, { InputHTMLAttributes, forwardRef, useId } from 'react';
import { Info } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  infoMode?: 'privacy' | 'general';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, infoMode, className = '', id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    
    return (
      <div className="flex flex-col space-y-1.5 w-full">
        <label htmlFor={inputId} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`flex h-11 w-full rounded-lg border ${error ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-rose-500 focus:ring-rose-500'} bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 transition-colors ${className}`}
          {...props}
        />
        {error && <span className="text-xs font-medium text-red-500">{error}</span>}
        {!error && helperText && (
          <span className={`text-xs flex items-start gap-1.5 mt-1 ${infoMode === 'privacy' ? 'text-emerald-600' : 'text-slate-500'}`}>
            {infoMode && <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />}
            <span>{helperText}</span>
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

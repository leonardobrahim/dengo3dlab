import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

export interface DropdownItemProps {
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  destructive?: boolean;
  disabled?: boolean;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  onClick,
  children,
  icon,
  destructive = false,
  disabled = false,
  className,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-2 px-3 py-2 text-sm font-medium rounded-sm text-left transition-colors cursor-pointer select-none',
        destructive
          ? 'text-destructive hover:bg-destructive/10'
          : 'text-foreground hover:bg-muted hover:text-foreground',
        disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
        className
      )}
    >
      {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
      <span className="flex-1">{children}</span>
    </button>
  );
};

export const DropdownSeparator: React.FC = () => (
  <div className="h-px my-1 bg-border" />
);

export interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  children,
  align = 'right',
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsOpen(false)}
            className={cn(
              'absolute z-50 mt-1 min-w-[200px] rounded-2xl border border-pink-200 bg-white p-1.5 text-slate-800 shadow-xl focus:outline-none ring-1 ring-black/5',
              align === 'right' ? 'right-0' : 'left-0',
              className
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

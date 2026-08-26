import * as React from 'react';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface LoadingStateProps {
  message?: string;
  subMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Carregando com carinho...',
  subMessage = 'Aquecendo o bico de impressão e preparando o catálogo Dengo...',
  size = 'md',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border border-pink-200/50 dark:border-pink-900/40 bg-card/60 backdrop-blur-xs space-y-4 my-6',
        className
      )}
    >
      <div className="relative flex items-center justify-center animate-bounce">
        <DengoLogo size={size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md'} variant="icon" />
      </div>

      <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-sm">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{message}</span>
      </div>

      {subMessage && (
        <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
          {subMessage}
        </p>
      )}
    </div>
  );
};

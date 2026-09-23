import * as React from 'react';
import { Button } from '@/src/components/ui/Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Ops! Algo deu errado',
  message = 'Não foi possível carregar os dados. Ocorreu uma oscilação na conexão com o servidor.',
  onRetry,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl border border-rose-200  bg-rose-50/40  space-y-4 my-6',
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100  text-rose-600 border border-rose-200">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-base font-bold text-rose-950">{title}</h3>
        <p className="text-xs sm:text-sm text-rose-700/80  leading-relaxed">
          {message}
        </p>
      </div>

      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRetry}
          className="border-rose-300 text-rose-700 hover:bg-rose-100   gap-1.5"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Tentar novamente</span>
        </Button>
      )}
    </div>
  );
};

import * as React from 'react';
import { Button } from '@/src/components/ui/Button';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { SearchX, Home, ArrowLeft } from 'lucide-react';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { cn } from '@/src/lib/utils';

export interface NotFoundStateProps {
  title?: string;
  description?: string;
  showBackHome?: boolean;
  className?: string;
}

export const NotFoundState: React.FC<NotFoundStateProps> = ({
  title = 'Página ou Peça 3D Não Encontrada',
  description = 'A lontrinha maker procurou em todas as prateleiras de filamentos, mas não encontrou o que você estava buscando.',
  showBackHome = true,
  className,
}) => {
  const { navigate, goBack } = useNavigationStore();

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-14 text-center rounded-3xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-5 my-8 shadow-xs',
        className
      )}
    >
      <div className="relative">
        <DengoLogo size="lg" variant="icon" />
        <div className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-xs">
          <SearchX className="h-4 w-4" />
        </div>
      </div>

      <div className="space-y-2 max-w-md">
        <span className="text-3xl sm:text-4xl font-black text-pink-500 font-mono tracking-tight">
          404
        </span>
        <h2 className="text-lg sm:text-xl font-bold text-foreground">{title}</h2>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {showBackHome && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button variant="outline" size="sm" onClick={goBack} className="gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Voltar</span>
          </Button>

          <Button variant="dengo" size="sm" onClick={() => navigate('/')} className="gap-1.5 font-bold">
            <Home className="h-3.5 w-3.5" />
            <span>Ir para o Início da Loja</span>
          </Button>
        </div>
      )}
    </div>
  );
};

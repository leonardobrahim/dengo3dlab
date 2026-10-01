import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { ErrorState } from '@/src/components/feedback/ErrorState';
import { Button } from '@/src/components/ui/Button';
import { useNavigationStore } from '@/src/stores/navigationStore';

export const ServerErrorPage: React.FC = () => {
  const { navigate } = useNavigationStore();

  return (
    <StoreLayout>
      <div className="max-w-xl mx-auto py-8 text-center space-y-4">
        <ErrorState
          title="Erro no Servidor Dengo (500)"
          message="Houve uma oscilação temporária em nossos servidores. Nossa equipe maker já foi notificada para resolver."
          onRetry={() => window.location.reload()}
        />

        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          Voltar para a Página Inicial
        </Button>
      </div>
    </StoreLayout>
  );
};

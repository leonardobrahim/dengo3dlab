import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { NotFoundState } from '@/src/components/feedback/NotFoundState';

export const NotFoundPage: React.FC = () => {
  return (
    <StoreLayout>
      <div className="max-w-xl mx-auto py-8">
        <NotFoundState
          title="Página Não Encontrada (404)"
          description="A página que você tentou acessar não existe ou foi movida para outro cantinho do laboratório 3D."
          showBackHome={true}
        />
      </div>
    </StoreLayout>
  );
};

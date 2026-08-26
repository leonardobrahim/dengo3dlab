import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { useNavigationStore } from '@/src/stores/navigationStore';

export const TermsPage: React.FC = () => {
  const { navigate } = useNavigationStore();

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Termos de Serviço', isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Termos de Uso & Condições
          </h1>
          <p className="text-xs text-muted-foreground">
            Última atualização: Março de 2026
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card space-y-4 text-xs text-muted-foreground leading-relaxed">
          <p>
            Bem-vindo à plataforma e-commerce do <strong>Dengo 3D Lab</strong>. Ao acessar este site e realizar compras, você concorda com os presentes termos.
          </p>
          <h3 className="font-bold text-foreground text-sm">1. Propriedade Intelectual & Direitos de Impressão</h3>
          <p>
            Os arquivos 3D dos bonecos e peças colecionáveis são licenciados comercialmente para a Dengo 3D pelos respectivos modeladores ou são criações autorais exclusivas do estúdio.
          </p>
          <h3 className="font-bold text-foreground text-sm">2. Variações Naturais da Fabricação Aditiva</h3>
          <p>
            A impressão 3D FDM é um processo de fabricação camada por camada. Pequenas micro-linhas ou sutis variações de brilho nos filamentos são características normais e atestam a autenticidade do produto feito sob demanda.
          </p>
        </div>
      </div>
    </StoreLayout>
  );
};

import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { useNavigationStore } from '@/src/stores/navigationStore';

export const PrivacyPage: React.FC = () => {
  const { navigate } = useNavigationStore();

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Política de Privacidade', isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Política de Privacidade (LGPD)
          </h1>
          <p className="text-xs text-muted-foreground">
            Seus dados são tratados com sigilo absoluto e criptografia SSL
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card space-y-4 text-xs text-muted-foreground leading-relaxed">
          <p>
            No <strong>Dengo 3D Lab</strong>, privacidade e segurança são prioridades. Seus dados cadastrais (nome, endereço e CPF) são utilizados exclusivamente para emissão de nota fiscal e envio dos pacotes.
          </p>
          <h3 className="font-bold text-foreground text-sm">Criptografia & Dados de Pagamento</h3>
          <p>
            Dados sensíveis de cartão de crédito não são armazenados em nossos servidores, sendo processados diretamente pelas instituições financeiras com certificação PCI-DSS.
          </p>
        </div>
      </div>
    </StoreLayout>
  );
};

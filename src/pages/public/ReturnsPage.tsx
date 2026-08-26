import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { RotateCcw, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const ReturnsPage: React.FC = () => {
  const { navigate } = useNavigationStore();

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Trocas & Devoluções', isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Trocas & Devoluções
          </h1>
          <p className="text-xs text-muted-foreground">
            Nossa política é transparente e baseada no Código de Defesa do Consumidor
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card space-y-4 text-xs text-muted-foreground leading-relaxed">
          <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-sm">
            <RotateCcw className="h-4 w-4" />
            <span>Garantia de 7 Dias (Arrependimento)</span>
          </div>
          <p>
            Você tem até 7 dias corridos após o recebimento do pacote para solicitar a devolução ou troca do produto em perfeitas condições na embalagem original sem qualquer custo de frete.
          </p>

          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm pt-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Defeitos de Fabricação ou Avarias no Transporte</span>
          </div>
          <p>
            Caso a peça chegue com alguma quebra ou imperfeição de fabricação, basta nos enviar fotos em nosso WhatsApp que providenciaremos uma nova impressão e reenvio prioritário imediato.
          </p>
        </div>
      </div>
    </StoreLayout>
  );
};

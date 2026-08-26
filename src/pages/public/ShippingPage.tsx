import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { Truck, ShieldCheck, Clock, Sparkles } from 'lucide-react';

export const ShippingPage: React.FC = () => {
  const { navigate } = useNavigationStore();

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Frete & Prazos de Impressão', isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Frete & Prazos de Envio
          </h1>
          <p className="text-xs text-muted-foreground">
            Entenda como funciona a produção, embalagem e expedição dos seus dengos 3D
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card space-y-4 text-xs text-muted-foreground leading-relaxed">
          <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-sm">
            <Clock className="h-4 w-4" />
            <span>1. Prazo de Produção & Fatiamento</span>
          </div>
          <p>
            Produtos marcados com badge <strong>Pronta Entrega</strong> são despachados em até 24h úteis. Produtos personalizados ou sob demanda levam de 1 a 3 dias úteis para impressão 3D de alta definição.
          </p>

          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-sm pt-2">
            <Truck className="h-4 w-4" />
            <span>2. Formas de Envio & Rastreamento</span>
          </div>
          <p>
            Enviamos para todo o território brasileiro via Correios (Sedex e PAC) e transportadoras privadas parceiras (Jadlog, Loggi). Assim que a etiqueta é gerada, você recebe o código de rastreamento por e-mail e WhatsApp.
          </p>

          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm pt-2">
            <ShieldCheck className="h-4 w-4" />
            <span>3. Embalagem Anti-Impacto Segura</span>
          </div>
          <p>
            Todas as peças articuladas e filamentos são embalados em caixas reforçadas com plástico bolha e fita inviolável para garantir que cheguem impecáveis até você.
          </p>
        </div>
      </div>
    </StoreLayout>
  );
};

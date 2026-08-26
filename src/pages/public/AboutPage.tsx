import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { Button } from '@/src/components/ui/Button';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { Heart, Sparkles, Cpu, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useNavigationStore();

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Sobre a Dengo 3D Lab', isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="max-w-4xl mx-auto space-y-8 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-gradient-to-r from-pink-50 via-white to-sky-50 dark:from-pink-950/30 dark:via-card dark:to-sky-950/30 p-8 sm:p-12 text-center space-y-4">
          <div className="flex justify-center">
            <DengoLogo size="lg" variant="icon" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-foreground">
            A Magia da Impressão 3D Feita com Afeto
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Nascemos com a missão de transformar tecnologia e fabricação digital em peças colecionáveis apaixonantes e filamentos de acabamento acetinado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-3">
            <Heart className="h-6 w-6 text-pink-500" />
            <h3 className="text-sm font-bold text-foreground">Design Autoral & Exclusivo</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Modelos projetados por artistas 3D brasileiros com foco em articulação suave e estética candy color.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-sky-200/60 dark:border-sky-900/40 bg-card space-y-3">
            <Cpu className="h-6 w-6 text-sky-500" />
            <h3 className="text-sm font-bold text-foreground">Fazenda 3D de Alta Velocidade</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Parque tecnológico calibrado com bicos de alta precisão e calibração de fluxo rigorosa.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-3">
            <Sparkles className="h-6 w-6 text-pink-500" />
            <h3 className="text-sm font-bold text-foreground">Compromisso Ecológico</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Utilizamos PLA virgem derivado de fontes renováveis como amido de milho e cana de açúcar.
            </p>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

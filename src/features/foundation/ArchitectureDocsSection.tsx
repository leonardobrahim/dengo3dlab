import * as React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Badge } from '@/src/components/ui/Badge';
import { FileCode, Layers, ShieldCheck, CheckCircle2, Heart, FolderTree, Sparkles, Palette } from 'lucide-react';
import { DengoLogo } from '@/src/components/brand/DengoLogo';

export const ArchitectureDocsSection: React.FC = () => {
  const folders = [
    { path: 'src/app/', desc: 'Páginas e rotas da aplicação (preparado para Next.js App Router / React Router).' },
    { path: 'src/components/brand/', desc: 'Componentes de identidade visual Dengo 3D Lab (DengoLogo, mascote e tokens).' },
    { path: 'src/components/ui/', desc: '23+ componentes base do Design System (Button, Input, Card, Dialog, Drawer, etc).' },
    { path: 'src/components/business/', desc: 'Componentes de domínio 3D (ProductCard, Rating, PriceDisplay, OrderTimeline, etc).' },
    { path: 'src/features/', desc: 'Módulos de funcionalidades isoladas com suas lógicas e layouts específicos.' },
    { path: 'src/services/', desc: 'Camada de acesso a dados (ApiClient, Auth, Products, Orders, Cart, Shipping, Admin).' },
    { path: 'src/stores/', desc: 'Gerenciamento de estado global reativo com Zustand (auth, cart, wishlist, ui).' },
    { path: 'src/mocks/', desc: 'Dados e simuladores de API REST com latência configurável e catálogo Dengo.' },
    { path: 'src/schemas/', desc: 'Schemas de validação com Zod para formulários e sanitização de payloads.' },
    { path: 'src/types/', desc: 'Definições completas do domínio em TypeScript Strict.' },
    { path: 'src/utils/', desc: 'Formatadores monetários (BRL), máscaras (CPF, CEP, Telefone) e validadores.' },
    { path: 'src/config/', desc: 'Variáveis de ambiente (env.ts) e metadados da plataforma (site.ts).' },
  ];

  return (
    <div className="space-y-12 text-left">
      {/* Section Header */}
      <div className="border-b border-pink-200/60 dark:border-pink-900/40 pb-6">
        <div className="flex items-center gap-2 text-pink-500 text-xs font-mono uppercase tracking-wider font-bold">
          <FolderTree className="h-4 w-4" />
          Documentação Técnica & Arquitetura
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          Arquitetura Dengo3dLab & Guia de Engenharia
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-3xl">
          Visão geral da estrutura de pastas, convenções de código limpo, contratos desacoplados e orientações para as próximas etapas de desenvolvimento da plataforma Dengo 3D Lab.
        </p>
      </div>

      {/* 1. DIRECTORY STRUCTURE */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
          1. Mapa Estrutural do Repositório (Clean Architecture)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {folders.map((f) => (
            <div key={f.path} className="p-4 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-1">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-pink-500" />
                <span className="font-mono text-xs font-bold text-foreground">{f.path}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. ARCHITECTURE PILLARS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-foreground flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
          2. Pilares de Engenharia da Fundação Técnica
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-3xl border-pink-200/60 dark:border-pink-900/40">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-pink-600 dark:text-pink-400">
                <Palette className="h-4 w-4" />
                Design System & Acessibilidade
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>
                Tokens CSS em harmonia com a logo Dengo (Baby Blue `#38BDF8` e Baby Pink `#F472B6`), mantendo contraste acessível WCAG AA e navegação full keyboard.
              </p>
              <Badge variant="babyPink" className="mt-2">23+ Componentes</Badge>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-sky-200/60 dark:border-sky-900/40">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-sky-600 dark:text-sky-400">
                <ShieldCheck className="h-4 w-4" />
                TypeScript Strict & Zod
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>
                Zero tolerância para tipos `any`. Todos os schemas Zod realizam validação client-side e sanitização antes do envio para APIs.
              </p>
              <Badge variant="babyBlue" className="mt-2">100% Type-Safe</Badge>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-pink-200/60 dark:border-pink-900/40">
            <CardHeader>
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-pink-600 dark:text-pink-400">
                <Sparkles className="h-4 w-4" />
                Zustand & API Desacoplada
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground space-y-2">
              <p>
                Stores globais com persistência local (LocalStorage) e camada de serviços (`ApiClient`) pronta para substituição do mock por backend REST real.
              </p>
              <Badge variant="candyGradient" className="mt-2">Pronto para Backend</Badge>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

import * as React from "react";
import { StoreLayout } from "@/src/layouts/store/StoreLayout";
import { Breadcrumb } from "@/src/components/ui/Breadcrumb";
import { useNavigationStore } from "@/src/stores/navigationStore";

export const FaqPage: React.FC = () => {
  const { navigate } = useNavigationStore();

  const breadcrumbs = [
    { label: "Início", href: "/" },
    { label: "Perguntas Frequentes (FAQ)", isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="max-w-3xl mx-auto space-y-6 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            Perguntas Frequentes (FAQ)
          </h1>
          <p className="text-xs text-muted-foreground">
            Tire suas dúvidas sobre materiais, prazos de impressão 3D e cuidados
            com as peças
          </p>
        </div>

        <div className="space-y-3">
          <details open className="rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-semibold">
              O material dos bonecos e cortadores é seguro (atóxico)?
            </summary>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sim! Nossas peças colecionáveis e cortadores são fabricados em PLA
              (Ácido Polilático) virgem de grau alimentício atóxico,
              biodegradável e seguro para manuseio por crianças e confeitarias.
            </p>
          </details>

          <details className="rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-semibold">
              Qual a diferença entre os filamentos PLA Silk e PLA comum?
            </summary>
            <p className="text-xs text-muted-foreground leading-relaxed">
              O filamento Silk da Dengo 3D contém aditivos reflexivos que
              proporcionam acabamento acetinado com brilho perolizado suave,
              disfarçando quase por completo as linhas de camadas.
            </p>
          </details>

          <details className="rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-semibold">
              Quanto tempo leva para imprimir um pedido sob encomenda?
            </summary>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Peças em estoque são despachadas no mesmo dia ou no próximo dia
              útil. Peças sob encomenda levam em média de 1 a 3 dias úteis para
              fatiamento, impressão e acabamento cuidadoso.
            </p>
          </details>

          <details className="rounded-lg border border-border p-4">
            <summary className="cursor-pointer font-semibold">
              Como cuidar da minha peça impressa em 3D?
            </summary>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Evite expor sua peça em PLA a temperaturas superiores a 55°C (como
              deixar dentro de carros sob sol quente). Para limpeza de
              cortadores culinários, use água morna/fria e sabão neutro. Nunca
              coloque em lava-louças.
            </p>
          </details>
        </div>
      </div>
    </StoreLayout>
  );
};

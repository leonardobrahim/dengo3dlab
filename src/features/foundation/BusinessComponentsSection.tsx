import * as React from "react";
import {
  ProductCard,
  PriceDisplay,
  Rating,
  StatusBadge,
  QuantitySelector,
  OrderStatusBadge,
  OrderTimeline,
} from "@/src/components/business";
import { mockProducts, mockOrders } from "@/src/mocks";
import { OrderStatus, InventoryStatus } from "@/src/types";
import {
  Box,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";

export const BusinessComponentsSection: React.FC = () => {
  const [demoQty, setDemoQty] = React.useState(2);
  const [selectedTimelineStatus, setSelectedTimelineStatus] =
    React.useState<OrderStatus>("in_production");

  const orderStatuses: OrderStatus[] = [
    "pending",
    "confirmed",
    "in_production",
    "in_production",
    "ready_to_ship",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const inventoryStatuses: InventoryStatus[] = [
    "in_stock",
    "low_stock",
    "out_of_stock",
    "made_to_order",
    "pre_order",
  ];

  return (
    <div className="space-y-12 text-left">
      {/* Section Header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-wider font-semibold">
          <Box className="h-4 w-4" />
          Domínio de Negócio 3D
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          Componentes de Negócio & Manufatura 3D
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-3xl">
          Componentes especializados para o fluxo de compra, catálogo técnico de
          filamentos/resinas, exibição de preços com parcelamento e rastreamento
          da linha de produção de peças 3D.
        </p>
      </div>

      {/* 1. PRODUCT CARDS (CATALOG ITEM) */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          1. ProductCard (Com Seletor de Variantes de Cores e Ações de
          Carrinho/Favoritos)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 2. PRICE DISPLAY & RATINGS & QUANTITY STEPPER */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          2. PriceDisplay, Rating & QuantitySelector
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* PriceDisplay Variations */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                PriceDisplay (Com Desconto & Parcelamento)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Tamanho Grande (Página de Produto)
                </p>
                <PriceDisplay
                  price={219.9}
                  promotionalPrice={189.9}
                  size="lg"
                />
              </div>
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground mb-1">
                  Preço Regular (Sem Desconto)
                </p>
                <PriceDisplay price={289.0} size="md" />
              </div>
            </CardContent>
          </Card>

          {/* Rating Scores */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                Rating (Avaliações & Métricas de Camada)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Nota Geral de Produto
                </p>
                <Rating rating={4.9} reviewCount={142} size="md" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Score de Precisão Dimensional
                </p>
                <Rating rating={5.0} reviewCount={68} size="sm" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Avaliação Regular
                </p>
                <Rating rating={3.5} reviewCount={12} size="sm" />
              </div>
            </CardContent>
          </Card>

          {/* Quantity Stepper */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold">
                QuantitySelector (Controle de Estoque)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Seletor Médio (Valor: {demoQty})
                </p>
                <QuantitySelector
                  value={demoQty}
                  onChange={setDemoQty}
                  min={1}
                  max={20}
                  size="md"
                />
              </div>
              <div className="space-y-2 pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">
                  Seletor Compacto (Desabilitado)
                </p>
                <QuantitySelector
                  value={1}
                  onChange={() => {}}
                  disabled
                  size="sm"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 3. ORDER STATUS BADGES & INVENTORY STATUS */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          3. StatusBadges (Ciclo de Vida do Pedido e Estoque)
        </h3>

        <div className="p-6 rounded-lg border border-border bg-card space-y-6">
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
              Todos os Estados de Pedido (OrderStatusBadge)
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {orderStatuses.map((st) => (
                <OrderStatusBadge key={st} status={st} />
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
              Status de Disponibilidade em Estoque (StatusBadge)
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {inventoryStatuses.map((inv) => (
                <StatusBadge key={inv} status={inv} stockCount={18} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. ORDER TIMELINE (3D MANUFACTURING & SHIPPING TRACKING) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            4. OrderTimeline (Linha do Tempo de Produção Aditiva & Entrega)
          </h3>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-muted-foreground mr-1">
              Simular Etapa:
            </span>
            {(
              [
                "confirmed",
                "in_production",
                "ready_to_ship",
                "shipped",
                "delivered",
              ] as OrderStatus[]
            ).map((st) => (
              <Button
                key={st}
                variant={selectedTimelineStatus === st ? "default" : "outline"}
                size="sm"
                className="h-7 text-[11px] px-2"
                onClick={() => setSelectedTimelineStatus(st)}
              >
                {st === "confirmed" && "Pago"}
                {st === "in_production" && "Em Impressão 3D"}
                {st === "ready_to_ship" && "Qualidade"}
                {st === "shipped" && "Em Trânsito"}
                {st === "delivered" && "Entregue"}
              </Button>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">
                  Pedido #{mockOrders[0].orderNumber}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Filamento PLA Hyper + Peça Técnica Voron 2.4 sob demanda
                </p>
              </div>
              <OrderStatusBadge status={selectedTimelineStatus} />
            </div>
          </CardHeader>
          <CardContent>
            <OrderTimeline order={mockOrders[0]} />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

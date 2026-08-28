import * as React from "react";
import { OrderStatus, TrackingEvent, Order } from "@/src/types";
import {
  Check,
  CheckCircle2,
  Circle,
  ArrowRight,
  Package,
  Truck,
  Box,
  Receipt,
  Cpu,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { formatDateTime, formatDate, formatTime } from "@/src/utils/formatters";

export interface OrderTimelineProps {
  order: Order;
  className?: string;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  order,
  className,
}) => {
  const currentStatus = order.status;

  // Base logical steps to display
  const baseSteps = [
    { key: "pending", label: "Pedido Realizado", icon: Receipt },
    { key: "confirmed", label: "Pagamento Aprovado", icon: CheckCircle2 },
    { key: "in_production", label: "Em Produção", icon: Box },
    { key: "ready_to_ship", label: "Em Preparação", icon: Package },
    { key: "shipped", label: "Enviado", icon: Truck },
    { key: "delivered", label: "Entregue", icon: Check },
  ];

  const statusPriority: Record<OrderStatus, number> = {
    pending: 0,
    confirmed: 1,
    in_production: 2,
    ready_to_ship: 3,
    shipped: 4,
    delivered: 5,
    cancelled: -1,
  };

  const currentLevel = statusPriority[currentStatus] || 0;
  const isCancelled = currentStatus === "cancelled";

  return (
    <div className={cn("space-y-6 text-left relative", className)}>
      {/* Background Line */}
      <div className="absolute left-3.75 top-6 bottom-6 w-0.5 bg-slate-100 dark:bg-slate-800 z-0" />

      {isCancelled ? (
        <div className="relative z-10 flex items-start gap-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400">
          <div className="shrink-0 h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <p className="font-bold">Pedido Cancelado</p>
            <p className="text-xs mt-1">
              Este pedido foi cancelado e não será processado.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 relative z-10">
          {baseSteps.map((step, idx) => {
            const stepLevel = statusPriority[step.key as OrderStatus];
            const isCompleted =
              currentLevel > stepLevel ||
              (currentLevel === stepLevel && currentLevel === 5); // delivered is always complete when reached
            const isCurrent = currentLevel === stepLevel && currentLevel !== 5;
            const isFuture = currentLevel < stepLevel;

            const Icon = step.icon;

            // Try to match an event for this step if possible to show timestamp
            // This is a simple heuristic based on the events provided in mock
            let matchingEvent = null;
            if (step.key === "pending")
              matchingEvent = order.shipment?.events.find((e) =>
                e.status.includes("Criado"),
              );
            if (step.key === "confirmed")
              matchingEvent = order.shipment?.events.find(
                (e) =>
                  e.status.includes("Pagamento") ||
                  e.status.includes("Confirmado"),
              );
            if (step.key === "in_production")
              matchingEvent = order.shipment?.events.find((e) =>
                e.status.includes("Produção"),
              );
            if (step.key === "ready_to_ship")
              matchingEvent = order.shipment?.events.find(
                (e) =>
                  e.status.includes("Separação") ||
                  e.status.includes("Preparação"),
              );
            if (step.key === "shipped")
              matchingEvent = order.shipment?.events.find(
                (e) =>
                  e.status.includes("Enviado") || e.status.includes("Trânsito"),
              );
            if (step.key === "delivered")
              matchingEvent = order.shipment?.events.find((e) =>
                e.status.includes("Entregue"),
              );

            // Fallbacks for timestamps
            let dateStr = "";
            let timeStr = "";
            let descStr = "";

            if (matchingEvent) {
              dateStr = formatDate(matchingEvent.timestamp);
              timeStr = formatTime(matchingEvent.timestamp);
              descStr = matchingEvent.description;
            } else if (step.key === "pending" && order.createdAt) {
              dateStr = formatDate(order.createdAt);
              timeStr = formatTime(order.createdAt);
            } else if (step.key === "confirmed" && order.payment?.paidAt) {
              dateStr = formatDate(order.payment.paidAt);
              timeStr = formatTime(order.payment.paidAt);
            } else if (
              step.key === "delivered" &&
              order.shipment?.deliveredAt
            ) {
              dateStr = formatDate(order.shipment.deliveredAt);
              timeStr = formatTime(order.shipment.deliveredAt);
            }

            return (
              <div
                key={step.key}
                className={cn(
                  "flex items-start gap-4",
                  isFuture ? "opacity-50" : "",
                )}
              >
                <div className="shrink-0 mt-0.5 relative z-10 bg-background">
                  {isCompleted ? (
                    <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-4 ring-background">
                      <Check className="h-4 w-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="h-8 w-8 rounded-full bg-pink-100 text-pink-600 border-2 border-pink-500 flex items-center justify-center ring-4 ring-background shadow-xs">
                      <div className="h-2.5 w-2.5 bg-pink-500 rounded-full animate-pulse" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-slate-50 border-2 border-slate-200 text-slate-400 flex items-center justify-center ring-4 ring-background">
                      <Circle className="h-2 w-2 fill-current" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0 pt-1.5 pb-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4">
                    <h4
                      className={cn(
                        "text-sm font-bold",
                        isCurrent
                          ? "text-pink-600 dark:text-pink-400"
                          : isFuture
                            ? "text-slate-400"
                            : "text-slate-900 dark:text-slate-100",
                      )}
                    >
                      {step.label}
                    </h4>
                    {(dateStr || timeStr) && (
                      <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <span>{dateStr}</span>
                        <span>{timeStr}</span>
                      </div>
                    )}
                  </div>

                  {descStr && (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {descStr}
                    </p>
                  )}

                  {/* Special specific block for in_production when it's the current active step */}
                  {isCurrent && step.key === "in_production" && (
                    <div className="mt-3 p-3 bg-pink-50/50 dark:bg-pink-950/20 rounded-xl border border-pink-100 dark:border-pink-900/30">
                      <div className="flex items-start gap-2.5">
                        <Cpu className="h-4 w-4 text-pink-500 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-slate-100">
                            Seu produto está sendo produzido.
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5">
                            Previsão: 2–4 dias úteis.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

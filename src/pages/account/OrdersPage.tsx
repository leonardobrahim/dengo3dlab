import * as React from "react";
import { AccountLayout } from "@/src/layouts/account/AccountLayout";
import { Button } from "@/src/components/ui/Button";
import { OrderStatusBadge } from "@/src/components/business/OrderStatusBadge";
import { EmptyState } from "@/src/components/feedback/EmptyState";
import { useNavigationStore } from "@/src/stores/navigationStore";
import { Package, Truck, Clock, Eye, Sparkles } from "lucide-react";
import { formatCurrency, formatDate, formatTime } from "@/src/utils/formatters";
import { mockOrders } from "@/src/mocks/orders";
import { Order } from "@/src/types";
import { cn } from "@/src/lib/utils";

export const OrdersPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const [activeTab, setActiveTab] = React.useState("all");

  const tabs = [
    { id: "all", label: "Todos" },
    { id: "processing", label: "Processando" },
    { id: "production", label: "Produção" },
    { id: "shipped", label: "Enviado" },
    { id: "delivered", label: "Entregue" },
    { id: "cancelled", label: "Cancelado" },
  ];

  const filteredOrders = React.useMemo(() => {
    return mockOrders.filter((order) => {
      if (activeTab === "all") return true;
      if (activeTab === "processing")
        return ["pending", "confirmed"].includes(order.status);
      if (activeTab === "production")
        return ["in_production", "ready_to_ship"].includes(order.status);
      if (activeTab === "shipped") return order.status === "shipped";
      if (activeTab === "delivered") return order.status === "delivered";
      if (activeTab === "cancelled") return order.status === "cancelled";
      return true;
    });
  }, [activeTab]);

  return (
    <AccountLayout
      currentPageTitle="Meus Pedidos"
      currentPageBreadcrumb="Meus Pedidos"
    >
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-foreground">
            Histórico de Pedidos
          </h1>
          <p className="text-xs text-muted-foreground">
            Acompanhe a produção, impressão na fazenda 3D e rastreamento
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all",
                activeTab === tab.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredOrders.length === 0 ? (
          <EmptyState
            icon={<Package className="h-10 w-10 text-pink-300" />}
            title="Nenhum pedido encontrado"
            description="Você ainda não tem pedidos neste status."
            actionLabel="Ir para a Loja"
            onAction={() => navigate("/")}
          />
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card overflow-hidden shadow-xs"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-5 bg-slate-50 dark:bg-card border-b border-border flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-foreground">
                        {order.orderNumber}
                      </span>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Realizado em {formatDate(order.createdAt)} às{" "}
                      {formatTime(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-[11px] text-muted-foreground">
                        Total Pago
                      </p>
                      <p className="text-sm font-black text-slate-900 dark:text-white">
                        {formatCurrency(order.total)}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        navigate(`/minha-conta/pedidos/${order.id}`)
                      }
                      className="text-xs font-bold gap-2"
                    >
                      <Eye className="h-3.5 w-3.5" /> Detalhes
                    </Button>
                  </div>
                </div>

                {/* Order Preview Items */}
                <div className="p-4 sm:p-5">
                  <div className="space-y-3">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-12 w-12 rounded-xl object-cover border border-slate-100 dark:border-border shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-bold text-foreground truncate">
                              {item.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {item.variantName}
                            </p>
                            <p className="text-[11px] text-pink-600 font-semibold">
                              {item.quantity}x {formatCurrency(item.unitPrice)}
                            </p>
                          </div>
                        </div>
                        <span className="font-bold text-foreground">
                          {formatCurrency(item.totalPrice)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

import * as React from "react";
import { AccountLayout } from "@/src/layouts/account/AccountLayout";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { OrderStatusBadge } from "@/src/components/business/OrderStatusBadge";
import { useAuthStore } from "@/src/stores/authStore";
import { useNavigationStore } from "@/src/stores/navigationStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import {
  Package,
  Heart,
  MapPin,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";
import { formatCurrency } from "@/src/utils/formatters";

export const AccountOverviewPage: React.FC = () => {
  const { user } = useAuthStore();
  const { navigate } = useNavigationStore();
  const { productIds } = useWishlistStore();

  const recentOrders = [
    {
      id: "DENGO-8942",
      date: "24/08/2026",
      status: "in_production" as const,
      total: 164.8,
      itemCount: 2,
      firstItemName: "Mascote Lontrinha Dengo 3D Articulada",
    },
    {
      id: "DENGO-7731",
      date: "12/08/2026",
      status: "delivered" as const,
      total: 119.9,
      itemCount: 1,
      firstItemName: "Filamento PLA Silk Candy Rosa Bebê (1kg)",
    },
  ];

  return (
    <AccountLayout
      currentPageTitle="Visão Geral da Conta"
      currentPageBreadcrumb="Visão Geral"
    >
      <div className="space-y-8 text-left">
        {/* Welcome Banner */}
        <div className="p-6 sm:p-8 rounded-3xl border border-pink-100 bg-linear-to-r from-pink-50 via-white to-sky-50 space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-pink-600">
            <Sparkles className="h-4 w-4" />
            <span>Painel do Cliente</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            Olá, {user?.name || "Maker"}! 💖
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Acompanhe a impressão e envio dos seus dengos, gerencie endereços e
            resgate cupons exclusivos.
          </p>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => navigate("/minha-conta/pedidos")}
            className="p-5 rounded-3xl border border-pink-100 bg-white hover:border-pink-300 transition-all cursor-pointer space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                <Package className="h-5 w-5" />
              </div>
              <Badge variant="candyGradient">2 Pedidos</Badge>
            </div>
            <div>
              <p className="text-xs text-slate-500">Meus Pedidos</p>
              <p className="text-sm font-bold text-slate-900">
                1 em Produção 3D
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate("/minha-conta/favoritos")}
            className="p-5 rounded-3xl border border-sky-100 bg-white hover:border-sky-300 transition-all cursor-pointer space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
                <Heart className="h-5 w-5" />
              </div>
              <Badge variant="babyBlue">{productIds.length} Itens</Badge>
            </div>
            <div>
              <p className="text-xs text-slate-500">Lista de Desejos</p>
              <p className="text-sm font-bold text-slate-900">
                Peças Favoritadas
              </p>
            </div>
          </div>

          <div
            onClick={() => navigate("/minha-conta/enderecos")}
            className="p-5 rounded-3xl border border-pink-100 bg-white hover:border-pink-300 transition-all cursor-pointer space-y-2 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-50 text-pink-600">
                <MapPin className="h-5 w-5" />
              </div>
              <Badge variant="babyPink">1 Principal</Badge>
            </div>
            <div>
              <p className="text-xs text-slate-500">Endereços Salvos</p>
              <p className="text-sm font-bold text-slate-900">São Paulo - SP</p>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Últimos Pedidos
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/minha-conta/pedidos")}
              className="text-xs text-pink-600"
            >
              <span>Ver todos</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>

          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-3xl border border-pink-100 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">
                      #{order.id}
                    </span>
                    <OrderStatusBadge status={order.status} />
                  </div>
                  <p className="text-xs font-semibold text-slate-900">
                    {order.firstItemName}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>
                      Realizado em {order.date} • {order.itemCount} item(ns)
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Valor Total</p>
                    <p className="text-sm font-black text-pink-600">
                      {formatCurrency(order.total)}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/minha-conta/pedidos")}
                    className="text-xs font-bold border-pink-200 text-pink-700 hover:bg-pink-50"
                  >
                    Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

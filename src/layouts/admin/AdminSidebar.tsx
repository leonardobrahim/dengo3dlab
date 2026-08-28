import * as React from "react";
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  Cpu,
  Truck,
  Ticket,
  Star,
  BarChart3,
  ShieldCheck,
  Settings,
  Store,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { DengoLogo } from "@/src/components/brand/DengoLogo";
import { useNavigationStore } from "@/src/stores/navigationStore";
import { useAuthStore } from "@/src/stores/authStore";

export interface AdminSidebarProps {
  onItemClick?: () => void;
}

type AdminRole = "superadmin" | "admin" | "production" | "stock" | "support";

interface NavItem {
  label: string;
  path: string;
  alias?: string;
  icon: React.ElementType;
  badge?: string;
  badgeVariant?: "candy" | "sky" | "default";
  allowedRoles: AdminRole[];
}

export const adminNavItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    alias: "/admin",
    icon: LayoutDashboard,
    allowedRoles: ["superadmin", "admin", "production", "stock", "support"],
  },
  {
    label: "Produtos",
    path: "/admin/produtos",
    icon: Package,
    badge: "6",
    allowedRoles: ["superadmin", "admin", "stock"],
  },
  {
    label: "Categorias",
    path: "/admin/categorias",
    icon: Layers,
    badge: "4",
    allowedRoles: ["superadmin", "admin"],
  },
  {
    label: "Pedidos",
    path: "/admin/pedidos",
    icon: ShoppingBag,
    badge: "3",
    badgeVariant: "candy",
    allowedRoles: ["superadmin", "admin", "support", "production", "stock"],
  },
  {
    label: "Clientes",
    path: "/admin/clientes",
    icon: Users,
    allowedRoles: ["superadmin", "admin", "support"],
  },
  {
    label: "Estoque & Insumos",
    path: "/admin/estoque",
    icon: Boxes,
    allowedRoles: ["superadmin", "admin", "stock"],
  },
  {
    label: "Fila de Produção 3D",
    path: "/admin/producao",
    icon: Cpu,
    badge: "2 On",
    badgeVariant: "sky",
    allowedRoles: ["superadmin", "admin", "production"],
  },
  {
    label: "Envios & Rastreio",
    path: "/admin/envios",
    icon: Truck,
    allowedRoles: ["superadmin", "admin", "support", "stock"],
  },
  {
    label: "Cupons de Desconto",
    path: "/admin/cupons",
    icon: Ticket,
    allowedRoles: ["superadmin", "admin"],
  },
  {
    label: "Avaliações de Clientes",
    path: "/admin/avaliacoes",
    icon: Star,
    allowedRoles: ["superadmin", "admin", "support"],
  },
  {
    label: "Relatórios & Vendas",
    path: "/admin/relatorios",
    icon: BarChart3,
    allowedRoles: ["superadmin", "admin"],
  },
  {
    label: "Administradores",
    path: "/admin/administradores",
    icon: ShieldCheck,
    allowedRoles: ["superadmin"],
  },
  {
    label: "Configurações",
    path: "/admin/configuracoes",
    icon: Settings,
    allowedRoles: ["superadmin", "admin"],
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onItemClick }) => {
  const { currentPath, navigate } = useNavigationStore();
  const { logout, user } = useAuthStore();

  const userRole = (user?.role as AdminRole) || "support";

  const handleNav = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  const visibleItems = adminNavItems.filter((item) =>
    item.allowedRoles.includes(userRole),
  );

  return (
    <aside className="w-64 flex flex-col h-full bg-card border-r border-pink-200/60 dark:border-pink-900/40 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-pink-100 dark:border-pink-950/60 flex items-center justify-between">
        <div
          className="cursor-pointer"
          onClick={() => handleNav("/admin/dashboard")}
        >
          <DengoLogo size="sm" variant="full" />
          <div className="flex items-center gap-1.5 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-pink-600 dark:text-pink-400">
              Lab Management Suite
            </span>
          </div>
        </div>
      </div>

      {/* Main Nav Items List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground px-3 py-1">
          Navegação Principal
        </p>

        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentPath === item.path ||
            (item.alias && currentPath === item.alias) ||
            (item.path !== "/admin" &&
              item.path !== "/admin/dashboard" &&
              currentPath.startsWith(item.path));

          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-linear-to-r from-pink-500 to-pink-400 text-white shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground hover:bg-pink-50 dark:hover:bg-pink-950/40"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-pink-500"}`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-white text-pink-600"
                      : item.badgeVariant === "sky"
                        ? "bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-300"
                        : "bg-pink-100 dark:bg-pink-950 text-pink-600 dark:text-pink-300"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer / Store Link */}
      <div className="p-3 border-t border-pink-100 dark:border-border space-y-1.5 bg-pink-50/40 dark:bg-card">
        <button
          onClick={() => handleNav("/")}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-sky-700 dark:text-sky-300 bg-sky-100/60 dark:bg-sky-950/50 hover:bg-sky-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-sky-500" />
            <span>Ver Loja Aberta</span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-sky-500" />
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span>Sair da Administração</span>
        </button>
      </div>
    </aside>
  );
};

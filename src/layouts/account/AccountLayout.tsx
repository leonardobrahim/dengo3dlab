import * as React from 'react';
import {
  User,
  Package,
  Heart,
  MapPin,
  Star,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
  Sparkles,
  LayoutDashboard,
  ShieldAlert,
} from 'lucide-react';
import { StoreHeader } from '@/src/layouts/store/StoreHeader';
import { StoreFooter } from '@/src/layouts/store/StoreFooter';
import { CartDrawer } from '@/src/features/foundation/CartDrawer';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { Avatar } from '@/src/components/ui/Avatar';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { Drawer } from '@/src/components/ui/Drawer';
import { useAuthStore } from '@/src/stores/authStore';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useWishlistStore } from '@/src/stores/wishlistStore';

export interface AccountLayoutProps {
  children: React.ReactNode;
  currentPageTitle?: string;
  currentPageBreadcrumb?: string;
}

const accountNavItems = [
  { label: 'Visão Geral', path: '/minha-conta', icon: LayoutDashboard },
  { label: 'Meu Perfil', path: '/minha-conta/perfil', icon: User },
  { label: 'Meus Pedidos', path: '/minha-conta/pedidos', icon: Package },
  { label: 'Lista de Favoritos', path: '/minha-conta/favoritos', icon: Heart, hasBadge: true },
  { label: 'Meus Endereços', path: '/minha-conta/enderecos', icon: MapPin },
  { label: 'Minhas Avaliações', path: '/minha-conta/avaliacoes', icon: Star },
  { label: 'Configurações', path: '/minha-conta/configuracoes', icon: Settings },
];

export const AccountLayout: React.FC<AccountLayoutProps> = ({
  children,
  currentPageTitle = 'Minha Conta',
  currentPageBreadcrumb,
}) => {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const { currentPath, navigate } = useNavigationStore();
  const { productIds } = useWishlistStore();
  const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (!isAuthenticated && !isLoading) {
    return null; // or a skeleton/spinner
  }

  const wishlistCount = productIds.length;

  const breadcrumbItems = [
    { label: 'Início', href: '/' },
    { label: 'Minha Conta', href: '/minha-conta' },
    ...(currentPageBreadcrumb && currentPageBreadcrumb !== 'Minha Conta'
      ? [{ label: currentPageBreadcrumb, isCurrent: true }]
      : []),
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-pink-300/40 selection:text-pink-900">
      <StoreHeader />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Breadcrumb & Mobile Drawer Trigger */}
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-pink-100">
          <Breadcrumb items={breadcrumbItems} onNavigate={navigate} />

          <Button
            variant="outline"
            size="sm"
            className="lg:hidden text-xs gap-1.5 border-pink-200"
            onClick={() => setMobileDrawerOpen(true)}
          >
            <Menu className="h-3.5 w-3.5 text-pink-500" />
            <span>Menu da Conta</span>
          </Button>
        </div>

        {/* Layout Grid: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Account Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 rounded-3xl border border-pink-100 bg-white p-5 space-y-6 shadow-xs sticky top-24">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 pb-4 border-b border-pink-100">
              <Avatar
                src={user?.avatarUrl}
                name={user?.name || 'Cliente Dengo'}
                size="md"
                status={isAuthenticated ? 'online' : 'offline'}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-slate-900 truncate">
                  {user?.name || 'Visitante'}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {user?.email || 'contato@dengo3d.com'}
                </p>
                <Badge variant="babyPink" className="mt-1 text-[9px] uppercase">
                  {user?.role && ['admin', 'superadmin', 'production', 'stock', 'support'].includes(user.role) ? 'Administrador' : 'Cliente VIP'}
                </Badge>
              </div>
            </div>

            {/* Nav Items */}
            <nav className="space-y-1">
              {accountNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-pink-400 text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-pink-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-pink-500'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.hasBadge && wishlistCount > 0 && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          isActive ? 'bg-white text-pink-600' : 'bg-pink-100 text-pink-600'
                        }`}
                      >
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                );
              })}

              {user?.role && ['admin', 'superadmin', 'production', 'stock', 'support'].includes(user.role) && (
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-purple-600 hover:bg-purple-50 transition-colors cursor-pointer"
                >
                  <ShieldAlert className="h-4 w-4" />
                  <span>Painel Admin</span>
                </button>
              )}
            </nav>

            {/* Logout Button */}
            <div className="pt-4 border-t border-pink-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="w-full justify-start text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50"
              >
                <LogOut className="h-3.5 w-3.5 mr-2" />
                <span>Sair da Conta</span>
              </Button>
            </div>
          </aside>

          {/* Account Subpage Content Area */}
          <div className="lg:col-span-3 min-w-0">
            {children}
          </div>
        </div>
      </main>

      {/* Mobile Sidebar Drawer */}
      <Drawer
        open={mobileDrawerOpen}
        onOpenChange={setMobileDrawerOpen}
        title="Área do Cliente"
        description="Gerencie seus pedidos, favoritos e dados cadastrais"
        side="left"
      >
        <div className="flex flex-col h-full justify-between py-2 space-y-6">
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-pink-50/60 border border-pink-200/60">
              <Avatar src={user?.avatarUrl} name={user?.name || 'Cliente'} size="md" />
              <div className="min-w-0 flex-1 text-left">
                <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Visitante'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Links */}
            <nav className="space-y-1 text-left">
              {accountNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;

                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setMobileDrawerOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                      isActive
                        ? 'bg-pink-500 text-white font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-pink-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.hasBadge && wishlistCount > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full font-bold bg-pink-100 text-pink-600">
                        {wishlistCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <Button
            variant="outline"
            className="w-full text-xs text-rose-600"
            onClick={() => {
              logout();
              setMobileDrawerOpen(false);
            }}
          >
            <LogOut className="h-3.5 w-3.5 mr-2" />
            Sair da Conta
          </Button>
        </div>
      </Drawer>

      <StoreFooter />
      <CartDrawer />
    </div>
  );
};

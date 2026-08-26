import * as React from 'react';
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Store,
  User,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Clock,
  Printer,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/src/components/ui/Dropdown';
import { Avatar } from '@/src/components/ui/Avatar';
import { Badge } from '@/src/components/ui/Badge';
import { useUIStore } from '@/src/stores/uiStore';
import { useAuthStore } from '@/src/stores/authStore';
import { useNavigationStore } from '@/src/stores/navigationStore';

export interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useUIStore();
  const { user, logout } = useAuthStore();
  const { navigate } = useNavigationStore();
  const [adminSearch, setAdminSearch] = React.useState('');

  const notifications = [
    {
      id: 'notif-1',
      icon: Printer,
      color: 'text-sky-500',
      title: 'Impressão Finalizada!',
      desc: 'Bambu Lab X1-Carbon concluiu o Dragão Articulado Candy (45cm).',
      time: 'Há 5 minutos',
      unread: true,
    },
    {
      id: 'notif-2',
      icon: CheckCircle,
      color: 'text-emerald-500',
      title: 'Novo Pedido #DENGO-8942',
      desc: 'R$ 289,70 via Pix (Pago). Pronto para fatiamento/produção.',
      time: 'Há 18 minutos',
      unread: true,
    },
    {
      id: 'notif-3',
      icon: AlertTriangle,
      color: 'text-amber-500',
      title: 'Estoque Baixo de Filamento',
      desc: 'PLA Silk Rosa Bebê restam apenas 3 carretéis.',
      time: 'Há 1 hora',
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-pink-200/60 dark:border-pink-900/40 bg-card/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Quick Search */}
      <div className="flex items-center gap-3 flex-1">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onMenuToggle}
          className="lg:hidden hover:bg-pink-50 dark:hover:bg-pink-950/40"
          aria-label="Abrir menu lateral do painel"
        >
          <Menu className="h-5 w-5 text-pink-500" />
        </Button>

        {/* Global Admin Search Bar */}
        <div className="relative w-full max-w-xs sm:max-w-md hidden sm:block">
          <input
            type="text"
            placeholder="Buscar por ID de pedido, cliente, SKU ou arquivo 3D..."
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 text-xs rounded-xl border border-pink-200/80 dark:border-pink-900/50 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-400/20"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-pink-400" />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Quick link to Store */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          className="text-xs font-bold gap-1.5 border-sky-200 text-sky-700 hover:bg-sky-50 dark:border-sky-900 dark:text-sky-300 dark:hover:bg-sky-950/40"
        >
          <Store className="h-3.5 w-3.5 text-sky-500" />
          <span className="hidden sm:inline">Ver Loja</span>
        </Button>

        {/* Theme Switcher */}
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={toggleTheme}
          aria-label="Alternar tema"
          className="hover:bg-pink-50 dark:hover:bg-pink-950/40"
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 text-amber-300" />
          ) : (
            <Moon className="h-4 w-4 text-sky-600" />
          )}
        </Button>

        {/* Notifications Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <button
              type="button"
              className="relative p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-colors cursor-pointer"
              aria-label="Notificações do Laboratório"
            >
              <Bell className="h-4 w-4 text-pink-500" />
              <span className="absolute 1.5 top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-pink-500 animate-ping" />
            </button>
          }
        >
          <div className="px-3 py-2 border-b border-border flex items-center justify-between">
            <span className="text-xs font-bold text-foreground">Alertas do Laboratório 3D</span>
            <Badge variant="babyPink">2 Novos</Badge>
          </div>

          <div className="max-h-64 overflow-y-auto w-72 sm:w-80">
            {notifications.map((n) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.id}
                  className={`p-3 border-b border-border/40 text-left hover:bg-pink-50/50 dark:hover:bg-pink-950/30 transition-colors ${
                    n.unread ? 'bg-pink-50/20 dark:bg-pink-950/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-card border border-border shrink-0">
                      <Icon className={`h-3.5 w-3.5 ${n.color}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-foreground truncate">{n.title}</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{n.desc}</p>
                      <p className="text-[9px] text-muted-foreground/80 mt-1 flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        <span>{n.time}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <DropdownItem onClick={() => navigate('/admin/producao')}>
            <span className="text-[11px] font-bold text-pink-600 dark:text-pink-400 text-center w-full block">
              Ver Fila de Produção Completa ➔
            </span>
          </DropdownItem>
        </Dropdown>

        {/* Admin Profile Dropdown */}
        <Dropdown
          align="right"
          trigger={
            <button
              type="button"
              className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-all cursor-pointer"
            >
              <Avatar
                src={user?.avatarUrl}
                name={user?.name || 'Administrador Dengo'}
                size="sm"
                status="online"
              />
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-foreground leading-none">{user?.name || 'Admin Master'}</p>
                <span className="text-[10px] text-pink-500 font-semibold">Dengo 3D Lab</span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden sm:block" />
            </button>
          }
        >
          <div className="px-3 py-2 border-b border-border text-left">
            <p className="text-xs font-bold text-foreground">{user?.name || 'Admin Master'}</p>
            <p className="text-[10px] text-muted-foreground">admin@dengo3d.com</p>
            <Badge variant="cherry" className="mt-1 text-[8px] uppercase">
              Acesso Total
            </Badge>
          </div>

          <DropdownItem onClick={() => navigate('/admin/configuracoes')}>
            <span>Configurações do Lab</span>
          </DropdownItem>
          <DropdownItem onClick={() => navigate('/minha-conta')}>
            <span>Minha Conta de Cliente</span>
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem onClick={logout} destructive>
            <span>Sair do Painel</span>
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
};

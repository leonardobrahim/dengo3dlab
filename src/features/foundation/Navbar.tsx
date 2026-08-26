import * as React from 'react';
import { Sun, Moon, ShoppingBag, Heart, Sparkles, Menu, X, HelpCircle, Palette } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/src/components/ui/Dropdown';
import { Avatar } from '@/src/components/ui/Avatar';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { useUIStore } from '@/src/stores/uiStore';
import { useAuthStore } from '@/src/stores/authStore';
import { useCartStore } from '@/src/stores/cartStore';
import { useWishlistStore } from '@/src/stores/wishlistStore';
import { siteConfig } from '@/src/config/site';

export interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onSelectTab }) => {
  const { theme, toggleTheme, setCartDrawerOpen } = useUIStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getTotalItemsCount } = useCartStore();
  const { productIds } = useWishlistStore();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const cartCount = getTotalItemsCount();
  const wishlistCount = productIds.length;

  const navLinks = [
    { id: 'design-system', label: '1. Design System & UI Pastel' },
    { id: 'business-components', label: '2. Catálogo & Peças Dengo' },
    { id: 'forms-validation', label: '3. Formulários & Zod' },
    { id: 'state-services', label: '4. Mock API & Stores' },
    { id: 'architecture-docs', label: '5. Arquitetura & Docs' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-200/60 dark:border-pink-900/40 bg-background/95 backdrop-blur-md">
      {/* Top Dengo Announcement Banner in Candy Colors */}
      <div className="bg-gradient-to-r from-pink-500 via-pink-400 to-sky-400 text-white text-[11px] py-1.5 px-4 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
          <span className="font-semibold tracking-wide flex items-center gap-1.5">
            <span>✨</span>
            <span>{siteConfig.brandName} • Estúdio Criativo & Loja de Impressão 3D</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 font-medium text-[11px] text-white/90">
          <span>Paleta Rosa & Azul Bebê</span>
          <span>•</span>
          <span>Colecionáveis Articulados</span>
          <span>•</span>
          <span>Filamentos Candy Color</span>
          <span>•</span>
          <span>Cupom: <strong>DENGO10</strong></span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between gap-4">
        {/* Brand Logo with Otter Mascot */}
        <div
          className="cursor-pointer select-none transition-transform hover:scale-[1.02]"
          onClick={() => onSelectTab('design-system')}
        >
          <DengoLogo size="md" variant="full" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-pink-50/50 dark:bg-card/40 p-1.5 rounded-2xl border border-pink-200/40 dark:border-border">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onSelectTab(link.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none ${
                activeTab === link.id
                  ? 'bg-gradient-to-r from-pink-500 to-sky-400 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-pink-100/50 dark:hover:bg-card'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Actions & Theme Toggler */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={toggleTheme}
            aria-label="Alternar tema claro/escuro"
            title={theme === 'dark' ? 'Mudar para tema Candy Claro' : 'Mudar para tema Twilight Escuro'}
            className="border-pink-200 dark:border-pink-900/50 hover:bg-pink-50 dark:hover:bg-pink-950/40"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-300 animate-pulse" />
            ) : (
              <Moon className="h-4 w-4 text-sky-600" />
            )}
          </Button>

          {/* Wishlist Indicator */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => onSelectTab('business-components')}
            className="relative border-pink-200 dark:border-pink-900/50 hover:bg-pink-50 dark:hover:bg-pink-950/40"
            aria-label="Lista de Desejos"
            title="Lista de Desejos"
          >
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Button>

          {/* Cart Drawer Trigger */}
          <Button
            variant="dengo"
            size="sm"
            onClick={() => setCartDrawerOpen(true)}
            className="gap-1.5 text-xs font-bold"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <span className="h-4 min-w-4 px-1 rounded-full bg-white text-pink-600 text-[10px] font-extrabold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>

          {/* User Account / Avatar Dropdown */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="flex items-center gap-2 p-1 rounded-full ring-2 ring-pink-200 dark:ring-pink-900/60 hover:ring-pink-400 transition-all cursor-pointer"
                aria-label="Menu do usuário"
              >
                <Avatar
                  src={user?.avatarUrl}
                  name={user?.name || 'Maker Dengo'}
                  size="sm"
                  status={isAuthenticated ? 'online' : 'offline'}
                />
              </button>
            }
          >
            <div className="px-3 py-2 border-b border-border text-left">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-foreground truncate">
                  {user ? user.name : 'Visitante Criativo'}
                </p>
                <span className="text-pink-500 text-xs">💖</span>
              </div>
              <p className="text-[11px] text-muted-foreground truncate">
                {user ? user.email : 'Faça login para salvar seus pedidos'}
              </p>
              {user?.role && (
                <Badge variant="babyPink" className="mt-1.5 text-[9px] uppercase">
                  {user.role}
                </Badge>
              )}
            </div>

            <DropdownItem onClick={() => onSelectTab('forms-validation')}>
              Validar Formulários (Auth & Pedido)
            </DropdownItem>
            <DropdownItem onClick={() => onSelectTab('state-services')}>
              Gerenciar Estado (Zustand & API)
            </DropdownItem>
            <DropdownSeparator />
            {isAuthenticated ? (
              <DropdownItem onClick={logout} destructive>
                Sair da Conta
              </DropdownItem>
            ) : (
              <DropdownItem onClick={() => onSelectTab('forms-validation')}>
                Entrar com Conta Maker
              </DropdownItem>
            )}
          </Dropdown>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Alternar menu mobile"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4 text-pink-500" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-pink-200/60 dark:border-pink-900/40 bg-card p-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onSelectTab(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === link.id
                  ? 'bg-gradient-to-r from-pink-500 to-sky-400 text-white'
                  : 'text-muted-foreground hover:bg-pink-50 dark:hover:bg-card'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

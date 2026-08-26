import * as React from 'react';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  Layers,
  HelpCircle,
  LogOut,
  Settings,
  Package,
  ShieldAlert,
  ChevronDown,
  ArrowRight,
  Flame,
  Tag,
} from 'lucide-react';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Dropdown, DropdownItem, DropdownSeparator } from '@/src/components/ui/Dropdown';
import { Avatar } from '@/src/components/ui/Avatar';
import { Drawer } from '@/src/components/ui/Drawer';
import { ProductSearchWithSuggestions } from '@/src/components/business/ProductSearchWithSuggestions';
import { useUIStore } from '@/src/stores/uiStore';
import { useAuthStore } from '@/src/stores/authStore';
import { useCartStore } from '@/src/stores/cartStore';
import { useWishlistStore } from '@/src/stores/wishlistStore';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { mockCategories } from '@/src/mocks/categories';
import { siteConfig } from '@/src/config/site';

export const StoreHeader: React.FC = () => {
  const { setCartDrawerOpen } = useUIStore();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getTotalItemsCount } = useCartStore();
  const { productIds } = useWishlistStore();
  const { currentPath, navigate } = useNavigationStore();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isSearchExpandedMobile, setIsSearchExpandedMobile] = React.useState(false);

  const cartCount = getTotalItemsCount();
  const wishlistCount = productIds.length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/busca', { query: searchQuery.trim() });
      setIsSearchExpandedMobile(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pink-200/60 dark:border-pink-900/40 bg-background/95 backdrop-blur-md">
      {/* Top Dengo Announcement Banner in Candy Colors */}
      <div className="bg-gradient-to-r from-pink-500 via-pink-400 to-sky-400 text-white text-[11px] py-1.5 px-4 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
          <span className="font-semibold tracking-wide flex items-center gap-1.5">
            <span>✨</span>
            <span>{siteConfig.brandName} • Estúdio Criativo & Loja de Impressão 3D</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 font-medium text-[11px] text-white/90">
          <span>Colecionáveis Articulados</span>
          <span>•</span>
          <span>Filamentos Candy Color</span>
          <span>•</span>
          <span>
            Cupom: <strong>DENGO10</strong> (10% OFF)
          </span>
        </div>
      </div>

      {/* Main Desktop & Mobile Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-17 flex items-center justify-between gap-3 sm:gap-6">
        {/* Mobile Left: Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu de navegação"
            className="hover:bg-pink-50 dark:hover:bg-pink-950/40"
          >
            <Menu className="h-5 w-5 text-pink-500" />
          </Button>
        </div>

        {/* Brand Logo */}
        <div
          className="cursor-pointer select-none transition-transform hover:scale-[1.02] shrink-0"
          onClick={() => navigate('/')}
        >
          <DengoLogo size="md" variant="full" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 font-medium text-xs">
          <button
            onClick={() => navigate('/produtos')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer select-none ${
              currentPath.startsWith('/produtos')
                ? 'bg-pink-100/70 text-pink-700 dark:bg-pink-950/60 dark:text-pink-300 font-bold'
                : 'text-muted-foreground hover:text-foreground hover:bg-pink-50 dark:hover:bg-card'
            }`}
          >
            Produtos
          </button>

          {/* Categorias Dropdown */}
          <Dropdown
            trigger={
              <button
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer select-none inline-flex items-center gap-1 ${
                  currentPath.startsWith('/categorias')
                    ? 'bg-sky-100/70 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 font-bold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-pink-50 dark:hover:bg-card'
                }`}
              >
                <span>Categorias</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            }
          >
            <DropdownItem onClick={() => navigate('/categorias')}>
              <span className="font-bold text-pink-600 dark:text-pink-400">Ver Todas as Categorias</span>
            </DropdownItem>
            <DropdownSeparator />
            {mockCategories.map((cat) => (
              <DropdownItem
                key={cat.id}
                onClick={() => navigate(`/categorias/${cat.slug}`, { categorySlug: cat.slug })}
              >
                <div className="flex items-center justify-between w-full">
                  <span>{cat.name}</span>
                  <span className="text-[10px] text-muted-foreground bg-pink-50 dark:bg-pink-950/60 px-1.5 py-0.5 rounded-full">
                    {cat.productCount}
                  </span>
                </div>
              </DropdownItem>
            ))}
          </Dropdown>

          <button
            onClick={() => navigate('/ofertas')}
            className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer select-none inline-flex items-center gap-1.5 ${
              currentPath === '/ofertas'
                ? 'bg-rose-100/70 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 font-bold'
                : 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30'
            }`}
          >
            <Flame className="h-3.5 w-3.5 fill-current" />
            <span>Ofertas</span>
          </button>
        </nav>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm">
          <ProductSearchWithSuggestions />
        </div>

        {/* Actions (Search Mobile, Theme, Wishlist, Account, Cart, Admin) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="md:hidden"
            onClick={() => setIsSearchExpandedMobile(!isSearchExpandedMobile)}
            aria-label="Buscar produtos"
          >
            <Search className="h-4 w-4 text-pink-500" />
          </Button>

          {/* Wishlist / Favoritos */}
          <Button
            variant="outline"
            size="icon-sm"
            onClick={() => navigate('/minha-conta/favoritos')}
            className="relative border-pink-200 hover:bg-pink-50"
            aria-label="Lista de Favoritos"
            title="Lista de Favoritos"
          >
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500/20" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-pink-500 text-[10px] font-bold text-white shadow-xs">
                {wishlistCount}
              </span>
            )}
          </Button>

          {/* User Account Dropdown */}
          <Dropdown
            align="right"
            trigger={
              <button
                type="button"
                className="flex items-center gap-1.5 p-1 rounded-full ring-2 ring-pink-200 dark:ring-pink-900/60 hover:ring-pink-400 transition-all cursor-pointer"
                aria-label="Menu da Conta"
              >
                <Avatar
                  src={user?.avatarUrl}
                  name={user?.name || 'Visitante'}
                  size="sm"
                  status={isAuthenticated ? 'online' : 'offline'}
                />
              </button>
            }
          >
            {isAuthenticated && user ? (
              <>
                <div className="px-3 py-2 border-b border-border text-left">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-bold text-foreground truncate">{user.name}</p>
                    <span className="text-pink-500 text-xs">💖</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                  <Badge variant="babyPink" className="mt-1 text-[9px] uppercase">
                    {user.role}
                  </Badge>
                </div>

                <DropdownItem onClick={() => navigate('/minha-conta/perfil')}>
                  <User className="h-3.5 w-3.5 mr-2 text-pink-500" />
                  <span>Meu perfil</span>
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/minha-conta/pedidos')}>
                  <Package className="h-3.5 w-3.5 mr-2 text-sky-500" />
                  <span>Meus pedidos</span>
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/minha-conta/favoritos')}>
                  <Heart className="h-3.5 w-3.5 mr-2 text-rose-500" />
                  <span>Favoritos</span>
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/minha-conta/configuracoes')}>
                  <Settings className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Configurações</span>
                </DropdownItem>

                {(user.role === 'admin' || user.role === 'superadmin' || user.role === 'support' || user.role === 'production' || user.role === 'stock') && (
                  <>
                    <DropdownSeparator />
                    <DropdownItem onClick={() => navigate('/admin')}>
                      <ShieldAlert className="h-3.5 w-3.5 mr-2 text-purple-500" />
                      <span className="font-bold text-purple-600 dark:text-purple-400">
                        Painel Administrativo
                      </span>
                    </DropdownItem>
                  </>
                )}

                <DropdownSeparator />
                <DropdownItem onClick={logout} destructive>
                  <LogOut className="h-3.5 w-3.5 mr-2" />
                  <span>Sair da conta</span>
                </DropdownItem>
              </>
            ) : (
              <>
                <div className="px-3 py-2 border-b border-border text-left">
                  <p className="text-xs font-bold text-foreground">Bem-vindo à Dengo 3D!</p>
                  <p className="text-[11px] text-muted-foreground">Acesse sua conta para ver pedidos</p>
                </div>
                <DropdownItem onClick={() => navigate('/login')}>
                  <User className="h-3.5 w-3.5 mr-2 text-pink-500" />
                  <span className="font-bold">Entrar</span>
                </DropdownItem>
                <DropdownItem onClick={() => navigate('/cadastro')}>
                  <Sparkles className="h-3.5 w-3.5 mr-2 text-sky-500" />
                  <span>Criar conta</span>
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem onClick={() => navigate('/admin')}>
                  <ShieldAlert className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>Acesso Admin</span>
                </DropdownItem>
              </>
            )}
          </Dropdown>

          {/* Cart Trigger with Quantity Badge */}
          <Button
            variant="dengo"
            size="sm"
            onClick={() => setCartDrawerOpen(true)}
            className="gap-1.5 text-xs font-bold shrink-0"
            aria-label="Abrir carrinho de compras"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartCount > 0 && (
              <span className="h-4 min-w-4 px-1 rounded-full bg-white text-pink-600 text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Expandable Search Bar */}
      {isSearchExpandedMobile && (
        <div className="md:hidden px-4 pb-3 border-t border-pink-100 dark:border-pink-900/30 pt-2 bg-background">
          <ProductSearchWithSuggestions
            autoFocus
            onSearchSubmit={() => setIsSearchExpandedMobile(false)}
          />
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      <Drawer
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        title="Menu Dengo 3D Lab"
        description="Navegue pela loja e descubra fofuras em 3D"
        side="left"
      >
        <div className="flex flex-col h-full justify-between py-2 text-left space-y-6">
          {/* Main Navigation Links */}
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">
              Explorar Loja
            </p>

            <button
              onClick={() => {
                navigate('/produtos');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-foreground hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-950 text-pink-600">
                  <Package className="h-4 w-4" />
                </span>
                <span>Todos os Produtos</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            <button
              onClick={() => {
                navigate('/categorias');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-foreground hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-950 text-sky-600">
                  <Layers className="h-4 w-4" />
                </span>
                <span>Categorias Fofas</span>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
            </button>

            <button
              onClick={() => {
                navigate('/ofertas');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-950 text-rose-600">
                  <Flame className="h-4 w-4" />
                </span>
                <span>Ofertas & Cupons</span>
              </div>
              <Badge variant="cherry">Promo</Badge>
            </button>

            <div className="pt-3 border-t border-border space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2">
                Minha Área
              </p>

              <button
                onClick={() => {
                  navigate('/minha-conta');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs font-medium text-foreground hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-colors"
              >
                <User className="h-4 w-4 text-pink-500" />
                <span>Minha conta</span>
              </button>

              <button
                onClick={() => {
                  navigate('/minha-conta/favoritos');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 rounded-2xl text-xs font-medium text-foreground hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span>Favoritos</span>
                </div>
                {wishlistCount > 0 && <Badge variant="babyPink">{wishlistCount}</Badge>}
              </button>

              <button
                onClick={() => {
                  navigate('/contato');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs font-medium text-foreground hover:bg-pink-50 dark:hover:bg-pink-950/40 transition-colors"
              >
                <HelpCircle className="h-4 w-4 text-sky-500" />
                <span>Suporte & Dúvidas</span>
              </button>

              <button
                onClick={() => {
                  navigate('/admin');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-xs font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
              >
                <ShieldAlert className="h-4 w-4" />
                <span>Painel Admin</span>
              </button>
            </div>
          </div>

          {/* Bottom Mobile Account Actions */}
          <div className="pt-4 border-t border-border space-y-2">
            {isAuthenticated ? (
              <Button
                variant="outline"
                className="w-full justify-center text-xs"
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-3.5 w-3.5 mr-2" />
                Sair da Conta
              </Button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                >
                  Entrar
                </Button>
                <Button
                  variant="dengo"
                  size="sm"
                  onClick={() => {
                    navigate('/cadastro');
                    setMobileMenuOpen(false);
                  }}
                >
                  Criar Conta
                </Button>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </header>
  );
};

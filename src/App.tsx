/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as React from 'react';
import { useUIStore } from '@/src/stores/uiStore';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { CartDrawer } from '@/src/features/foundation/CartDrawer';
import { ToastContainer } from '@/src/components/ui/Toast';

// Pages
import {
  HomePage,
  ProductsPage,
  ProductDetailPage,
  CategoriesPage,
  CategoryDetailPage,
  OffersPage,
  SearchPage,
  CartPage,
  CheckoutPage,
  OrderSuccessPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  AboutPage,
  ContactPage,
  FaqPage,
  ShippingPage,
  ReturnsPage,
  TermsPage,
  PrivacyPage,
  NotFoundPage,
  ServerErrorPage,
  AccountOverviewPage,
  ProfilePage,
  OrdersPage,
  WishlistPage,
  AddressesPage,
  ReviewsPage,
  SettingsPage,
  AdminDashboardPage,
  AdminProductsPage,
  AdminProductFormPage,
  AdminCategoriesPage,
  AdminOrdersPage,
  OrderDetailPage,
  AdminCustomersPage,
  AdminCouponsPage,
  AdminSettingsPage,
  AdminStockPage,
  AdminProductionPage,
  AdminOrderDetailPage,
  AdminCustomerDetailPage,
  AdminReviewsPage,
  AdminShipmentsPage,
  AdminReportsPage,
  AdminUsersPage,
} from '@/src/pages';

// ETAPA 1 Foundation Showcase (Preserved)
import { DesignSystemSection } from '@/src/features/foundation/DesignSystemSection';
import { BusinessComponentsSection } from '@/src/features/foundation/BusinessComponentsSection';
import { FormValidationSection } from '@/src/features/foundation/FormValidationSection';
import { ServicesAndStateSection } from '@/src/features/foundation/ServicesAndStateSection';
import { ArchitectureDocsSection } from '@/src/features/foundation/ArchitectureDocsSection';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Badge } from '@/src/components/ui/Badge';
import { Layers, Sparkles, ShieldCheck, Database, FileCode, ArrowLeft } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';

export default function App() {
  const { theme } = useUIStore();
  const { currentPath, params, syncFromHash, navigate } = useNavigationStore();
  const [devTab, setDevTab] = React.useState('design-system');

  // Sync theme class with HTML root
  React.useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Listen to browser hash changes for seamless back/forward navigation
  React.useEffect(() => {
    const handleHashChange = () => {
      syncFromHash();
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [syncFromHash]);

  // Route Resolver
  const renderCurrentRoute = () => {
    // Exact routes
    switch (currentPath) {
      // Storefront Public Routes
      case '/':
        return <HomePage />;
      case '/produtos':
        return <ProductsPage />;
      case '/categorias':
        return <CategoriesPage />;
      case '/ofertas':
        return <OffersPage />;
      case '/busca':
        return <SearchPage />;
      case '/carrinho':
        return <CartPage />;
      case '/checkout':
        return <CheckoutPage />;

      // Auth Routes
      case '/login':
        return <LoginPage />;
      case '/cadastro':
        return <RegisterPage />;
      case '/recuperar-senha':
        return <ForgotPasswordPage />;
      case '/redefinir-senha':
        return <ResetPasswordPage />;

      // Institutional Routes
      case '/sobre':
        return <AboutPage />;
      case '/contato':
        return <ContactPage />;
      case '/faq':
        return <FaqPage />;
      case '/frete':
        return <ShippingPage />;
      case '/trocas':
        return <ReturnsPage />;
      case '/termos':
        return <TermsPage />;
      case '/privacidade':
        return <PrivacyPage />;
      case '/500':
        return <ServerErrorPage />;

      // Customer Account Routes
      case '/minha-conta':
        return <AccountOverviewPage />;
      case '/minha-conta/perfil':
        return <ProfilePage />;
      case '/minha-conta/pedidos':
        return <OrdersPage />;
      case '/minha-conta/favoritos':
        return <WishlistPage />;
      case '/minha-conta/enderecos':
        return <AddressesPage />;
      case '/minha-conta/avaliacoes':
        return <ReviewsPage />;
      case '/minha-conta/configuracoes':
        return <SettingsPage />;

      // Admin Routes
      case '/admin':
      case '/admin/dashboard':
        return <AdminDashboardPage />;
      case '/admin/produtos':
        return <AdminProductsPage />;
      case '/admin/produtos/novo':
        return <AdminProductFormPage />;
      case '/admin/categorias':
        return <AdminCategoriesPage />;
      case '/admin/estoque':
        return <AdminStockPage />;
      case '/admin/producao':
        return <AdminProductionPage />;
      case '/admin/pedidos':
        return <AdminOrdersPage />;
        return <AdminOrdersPage />;
      case '/admin/clientes':
        return <AdminCustomersPage />;
      case '/admin/cupons':
        return <AdminCouponsPage />;
      case '/admin/avaliacoes':
        return <AdminReviewsPage />;
      case '/admin/envios':
        return <AdminShipmentsPage />;
      case '/admin/relatorios':
        return <AdminReportsPage />;
      case '/admin/administradores':
        return <AdminUsersPage />;
      case '/admin/configuracoes':
        return <AdminSettingsPage />;

      // ETAPA 1 Foundation & Architecture Showcase (Preserved)
      case '/dev-showcase':
        return (
          <StoreLayout>
            <div className="space-y-6 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-gradient-to-r from-pink-50 via-white to-sky-50 dark:from-pink-950/40 dark:via-card dark:to-sky-950/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="candy">ETAPA 1 & ETAPA 2</Badge>
                    <Badge variant="babyPink">Painel de Componentes & Arquitetura</Badge>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-foreground">
                    Laboratório de Fundações & Design System
                  </h1>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/')}
                  className="shrink-0 text-xs font-bold gap-1.5"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Voltar para a Loja</span>
                </Button>
              </div>

              {/* Showcase tab headers */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {[
                  { id: 'design-system', label: '1. Design System & UI Pastel', icon: <Layers className="h-3.5 w-3.5" /> },
                  { id: 'business-components', label: '2. Componentes de Negócio', icon: <Sparkles className="h-3.5 w-3.5" /> },
                  { id: 'forms-validation', label: '3. Validações Zod', icon: <ShieldCheck className="h-3.5 w-3.5" /> },
                  { id: 'state-services', label: '4. Zustand & Mock REST', icon: <Database className="h-3.5 w-3.5" /> },
                  { id: 'architecture-docs', label: '5. Arquitetura', icon: <FileCode className="h-3.5 w-3.5" /> },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setDevTab(t.id)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      devTab === t.id
                        ? 'bg-pink-500 text-white shadow-xs'
                        : 'bg-card border border-pink-200/80 dark:border-pink-900/60 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {t.icon}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Showcase content */}
              <div className="p-4 rounded-3xl border border-pink-100 dark:border-border bg-card">
                {devTab === 'design-system' && <DesignSystemSection />}
                {devTab === 'business-components' && <BusinessComponentsSection />}
                {devTab === 'forms-validation' && <FormValidationSection />}
                {devTab === 'state-services' && <ServicesAndStateSection />}
                {devTab === 'architecture-docs' && <ArchitectureDocsSection />}
              </div>
            </div>
          </StoreLayout>
        );

      default:
        // Dynamic path resolution
        if (currentPath.startsWith('/admin/pedidos/')) {
          const id = currentPath.replace('/admin/pedidos/', '');
          return <AdminOrderDetailPage id={id} />;
        }
        if (currentPath.startsWith('/admin/clientes/')) {
          const id = currentPath.replace('/admin/clientes/', '');
          return <AdminCustomerDetailPage id={id} />;
        }
        if (currentPath.startsWith('/minha-conta/pedidos/')) {
          const orderId = currentPath.replace('/minha-conta/pedidos/', '');
          return <OrderDetailPage orderId={orderId} />;
        }
        if (currentPath.startsWith('/produtos/')) {
          const slug = currentPath.replace('/produtos/', '');
          return <ProductDetailPage slug={slug} />;
        }
        if (currentPath.startsWith('/categorias/')) {
          const categorySlug = currentPath.replace('/categorias/', '');
          return <CategoryDetailPage slug={categorySlug} />;
        }
        if (currentPath.startsWith('/pedido/')) {
          const orderId = currentPath.replace('/pedido/', '');
          return <OrderSuccessPage orderId={orderId} />;
        }
        return <NotFoundPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200 selection:bg-pink-300 selection:text-pink-900">
      {/* Dynamic Page Routed */}
      {renderCurrentRoute()}

      {/* Global Interactive Cart Drawer */}
      <CartDrawer />

      {/* Global Toast Feedback System */}
      <ToastContainer />
    </div>
  );
}

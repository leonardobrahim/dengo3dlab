import * as React from 'react';
import { useAuthStore } from '@/src/stores/authStore';
import { useCartStore } from '@/src/stores/cartStore';
import { useWishlistStore } from '@/src/stores/wishlistStore';
import { useUIStore } from '@/src/stores/uiStore';
import { productService, orderService, cartService, adminService } from '@/src/services';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/src/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/src/components/ui/Table';
import { useToast } from '@/src/hooks/useToast';
import { ENV } from '@/src/config/env';
import { formatCurrency } from '@/src/utils/formatters';
import {
  Database,
  Activity,
  UserCheck,
  ShoppingBag,
  Heart,
  Server,
  RefreshCw,
  Terminal,
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from 'recharts';

export const ServicesAndStateSection: React.FC = () => {
  const { toast } = useToast();
  const { user, isAuthenticated, login, logout, setUser } = useAuthStore();
  const { items, coupon, addItem, removeItem, clearCart, getSubtotal, getTotal } = useCartStore();
  const { productIds, toggleWishlist } = useWishlistStore();
  const { theme, toggleTheme } = useUIStore();

  const [apiLogs, setApiLogs] = React.useState<Array<{ id: string; timestamp: string; method: string; endpoint: string; status: number; duration: number }>>([
    { id: '1', timestamp: new Date().toLocaleTimeString(), method: 'GET', endpoint: '/products', status: 200, duration: 280 },
    { id: '2', timestamp: new Date().toLocaleTimeString(), method: 'GET', endpoint: '/categories', status: 200, duration: 190 },
  ]);

  const [isLoadingApi, setIsLoadingApi] = React.useState(false);

  const mockChartData = [
    { month: 'Jan', kgFilamento: 120, pedidos: 45 },
    { month: 'Fev', kgFilamento: 190, pedidos: 68 },
    { month: 'Mar', kgFilamento: 280, pedidos: 95 },
    { month: 'Abr', kgFilamento: 390, pedidos: 140 },
    { month: 'Mai', kgFilamento: 480, pedidos: 180 },
    { month: 'Jun', kgFilamento: 650, pedidos: 240 },
    { month: 'Jul', kgFilamento: 820, pedidos: 310 },
  ];

  const testFetchProducts = async () => {
    setIsLoadingApi(true);
    const start = performance.now();
    try {
      const res = await productService.getProducts();
      const duration = Math.round(performance.now() - start);
      setApiLogs((prev) => [
        {
          id: String(Date.now()),
          timestamp: new Date().toLocaleTimeString(),
          method: 'GET',
          endpoint: '/products',
          status: 200,
          duration,
        },
        ...prev.slice(0, 7),
      ]);
      toast.success(`Produtos carregados! (${res.data.length} itens)`, `Latência simulada: ${duration}ms`);
    } catch (err: any) {
      toast.error('Erro na requisição', err.message);
    } finally {
      setIsLoadingApi(false);
    }
  };

  const testFetchOrders = async () => {
    setIsLoadingApi(true);
    const start = performance.now();
    try {
      const res = await orderService.getOrders();
      const duration = Math.round(performance.now() - start);
      setApiLogs((prev) => [
        {
          id: String(Date.now()),
          timestamp: new Date().toLocaleTimeString(),
          method: 'GET',
          endpoint: '/orders',
          status: 200,
          duration,
        },
        ...prev.slice(0, 7),
      ]);
      toast.success(`Pedidos carregados! (${res.data.length} itens)`, `Latência simulada: ${duration}ms`);
    } catch (err: any) {
      toast.error('Erro na requisição', err.message);
    } finally {
      setIsLoadingApi(false);
    }
  };

  const setRoleSuperadmin = () => {
    setUser({
      id: 'adm-1',
      name: 'Eng. Marina Siqueira (Admin)',
      email: 'marina.admin@3dforge.com.br',
      role: 'superadmin',
      addresses: [],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-08-25T11:00:00Z',
    });
    toast.success('Papel alterado para Superadmin');
  };

  const setRoleMaker = () => {
    setUser({
      id: 'usr-1',
      name: 'Carlos Maker Silva',
      email: 'carlos.maker@example.com',
      role: 'maker',
      addresses: [],
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-08-25T11:00:00Z',
    });
    toast.success('Papel alterado para Maker');
  };

  return (
    <div className="space-y-12 text-left">
      {/* Section Header */}
      <div className="border-b border-border pb-6">
        <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-wider font-semibold">
          <Database className="h-4 w-4" />
          Camada de Serviços & Estado Global
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          Zustand Stores & Camada Abstrata ApiClient (Mock vs REST)
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-3xl">
          Arquitetura desacoplada: os componentes nunca chamam <code>fetch()</code> diretamente. Todo o acesso ocorre através de contratos TypeScript e serviços com alternância transparente entre Mock API e Backend REST real.
        </p>
      </div>

      {/* 1. STATE INSPECTOR & ZUSTAND STORES */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          1. Estado Global Reativo (Zustand Stores)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* authStore */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  authStore
                </CardTitle>
                <Badge variant={isAuthenticated ? 'success' : 'secondary'} className="text-[10px]">
                  {isAuthenticated ? 'Autenticado' : 'Deslogado'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="text-muted-foreground block">Usuário Atual:</span>
                <strong className="text-foreground">{user?.name || 'Nenhum'}</strong>
              </div>
              <div>
                <span className="text-muted-foreground block">Papel (Role):</span>
                <Badge variant="tech" className="text-[10px] uppercase">
                  {user?.role || 'Guest'}
                </Badge>
              </div>
              <div className="pt-2 flex flex-col gap-1.5">
                <Button size="sm" variant="outline" className="text-[11px] h-7" onClick={setRoleMaker}>
                  Setar Maker
                </Button>
                <Button size="sm" variant="outline" className="text-[11px] h-7" onClick={setRoleSuperadmin}>
                  Setar Superadmin
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* cartStore */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  cartStore
                </CardTitle>
                <Badge variant="filament" className="text-[10px]">
                  {items.length} SKUs
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="text-muted-foreground block">Subtotal Calculado:</span>
                <strong className="text-foreground text-sm">{formatCurrency(getSubtotal())}</strong>
              </div>
              <div>
                <span className="text-muted-foreground block">Cupom Ativo:</span>
                <span className="font-mono text-primary font-bold">
                  {coupon ? `${coupon.code} (-${coupon.discountValue}%)` : 'Nenhum'}
                </span>
              </div>
              <div className="pt-2 flex gap-1.5">
                <Button size="sm" variant="outline" className="text-[11px] h-7 flex-1" onClick={clearCart}>
                  Esvaziar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* wishlistStore */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  wishlistStore
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  {productIds.length} Itens
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="text-muted-foreground block">IDs Favoritados:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {productIds.map((id) => (
                    <Badge key={id} variant="tech" className="text-[9px]">
                      {id}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[11px] h-7 w-full"
                  onClick={() => toggleWishlist('prod-2')}
                >
                  Toggle PETG-CF Favorito
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* uiStore */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  uiStore
                </CardTitle>
                <Badge variant="tech" className="text-[10px] uppercase">
                  {theme} mode
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <span className="text-muted-foreground block">Tema Ativo:</span>
                <strong className="text-foreground capitalize">{theme} Theme</strong>
              </div>
              <div>
                <span className="text-muted-foreground block">Mock API Config:</span>
                <Badge variant="success" className="text-[10px]">
                  USE_MOCK_API: {String(ENV.USE_MOCK_API)}
                </Badge>
              </div>
              <div className="pt-2">
                <Button size="sm" variant="outline" className="text-[11px] h-7 w-full" onClick={toggleTheme}>
                  Alternar Tema
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 2. API CLIENT LIVE CONSOLE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            2. Camada Abstrata ApiClient & Simulação de Chamadas REST
          </h3>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={testFetchProducts}
              isLoading={isLoadingApi}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Testar GET /products
            </Button>
            <Button
              size="sm"
              variant="default"
              onClick={testFetchOrders}
              isLoading={isLoadingApi}
              leftIcon={<Server className="h-3.5 w-3.5" />}
            >
              Testar GET /orders
            </Button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-zinc-950 p-4 font-mono text-xs text-zinc-300">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-zinc-400">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span>ApiClient Network Request Inspector</span>
            </div>
            <span>Base: {ENV.API_BASE_URL} (Mock Mode Active)</span>
          </div>

          <div className="space-y-2 mt-3 max-h-48 overflow-y-auto">
            {apiLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between text-[11px] py-1 border-b border-zinc-900">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">{log.method}</span>
                  <span className="text-zinc-200">{log.endpoint}</span>
                  <span className="text-zinc-500">({log.timestamp})</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-400">{log.duration}ms</span>
                  <span className="bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded text-[10px]">
                    {log.status} OK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. RECHARTS METRICS FOUNDATION */}
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          3. Fundação de Gráficos com Recharts (Volume de Filamentos Impressos & Pedidos)
        </h3>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold">
              Consumo Mensal de Polímeros (kg) & Pedidos de Manufatura
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockChartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorKg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="month" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderColor: '#27272a',
                    borderRadius: '6px',
                    fontSize: '12px',
                    color: '#fafafa',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="kgFilamento"
                  name="Filamento (kg)"
                  stroke="#f97316"
                  fillOpacity={1}
                  fill="url(#colorKg)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

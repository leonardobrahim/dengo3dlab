import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { StatCard } from '@/src/components/business/StatCard';
import { OrderStatusBadge } from '@/src/components/business/OrderStatusBadge';
import { Button } from '@/src/components/ui/Button';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useAuthStore } from '@/src/stores/authStore';
import { mockOrders } from '@/src/mocks/orders';
import { formatCurrency, formatDate, formatTime } from '@/src/utils/formatters';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Printer,
  ArrowUpRight,
  Package,
  Bell,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  LineChart as LineChartIcon
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';

// --- MOCK DATA FOR CHARTS ---
const revenueData = [
  { name: '1 Ago', revenue: 1200, orders: 12 },
  { name: '5 Ago', revenue: 2100, orders: 18 },
  { name: '10 Ago', revenue: 1800, orders: 15 },
  { name: '15 Ago', revenue: 3200, orders: 25 },
  { name: '20 Ago', revenue: 2800, orders: 22 },
  { name: '25 Ago', revenue: 4100, orders: 35 },
];

const categoryData = [
  { name: 'Decoração', value: 45 },
  { name: 'Utilitários', value: 25 },
  { name: 'Colecionáveis', value: 20 },
  { name: 'Insumos', value: 10 },
];
const COLORS = ['#f472b6', '#38bdf8', '#c084fc', '#34d399'];

const topProducts = [
  { name: 'Mascote Lontrinha 3D', sales: 145, revenue: 12890 },
  { name: 'Vaso Bob Sentadinho', sales: 98, revenue: 4400 },
  { name: 'Dragão Articulado', sales: 76, revenue: 26500 },
  { name: 'Suporte Notebook', sales: 65, revenue: 3575 },
];

const notifications = [
  { id: 1, type: 'order', title: 'Novo Pedido #3DF-0010', time: 'Há 5 min', icon: ShoppingBag, color: 'text-sky-500', bg: 'bg-sky-100 dark:bg-sky-900/50' },
  { id: 2, type: 'payment', title: 'Pagamento Aprovado #3DF-0008', time: 'Há 12 min', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/50' },
  { id: 3, type: 'production', title: 'Impressão Concluída (Lote A)', time: 'Há 25 min', icon: CheckCircle2, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/50' },
  { id: 4, type: 'stock', title: 'Estoque Baixo: PLA Preto', time: 'Há 1 hora', icon: AlertTriangle, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/50' },
];

export const AdminDashboardPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { user } = useAuthStore();
  const [period, setPeriod] = React.useState('30 dias');
  
  const role = user?.role as string;
  const isProduction = role === 'production';
  const isStock = role === 'stock';

  const recentOrders = mockOrders.slice(0, 5);

  return (
    <AdminLayout>
      <div className="space-y-8 text-left">
        
        {/* Dashboard Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Visão Geral</h1>
            <p className="text-sm text-slate-500">Acompanhe as métricas e a operação do laboratório.</p>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <select 
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 pr-10 text-sm font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 cursor-pointer"
              >
                <option value="Hoje">Hoje</option>
                <option value="7 dias">Últimos 7 dias</option>
                <option value="30 dias">Últimos 30 dias</option>
                <option value="90 dias">Últimos 90 dias</option>
                <option value="Ano">Este Ano</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Top Header stats (Hide financial if stock/production) */}
        {!isProduction && !isStock && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Faturamento (Mês)"
              value="R$ 28.450,00"
              change="+18.4%"
              trend="up"
              icon={<DollarSign className="h-5 w-5 text-emerald-500" />}
            />
            <StatCard
              title="Pedidos"
              value="342"
              change="+12.2%"
              trend="up"
              icon={<ShoppingBag className="h-5 w-5 text-pink-500" />}
            />
            <StatCard
              title="Ticket Médio"
              value="R$ 83,18"
              change="-2.1%"
              trend="down"
              icon={<LineChartIcon className="h-5 w-5 text-sky-500" />}
            />
            <StatCard
              title="Clientes Ativos"
              value="1.820"
              change="+8.5%"
              trend="up"
              icon={<Users className="h-5 w-5 text-purple-500" />}
            />
          </div>
        )}

        {/* Production & Stock specific stats */}
        {(isProduction || isStock) && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              title="Fila de Produção"
              value="24 itens"
              icon={<Printer className="h-5 w-5 text-pink-500" />}
            />
            <StatCard
              title="Avisos de Estoque"
              value="3 alertas"
              icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
            />
            <StatCard
              title="Pedidos para Envio"
              value="12 prontos"
              icon={<Package className="h-5 w-5 text-sky-500" />}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Charts Area (Hide if production/stock) */}
          {!isProduction && !isStock && (
            <div className="lg:col-span-2 space-y-6">
              
              {/* Revenue Area Chart */}
              <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">Evolução do Faturamento</h3>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f472b6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f472b6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: number) => [`R$ ${value}`, 'Faturamento']}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#ec4899" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Products & Category Mix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-4">Vendas por Categoria</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-2">
                    {categoryData.map((entry, index) => (
                      <div key={entry.name} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                        {entry.name} ({entry.value}%)
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-4">Produtos Mais Vendidos</h3>
                  <div className="space-y-4 mt-2">
                    {topProducts.map((prod, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <div className="min-w-0 flex-1 pr-4">
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{prod.name}</p>
                          <p className="text-xs text-slate-500">{prod.sales} unidades vendidas</p>
                        </div>
                        <p className="text-sm font-bold text-pink-600 shrink-0">{formatCurrency(prod.revenue)}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* Right Sidebar: Notifications & Recent Orders */}
          <div className={`space-y-6 ${isProduction || isStock ? 'lg:col-span-3' : 'lg:col-span-1'}`}>
            
            {/* Notification Center */}
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                  <Bell className="h-4 w-4 text-amber-500" /> Notificações
                </h3>
                <span className="text-[10px] font-bold bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">4 Novas</span>
              </div>
              <div className="space-y-4">
                {notifications.map(notif => (
                  <div key={notif.id} className="flex items-start gap-3">
                    <div className={`mt-0.5 shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${notif.bg} ${notif.color}`}>
                      <notif.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{notif.title}</p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" /> {notif.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Farm Status */}
            <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-4 flex items-center gap-2">
                <Printer className="h-4 w-4 text-sky-500" /> Produção Ativa
              </h3>
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40">
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-200 mb-1">
                    <span>Bambu Lab X1C</span>
                    <span className="text-pink-600">84%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-pink-500 h-full rounded-full" style={{ width: '84%' }} />
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40">
                  <div className="flex justify-between font-bold text-slate-700 dark:text-slate-200 mb-1">
                    <span>K1 Max</span>
                    <span className="text-sky-600">42%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-2">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Full width Recent Orders Table */}
        <div className="bg-white dark:bg-card border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <Package className="h-5 w-5 text-pink-500" /> Pedidos Recentes
            </h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/admin/pedidos')} className="text-xs">
              Ver Todos <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Pedido</th>
                  <th className="px-6 py-4 font-semibold">Cliente</th>
                  <th className="px-6 py-4 font-semibold">Data</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  {!isProduction && <th className="px-6 py-4 font-semibold text-right">Total</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {recentOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{order.orderNumber}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700 dark:text-slate-300">{order.customerName}</div>
                      <div className="text-xs text-slate-500">{order.customerEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {formatDate(order.createdAt)} <br/> {formatTime(order.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    {!isProduction && (
                      <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-slate-100">
                        {formatCurrency(order.total)}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

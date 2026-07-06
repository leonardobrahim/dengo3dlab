import { DollarSign, ShoppingCart, TrendingUp, AlertTriangle, Package } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Seg', vendas: 4000 },
  { name: 'Ter', vendas: 3000 },
  { name: 'Qua', vendas: 2000 },
  { name: 'Qui', vendas: 2780 },
  { name: 'Sex', vendas: 1890 },
  { name: 'Sáb', vendas: 2390 },
  { name: 'Dom', vendas: 3490 },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Visão Geral</h1>
        <p className="text-slate-500">Acompanhe as métricas do seu laboratório 3D.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-semibold">Faturamento Total</h3>
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">R$ 14.280,00</div>
          <div className="text-sm font-medium text-emerald-600 flex items-center mt-2">
            <TrendingUp className="w-4 h-4 mr-1" /> +12% este mês
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-semibold">Qtd. de Vendas</h3>
            <div className="w-10 h-10 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">184</div>
          <div className="text-sm font-medium text-emerald-600 flex items-center mt-2">
            <TrendingUp className="w-4 h-4 mr-1" /> +5% este mês
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-semibold">Ticket Médio</h3>
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">R$ 77,60</div>
          <div className="text-sm font-medium text-slate-500 flex items-center mt-2">
            Estável
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-semibold">Pendentes de Envio</h3>
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">23</div>
          <div className="text-sm font-medium text-amber-600 flex items-center mt-2">
            Requer atenção
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Faturamento da Semana</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(value) => `R$${value}`} />
                <Tooltip 
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="vendas" fill="#e11d48" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-slate-900">Alertas de Estoque</h3>
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 flex justify-between items-center">
              <div>
                <div className="font-bold text-rose-900">Filamento PLA Preto</div>
                <div className="text-sm text-rose-700">Restam 200g (Matéria-prima)</div>
              </div>
              <span className="px-2 py-1 bg-rose-200 text-rose-800 text-xs font-bold rounded-md">Crítico</span>
            </div>
            
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 flex justify-between items-center">
              <div>
                <div className="font-bold text-amber-900">Vaso Geométrico</div>
                <div className="text-sm text-amber-700">2 unidades prontas</div>
              </div>
              <span className="px-2 py-1 bg-amber-200 text-amber-800 text-xs font-bold rounded-md">Baixo</span>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 flex justify-between items-center">
              <div>
                <div className="font-bold text-amber-900">Engrenagem Planetária</div>
                <div className="text-sm text-amber-700">1 unidade pronta</div>
              </div>
              <span className="px-2 py-1 bg-amber-200 text-amber-800 text-xs font-bold rounded-md">Baixo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

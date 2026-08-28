import * as React from "react";
import { AdminLayout } from "@/src/layouts/admin/AdminLayout";
import { Button } from "@/src/components/ui/Button";
import { useToast } from "@/src/components/ui/Toast";
import {
  Download,
  TrendingUp,
  Users,
  Box,
  Truck,
  BarChart3,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const AdminReportsPage: React.FC = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = React.useState("30d");
  const [reportType, setReportType] = React.useState("vendas");

  const handleExport = () => {
    toast.success("Relatório exportado com sucesso (CSV)");
  };

  const salesData = [
    { name: "01/08", value: 400 },
    { name: "05/08", value: 300 },
    { name: "10/08", value: 550 },
    { name: "15/08", value: 450 },
    { name: "20/08", value: 700 },
    { name: "25/08", value: 650 },
  ];

  const productData = [
    { name: "Lontrinha 3D", sales: 120 },
    { name: "Vaso Robert", sales: 98 },
    { name: "Dragão Articulado", sales: 86 },
    { name: "Suporte Fone", sales: 45 },
  ];

  const COLORS = ["#db2777", "#f472b6", "#38bdf8", "#fbbf24"];

  const customerData = [
    { name: "Novos", value: 40 },
    { name: "Retorno", value: 60 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">
              Relatórios & Métricas
            </h1>
            <p className="text-xs text-muted-foreground">
              Analise o desempenho da loja e exporte dados
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="h-4 w-4" /> Exportar Relatório
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <Button
              variant={reportType === "vendas" ? "dengo" : "outline"}
              size="sm"
              onClick={() => setReportType("vendas")}
            >
              <TrendingUp className="h-4 w-4 mr-1" /> Vendas
            </Button>
            <Button
              variant={reportType === "produtos" ? "dengo" : "outline"}
              size="sm"
              onClick={() => setReportType("produtos")}
            >
              <Box className="h-4 w-4 mr-1" /> Produtos
            </Button>
            <Button
              variant={reportType === "clientes" ? "dengo" : "outline"}
              size="sm"
              onClick={() => setReportType("clientes")}
            >
              <Users className="h-4 w-4 mr-1" /> Clientes
            </Button>
            <Button
              variant={reportType === "frete" ? "dengo" : "outline"}
              size="sm"
              onClick={() => setReportType("frete")}
            >
              <Truck className="h-4 w-4 mr-1" /> Frete
            </Button>
          </div>
          <div className="flex-1"></div>
          <div className="flex gap-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-background border border-border rounded-xl px-3 py-1.5 text-xs focus:outline-none"
            >
              <option value="hoje">Hoje</option>
              <option value="7d">Últimos 7 dias</option>
              <option value="30d">Últimos 30 dias</option>
              <option value="90d">Últimos 90 dias</option>
              <option value="ano">Este Ano</option>
              <option value="custom">Personalizado...</option>
            </select>
          </div>
        </div>

        {/* Report Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-foreground mb-6">
                Receita de Vendas
              </h2>
              <div className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorSales"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#db2777"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#db2777"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        fontSize: "12px",
                      }}
                      itemStyle={{
                        color: "hsl(var(--foreground))",
                        fontWeight: "bold",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#db2777"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorSales)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-foreground mb-6">
                Produtos Mais Vendidos
              </h2>
              <div className="h-62.5 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={productData}
                    layout="vertical"
                    margin={{ top: 0, right: 0, left: 20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="hsl(var(--border))"
                    />
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--muted-foreground))",
                      }}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fontSize: 10,
                        fill: "hsl(var(--foreground))",
                        fontWeight: 600,
                      }}
                      width={120}
                    />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        fontSize: "12px",
                      }}
                    />
                    <Bar
                      dataKey="sales"
                      fill="#f472b6"
                      radius={[0, 4, 4, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-foreground mb-6">
                Resumo (Métricas)
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-2xl border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Receita Total
                  </p>
                  <p className="text-2xl font-black text-foreground">
                    R$ 3.050,00
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-2xl border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">Pedidos</p>
                  <p className="text-2xl font-black text-foreground">42</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-2xl border border-border text-center">
                  <p className="text-xs text-muted-foreground mb-1">
                    Ticket Médio
                  </p>
                  <p className="text-2xl font-black text-foreground">
                    R$ 72,60
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-foreground mb-4">
                Retenção de Clientes
              </h2>
              <div className="h-50 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {customerData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderRadius: "12px",
                        border: "1px solid hsl(var(--border))",
                        fontSize: "12px",
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: "10px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

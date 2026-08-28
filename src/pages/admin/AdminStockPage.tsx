import * as React from "react";
import { AdminLayout } from "@/src/layouts/admin/AdminLayout";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Badge } from "@/src/components/ui/Badge";
import { StatCard } from "@/src/components/business/StatCard";
import { useToast } from "@/src/components/ui/Toast";
import {
  Search,
  Plus,
  Boxes,
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  RefreshCw,
  Box,
} from "lucide-react";
import { Dialog } from "@/src/components/ui/Dialog";

export const AdminStockPage: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = React.useState("");

  const [isMovementModalOpen, setIsMovementModalOpen] = React.useState(false);
  const [movementType, setMovementType] = React.useState<
    "in" | "out" | "adjust"
  >("in");

  const handleSaveMovement = () => {
    toast.success("Movimentação registrada com sucesso");
    setIsMovementModalOpen(false);
  };

  const mockStock = [
    {
      id: 1,
      name: "PLA Seda - Rosa Candy",
      sku: "PLA-SILK-ROS-1KG",
      type: "Filamento",
      stock: 4,
      reserved: 1,
      available: 3,
      min: 2,
      status: "warning",
    },
    {
      id: 2,
      name: "PETG - Preto Industrial",
      sku: "PETG-BLK-1KG",
      type: "Filamento",
      stock: 12,
      reserved: 0,
      available: 12,
      min: 3,
      status: "good",
    },
    {
      id: 3,
      name: "Mascote Lontrinha 3D",
      sku: "DNG-LONTRA-PLA-ROS-M",
      type: "Produto",
      stock: 15,
      reserved: 2,
      available: 13,
      min: 5,
      status: "good",
    },
    {
      id: 4,
      name: "Dragão Articulado 45cm",
      sku: "DNG-DRAG-PETG-BLK-G",
      type: "Produto",
      stock: 0,
      reserved: 0,
      available: 0,
      min: 2,
      status: "danger",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">
              Estoque & Insumos
            </h1>
            <p className="text-xs text-muted-foreground">
              Gerencie produtos finalizados e filamentos
            </p>
          </div>
          <Button
            variant="dengo"
            onClick={() => setIsMovementModalOpen(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" /> Nova Movimentação
          </Button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Itens em Estoque"
            value="342"
            icon={<Boxes className="h-5 w-5 text-sky-500" />}
          />
          <StatCard
            title="Baixo Estoque"
            value="14"
            icon={<AlertTriangle className="h-5 w-5 text-amber-500" />}
          />
          <StatCard
            title="Sem Estoque"
            value="3"
            icon={<Box className="h-5 w-5 text-rose-500" />}
          />
          <StatCard
            title="Valor Estimado"
            value="R$ 12.450,00"
            icon={<RefreshCw className="h-5 w-5 text-emerald-500" />}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Input
              placeholder="Buscar produto ou SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <select className="bg-card border border-border rounded-xl px-4 text-sm focus:outline-none">
            <option>Todos os tipos</option>
            <option>Produtos</option>
            <option>Filamentos</option>
            <option>Insumos</option>
          </select>
        </div>

        {/* Stock Table */}
        <div className="rounded-3xl border border-border bg-card overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Produto/Insumo</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4 text-right">Estoque</th>
                <th className="px-6 py-4 text-right">Reservado</th>
                <th className="px-6 py-4 text-right">Disponível</th>
                <th className="px-6 py-4 text-right">Mínimo</th>
                <th className="px-6 py-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockStock.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-foreground">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">
                      {item.type}
                    </p>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{item.sku}</td>
                  <td className="px-6 py-4 text-right font-semibold">
                    {item.stock}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {item.reserved}
                  </td>
                  <td className="px-6 py-4 text-right font-bold text-sky-600 dark:text-sky-400">
                    {item.available}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {item.min}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {item.status === "good" && (
                      <Badge variant="inStock">Normal</Badge>
                    )}
                    {item.status === "warning" && (
                      <Badge variant="warning">Baixo</Badge>
                    )}
                    {item.status === "danger" && (
                      <Badge variant="cherry">Esgotado</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog
        open={isMovementModalOpen}
        onOpenChange={setIsMovementModalOpen}
        title="Movimentação de Estoque"
      >
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={movementType === "in" ? "dengo" : "outline"}
              className="flex-1 gap-2"
              onClick={() => setMovementType("in")}
            >
              <ArrowDownToLine className="h-4 w-4" /> Entrada
            </Button>
            <Button
              variant={movementType === "out" ? "destructive" : "outline"}
              className="flex-1 gap-2"
              onClick={() => setMovementType("out")}
            >
              <ArrowUpFromLine className="h-4 w-4" /> Saída
            </Button>
            <Button
              variant={movementType === "adjust" ? "secondary" : "outline"}
              className="flex-1 gap-2"
              onClick={() => setMovementType("adjust")}
            >
              <RefreshCw className="h-4 w-4" /> Ajuste
            </Button>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold">Produto / SKU</label>
              <select className="w-full bg-background border border-border rounded-xl p-2.5 text-sm">
                <option>Selecione um produto</option>
                <option>DNG-LONTRA-PLA-ROS-M</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold">Quantidade</label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold">Motivo / Observação</label>
              <Input placeholder="Ex: Nova leva de produção" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2">
            <Button
              variant="ghost"
              onClick={() => setIsMovementModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="dengo" onClick={handleSaveMovement}>
              Registrar
            </Button>
          </div>
        </div>
      </Dialog>
    </AdminLayout>
  );
};

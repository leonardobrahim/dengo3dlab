import * as React from "react";
import { AdminLayout } from "@/src/layouts/admin/AdminLayout";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Input } from "@/src/components/ui/Input";
import { useToast } from "@/src/components/ui/Toast";
import {
  Truck,
  Search,
  MapPin,
  Package,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { formatDate } from "@/src/utils/formatters";

export const AdminShipmentsPage: React.FC = () => {
  const { toast } = useToast();

  const shipments = [
    {
      id: "shp-1",
      orderNumber: "DENGO-8942",
      customerName: "Maria Maker Dengo",
      carrier: "Correios (SEDEX)",
      trackingCode: "",
      status: "waiting", // waiting, shipped, in_transit, delivered, problem
      date: "2026-08-24T14:20:00Z",
    },
    {
      id: "shp-2",
      orderNumber: "DENGO-8941",
      customerName: "Lucas Costa",
      carrier: "Jadlog",
      trackingCode: "JD123456789BR",
      status: "in_transit",
      date: "2026-08-23T10:00:00Z",
    },
    {
      id: "shp-3",
      orderNumber: "DENGO-8930",
      customerName: "Amanda Silva",
      carrier: "Correios (PAC)",
      trackingCode: "PB987654321BR",
      status: "problem",
      date: "2026-08-15T09:00:00Z",
    },
  ];

  const handleUpdateTracking = () => {
    toast.success("Rastreamento atualizado com sucesso!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">
              Envios & Logística
            </h1>
            <p className="text-xs text-muted-foreground">
              Gerencie o despacho de pacotes e códigos de rastreio
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card">
          <div className="relative max-w-md">
            <Input
              placeholder="Buscar por pedido ou rastreio..."
              className="text-xs pl-9"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Pedido / Cliente</th>
                <th className="p-4">Transportadora</th>
                <th className="p-4">Código de Rastreio</th>
                <th className="p-4 text-center">Status de Envio</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {shipments.map((shipment) => (
                <tr
                  key={shipment.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">
                    <p className="font-mono font-bold text-foreground">
                      {shipment.orderNumber}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {shipment.customerName}
                    </p>
                  </td>
                  <td className="p-4 font-bold text-foreground">
                    {shipment.carrier}
                  </td>
                  <td className="p-4">
                    {shipment.trackingCode ? (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs bg-muted px-2 py-1 rounded border border-border">
                          {shipment.trackingCode}
                        </span>
                        <a href="#" className="text-sky-600 hover:text-sky-700">
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    ) : (
                      <span className="text-muted-foreground italic text-[10px]">
                        Aguardando postagem
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {shipment.status === "waiting" && (
                      <Badge variant="waiting">
                        <Package className="h-3 w-3 mr-1" /> Aguardando Envio
                      </Badge>
                    )}
                    {shipment.status === "shipped" && (
                      <Badge variant="shipped">
                        <Truck className="h-3 w-3 mr-1" /> Enviado
                      </Badge>
                    )}
                    {shipment.status === "in_transit" && (
                      <Badge variant="in_transit">
                        <MapPin className="h-3 w-3 mr-1" /> Em Trânsito
                      </Badge>
                    )}
                    {shipment.status === "delivered" && (
                      <Badge variant="delivered">
                        <CheckCircle className="h-3 w-3 mr-1" /> Entregue
                      </Badge>
                    )}
                    {shipment.status === "problem" && (
                      <Badge variant="problem">
                        <AlertTriangle className="h-3 w-3 mr-1" /> Problema
                      </Badge>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleUpdateTracking}
                      className="text-[10px]"
                    >
                      Atualizar Status
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

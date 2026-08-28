import * as React from "react";
import { AdminLayout } from "@/src/layouts/admin/AdminLayout";
import { Avatar } from "@/src/components/ui/Avatar";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import { Mail, Search, Eye } from "lucide-react";
import { formatCurrency, formatDate } from "@/src/utils/formatters";
import { useNavigationStore } from "@/src/stores/navigationStore";

export const AdminCustomersPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const [searchTerm, setSearchTerm] = React.useState("");

  const mockCustomers = [
    {
      id: "usr-1",
      name: "Maria Maker Dengo",
      email: "maker@dengo3d.com",
      createdAt: "2025-10-12T14:00:00Z",
      ordersCount: 5,
      totalSpent: 642.5,
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "usr-2",
      name: "Lucas Henrique Costa",
      email: "lucas@gmail.com",
      createdAt: "2026-02-20T09:30:00Z",
      ordersCount: 2,
      totalSpent: 189.9,
      status: "active",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      id: "usr-3",
      name: "Amanda Silva",
      email: "amanda@exemplo.com",
      createdAt: "2026-08-01T11:15:00Z",
      ordersCount: 0,
      totalSpent: 0,
      status: "inactive",
      avatar: "",
    },
  ];

  const filtered = mockCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">Clientes</h1>
            <p className="text-xs text-muted-foreground">
              Gerencie todos os usuários cadastrados na loja
            </p>
          </div>
        </div>

        <div className="relative max-w-md">
          <Input
            placeholder="Buscar por nome ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs pl-9"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Cliente</th>
                <th className="p-4">Cadastro</th>
                <th className="p-4 text-center">Pedidos</th>
                <th className="p-4 text-right">Total Gasto</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={customer.avatar}
                        alt={customer.name}
                        size="sm"
                      />
                      <div>
                        <p className="font-bold text-foreground">
                          {customer.name}
                        </p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" /> {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {formatDate(customer.createdAt)}
                  </td>
                  <td className="p-4 text-center font-bold">
                    {customer.ordersCount}
                  </td>
                  <td className="p-4 text-right font-bold text-emerald-600">
                    {formatCurrency(customer.totalSpent)}
                  </td>
                  <td className="p-4 text-center">
                    {customer.status === "active" ? (
                      <Badge variant="success">Ativo</Badge>
                    ) : (
                      <Badge variant="destructive">Inativo</Badge>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/admin/clientes/${customer.id}`)}
                      className="text-[10px]"
                    >
                      <Eye className="h-3.5 w-3.5 mr-1" /> Perfil
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

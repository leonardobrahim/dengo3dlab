import * as React from "react";
import { AdminLayout } from "@/src/layouts/admin/AdminLayout";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Avatar } from "@/src/components/ui/Avatar";
import { useToast } from "@/src/components/ui/Toast";
import { Star, CheckCircle, EyeOff, Trash2, MessageSquare } from "lucide-react";
import { formatDate } from "@/src/utils/formatters";

export const AdminReviewsPage: React.FC = () => {
  const { toast } = useToast();

  const [reviews, setReviews] = React.useState([
    {
      id: "rev-1",
      customerName: "Maria Maker Dengo",
      productName: "Lontrinha 3D Articulada",
      rating: 5,
      comment:
        "Muito fofa! A qualidade da impressão é incrível, não tem rebarbas e as articulações são perfeitas.",
      date: "2026-08-20T14:30:00Z",
      status: "pending", // pending, approved, hidden
    },
    {
      id: "rev-2",
      customerName: "Lucas Costa",
      productName: "Vaso Robert Plant",
      rating: 4,
      comment: "Tamanho bom, mas a cor é um pouco mais escura que na foto.",
      date: "2026-08-18T10:15:00Z",
      status: "approved",
    },
    {
      id: "rev-3",
      customerName: "João Silva",
      productName: "Suporte para Headset",
      rating: 1,
      comment: "Não gostei, achei frágil.",
      date: "2026-08-15T09:00:00Z",
      status: "hidden",
    },
  ]);

  const handleAction = (id: string, action: "approve" | "hide" | "delete") => {
    if (action === "delete") {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      toast.success("Avaliação excluída!");
    } else {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, status: action === "approve" ? "approved" : "hidden" }
            : r,
        ),
      );
      toast.success(
        action === "approve" ? "Avaliação aprovada!" : "Avaliação ocultada!",
      );
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">
              Avaliações de Produtos
            </h1>
            <p className="text-xs text-muted-foreground">
              Modere os comentários e notas deixadas pelos clientes
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Cliente / Data</th>
                <th className="p-4">Produto / Nota</th>
                <th className="p-4 w-1/3">Comentário</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {reviews.map((review) => (
                <tr
                  key={review.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4">
                    <p className="font-bold text-foreground">
                      {review.customerName}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {formatDate(review.date)}
                    </p>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-foreground truncate max-w-50">
                      {review.productName}
                    </p>
                    <div className="flex items-center gap-0.5 mt-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < review.rating ? "fill-current" : "text-muted-foreground opacity-30"}`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-xs text-muted-foreground whitespace-normal line-clamp-2 max-w-75">
                      {review.comment}
                    </p>
                  </td>
                  <td className="p-4 text-center">
                    {review.status === "pending" && (
                      <Badge variant="warning">Pendente</Badge>
                    )}
                    {review.status === "approved" && (
                      <Badge variant="success">Aprovada</Badge>
                    )}
                    {review.status === "hidden" && (
                      <Badge variant="destructive">Oculta</Badge>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {review.status !== "approved" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          onClick={() => handleAction(review.id, "approve")}
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      {review.status !== "hidden" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                          onClick={() => handleAction(review.id, "hide")}
                        >
                          <EyeOff className="h-3.5 w-3.5" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                        onClick={() => handleAction(review.id, "delete")}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
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

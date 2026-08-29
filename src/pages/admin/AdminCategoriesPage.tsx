import * as React from "react";
import { AdminLayout } from "@/src/layouts/admin/AdminLayout";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Input } from "@/src/components/ui/Input";
import { Dialog } from "@/src/components/ui/Dialog";
import { mockCategories } from "@/src/mocks/categories";
import { useToast } from "@/src/components/ui/Toast";
import { Plus, Layers, Edit2, Trash2 } from "lucide-react";

export const AdminCategoriesPage: React.FC = () => {
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [categories, setCategories] = React.useState(mockCategories);

  const handleSave = () => {
    toast.success("Categoria salva com sucesso!");
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Categoria excluída!");
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">
              Categorias & Coleções
            </h1>
            <p className="text-xs text-muted-foreground">
              Gerencie a árvore de navegação e hierarquia dos produtos
            </p>
          </div>
          <Button
            variant="dengo"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold gap-1.5 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Nova Categoria</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="p-5 rounded-3xl border border-border bg-card space-y-4 shadow-sm hover:border-pink-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-900/50 text-pink-600">
                  <Layers className="h-6 w-6" />
                </div>
                <Badge variant="babyPink">{cat.productCount} Itens</Badge>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-border text-xs">
                <span className="font-mono text-[10px] bg-muted px-2 py-1 rounded-md text-muted-foreground truncate max-w-37.5">
                  /{cat.slug}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-1.5 bg-muted rounded-lg text-muted-foreground hover:text-pink-600 hover:bg-pink-50 transition-colors"
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1.5 bg-muted rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          if (!open) setIsModalOpen(false);
        }}
        title="Gerenciar Categoria"
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold">Nome da Categoria</label>
            <Input placeholder="Ex: Action Figures" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold">Slug da URL</label>
            <Input placeholder="action-figures" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold">
              Categoria Pai (Opcional)
            </label>
            <select className="w-full bg-background border border-border rounded-xl p-2.5 text-sm">
              <option value="">Nenhuma (Categoria Raiz)</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold">Descrição</label>
            <textarea
              rows={3}
              className="w-full bg-background border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              placeholder="Breve descrição da categoria..."
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold">Status</label>
            <select className="w-full bg-background border border-border rounded-xl p-2.5 text-sm">
              <option value="active">Ativa</option>
              <option value="disabled">Oculta</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="dengo" onClick={handleSave}>
              Salvar Categoria
            </Button>
          </div>
        </div>
      </Dialog>
    </AdminLayout>
  );
};

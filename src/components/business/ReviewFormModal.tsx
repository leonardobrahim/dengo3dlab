import * as React from "react";
import { Star, Upload, X } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";

export interface ReviewFormModalProps {
  orderId: string;
  onClose: () => void;
  onSubmit: (data: { rating: number; comment: string; photos: File[] }) => void;
}

export const ReviewFormModal: React.FC<ReviewFormModalProps> = ({
  onClose,
  onSubmit,
}) => {
  const [rating, setRating] = React.useState(0);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [comment, setComment] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    onSubmit({ rating, comment, photos: [] }); // photos future structure placeholder
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-card w-full max-w-lg rounded-3xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-slate-100">
            Avaliar Produto
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Como você avalia sua experiência?
            </p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-8 w-8 transition-colors",
                      (hoverRating || rating) >= star
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200 dark:text-slate-700",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Comentário
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Conte o que você achou do produto, da qualidade da impressão 3D..."
              className="w-full min-h-25 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all resize-none"
            />
          </div>

          <div className="space-y-2 text-left">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Fotos do Produto (Opcional)
            </label>
            <div className="w-full h-24 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-slate-400 hover:text-pink-500 hover:border-pink-200 hover:bg-pink-50/50 transition-colors cursor-pointer">
              <Upload className="h-5 w-5 mb-1" />
              <span className="text-[11px] font-medium">Adicionar Fotos</span>
            </div>
            <p className="text-[10px] text-slate-500">
              Ajude outros clientes mostrando os detalhes da impressão.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="dengo" disabled={rating === 0}>
              Enviar Avaliação
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

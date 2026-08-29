import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from "lucide-react";
import { useToastStore, useToast, ToastItem } from "@/src/hooks/useToast";
import { cn } from "@/src/lib/utils";

export { useToast, useToastStore };
export type { ToastItem };

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore();

  const icons = {
    default: <Info className="h-4 w-4 text-primary" />,
    success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
    error: <AlertCircle className="h-4 w-4 text-destructive" />,
    warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
    info: <Info className="h-4 w-4 text-sky-500" />,
  };

  const borders = {
    default: "border-border",
    success: "border-emerald-500/30 bg-emerald-950/20 dark:bg-emerald-950/40",
    error: "border-destructive/30 bg-destructive/10",
    warning: "border-amber-500/30 bg-amber-950/20 dark:bg-amber-950/40",
    info: "border-sky-500/30 bg-sky-950/20 dark:bg-sky-950/40",
  };

  return (
    <div
      aria-live="assertive"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none px-4"
    >
      <AnimatePresence>
        {toasts.map((t: ToastItem) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-2xl border bg-card p-4 text-card-foreground shadow-lg backdrop-blur-md",
              borders[t.type || "default"],
            )}
          >
            <div className="mt-0.5 shrink-0">{icons[t.type || "default"]}</div>
            <div className="flex-1 space-y-1 text-left">
              <h5 className="text-sm font-semibold leading-none">{t.title}</h5>
              {t.description && (
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              aria-label="Fechar notificação"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

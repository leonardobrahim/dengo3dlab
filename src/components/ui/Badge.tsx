import * as React from"react";
import { cva, type VariantProps } from"class-variance-authority";
import { cn } from"@/src/lib/utils";

export const badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap shadow-2xs",
  {
    variants: {
      variant: {
        default:"border-transparent bg-pink-500 text-white shadow-sm hover:bg-pink-600",
        secondary:"border-transparent bg-sky-100 text-sky-800",
        destructive:"border-transparent bg-rose-500/15 text-rose-600  border-rose-500/25",
        outline:"text-foreground border-border bg-background/50",
        success:"border-transparent bg-emerald-500/15 text-emerald-600  border-emerald-500/25",
        warning:"border-transparent bg-amber-500/15 text-amber-600  border-amber-500/25",

        // Dengo 3D special variants:
        babyPink:"border-pink-300/60 bg-pink-50 text-pink-700    font-medium",
        babyBlue:"border-sky-300/60 bg-sky-50 text-sky-700    font-medium",
        cherry:"border-rose-300/60 bg-rose-50 text-rose-700    font-medium",
        candyGradient:"border-transparent bg-gradient-to-r from-pink-400 to-sky-400 text-white font-bold shadow-xs",
        filament:"border-pink-300/60 bg-pink-100/60 text-pink-700   font-mono text-[11px]",
        tech:"border-sky-300/50 bg-sky-50 text-sky-800    font-mono text-[10px] tracking-wider uppercase",

        // Desconto e Promoção
        discount:"border-transparent bg-rose-500/90 text-white font-bold shadow-sm hover:bg-rose-600 animate-pulse",
        promo:"border-amber-300/60 bg-amber-400/20 text-amber-800   font-bold",

        // Status de Estoque
        inStock:"border-emerald-300/60 bg-emerald-50 text-emerald-700",
        outOfStock:"border-slate-300/60 bg-slate-100 text-slate-600    line-through",
        preOrder:"border-indigo-300/60 bg-indigo-50 text-indigo-700    font-semibold",

        // Novo e Trending
        badge_new:"border-emerald-400/60 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 text-emerald-700  font-bold animate-pulse",
        trending:"border-rose-300/60 bg-gradient-to-r from-rose-400/20 to-pink-400/20 text-rose-700  font-bold",
        bestSeller:"border-amber-300/60 bg-gradient-to-r from-amber-400/20 to-orange-400/20 text-amber-700  font-bold",

        // Informativo e Dicas
        info:"border-sky-300/60 bg-sky-50/80 text-sky-800   font-medium",
        tip:"border-purple-300/60 bg-purple-50 text-purple-700   font-semibold",
        feature:"border-pink-300/60 bg-pink-50/60 text-pink-700   font-medium",

        // Avisos e Alertas
        alert:"border-rose-400/60 bg-rose-100/80 text-rose-800   font-bold",
        caution:"border-amber-400/60 bg-amber-100/80 text-amber-900   font-semibold",

        // Categorias e Tags
        category:"border-slate-300 bg-slate-100/60 text-slate-700   font-medium",
        tag:"border-pink-200/60 bg-pink-100/40 text-pink-700   text-[11px]",

        // Gradientes Premium
        premiumGradient:"border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold shadow-md",
        vibrantGradient:"border-transparent bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white font-bold shadow-md",
        softGradient:"border-transparent bg-gradient-to-r from-pink-200 to-sky-200 text-pink-800 font-semibold shadow-xs",

        // Variantes de Material/Tecnologia
        material:"border-orange-300/60 bg-orange-50 text-orange-700   font-mono text-[10px]",
        material_premium:"border-indigo-300/60 bg-indigo-50 text-indigo-700   font-mono text-[10px] font-bold",

        waiting:"border-slate-300/60 bg-slate-100 text-slate-700    font-semibold",
        shipped:"border-sky-300/60 bg-sky-100 text-sky-700    font-semibold",
        in_transit:"border-amber-400/60 bg-amber-100 text-amber-900   font-semibold",
        delivered:"border-emerald-300/60 bg-emerald-100 text-emerald-700    font-bold",
        problem:"border-rose-400/60 bg-rose-100/80 text-rose-800   font-bold",
      },
    },
    defaultVariants: {
      variant:"default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant,
  dot,
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </div>
  );
};

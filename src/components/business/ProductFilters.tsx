import * as React from "react";
import { mockCategories } from "@/src/mocks/categories";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Input } from "@/src/components/ui/Input";
import { Checkbox } from "@/src/components/ui/Checkbox";
import { Rating } from "@/src/components/business/Rating";
import {
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  Check,
  Tag,
  Boxes,
  DollarSign,
  Star,
  Layers,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

export interface FilterState {
  category: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  material: string[];
  color: string[];
  minRating?: number;
  inStockOnly: boolean;
}

export interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  totalResults?: number;
  className?: string;
  isMobileDrawer?: boolean;
  onCloseDrawer?: () => void;
}

const MATERIAL_OPTIONS = [
  { id: "PLA Silk", label: "PLA Seda (Silk Acetinado)", tag: "silk" },
  { id: "PLA+", label: "PLA+ Resistente", tag: "pla" },
  { id: "PETG", label: "PETG Industrial & Água", tag: "petg" },
  { id: "Resina 8K", label: "Resina 8K Ultra Definição", tag: "resin" },
  { id: "Food-Safe", label: "PLA Alimentício Atóxico", tag: "food" },
];

const COLOR_OPTIONS = [
  { id: "rosa", name: "Rosa Bebê Candy", hex: "#F472B6" },
  { id: "azul", name: "Azul Céu Pastel", hex: "#38BDF8" },
  { id: "lavanda", name: "Lavanda Candy", hex: "#C084FC" },
  { id: "menta", name: "Verde Menta Pastel", hex: "#6EE7B7" },
  { id: "ouro", name: "Ouro Seda / Amarelo", hex: "#FBBF24" },
  { id: "branco", name: "Branco Pérola / Neve", hex: "#FFFFFF" },
  { id: "preto", name: "Preto Stealth / Cinza", hex: "#52525B" },
];

const PRICE_PRESETS = [
  { label: "Até R$ 50", min: "", max: 50 },
  { label: "R$ 50 a R$ 100", min: 50, max: 100 },
  { label: "R$ 100 a R$ 150", min: 100, max: 150 },
  { label: "Acima de R$ 150", min: 150, max: "" },
];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  className,
  isMobileDrawer = false,
  onCloseDrawer,
}) => {
  const [expandedSections, setExpandedSections] = React.useState<{
    [key: string]: boolean;
  }>({
    categories: true,
    price: true,
    materials: true,
    colors: true,
    rating: true,
    stock: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategorySelect = (categorySlug: string) => {
    onFilterChange({
      ...filters,
      category: filters.category === categorySlug ? "all" : categorySlug,
    });
  };

  const handleMaterialToggle = (matId: string) => {
    const exists = filters.material.includes(matId);
    const newMaterials = exists
      ? filters.material.filter((m) => m !== matId)
      : [...filters.material, matId];
    onFilterChange({ ...filters, material: newMaterials });
  };

  const handleColorToggle = (colorName: string) => {
    const exists = filters.color.includes(colorName);
    const newColors = exists
      ? filters.color.filter((c) => c !== colorName)
      : [...filters.color, colorName];
    onFilterChange({ ...filters, color: newColors });
  };

  const handleRatingSelect = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? undefined : rating,
    });
  };

  const activeFiltersCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.minPrice || filters.maxPrice ? 1 : 0) +
    filters.material.length +
    filters.color.length +
    (filters.minRating ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  return (
    <div className={cn("space-y-6 text-left", className)}>
      {/* Filters Header */}
      <div className="flex items-center justify-between pb-3 border-b border-pink-200/80 dark:border-pink-900/40">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-pink-500" />
          <h3 className="font-bold text-sm text-foreground">
            Filtros de Busca
          </h3>
          {activeFiltersCount > 0 && (
            <Badge
              variant="babyPink"
              className="text-[10px] px-2 py-0.5 font-bold"
            >
              {activeFiltersCount}
            </Badge>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-[11px] font-semibold text-pink-600 dark:text-pink-400 hover:text-pink-700 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* 1. Categorias */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full font-bold text-xs text-foreground cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-pink-500" />
            <span>Categorias</span>
          </span>
          {expandedSections.categories ? (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>

        {expandedSections.categories && (
          <div className="space-y-1 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
            <button
              type="button"
              onClick={() => handleCategorySelect("all")}
              className={cn(
                "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer text-left",
                filters.category === "all"
                  ? "bg-pink-100/80 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 font-bold"
                  : "text-muted-foreground hover:bg-pink-50 dark:hover:bg-muted/40 hover:text-foreground",
              )}
            >
              <span>Todas as Categorias</span>
              <span className="text-[10px] opacity-70">32+</span>
            </button>

            {mockCategories.map((cat) => {
              const isSelected = filters.category === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer text-left",
                    isSelected
                      ? "bg-pink-100/80 dark:bg-pink-950/60 text-pink-600 dark:text-pink-300 font-bold"
                      : "text-muted-foreground hover:bg-pink-50 dark:hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <span className="truncate pr-2">{cat.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-pink-50 dark:bg-card border border-pink-200/40 text-muted-foreground shrink-0">
                    {cat.productCount}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Faixa de Preço */}
      <div className="space-y-3 pt-3 border-t border-pink-200/60 dark:border-pink-900/30">
        <button
          type="button"
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full font-bold text-xs text-foreground cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-pink-500" />
            <span>Faixa de Preço (R$)</span>
          </span>
          {expandedSections.price ? (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>

        {expandedSections.price && (
          <div className="space-y-3">
            {/* Quick Price Range Presets */}
            <div className="grid grid-cols-2 gap-1.5">
              {PRICE_PRESETS.map((preset, idx) => {
                const isSelected =
                  String(filters.minPrice || "") === String(preset.min) &&
                  String(filters.maxPrice || "") === String(preset.max);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      onFilterChange({
                        ...filters,
                        minPrice: isSelected ? undefined : preset.min,
                        maxPrice: isSelected ? undefined : preset.max,
                      })
                    }
                    className={cn(
                      "px-2 py-1.5 rounded-lg text-[11px] font-medium border text-center transition-all cursor-pointer truncate",
                      isSelected
                        ? "bg-pink-500 text-white border-pink-500 font-bold shadow-2xs"
                        : "bg-card border-pink-200/60 dark:border-border text-muted-foreground hover:border-pink-300",
                    )}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Custom Min / Max Inputs */}
            <div className="flex items-center gap-2 pt-1">
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-bold">
                  R$
                </span>
                <input
                  type="number"
                  placeholder="Mín"
                  value={filters.minPrice ?? ""}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      minPrice: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  className="w-full h-8 pl-7 pr-2 text-xs rounded-xl border border-pink-200/80 dark:border-pink-900/60 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
              <span className="text-xs text-muted-foreground font-bold">
                até
              </span>
              <div className="relative flex-1">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground font-bold">
                  R$
                </span>
                <input
                  type="number"
                  placeholder="Máx"
                  value={filters.maxPrice ?? ""}
                  onChange={(e) =>
                    onFilterChange({
                      ...filters,
                      maxPrice: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  }
                  className="w-full h-8 pl-7 pr-2 text-xs rounded-xl border border-pink-200/80 dark:border-pink-900/60 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-pink-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Materiais de Impressão */}
      <div className="space-y-3 pt-3 border-t border-pink-200/60 dark:border-pink-900/30">
        <button
          type="button"
          onClick={() => toggleSection("materials")}
          className="flex items-center justify-between w-full font-bold text-xs text-foreground cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Boxes className="h-3.5 w-3.5 text-pink-500" />
            <span>Material 3D</span>
          </span>
          {expandedSections.materials ? (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>

        {expandedSections.materials && (
          <div className="space-y-1.5">
            {MATERIAL_OPTIONS.map((mat) => {
              const isChecked = filters.material.includes(mat.id);
              return (
                <label
                  key={mat.id}
                  className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground cursor-pointer py-1"
                >
                  <Checkbox
                    checked={isChecked}
                    onChange={() => handleMaterialToggle(mat.id)}
                  />
                  <span
                    className={cn(isChecked && "text-foreground font-semibold")}
                  >
                    {mat.label}
                  </span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Cores Principais */}
      <div className="space-y-3 pt-3 border-t border-pink-200/60 dark:border-pink-900/30">
        <button
          type="button"
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full font-bold text-xs text-foreground cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-pink-500" />
            <span>Cores Candy & Acabamento</span>
          </span>
          {expandedSections.colors ? (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>

        {expandedSections.colors && (
          <div className="flex flex-wrap gap-2">
            {COLOR_OPTIONS.map((c) => {
              const isSelected = filters.color.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => handleColorToggle(c.id)}
                  title={c.name}
                  className={cn(
                    "relative flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border transition-all cursor-pointer shadow-2xs",
                    isSelected
                      ? "bg-pink-500/10 border-pink-500 text-pink-600 dark:text-pink-300 font-bold ring-1 ring-pink-500"
                      : "bg-card border-pink-200/60 dark:border-border text-muted-foreground hover:border-pink-300",
                  )}
                >
                  <span
                    className="h-3 w-3 rounded-full border border-black/10 shadow-2xs"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Avaliação Mínima */}
      <div className="space-y-3 pt-3 border-t border-pink-200/60 dark:border-pink-900/30">
        <button
          type="button"
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full font-bold text-xs text-foreground cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 text-pink-500" />
            <span>Avaliação Mínima</span>
          </span>
          {expandedSections.rating ? (
            <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
          )}
        </button>

        {expandedSections.rating && (
          <div className="space-y-1">
            {[5, 4.8, 4.5].map((rating) => {
              const isSelected = filters.minRating === rating;
              return (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingSelect(rating)}
                  className={cn(
                    "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer",
                    isSelected
                      ? "bg-pink-100/80 dark:bg-pink-950/60 text-pink-600 font-bold"
                      : "text-muted-foreground hover:bg-pink-50 dark:hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <Rating value={rating} size="sm" />
                    <span>
                      {rating === 5 ? "5 estrelas" : `${rating} ou mais`}
                    </span>
                  </div>
                  {isSelected && (
                    <Check className="h-3.5 w-3.5 text-pink-500" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Disponibilidade em Estoque */}
      <div className="space-y-3 pt-3 border-t border-pink-200/60 dark:border-pink-900/30">
        <label className="flex items-center justify-between text-xs text-foreground font-semibold cursor-pointer py-1">
          <span className="flex items-center gap-2">
            <span>Apenas Pronta Entrega</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <Checkbox
            checked={filters.inStockOnly}
            onChange={(checked) =>
              onFilterChange({ ...filters, inStockOnly: Boolean(checked) })
            }
          />
        </label>
      </div>

      {/* Mobile Drawer Footer CTA */}
      {isMobileDrawer && (
        <div className="sticky bottom-0 pt-4 pb-2 bg-background border-t border-pink-200/80 dark:border-border flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onResetFilters}
            className="flex-1 text-xs"
          >
            Limpar Tudo
          </Button>
          <Button
            variant="dengo"
            onClick={onCloseDrawer}
            className="flex-1 text-xs font-bold"
          >
            Ver {totalResults ?? ""} Produtos
          </Button>
        </div>
      )}
    </div>
  );
};

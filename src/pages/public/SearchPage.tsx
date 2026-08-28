import * as React from "react";
import { StoreLayout } from "@/src/layouts/store/StoreLayout";
import { Breadcrumb } from "@/src/components/ui/Breadcrumb";
import { ProductGrid } from "@/src/components/business/ProductGrid";
import {
  ProductFilters,
  FilterState,
} from "@/src/components/business/ProductFilters";
import { Pagination } from "@/src/components/ui/Pagination";
import { Drawer } from "@/src/components/ui/Drawer";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { mockProducts } from "@/src/mocks/products";
import { mockCategories } from "@/src/mocks/categories";
import { useNavigationStore } from "@/src/stores/navigationStore";
import { Search, X, Sparkles, Filter, ArrowUpDown } from "lucide-react";
import { cn } from "@/src/lib/utils";

const ITEMS_PER_PAGE = 12;

const POPULAR_SEARCH_TAGS = [
  "Lontrinha",
  "Dragão Articulado",
  "Vaso Geométrico",
  "Suporte Headset",
  "Cortadores Candy",
  "PLA Silk Rosa",
  "Resina 8K",
  "Organizador",
];

export const SearchPage: React.FC = () => {
  const { params, navigate, setQueryParams } = useNavigationStore();
  const rawQuery = params.query || params.q || "";
  const [searchInput, setSearchInput] = React.useState(rawQuery);
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  // Sync external URL query changes
  React.useEffect(() => {
    setSearchInput(rawQuery);
  }, [rawQuery]);

  // Debounce query input to URL (300ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== rawQuery) {
        setQueryParams({ q: searchInput, query: searchInput, page: 1 });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput, rawQuery, setQueryParams]);

  const currentCategory = params.categorySlug || params.category || "all";
  const currentSort = params.sort || "featured";
  const currentPage = Number(params.page) || 1;
  const currentMinPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const currentMaxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const currentMinRating = params.rating ? Number(params.rating) : undefined;
  const currentInStock = params.inStock === true || params.inStock === "true";

  const currentMaterials = React.useMemo(() => {
    if (!params.material) return [];
    return Array.isArray(params.material) ? params.material : [params.material];
  }, [params.material]);

  const currentColors = React.useMemo(() => {
    if (!params.color) return [];
    return Array.isArray(params.color) ? params.color : [params.color];
  }, [params.color]);

  const filterState: FilterState = {
    category: currentCategory,
    minPrice: currentMinPrice,
    maxPrice: currentMaxPrice,
    material: currentMaterials,
    color: currentColors,
    minRating: currentMinRating,
    inStockOnly: currentInStock,
  };

  // Search & Filter Pipeline
  const filteredProducts = React.useMemo(() => {
    let result = [...mockProducts];

    // 1. Text Search Filter
    if (searchInput.trim()) {
      const q = searchInput.toLowerCase().trim();
      result = result.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        const shortDescMatch = p.shortDescription?.toLowerCase().includes(q);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
        const catMatch = p.categories.some(
          (c) => c.name.toLowerCase().includes(q) || c.slug.includes(q),
        );
        const specMatch = p.technicalSpecs?.material?.toLowerCase().includes(q);
        return (
          nameMatch ||
          descMatch ||
          shortDescMatch ||
          tagMatch ||
          catMatch ||
          specMatch
        );
      });
    }

    // 2. Category Filter
    if (filterState.category && filterState.category !== "all") {
      result = result.filter((p) =>
        p.categories.some(
          (c) =>
            c.slug === filterState.category || c.id === filterState.category,
        ),
      );
    }

    // 3. Price Filter
    if (filterState.minPrice !== undefined && filterState.minPrice !== "") {
      result = result.filter((p) => {
        const effectivePrice = p.basePromotionalPrice || p.basePrice;
        return effectivePrice >= Number(filterState.minPrice);
      });
    }
    if (filterState.maxPrice !== undefined && filterState.maxPrice !== "") {
      result = result.filter((p) => {
        const effectivePrice = p.basePromotionalPrice || p.basePrice;
        return effectivePrice <= Number(filterState.maxPrice);
      });
    }

    // 4. Material Filter
    if (filterState.material.length > 0) {
      result = result.filter((p) => {
        return filterState.material.some((mat) => {
          const matLower = mat.toLowerCase();
          const specMat = p.technicalSpecs?.material?.toLowerCase() || "";
          const tagMat = p.tags.some((t) => t.toLowerCase().includes(matLower));
          const variantMat = p.variants?.some((v) =>
            v.material?.toLowerCase().includes(matLower),
          );
          return specMat.includes(matLower) || tagMat || variantMat;
        });
      });
    }

    // 5. Color Filter
    if (filterState.color.length > 0) {
      result = result.filter((p) => {
        return filterState.color.some((col) => {
          const colLower = col.toLowerCase();
          const variantMatch = p.variants?.some(
            (v) =>
              v.name.toLowerCase().includes(colLower) ||
              v.colorName?.toLowerCase().includes(colLower),
          );
          const tagMatch = p.tags.some((t) =>
            t.toLowerCase().includes(colLower),
          );
          return variantMatch || tagMatch;
        });
      });
    }

    // 6. Rating Filter
    if (filterState.minRating) {
      result = result.filter(
        (p) => (p.rating || 0) >= (filterState.minRating || 0),
      );
    }

    // 7. In Stock Filter
    if (filterState.inStockOnly) {
      result = result.filter((p) => p.inStock && (p.stockTotal ?? 0) > 0);
    }

    // 8. Sort
    result.sort((a, b) => {
      const priceA = a.basePromotionalPrice || a.basePrice;
      const priceB = b.basePromotionalPrice || b.basePrice;

      switch (currentSort) {
        case "price_asc":
          return priceA - priceB;
        case "price_desc":
          return priceB - priceA;
        case "rating_desc":
          return (b.rating || 0) - (a.rating || 0);
        case "bestseller":
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "featured":
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

    return result;
  }, [searchInput, filterState, currentSort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (newFilters: FilterState) => {
    setQueryParams({
      category: newFilters.category === "all" ? undefined : newFilters.category,
      categorySlug:
        newFilters.category === "all" ? undefined : newFilters.category,
      minPrice: newFilters.minPrice,
      maxPrice: newFilters.maxPrice,
      material:
        newFilters.material.length > 0
          ? newFilters.material.join(",")
          : undefined,
      color:
        newFilters.color.length > 0 ? newFilters.color.join(",") : undefined,
      rating: newFilters.minRating,
      inStock: newFilters.inStockOnly ? true : undefined,
      page: 1,
    });
  };

  const handleResetFilters = () => {
    setQueryParams({
      category: undefined,
      categorySlug: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      material: undefined,
      color: undefined,
      rating: undefined,
      inStock: undefined,
      page: 1,
    });
  };

  const breadcrumbs = [
    { label: "Início", href: "/" },
    { label: "Busca Global", isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="space-y-6 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        {/* Search Header Banner with Live Search Box */}
        <div className="p-6 sm:p-8 rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-linear-to-br from-pink-50/90 via-card to-sky-50/60 dark:from-pink-950/30 dark:to-card space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-foreground">
              Busca de Produtos
            </h1>
            <Badge
              variant="babyPink"
              className="font-bold text-xs self-start sm:self-auto"
            >
              {filteredProducts.length} itens encontrados
            </Badge>
          </div>

          <div className="relative max-w-2xl">
            <input
              type="text"
              placeholder="Digite o que você procura (ex: lontra, rosa, dragão, filamento, vaso, suporte)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full h-12 pl-11 pr-10 text-xs sm:text-sm rounded-2xl border border-pink-200/90 dark:border-pink-900/70 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-400/20 shadow-inner"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-pink-500" />
            {searchInput && (
              <button
                type="button"
                onClick={() => setSearchInput("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-muted-foreground font-semibold flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-pink-500" />
              <span>Sugestões:</span>
            </span>
            {POPULAR_SEARCH_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchInput(tag)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white dark:bg-card border border-pink-200/60 dark:border-pink-900/40 text-pink-700 dark:text-pink-300 hover:bg-pink-100 hover:scale-105 transition-all cursor-pointer shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Controls Bar: Sort, View & Filter Drawer Trigger */}
        <div className="flex items-center justify-between gap-4 pb-2 border-b border-pink-100 dark:border-border">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden gap-1.5 text-xs font-bold border-pink-200"
            >
              <Filter className="h-3.5 w-3.5 text-pink-500" />
              <span>Filtros</span>
            </Button>
            <span className="text-xs text-muted-foreground font-semibold">
              {searchInput
                ? `Resultados para "${searchInput}"`
                : "Todos os produtos"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
              Ordenar:
            </span>
            <select
              value={currentSort}
              onChange={(e) =>
                setQueryParams({ sort: e.target.value, page: 1 })
              }
              className="h-9 px-3 text-xs rounded-xl border border-pink-200/80 dark:border-pink-900/60 bg-card text-foreground font-semibold focus:outline-none focus:ring-1 focus:ring-pink-400 cursor-pointer shadow-2xs"
            >
              <option value="featured">✨ Em Destaque</option>
              <option value="bestseller">💖 Mais Vendidos</option>
              <option value="newest">🌟 Mais Recentes</option>
              <option value="price_asc">💰 Menor Preço</option>
              <option value="price_desc">💎 Maior Preço</option>
              <option value="rating_desc">⭐ Melhor Avaliados</option>
            </select>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
          {/* Desktop Left Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-24 p-5 rounded-3xl border border-pink-200/80 dark:border-pink-900/40 bg-card shadow-xs">
            <ProductFilters
              filters={filterState}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredProducts.length}
            />
          </aside>

          {/* Mobile Filter Drawer */}
          <Drawer
            open={mobileFilterOpen}
            onOpenChange={setMobileFilterOpen}
            title="Filtrar Resultados"
            description="Refine os resultados da sua busca"
            side="right"
          >
            <div className="p-4">
              <ProductFilters
                filters={filterState}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResults={filteredProducts.length}
                isMobileDrawer
                onCloseDrawer={() => setMobileFilterOpen(false)}
              />
            </div>
          </Drawer>

          {/* Right Product Grid & Pagination */}
          <div className="lg:col-span-9 space-y-8">
            <ProductGrid
              products={paginatedProducts}
              columns={4}
              emptyTitle={`Nenhum resultado para "${searchInput}"`}
              emptyDescription="Nossa lontrinha não localizou peças com esse termo de busca. Experimente termos como 'articulado', 'filamento', 'cortadores' ou redefina os filtros."
              emptyActionLabel="Ver Catálogo Completo"
              onEmptyAction={() => {
                setSearchInput("");
                handleResetFilters();
                navigate("/produtos");
              }}
            />

            {totalPages > 1 && (
              <div className="pt-6 border-t border-pink-100 dark:border-border flex items-center justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    setQueryParams({ page });
                    window.scrollTo({ top: 180, behavior: "smooth" });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

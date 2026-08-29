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
import { mockCategories } from "@/src/mocks/categories";
import { mockProducts } from "@/src/mocks/products";
import { useNavigationStore } from "@/src/stores/navigationStore";
import {
  Filter,
  ArrowUpDown,
  LayoutGrid,
  Grid,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const ITEMS_PER_PAGE = 12;

export interface CategoryDetailPageProps {
  slug?: string;
}

export const CategoryDetailPage: React.FC<CategoryDetailPageProps> = ({
  slug: propSlug,
}) => {
  const { params, navigate, setQueryParams } = useNavigationStore();
  const currentSlug =
    propSlug ||
    params.categorySlug ||
    params.slug ||
    "colecionaveis-articulados";

  const category =
    mockCategories.find((c) => c.slug === currentSlug) || mockCategories[0];
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);
  const [gridColumns, setGridColumns] = React.useState<3 | 4>(4);

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
    category: currentSlug,
    minPrice: currentMinPrice,
    maxPrice: currentMaxPrice,
    material: currentMaterials,
    color: currentColors,
    minRating: currentMinRating,
    inStockOnly: currentInStock,
  };

  // Filter products belonging to this category
  const filteredProducts = React.useMemo(() => {
    let result = mockProducts.filter((p) =>
      p.categories.some((c) => c.slug === currentSlug || c.id === currentSlug),
    );

    // Price Filter
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

    // Material Filter
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

    // Color Filter
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

    // Rating Filter
    if (filterState.minRating) {
      result = result.filter(
        (p) => (p.rating || 0) >= (filterState.minRating || 0),
      );
    }

    // In Stock Filter
    if (filterState.inStockOnly) {
      result = result.filter((p) => p.inStock && (p.stockTotal ?? 0) > 0);
    }

    // Sort
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
  }, [currentSlug, filterState, currentSort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (newFilters: FilterState) => {
    if (newFilters.category !== currentSlug && newFilters.category !== "all") {
      navigate(`/categorias/${newFilters.category}`, {
        categorySlug: newFilters.category,
      });
      return;
    }
    setQueryParams({
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
    { label: "Categorias", href: "/categorias" },
    { label: category.name, isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="space-y-6 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        {/* Category Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-linear-to-r from-pink-100/90 via-pink-50/50 to-sky-100/80 dark:from-pink-950/40 dark:via-card dark:to-sky-950/40 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                <Badge variant="babyPink" className="font-bold text-xs">
                  {filteredProducts.length} itens disponíveis
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-foreground">
                {category.name}
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                {category.description}
              </p>
            </div>

            <div className="md:col-span-4 hidden md:flex justify-end">
              <div className="h-28 w-44 rounded-2xl overflow-hidden border border-pink-200/80 shadow-md">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Bar */}
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
              Mostrando {filteredProducts.length} produtos
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
            title={`Filtrar ${category.name}`}
            description="Refine sua busca nesta categoria"
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
              columns={gridColumns}
              emptyTitle="Nenhum item encontrado nesta categoria com os filtros aplicados"
              emptyDescription="Tente alterar os filtros de preço ou materiais."
              emptyActionLabel="Ver Todos os Produtos"
              onEmptyAction={() => navigate("/produtos")}
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

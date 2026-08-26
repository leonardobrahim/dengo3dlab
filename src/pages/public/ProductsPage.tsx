import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { ProductGrid } from '@/src/components/business/ProductGrid';
import { ProductFilters, FilterState } from '@/src/components/business/ProductFilters';
import { Pagination } from '@/src/components/ui/Pagination';
import { Drawer } from '@/src/components/ui/Drawer';
import { Badge } from '@/src/components/ui/Badge';
import { Button } from '@/src/components/ui/Button';
import { mockProducts } from '@/src/mocks/products';
import { mockCategories } from '@/src/mocks/categories';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { Product } from '@/src/types';
import {
  SlidersHorizontal,
  ArrowUpDown,
  X,
  ChevronRight,
  Sparkles,
  LayoutGrid,
  Grid,
  Filter,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const ITEMS_PER_PAGE = 12;

export const ProductsPage: React.FC = () => {
  const { params, navigate, setQueryParams } = useNavigationStore();
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);
  const [gridColumns, setGridColumns] = React.useState<3 | 4>(4);

  // Initialize filter state from route params
  const currentCategory = params.categorySlug || params.category || 'all';
  const currentSort = params.sort || 'featured';
  const currentPage = Number(params.page) || 1;
  const currentMinPrice = params.minPrice ? Number(params.minPrice) : undefined;
  const currentMaxPrice = params.maxPrice ? Number(params.maxPrice) : undefined;
  const currentMinRating = params.rating ? Number(params.rating) : undefined;
  const currentInStock = params.inStock === true || params.inStock === 'true';

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

  // Filter & Sort Pipeline
  const filteredProducts = React.useMemo(() => {
    let result = [...mockProducts];

    // 1. Category Filter
    if (filterState.category && filterState.category !== 'all') {
      result = result.filter((p) =>
        p.categories.some((c) => c.slug === filterState.category || c.id === filterState.category)
      );
    }

    // 2. Price Filter
    if (filterState.minPrice !== undefined && filterState.minPrice !== '') {
      result = result.filter((p) => {
        const effectivePrice = p.basePromotionalPrice || p.basePrice;
        return effectivePrice >= Number(filterState.minPrice);
      });
    }
    if (filterState.maxPrice !== undefined && filterState.maxPrice !== '') {
      result = result.filter((p) => {
        const effectivePrice = p.basePromotionalPrice || p.basePrice;
        return effectivePrice <= Number(filterState.maxPrice);
      });
    }

    // 3. Material Filter
    if (filterState.material.length > 0) {
      result = result.filter((p) => {
        const matchesMaterial = filterState.material.some((mat) => {
          const matLower = mat.toLowerCase();
          const specMat = p.technicalSpecs?.material?.toLowerCase() || '';
          const tagMat = p.tags.some((t) => t.toLowerCase().includes(matLower));
          const variantMat = p.variants?.some((v) => v.material?.toLowerCase().includes(matLower));
          const typeMat = p.type === 'filament' && matLower.includes('pla');
          return specMat.includes(matLower) || tagMat || variantMat || typeMat;
        });
        return matchesMaterial;
      });
    }

    // 4. Color Filter
    if (filterState.color.length > 0) {
      result = result.filter((p) => {
        return filterState.color.some((col) => {
          const colLower = col.toLowerCase();
          const variantMatch = p.variants?.some((v) =>
            v.name.toLowerCase().includes(colLower) ||
            v.colorName?.toLowerCase().includes(colLower)
          );
          const tagMatch = p.tags.some((t) => t.toLowerCase().includes(colLower));
          return variantMatch || tagMatch;
        });
      });
    }

    // 5. Rating Filter
    if (filterState.minRating) {
      result = result.filter((p) => (p.rating || 0) >= (filterState.minRating || 0));
    }

    // 6. In Stock Filter
    if (filterState.inStockOnly) {
      result = result.filter((p) => p.inStock && p.stockTotal > 0);
    }

    // 7. Sort
    result.sort((a, b) => {
      const priceA = a.basePromotionalPrice || a.basePrice;
      const priceB = b.basePromotionalPrice || b.basePrice;

      switch (currentSort) {
        case 'price_asc':
          return priceA - priceB;
        case 'price_desc':
          return priceB - priceA;
        case 'rating_desc':
          return (b.rating || 0) - (a.rating || 0);
        case 'bestseller':
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

    return result;
  }, [
    filterState.category,
    filterState.minPrice,
    filterState.maxPrice,
    filterState.material,
    filterState.color,
    filterState.minRating,
    filterState.inStockOnly,
    currentSort,
  ]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleFilterChange = (newFilters: FilterState) => {
    setQueryParams({
      category: newFilters.category === 'all' ? undefined : newFilters.category,
      categorySlug: newFilters.category === 'all' ? undefined : newFilters.category,
      minPrice: newFilters.minPrice,
      maxPrice: newFilters.maxPrice,
      material: newFilters.material.length > 0 ? newFilters.material.join(',') : undefined,
      color: newFilters.color.length > 0 ? newFilters.color.join(',') : undefined,
      rating: newFilters.minRating,
      inStock: newFilters.inStockOnly ? true : undefined,
      page: 1, // Reset to page 1 on filter changes
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

  const handleSortChange = (newSort: string) => {
    setQueryParams({ sort: newSort, page: 1 });
  };

  const handlePageChange = (newPage: number) => {
    setQueryParams({ page: newPage });
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  // Find active category metadata if selected
  const activeCategoryObj = mockCategories.find((c) => c.slug === currentCategory);

  return (
    <StoreLayout>
      <div className="space-y-6 text-left">
        {/* Breadcrumbs */}
        <nav aria-label="Navegação estrutural" className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="hover:text-pink-600 cursor-pointer transition-colors"
          >
            Início
          </button>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className={cn(activeCategoryObj ? 'hover:text-pink-600 cursor-pointer' : 'text-foreground font-semibold')}>
            {activeCategoryObj ? (
              <button type="button" onClick={() => handleFilterChange({ ...filterState, category: 'all' })}>
                Produtos
              </button>
            ) : (
              'Todos os Produtos'
            )}
          </span>
          {activeCategoryObj && (
            <>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-bold">{activeCategoryObj.name}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-pink-200/80 dark:border-pink-900/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                {activeCategoryObj ? activeCategoryObj.name : 'Catálogo Completo 3D'}
              </h1>
              <Badge variant="babyPink" className="text-xs font-bold">
                {filteredProducts.length} itens
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              {activeCategoryObj
                ? activeCategoryObj.description
                : 'Explore modelos articulados, filamentos silk, suportes organizadores e itens decorativos feitos no nosso laboratório de manufatura aditiva.'}
            </p>
          </div>

          {/* Controls Bar: Sort, View mode & Mobile Filter trigger */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Mobile Filter Button Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden gap-1.5 text-xs font-bold border-pink-200"
            >
              <Filter className="h-3.5 w-3.5 text-pink-500" />
              <span>Filtros</span>
            </Button>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground font-medium hidden sm:inline">Ordenar:</span>
              <select
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
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

            {/* Grid Density Toggle (Desktop) */}
            <div className="hidden sm:flex items-center border border-pink-200/80 dark:border-border rounded-xl p-0.5 bg-card">
              <button
                type="button"
                onClick={() => setGridColumns(3)}
                className={cn(
                  'p-1.5 rounded-lg transition-colors cursor-pointer',
                  gridColumns === 3
                    ? 'bg-pink-100 dark:bg-pink-950 text-pink-600 font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                title="3 Colunas"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridColumns(4)}
                className={cn(
                  'p-1.5 rounded-lg transition-colors cursor-pointer',
                  gridColumns === 4
                    ? 'bg-pink-100 dark:bg-pink-950 text-pink-600 font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                title="4 Colunas"
              >
                <Grid className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filters Chips Bar */}
        {(filterState.category !== 'all' ||
          filterState.minPrice ||
          filterState.maxPrice ||
          filterState.material.length > 0 ||
          filterState.color.length > 0 ||
          filterState.minRating ||
          filterState.inStockOnly) && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-semibold text-muted-foreground">Filtros ativos:</span>

            {filterState.category !== 'all' && (
              <Badge variant="babyPink" className="gap-1 text-xs">
                <span>Cat: {activeCategoryObj?.name || filterState.category}</span>
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filterState, category: 'all' })}
                  className="hover:text-foreground cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {(filterState.minPrice || filterState.maxPrice) && (
              <Badge variant="babyPink" className="gap-1 text-xs">
                <span>
                  Preço: R$ {filterState.minPrice || 0} - {filterState.maxPrice ? `R$ ${filterState.maxPrice}` : '∞'}
                </span>
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filterState, minPrice: undefined, maxPrice: undefined })}
                  className="hover:text-foreground cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filterState.material.map((mat) => (
              <Badge key={mat} variant="babyBlue" className="gap-1 text-xs">
                <span>{mat}</span>
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange({
                      ...filterState,
                      material: filterState.material.filter((m) => m !== mat),
                    })
                  }
                  className="hover:text-foreground cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {filterState.color.map((col) => (
              <Badge key={col} variant="candyGradient" className="gap-1 text-xs">
                <span>Cor: {col}</span>
                <button
                  type="button"
                  onClick={() =>
                    handleFilterChange({
                      ...filterState,
                      color: filterState.color.filter((c) => c !== col),
                    })
                  }
                  className="hover:text-foreground cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {filterState.minRating && (
              <Badge variant="babyPink" className="gap-1 text-xs">
                <span>{filterState.minRating}★ ou mais</span>
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filterState, minRating: undefined })}
                  className="hover:text-foreground cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            {filterState.inStockOnly && (
              <Badge variant="babyPink" className="gap-1 text-xs">
                <span>Apenas Pronta Entrega</span>
                <button
                  type="button"
                  onClick={() => handleFilterChange({ ...filterState, inStockOnly: false })}
                  className="hover:text-foreground cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}

            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-pink-600 hover:underline ml-1 cursor-pointer"
            >
              Limpar todos
            </button>
          </div>
        )}

        {/* Main Content Layout: Sidebar + Grid */}
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
            title="Filtrar Produtos"
            description="Refine sua busca por categoria, faixa de preço, cor ou material"
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
              emptyTitle="Nenhum produto encontrado para estes filtros"
              emptyDescription="Tente relaxar os filtros de preço, cores ou categoria para encontrar o que procura."
              emptyActionLabel="Redefinir Filtros"
              onEmptyAction={handleResetFilters}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="pt-6 border-t border-pink-100 dark:border-border flex items-center justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

import * as React from 'react';
import { Search, X, Sparkles, ArrowRight, Layers, Tag } from 'lucide-react';
import { mockProducts } from '@/src/mocks/products';
import { mockCategories } from '@/src/mocks/categories';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { PriceDisplay } from '@/src/components/business/PriceDisplay';
import { cn } from '@/src/lib/utils';

export interface ProductSearchWithSuggestionsProps {
  initialQuery?: string;
  placeholder?: string;
  className?: string;
  onSearchSubmit?: (query: string) => void;
  autoFocus?: boolean;
}

const POPULAR_TAGS = [
  'Lontrinha',
  'Dragão Articulado',
  'Vaso Bob',
  'Filamento Rosa',
  'Suporte Headset',
  'Resina 8K',
  'Confeitaria',
  'Astronauta',
];

export const ProductSearchWithSuggestions: React.FC<ProductSearchWithSuggestionsProps> = ({
  initialQuery = '',
  placeholder = 'Buscar lontras, dragões, filamentos candy, suportes...',
  className,
  onSearchSubmit,
  autoFocus = false,
}) => {
  const [query, setQuery] = React.useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = React.useState(initialQuery);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState<number>(-1);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { navigate } = useNavigationStore();

  // Sync initialQuery prop changes
  React.useEffect(() => {
    setQuery(initialQuery);
    setDebouncedQuery(initialQuery);
  }, [initialQuery]);

  // Debounce query input (250ms)
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 250);
    return () => clearTimeout(timer);
  }, [query]);

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products and categories based on debounced search
  const { matchingProducts, matchingCategories } = React.useMemo(() => {
    if (!debouncedQuery.trim()) {
      return { matchingProducts: [], matchingCategories: [] };
    }

    const q = debouncedQuery.toLowerCase().trim();

    const prods = mockProducts
      .filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch = p.description.toLowerCase().includes(q);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
        const catMatch = p.categories.some((c) => c.name.toLowerCase().includes(q));
        return nameMatch || descMatch || tagMatch || catMatch;
      })
      .slice(0, 5);

    const cats = mockCategories
      .filter((c) => c.name.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q))
      .slice(0, 3);

    return { matchingProducts: prods, matchingCategories: cats };
  }, [debouncedQuery]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      if (onSearchSubmit) {
        onSearchSubmit(query.trim());
      } else {
        navigate('/busca', { q: query.trim(), query: query.trim() });
      }
    }
  };

  const handleSelectProduct = (slug: string) => {
    setIsOpen(false);
    navigate(`/produtos/${slug}`, { slug });
  };

  const handleSelectCategory = (slug: string) => {
    setIsOpen(false);
    navigate(`/categorias/${slug}`, { categorySlug: slug });
  };

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
    setIsOpen(false);
    navigate('/busca', { q: tag, query: tag });
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit} className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full h-10.5 pl-10 pr-9 text-xs sm:text-sm rounded-2xl border border-pink-200/90 dark:border-pink-900/60 bg-pink-50/40 dark:bg-card text-foreground placeholder:text-muted-foreground/70 focus:bg-background focus:border-pink-400 dark:focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all shadow-2xs"
        />

        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-pink-400" />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setDebouncedQuery('');
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-1"
            aria-label="Limpar busca"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </form>

      {/* Live Suggestions Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-pink-200 bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 text-left">
          {debouncedQuery.trim() === '' ? (
            /* Quick Popular Searches when query is empty */
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-pink-500" />
                <span>Termos Populares no Lab</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleSelectTag(tag)}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-pink-50 dark:bg-muted/40 text-pink-700 dark:text-pink-300 hover:bg-pink-100 hover:scale-105 transition-all cursor-pointer border border-pink-200/40"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Search Results Breakdown */
            <div className="max-h-96 overflow-y-auto divide-y divide-pink-100 dark:divide-border/60">
              {/* Matching Categories */}
              {matchingCategories.length > 0 && (
                <div className="p-3 bg-pink-50/30 dark:bg-muted/20">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="h-3 w-3 text-sky-500" />
                    <span>Categorias</span>
                  </div>
                  <div className="space-y-1">
                    {matchingCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => handleSelectCategory(cat.slug)}
                        className="w-full flex items-center justify-between p-2 rounded-xl text-xs hover:bg-pink-100/60 dark:hover:bg-pink-950/40 transition-colors cursor-pointer text-left group"
                      >
                        <span className="font-semibold text-foreground group-hover:text-pink-600 dark:group-hover:text-pink-400">
                          {cat.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground bg-white dark:bg-card px-2 py-0.5 rounded-full border border-pink-200/40">
                          {cat.productCount} itens
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Matching Products */}
              {matchingProducts.length > 0 ? (
                <div className="p-3">
                  <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Tag className="h-3 w-3 text-pink-500" />
                    <span>Produtos Encontrados</span>
                  </div>
                  <div className="space-y-2">
                    {matchingProducts.map((prod) => (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => handleSelectProduct(prod.slug)}
                        className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-pink-50 dark:hover:bg-muted/40 transition-all cursor-pointer text-left group"
                      >
                        <img
                          src={prod.featuredImage}
                          alt={prod.name}
                          className="h-11 w-11 rounded-lg object-cover bg-muted shrink-0 border border-pink-100"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-foreground truncate group-hover:text-pink-600 dark:group-hover:text-pink-400">
                            {prod.name}
                          </h4>
                          <p className="text-[11px] text-muted-foreground truncate">
                            {prod.brand} • {prod.tags.slice(0, 2).join(', ')}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <PriceDisplay
                            price={prod.basePrice}
                            promotionalPrice={prod.basePromotionalPrice}
                            size="sm"
                          />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : matchingCategories.length === 0 ? (
                <div className="p-6 text-center text-xs text-muted-foreground space-y-1">
                  <p className="font-semibold text-foreground">Nenhum resultado direto para "{query}"</p>
                  <p>Pressione Enter para ver todos os resultados e sugestões na página de busca.</p>
                </div>
              ) : null}

              {/* View all results footer */}
              <div className="p-2.5 bg-pink-50/50 dark:bg-card">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="w-full py-2 px-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <span>Ver todos os resultados para "{query}"</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

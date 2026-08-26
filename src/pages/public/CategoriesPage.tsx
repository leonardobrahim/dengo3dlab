import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { Badge } from '@/src/components/ui/Badge';
import { mockCategories } from '@/src/mocks/categories';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { Layers, ArrowRight, Sparkles, Boxes } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { navigate } = useNavigationStore();

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Categorias', isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="space-y-8 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-pink-200/80 dark:border-pink-900/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground">
                Todas as Categorias
              </h1>
              <Badge variant="babyPink" className="text-xs font-bold">
                {mockCategories.length} coleções
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Descubra criações 3D agrupadas por utilidade, estilo e paixão maker.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate(`/categorias/${cat.slug}`, { categorySlug: cat.slug })}
              className="group overflow-hidden rounded-3xl border border-pink-200/80 dark:border-pink-900/40 bg-card hover:border-pink-400 dark:hover:border-pink-600 transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Category Cover Image with Overlay */}
              <div className="relative aspect-video w-full overflow-hidden bg-pink-50 dark:bg-zinc-900">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg">{cat.icon}</span>
                    <span className="font-extrabold text-sm text-white drop-shadow-xs truncate">
                      {cat.name}
                    </span>
                  </div>
                  <Badge variant="candyGradient" className="text-[10px] font-black shrink-0">
                    {cat.productCount} itens
                  </Badge>
                </div>
              </div>

              {/* Category Description & CTA */}
              <div className="p-5 space-y-4 flex flex-1 flex-col justify-between">
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-pink-100 dark:border-border/60 text-xs font-bold text-pink-600 dark:text-pink-400">
                  <span>Ver Todos os Produtos</span>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-50 dark:bg-pink-950/60 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StoreLayout>
  );
};

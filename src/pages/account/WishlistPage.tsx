import * as React from 'react';
import { AccountLayout } from '@/src/layouts/account/AccountLayout';
import { ProductCard } from '@/src/components/business/ProductCard';
import { EmptyState } from '@/src/components/feedback/EmptyState';
import { useWishlistStore } from '@/src/stores/wishlistStore';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { mockProducts } from '@/src/mocks/products';
import { Heart, Sparkles } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { productIds } = useWishlistStore();
  const { navigate } = useNavigationStore();

  const wishlistedProducts = mockProducts.filter((p) => productIds.includes(p.id));

  return (
    <AccountLayout currentPageTitle="Meus Favoritos" currentPageBreadcrumb="Favoritos">
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Lista de Desejos</h1>
          <p className="text-xs text-slate-600">
            {wishlistedProducts.length} itens guardados no seu coração de maker
          </p>
        </div>

        {wishlistedProducts.length === 0 ? (
          <EmptyState
            icon={<Heart className="h-8 w-8 text-pink-500 fill-pink-500/20" />}
            title="Sua lista de favoritos está vazia"
            description="Explore nossa vitrine e clique no coraçãozinho para salvar seus modelos favoritos!"
            actionLabel="Explorar Catálogo"
            onAction={() => navigate('/produtos')}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

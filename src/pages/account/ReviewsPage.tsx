import * as React from 'react';
import { AccountLayout } from '@/src/layouts/account/AccountLayout';
import { Rating } from '@/src/components/business/Rating';
import { Button } from '@/src/components/ui/Button';
import { Star, MessageSquare } from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const reviews = [
    {
      id: 'rev-1',
      productName: 'Mascote Lontrinha Dengo 3D Articulada',
      date: '20 de Agosto de 2026',
      rating: 5,
      comment: 'Peça perfeita! O acabamento em Rosa Bebê Candy é lindo e as articulações são super fluidas. Chegou muito bem embalada.',
      productImage: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'rev-2',
      productName: 'Filamento PLA Silk Candy Rosa Bebê (1kg)',
      date: '14 de Agosto de 2026',
      rating: 5,
      comment: 'Filamento de extrema qualidade, zero entupimento na minha K1C e brilho perolizado impecável!',
      productImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=200&q=80',
    },
  ];

  return (
    <AccountLayout currentPageTitle="Minhas Avaliações" currentPageBreadcrumb="Avaliações">
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-foreground">Avaliações & Opiniões</h1>
          <p className="text-xs text-muted-foreground">
            Seus feedbacks que ajudam a comunidade maker a escolher os melhores modelos
          </p>
        </div>

        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card space-y-3 shadow-xs"
            >
              <div className="flex items-center gap-3">
                <img
                  src={rev.productImage}
                  alt={rev.productName}
                  className="h-12 w-12 rounded-xl object-cover border border-pink-100 dark:border-border"
                />
                <div className="space-y-0.5">
                  <h3 className="text-xs font-bold text-foreground">{rev.productName}</h3>
                  <div className="flex items-center gap-2">
                    <Rating value={rev.rating} max={5} />
                    <span className="text-[11px] text-muted-foreground">{rev.date}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground italic bg-pink-50/40 dark:bg-card p-3 rounded-2xl border border-pink-100 dark:border-border">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </AccountLayout>
  );
};

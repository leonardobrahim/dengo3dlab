import * as React from 'react';
import {
  Star,
  Sparkles,
  MessageSquarePlus,
  Filter,
  CheckCircle2,
  Image as ImageIcon,
  ThumbsUp,
  X,
  Upload,
} from 'lucide-react';
import { Review } from '@/src/types';
import { ReviewCard } from './ReviewCard';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Dialog } from '@/src/components/ui/Dialog';
import { useToast } from '@/src/components/ui/Toast';
import { cn } from '@/src/lib/utils';

export interface ProductReviewsSectionProps {
  productId: string;
  productName: string;
  reviews: Review[];
  rating?: number;
  reviewCount?: number;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  productId,
  productName,
  reviews: initialReviews,
  rating = 4.9,
  reviewCount = 0,
}) => {
  const { toast } = useToast();
  const [reviewsList, setReviewsList] = React.useState<Review[]>(initialReviews);
  const [activeFilter, setActiveFilter] = React.useState<'all' | '5' | '4' | 'photos'>('all');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Form State
  const [newRating, setNewRating] = React.useState(5);
  const [hoverRating, setHoverRating] = React.useState(0);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [comment, setComment] = React.useState('');
  const [photoUrl, setPhotoUrl] = React.useState('');
  const [selectedVariant, setSelectedVariant] = React.useState('Rosa Candy • M (15cm) • PLA Silk');

  // Keep list updated if initialReviews changes
  React.useEffect(() => {
    setReviewsList(initialReviews);
  }, [initialReviews]);

  // Calculations
  const totalReviews = reviewsList.length > 0 ? reviewsList.length : reviewCount || 1;
  const averageRating =
    reviewsList.length > 0
      ? reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length
      : rating;

  const count5 = reviewsList.filter((r) => r.rating === 5).length;
  const count4 = reviewsList.filter((r) => r.rating === 4).length;
  const count3 = reviewsList.filter((r) => r.rating === 3).length;
  const count2 = reviewsList.filter((r) => r.rating === 2).length;
  const count1 = reviewsList.filter((r) => r.rating === 1).length;

  const pct5 = totalReviews > 0 ? Math.round((count5 / totalReviews) * 100) : 90;
  const pct4 = totalReviews > 0 ? Math.round((count4 / totalReviews) * 100) : 10;
  const pct3 = totalReviews > 0 ? Math.round((count3 / totalReviews) * 100) : 0;
  const pct2 = totalReviews > 0 ? Math.round((count2 / totalReviews) * 100) : 0;
  const pct1 = totalReviews > 0 ? Math.round((count1 / totalReviews) * 100) : 0;

  // Filtered reviews
  const filteredReviews = reviewsList.filter((r) => {
    if (activeFilter === '5') return r.rating === 5;
    if (activeFilter === '4') return r.rating === 4;
    if (activeFilter === 'photos') return !!r.customerPhotoUrl;
    return true;
  });

  const ratingDescriptions: Record<number, string> = {
    5: 'Excelente! Impressão 3D impecável e superou expectativas',
    4: 'Muito bom! Ótima qualidade e acabamento bonito',
    3: 'Bom, atende ao proposto',
    2: 'Regular, esperava um acabamento melhor',
    1: 'Insatisfeito com o produto',
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      toast.error('Preencha seu nome e seu depoimento.');
      return;
    }

    const newReview: Review = {
      id: `rev-user-${Date.now()}`,
      productId,
      userName: name.trim(),
      userAvatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      rating: newRating,
      title: title.trim() || undefined,
      comment: comment.trim(),
      verifiedPurchase: true,
      helpfulVotes: 0,
      unhelpfulVotes: 0,
      printQualityScore: newRating,
      variantInfo: selectedVariant,
      customerPhotoUrl: photoUrl.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    setReviewsList([newReview, ...reviewsList]);
    setIsModalOpen(false);

    // Reset Form
    setName('');
    setEmail('');
    setTitle('');
    setComment('');
    setPhotoUrl('');

    toast.success(
      'Avaliação publicada com sucesso!',
      'Obrigado por ajudar a comunidade de makers do Dengo 3D Lab.'
    );
  };

  return (
    <div id="product-reviews-container" className="space-y-8 text-left">
      {/* Overview Statistics Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-pink-100 bg-white shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Big Rating & Recommendation */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:border-r md:border-pink-100 md:pr-8">
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black text-slate-800">
                {averageRating.toFixed(1)}
              </span>
              <div className="flex items-center gap-1 justify-center md:justify-start pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      'h-5 w-5',
                      star <= Math.round(averageRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-slate-100 text-slate-300'
                    )}
                  />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-600">
                Com base em {totalReviews} avaliações reais
              </p>
            </div>

            <div className="inline-flex items-center gap-2 p-2.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>98% dos clientes recomendam este produto</span>
            </div>

            <Button
              id="open-review-modal-btn"
              variant="dengo"
              size="md"
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto font-bold text-xs gap-2 rounded-2xl shadow-xs"
            >
              <MessageSquarePlus className="h-4 w-4" />
              <span>Escrever uma Avaliação</span>
            </Button>
          </div>

          {/* Right Column: Star Breakdown Bars */}
          <div className="md:col-span-8 space-y-2.5">
            {[
              { stars: 5, pct: pct5, count: count5 },
              { stars: 4, pct: pct4, count: count4 },
              { stars: 3, pct: pct3, count: count3 },
              { stars: 2, pct: pct2, count: count2 },
              { stars: 1, pct: pct1, count: count1 },
            ].map(({ stars, pct, count }) => (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 w-14 shrink-0 font-bold text-slate-700">
                  <span>{stars}</span>
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                </div>

                <div className="flex-1 h-3 rounded-full bg-pink-100/70 overflow-hidden">
                  <div
                    className="h-full bg-pink-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="w-16 text-right font-medium text-slate-600 text-[11px]">
                  {pct}% ({count})
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: `Todas (${reviewsList.length})` },
            { id: '5', label: `5 Estrelas (${count5})` },
            { id: '4', label: `4 Estrelas (${count4})` },
            {
              id: 'photos',
              label: `Com Fotos (${reviewsList.filter((r) => r.customerPhotoUrl).length})`,
            },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={cn(
                'px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer',
                activeFilter === f.id
                  ? 'bg-pink-500 text-white shadow-xs'
                  : 'bg-white border border-pink-200 text-slate-700 hover:border-pink-300'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-600">
          Mostrando {filteredReviews.length} avaliaç{filteredReviews.length === 1 ? 'ão' : 'ões'}
        </span>
      </div>

      {/* Reviews Cards List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="p-8 rounded-3xl border border-pink-100 bg-white text-center space-y-2">
            <p className="text-sm font-bold text-slate-700">Nenhuma avaliação neste filtro.</p>
            <p className="text-xs text-slate-600">
              Seja o primeiro a enviar uma foto ou avaliação para este produto!
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        )}
      </div>

      {/* "Escrever Avaliação" Dialog Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        title="Avaliar Produto no Dengo Lab"
        description={`Compartilhe sua experiência real com ${productName}`}
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4 text-left pt-2">
          {/* Star Picker */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Sua Nota Geral *
            </label>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-400 transition-transform hover:scale-120 cursor-pointer"
                  >
                    <Star
                      className={cn(
                        'h-7 w-7 transition-colors',
                        (hoverRating || newRating) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-100 text-slate-300'
                      )}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-pink-600">
                {ratingDescriptions[hoverRating || newRating]}
              </span>
            </div>
          </div>

          {/* Name & Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Seu Nome *</label>
              <input
                type="text"
                required
                placeholder="Ex: Beatriz Lima"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl border border-pink-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Seu E-mail</label>
              <input
                type="email"
                placeholder="seu@email.com (não será público)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl border border-pink-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>
          </div>

          {/* Purchased Variant Option */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Modelo Adquirido</label>
            <input
              type="text"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
              className="w-full h-10 px-3 text-xs rounded-xl border border-pink-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Title */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Título da Avaliação</label>
            <input
              type="text"
              placeholder="Ex: O acabamento superou todas as expectativas!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 text-xs rounded-xl border border-pink-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Comment */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Seu Depoimento *</label>
            <textarea
              required
              rows={3}
              placeholder="Conte o que achou da resistência, fidelidade de cor, camadas e do atendimento..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-pink-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Photo URL (Optional simulator) */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5 text-pink-500" />
              <span>Adicionar Foto da Peça (URL ou Unsplash)</span>
            </label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="w-full h-10 px-3 text-xs rounded-xl border border-pink-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-pink-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="dengo" size="sm" className="font-bold">
              Publicar Avaliação
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
};

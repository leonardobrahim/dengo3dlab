import * as React from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2, Star, Sparkles, Image as ImageIcon } from 'lucide-react';
import { Review } from '@/src/types';
import { Avatar } from '@/src/components/ui/Avatar';
import { Badge } from '@/src/components/ui/Badge';
import { cn } from '@/src/lib/utils';
import { formatDate } from '@/src/utils/formatters';

export interface ReviewCardProps {
  review: Review;
  onVoteHelpful?: (reviewId: string, type: 'helpful' | 'unhelpful') => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onVoteHelpful }) => {
  const [vote, setVote] = React.useState<'helpful' | 'unhelpful' | null>(null);
  const [helpfulCount, setHelpfulCount] = React.useState(review.helpfulVotes || 0);
  const [unhelpfulCount, setUnhelpfulCount] = React.useState(review.unhelpfulVotes || 0);
  const [showPhotoModal, setShowPhotoModal] = React.useState(false);

  const handleVote = (type: 'helpful' | 'unhelpful') => {
    if (vote === type) {
      // cancel vote
      setVote(null);
      if (type === 'helpful') setHelpfulCount((c) => Math.max(0, c - 1));
      else setUnhelpfulCount((c) => Math.max(0, c - 1));
    } else {
      if (vote === 'helpful') setHelpfulCount((c) => Math.max(0, c - 1));
      if (vote === 'unhelpful') setUnhelpfulCount((c) => Math.max(0, c - 1));

      setVote(type);
      if (type === 'helpful') setHelpfulCount((c) => c + 1);
      else setUnhelpfulCount((c) => c + 1);

      onVoteHelpful?.(review.id, type);
    }
  };

  return (
    <div
      id={`review-card-${review.id}`}
      className="p-5 sm:p-6 rounded-3xl border border-pink-100 bg-white text-left shadow-2xs space-y-4 transition-all hover:border-pink-200"
    >
      {/* Top Header: User info, verified badge, rating & date */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={review.userAvatar}
            alt={review.userName}
            fallback={review.userName.charAt(0).toUpperCase()}
            size="md"
            className="ring-2 ring-pink-100"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm text-slate-800">{review.userName}</span>
              {review.verifiedPurchase && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Compra Verificada</span>
                </span>
              )}
            </div>
            {review.variantInfo && (
              <p className="text-xs text-pink-700 font-medium pt-0.5">
                {review.variantInfo}
              </p>
            )}
          </div>
        </div>

        {/* Stars and Date */}
        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  'h-4 w-4',
                  star <= review.rating
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-100 text-slate-300'
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-600 font-medium">
            {formatDate(review.createdAt)}
          </span>
        </div>
      </div>

      {/* Review Content */}
      <div className="space-y-2">
        {review.title && (
          <h4 className="text-sm font-bold text-slate-900 leading-snug">{review.title}</h4>
        )}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {review.comment}
        </p>
      </div>

      {/* Optional Customer Photo Thumbnail */}
      {review.customerPhotoUrl && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowPhotoModal(true)}
            className="group relative inline-flex items-center gap-2 p-1.5 rounded-2xl border border-pink-200 bg-pink-50/40 hover:bg-pink-50 transition-all cursor-pointer text-left"
          >
            <img
              src={review.customerPhotoUrl}
              alt="Foto do cliente"
              className="h-16 w-16 rounded-xl object-cover border border-pink-100 group-hover:scale-102 transition-transform"
            />
            <div className="pr-3 text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1">
                <ImageIcon className="h-3.5 w-3.5 text-pink-500" />
                <span>Foto do cliente</span>
              </span>
              <span className="text-[11px] text-slate-600">Clique para ampliar</span>
            </div>
          </button>
        </div>
      )}

      {/* Footer: Print Quality Badge & Helpful Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-pink-50">
        <div className="flex items-center gap-2">
          {review.printQualityScore && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-xl border border-sky-200/60">
              <Sparkles className="h-3 w-3 text-sky-500" />
              <span>Qualidade de Impressão 3D: {review.printQualityScore}/5</span>
            </span>
          )}
        </div>

        {/* Helpful Voting */}
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="text-[11px]">Essa avaliação foi útil?</span>
          <button
            type="button"
            onClick={() => handleVote('helpful')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-semibold transition-all cursor-pointer',
              vote === 'helpful'
                ? 'border-emerald-400 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-200/50'
                : 'border-slate-200 bg-white text-slate-600 hover:border-pink-200 hover:text-pink-600'
            )}
          >
            <ThumbsUp className="h-3 w-3" />
            <span>Sim ({helpfulCount})</span>
          </button>
          <button
            type="button"
            onClick={() => handleVote('unhelpful')}
            className={cn(
              'flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs font-semibold transition-all cursor-pointer',
              vote === 'unhelpful'
                ? 'border-rose-400 bg-rose-50 text-rose-700 ring-2 ring-rose-200/50'
                : 'border-slate-200 bg-white text-slate-600 hover:border-pink-200 hover:text-slate-800'
            )}
          >
            <ThumbsDown className="h-3 w-3" />
            <span>Não ({unhelpfulCount})</span>
          </button>
        </div>
      </div>

      {/* Customer Photo Full Modal */}
      {showPhotoModal && review.customerPhotoUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div
            className="fixed inset-0"
            onClick={() => setShowPhotoModal(false)}
          />
          <div className="relative z-10 max-w-lg w-full bg-white rounded-3xl border border-pink-200 p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Foto enviada por {review.userName}</span>
              <button
                onClick={() => setShowPhotoModal(false)}
                className="text-xs font-bold text-pink-600 hover:underline cursor-pointer"
              >
                Fechar
              </button>
            </div>
            <img
              src={review.customerPhotoUrl}
              alt="Foto do cliente"
              className="w-full max-h-[70vh] object-contain rounded-2xl border border-pink-100"
            />
          </div>
        </div>
      )}
    </div>
  );
};

import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ZoomIn,
  ZoomOut,
  Sparkles,
  Heart,
  Share2,
} from "lucide-react";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";

export interface ProductGalleryProps {
  images: string[];
  productName: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  discountPercentage?: number;
  isFav?: boolean;
  onToggleFav?: () => void;
  onShare?: () => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
  isNew,
  isBestSeller,
  discountPercentage,
  isFav,
  onToggleFav,
  onShare,
}) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [zoomPosition, setZoomPosition] = React.useState({ x: 50, y: 50 });
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [lightboxZoom, setLightboxZoom] = React.useState(1);

  const safeImages =
    images && images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
        ];

  const currentImage = safeImages[selectedIndex] || safeImages[0];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (!isFullscreen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFullscreen(false);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, safeImages.length]);

  return (
    <div className="flex flex-col gap-4 text-left select-none">
      {/* Main Image Stage */}
      <div
        id="product-gallery-main"
        className="relative aspect-square w-full rounded-3xl border border-pink-200 bg-white shadow-xs overflow-hidden cursor-crosshair group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setIsFullscreen(true)}
      >
        {/* Main Image with Zoom pan effect */}
        <div className="relative h-full w-full overflow-hidden bg-pink-50/20">
          <img
            src={currentImage}
            alt={`${productName} - Imagem ${selectedIndex + 1}`}
            className={cn(
              "h-full w-full object-cover object-center transition-transform duration-200",
              isZoomed ? "scale-175" : "scale-100",
            )}
            style={
              isZoomed
                ? {
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }
                : undefined
            }
          />
        </div>

        {/* Badges Overlays */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-10">
          {discountPercentage && discountPercentage > 0 ? (
            <Badge variant="cherry" className="shadow-xs font-black">
              -{discountPercentage}% OFF
            </Badge>
          ) : null}
          {isBestSeller && (
            <Badge
              variant="candyGradient"
              className="shadow-xs font-bold flex items-center gap-1"
            >
              <Sparkles className="h-3 w-3" />
              <span>Mais Vendido</span>
            </Badge>
          )}
          {isNew && (
            <Badge variant="babyPink" className="shadow-xs font-bold">
              Novidade Candy
            </Badge>
          )}
        </div>

        {/* Top Right Action Quick Buttons */}
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
          {onShare && (
            <button
              id="gallery-btn-share"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onShare();
              }}
              title="Compartilhar produto"
              aria-label="Compartilhar produto"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 border border-pink-200 text-slate-700 shadow-md hover:bg-pink-50 hover:text-pink-600 transition-all cursor-pointer"
            >
              <Share2 className="h-4 w-4" />
            </button>
          )}

          {onToggleFav && (
            <button
              id="gallery-btn-fav"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFav();
              }}
              title="Favoritar produto"
              aria-label="Favoritar produto"
              className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 border border-pink-200 shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-colors",
                  isFav
                    ? "text-pink-500 fill-pink-500"
                    : "text-slate-500 hover:text-pink-500",
                )}
              />
            </button>
          )}

          {/* Fullscreen Button */}
          <button
            id="gallery-btn-fullscreen"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFullscreen(true);
            }}
            title="Ver em tela cheia"
            aria-label="Ver em tela cheia"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/95 border border-pink-200 text-slate-700 shadow-md hover:bg-pink-50 hover:text-pink-600 transition-all cursor-pointer opacity-90 group-hover:opacity-100"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Arrows on Hover */}
        {safeImages.length > 1 && (
          <>
            <button
              id="gallery-nav-prev"
              type="button"
              onClick={handlePrev}
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 border border-pink-200 text-slate-700 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-pink-50 hover:text-pink-600 cursor-pointer z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              id="gallery-nav-next"
              type="button"
              onClick={handleNext}
              aria-label="Próxima imagem"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 border border-pink-200 text-slate-700 shadow-md opacity-0 group-hover:opacity-100 transition-all hover:scale-110 hover:bg-pink-50 hover:text-pink-600 cursor-pointer z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Bottom indicator hint */}
        <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-xl bg-white/90 border border-pink-200 text-[11px] font-bold text-slate-700 shadow-2xs pointer-events-none z-10">
          {selectedIndex + 1} / {safeImages.length}
        </div>

        {/* Zoom Hint on Bottom Left */}
        <div className="absolute bottom-3 left-4 px-2.5 py-1 rounded-xl bg-white/90 border border-pink-200 text-[10px] font-medium text-slate-600 shadow-2xs pointer-events-none z-10 flex items-center gap-1">
          <ZoomIn className="h-3 w-3 text-pink-500" />
          <span>Passe o mouse para zoom</span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {safeImages.length > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {safeImages.map((img, idx) => (
            <button
              key={idx}
              id={`gallery-thumb-${idx}`}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "relative h-18 w-18 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-white",
                selectedIndex === idx
                  ? "border-pink-500 ring-4 ring-pink-300/40 scale-102 shadow-sm"
                  : "border-pink-200 opacity-70 hover:opacity-100 hover:border-pink-300",
              )}
              aria-label={`Ver foto ${idx + 1} de ${productName}`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="h-full w-full object-cover object-center"
              />
              {selectedIndex === idx && (
                <div className="absolute inset-0 bg-pink-500/10 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFullscreen(false)}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
            />

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-50 max-w-4xl w-full max-h-[90vh] flex flex-col items-center bg-white rounded-3xl border border-pink-200 shadow-2xl p-4 sm:p-6 overflow-hidden"
            >
              {/* Header Bar */}
              <div className="w-full flex items-center justify-between pb-3 border-b border-pink-100">
                <div className="flex items-center gap-2">
                  <Badge variant="candyGradient">
                    Foto {selectedIndex + 1} de {safeImages.length}
                  </Badge>
                  <span className="text-sm font-bold text-slate-800 truncate max-w-60 sm:max-w-md">
                    {productName}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => setLightboxZoom((z) => (z > 1 ? 1 : 1.75))}
                    title={lightboxZoom > 1 ? "Reduzir Zoom" : "Aumentar Zoom"}
                    className="border-pink-200"
                  >
                    {lightboxZoom > 1 ? (
                      <ZoomOut className="h-4 w-4" />
                    ) : (
                      <ZoomIn className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon-sm"
                    onClick={() => setIsFullscreen(false)}
                    aria-label="Fechar tela cheia"
                    className="border-pink-200"
                  >
                    <X className="h-4 w-4 text-slate-700" />
                  </Button>
                </div>
              </div>

              {/* Main Lightbox Image */}
              <div className="relative flex-1 w-full min-h-80 max-h-[65vh] flex items-center justify-center my-4 overflow-auto rounded-2xl bg-pink-50/20">
                <img
                  src={currentImage}
                  alt={productName}
                  style={{ transform: `scale(${lightboxZoom})` }}
                  className="max-h-[60vh] max-w-full object-contain rounded-xl transition-transform duration-200"
                />

                {/* Left/Right Buttons */}
                {safeImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 border border-pink-200 text-slate-700 shadow-xl hover:bg-pink-50 hover:text-pink-600 transition-all cursor-pointer"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 border border-pink-200 text-slate-700 shadow-xl hover:bg-pink-50 hover:text-pink-600 transition-all cursor-pointer"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Thumbnails Strip */}
              {safeImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
                  {safeImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedIndex(idx)}
                      className={cn(
                        "h-14 w-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer bg-white",
                        selectedIndex === idx
                          ? "border-pink-500 ring-2 ring-pink-400"
                          : "border-pink-200 opacity-60 hover:opacity-100",
                      )}
                    >
                      <img
                        src={img}
                        alt="thumb"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

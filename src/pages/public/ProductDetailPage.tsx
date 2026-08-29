import * as React from "react";
import { StoreLayout } from "@/src/layouts/store/StoreLayout";
import { Breadcrumb } from "@/src/components/ui/Breadcrumb";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { Rating } from "@/src/components/business/Rating";
import { PriceDisplay } from "@/src/components/business/PriceDisplay";
import { QuantitySelector } from "@/src/components/business/QuantitySelector";
import { ProductCard } from "@/src/components/business/ProductCard";
import { ProductGallery } from "@/src/components/business/ProductGallery";
import { ShippingCalculator } from "@/src/components/business/ShippingCalculator";
import { ProductReviewsSection } from "@/src/components/business/ProductReviewsSection";
import { ProductDetailSkeleton } from "@/src/components/feedback/ProductDetailSkeleton";
import { NotFoundState } from "@/src/components/feedback/NotFoundState";
import { Dialog } from "@/src/components/ui/Dialog";
import { mockProducts } from "@/src/mocks/products";
import { getReviewsByProductId } from "@/src/mocks/reviews";
import { useNavigationStore } from "@/src/stores/navigationStore";
import { useCartStore } from "@/src/stores/cartStore";
import { useWishlistStore } from "@/src/stores/wishlistStore";
import { useUIStore } from "@/src/stores/uiStore";
import { useToast } from "@/src/components/ui/Toast";
import {
  Heart,
  ShoppingBag,
  Share2,
  Truck,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
  Package,
  Zap,
  Leaf,
  Clock,
  ArrowRight,
  Flame,
  AlertTriangle,
  BellRing,
  HelpCircle,
} from "lucide-react";
import { formatCurrency } from "@/src/utils/formatters";
import { cn } from "@/src/lib/utils";
import { Product, ProductVariant } from "@/src/types";

export interface ProductDetailPageProps {
  slug?: string;
}

// Available Material Options with technical descriptions & price multipliers
const MATERIAL_OPTIONS = [
  {
    id: "pla-silk",
    name: "PLA Silk Premium",
    badge: "Brilho Sedoso",
    description:
      "Acabamento acetinado brilhante com reflexos sedosos. Perfeito para decoração.",
    priceMultiplier: 1.0,
    technology: "FDM Ultra-High Res",
  },
  {
    id: "pla-plus",
    name: "PLA+ Resistente",
    badge: "Alta Tenacidade",
    description:
      "Fórmula reforçada com resistência a impactos 2.5x maior que o PLA comum.",
    priceMultiplier: 1.08,
    technology: "FDM Reforçado",
  },
  {
    id: "petg",
    name: "PETG Durável",
    badge: "Resistência Térmica",
    description:
      "Suporta temperaturas de até 75°C e umidade. Ideal para suportes e uso diário.",
    priceMultiplier: 1.15,
    technology: "FDM Industrial",
  },
  {
    id: "resina-8k",
    name: "Resina 8K Foto-curável",
    badge: "Hiper-Detalhado",
    description:
      "Definição microscópica sem linhas visíveis. Ideal para miniaturas e colecionáveis.",
    priceMultiplier: 1.35,
    technology: "SLA / MSLA 8K",
  },
];

// Available Size Scales with dimension & weight multipliers
const SIZE_OPTIONS = [
  {
    id: "p",
    label: "P (10 cm)",
    dimensions: "10 x 6.5 x 5.0 cm",
    weightGrams: 75,
    priceMultiplier: 0.85,
  },
  {
    id: "m",
    label: "M (15 cm - Padrão)",
    dimensions: "15 x 9.5 x 7.5 cm",
    weightGrams: 140,
    priceMultiplier: 1.0,
  },
  {
    id: "g",
    label: "G (20 cm)",
    dimensions: "20 x 13.0 x 10.0 cm",
    weightGrams: 260,
    priceMultiplier: 1.45,
  },
];

// Color palette options
const COLOR_OPTIONS = [
  { id: "candy-pink", name: "Rosa Candy", hex: "#FF69B4", inStock: true },
  { id: "sky-blue", name: "Azul Céu", hex: "#60A5FA", inStock: true },
  { id: "pastel-lilac", name: "Lilás Pastel", hex: "#C084FC", inStock: true },
  { id: "mint-green", name: "Menta Doce", hex: "#6EE7B7", inStock: true },
  { id: "silk-gold", name: "Dourado Silk", hex: "#FCD34D", inStock: true },
  { id: "snow-white", name: "Branco Neve", hex: "#F8FAFC", inStock: true },
  { id: "onyx-black", name: "Preto Ônix", hex: "#1E293B", inStock: false }, // simulated out-of-stock
];

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  slug: propSlug,
}) => {
  const { params, navigate } = useNavigationStore();
  const { addItem } = useCartStore();
  const { isWishlisted, toggleWishlist } = useWishlistStore();
  const { setCartDrawerOpen } = useUIStore();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState<
    "desc" | "specs" | "materials" | "production" | "reviews"
  >("desc");
  const [notifyModalOpen, setNotifyModalOpen] = React.useState(false);
  const [notifyEmail, setNotifyEmail] = React.useState("");

  const currentSlug =
    propSlug || params.slug || "mascote-lontrinha-dengo-3d-articulada";
  const product = mockProducts.find((p) => p.slug === currentSlug);

  // Configuration state for variations
  const [selectedVariant, setSelectedVariant] = React.useState(
    product?.variants?.[0] || null,
  );

  React.useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product?.id]);

  const [quantity, setQuantity] = React.useState(1);

  // Reviews dataset
  const reviews = React.useMemo(() => {
    return product ? getReviewsByProductId(product.id) : [];
  }, [product?.id]);

  // Simulate loading state when navigating between products
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [currentSlug]);

  // Update dynamic Document Title / SEO
  React.useEffect(() => {
    if (product) {
      document.title = `${product.name} | Dengo 3D Lab`;
    }
  }, [product?.name]);

  // Reset variation configuration on product change
  React.useEffect(() => {
    if (product) {
      setQuantity(1);
    }
  }, [product?.id]);

  // Related products
  const relatedProducts = React.useMemo(() => {
    if (!product) return [];

    const primaryCategory = product.categories[0];
    const sameCategory = mockProducts.filter(
      (p) => p.id !== product.id && p.categories[0]?.id === primaryCategory?.id,
    );
    const others = mockProducts.filter(
      (p) => p.id !== product.id && p.categories[0]?.id !== primaryCategory?.id,
    );
    return [...sameCategory, ...others].slice(0, 4);
  }, [product?.id]);

  if (isLoading) {
    return (
      <StoreLayout>
        <ProductDetailSkeleton />
      </StoreLayout>
    );
  }

  if (!product) {
    return (
      <StoreLayout>
        <NotFoundState
          title="Modelo 3D Não Encontrado"
          description="O item que você está procurando pode ter sido movido ou não está mais disponível em nosso catálogo."
          showBackHome={false}
        />
        <div className="flex justify-center pb-6">
          <Button onClick={() => navigate("/produtos")} className="gap-2">
            Ver Catálogo de Produtos
          </Button>
        </div>
      </StoreLayout>
    );
  }

  // Dynamic Price and SKU Calculation based on selected Material, Size and Color
  const currentPrice = selectedVariant?.price || product.basePrice || 0;
  const currentCompareAtPrice =
    selectedVariant?.promotionalPrice || currentPrice * 1.25;
  const discountPct = Math.round(
    ((currentCompareAtPrice - currentPrice) / currentCompareAtPrice) * 100,
  );

  // Dynamic SKU
  const dynamicSku =
    selectedVariant?.sku || `DNG-${product.slug.slice(0, 8).toUpperCase()}`;

  // Variation Stock computation
  const currentStock =
    (selectedVariant ? selectedVariant.stockQuantity : product.stockTotal) ??
    10; // Fallback to 10 if null
  const isOutOfStock = currentStock <= 0;

  // Primary category and Wishlist state
  const primaryCategory = product.categories[0];
  const isFav = isWishlisted(product.id);

  // Breadcrumb items
  const breadcrumbItems = [
    { label: "Início", href: "/" },
    { label: "Catálogo", href: "/produtos" },
    ...(primaryCategory
      ? [
          {
            label: primaryCategory.name,
            href: `/categorias/${primaryCategory.slug}`,
          },
        ]
      : []),
    { label: product.name, isCurrent: true },
  ];

  // Cart Add Handler
  const handleAddToCart = (directCheckout = false) => {
    if (isOutOfStock) {
      toast.error("Esta variação está temporariamente fora de estoque.");
      return;
    }

    const variantNameFormatted = selectedVariant?.name || "Padrão";

    addItem({
      productId: product.id,
      variantId: selectedVariant?.id || "default",
      productName: product.name,
      productSlug: product.slug,
      variantName: variantNameFormatted,
      sku: dynamicSku,
      unitPrice: currentPrice,
      quantity,
      imageUrl: product.featuredImage || product.images[0],
      colorHex: selectedVariant?.colorHex,
      colorName: selectedVariant?.colorName,
      material: selectedVariant?.material || product.technicalSpecs?.material,
      maxStock: currentStock,
    });

    if (directCheckout) {
      toast.success("Redirecionando para o checkout seguro...");
      navigate("/checkout");
    } else {
      toast.success(
        `"${product.name}" adicionado ao carrinho!`,
        `Configuração: ${variantNameFormatted}`,
      );
      setCartDrawerOpen(true);
    }
  };

  // Share Handler
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.info(
        "Link do produto copiado com sucesso para a área de transferência!",
      );
    } else {
      toast.info("Compartilhe o link deste produto com seus amigos makers!");
    }
  };

  // Stock notification submit
  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyEmail.trim()) {
      setNotifyModalOpen(false);
      setNotifyEmail("");
      toast.success(
        "E-mail cadastrado com sucesso!",
        "Avisaremos você assim que esta variação for produzida em nosso Lab.",
      );
    }
  };

  return (
    <StoreLayout>
      <div className="space-y-8 text-left max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={breadcrumbItems} onNavigate={navigate} />

        {/* Main Product Commercial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT: Complete Interactive Gallery */}
          <div className="lg:col-span-6">
            <ProductGallery
              images={product.images}
              productName={product.name}
              isNew={product.isNew}
              isBestSeller={product.isBestSeller}
              discountPercentage={discountPct}
              isFav={isFav}
              onToggleFav={() => {
                toggleWishlist(product.id);
                toast.success(
                  isFav
                    ? "Removido dos favoritos"
                    : "Adicionado aos seus favoritos do Dengo Lab!",
                );
              }}
              onShare={handleShare}
            />

            {/* Quick Guarantees Badge Strip */}
            <div className="grid grid-cols-3 gap-2 pt-6">
              <div className="flex flex-col items-center text-center p-3 rounded-2xl border border-pink-100 bg-white shadow-2xs space-y-1">
                <Leaf className="h-4 w-4 text-emerald-500" />
                <span className="text-[11px] font-bold text-slate-800">
                  100% Eco PLA
                </span>
                <span className="text-[10px] text-slate-600">
                  Biodegradável
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-2xl border border-pink-100 bg-white shadow-2xs space-y-1">
                <ShieldCheck className="h-4 w-4 text-pink-500" />
                <span className="text-[11px] font-bold text-slate-800">
                  Garantia 3D
                </span>
                <span className="text-[10px] text-slate-600">
                  Peça perfeita
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 rounded-2xl border border-pink-100 bg-white shadow-2xs space-y-1">
                <Zap className="h-4 w-4 text-amber-500" />
                <span className="text-[11px] font-bold text-slate-800">
                  Envio Ágil
                </span>
                <span className="text-[10px] text-slate-600">
                  Pronta entrega
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Product Info, Variation Configurator & Actions */}
          <div className="lg:col-span-6 space-y-6">
            {/* Header: Brand, Title, SKU, Rating */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
                  {product.brand || "Dengo 3D Lab Exclusive"}
                </span>
                <span className="text-xs text-slate-600 font-mono">
                  SKU: <strong className="text-slate-700">{dynamicSku}</strong>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews anchor link */}
              <div className="flex items-center gap-3 pt-1">
                <Rating value={product.rating || 4.9} max={5} />
                <span className="text-xs font-bold text-slate-800">
                  {(product.rating || 4.9).toFixed(1)}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("reviews");
                    document
                      .getElementById("product-tabs-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-semibold text-pink-600 hover:text-pink-700 hover:underline cursor-pointer"
                >
                  ({reviews.length || product.reviewCount || 38} avaliações de
                  clientes)
                </button>
              </div>
            </div>

            {/* Price Box with Installments and Pix Discount */}
            <div className="p-5 rounded-3xl bg-pink-50/50 border border-pink-200/80 space-y-2 shadow-2xs">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-black text-pink-600">
                  {formatCurrency(currentPrice)}
                </span>
                {currentCompareAtPrice > currentPrice && (
                  <span className="text-sm font-semibold text-slate-600 line-through">
                    {formatCurrency(currentCompareAtPrice)}
                  </span>
                )}
                {discountPct > 0 && (
                  <Badge variant="cherry" className="font-black text-xs">
                    Economize {discountPct}% OFF
                  </Badge>
                )}
              </div>

              <div className="space-y-1 pt-1 text-xs text-slate-600">
                <p className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-pink-500 shrink-0" />
                  <span>
                    ou{" "}
                    <strong className="text-slate-800">
                      3x de {formatCurrency(currentPrice / 3)}
                    </strong>{" "}
                    sem juros no cartão de crédito
                  </span>
                </p>
                <p className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <Zap className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>
                    5% de desconto extra pagando com PIX (
                    {formatCurrency(currentPrice * 0.95)})
                  </span>
                </p>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.shortDescription || product.description}
            </p>

            {/* ========================================== */}
            {/* VARIATION CONFIGURATOR                     */}
            {/* ========================================== */}
            <div className="space-y-5 pt-2 border-t border-pink-100">
              {product.variants && product.variants.length > 1 && (
                <div className="space-y-6 pt-2 pb-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800">
                        Selecione a Variação:{" "}
                        <span className="text-pink-600 font-semibold">
                          {selectedVariant?.name || "Padrão"}
                        </span>
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                      {product.variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        const isInStock =
                          v.stockQuantity === null || v.stockQuantity > 0;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => isInStock && setSelectedVariant(v)}
                            disabled={!isInStock}
                            className={cn(
                              "p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1",
                              isSelected
                                ? "border-pink-500 bg-pink-50/60 ring-2 ring-pink-300/30 shadow-xs"
                                : "border-pink-100 bg-white hover:border-pink-200",
                              !isInStock &&
                                "opacity-50 cursor-not-allowed bg-slate-50",
                            )}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {v.colorHex && (
                                  <span
                                    className="h-3 w-3 rounded-full border border-slate-300 inline-block shadow-2xs shrink-0"
                                    style={{ backgroundColor: v.colorHex }}
                                  />
                                )}
                                <span className="text-xs font-bold text-slate-800">
                                  {v.name}
                                </span>
                              </div>
                              {isSelected && (
                                <CheckCircle2 className="h-3.5 w-3.5 text-pink-500" />
                              )}
                            </div>
                            <p className="text-[10px] text-slate-600 line-clamp-1">
                              {!isInStock
                                ? "Esgotado"
                                : v.price > 0
                                  ? `Por R$ ${v.price.toFixed(2).replace(".", ",")}`
                                  : "Grátis"}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stock Availability Alert */}
            <div className="pt-1">
              {isOutOfStock ? (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-rose-800">
                    <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>Esta variação está esgotada no momento.</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNotifyModalOpen(true)}
                    className="shrink-0 text-xs font-bold text-rose-700 border-rose-300 bg-white hover:bg-rose-100/50 gap-1.5"
                  >
                    <BellRing className="h-3.5 w-3.5" />
                    <span>Avise-me</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200/80">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    ✓ Em estoque para envio imediato ({currentStock} unidades
                    disponíveis no Lab)
                  </span>
                </div>
              )}
            </div>

            {/* ========================================== */}
            {/* QUANTITY & PRIMARY ACTION BUTTONS          */}
            {/* ========================================== */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Quantity Selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-slate-700">Qtd:</span>
                  <QuantitySelector
                    value={quantity}
                    max={currentStock || 1}
                    size="md"
                    disabled={isOutOfStock}
                    onChange={setQuantity}
                  />
                </div>

                {/* Add to Cart Button */}
                <Button
                  id="product-add-to-cart-btn"
                  variant="dengo"
                  size="lg"
                  disabled={isOutOfStock}
                  onClick={() => handleAddToCart(false)}
                  className="flex-1 font-black text-xs sm:text-sm gap-2 rounded-2xl shadow-md hover:scale-[1.01] transition-transform"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Adicionar ao Carrinho</span>
                </Button>
              </div>

              {/* "Comprar Agora" Direct Checkout Button */}
              <Button
                id="product-buy-now-btn"
                variant="outline"
                size="lg"
                disabled={isOutOfStock}
                onClick={() => handleAddToCart(true)}
                className="w-full font-black text-xs sm:text-sm border-pink-300 text-pink-700 hover:bg-pink-50 rounded-2xl transition-all"
              >
                <span>Comprar Agora (Checkout Rápido)</span>
                <ArrowRight className="h-4 w-4 ml-1.5 text-pink-500" />
              </Button>
            </div>

            {/* Shipping Calculator Embedded */}
            <ShippingCalculator
              productPrice={currentPrice}
              productWeightGrams={
                selectedVariant?.weightGrams ||
                product.technicalSpecs?.weightGrams ||
                200
              }
            />
          </div>
        </div>

        {/* ========================================== */}
        {/* DETAILED INFORMATION TABS SECTION          */}
        {/* ========================================== */}
        <div id="product-tabs-section" className="pt-12 space-y-6">
          {/* Tab Navigation Header */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-pink-100 scrollbar-none">
            {[
              {
                id: "desc",
                label: "Descrição Completa",
                icon: <Layers className="h-4 w-4" />,
              },
              {
                id: "specs",
                label: "Especificações Técnicas",
                icon: <Cpu className="h-4 w-4" />,
              },
              {
                id: "materials",
                label: "Materiais & Cuidados",
                icon: <Leaf className="h-4 w-4" />,
              },
              {
                id: "production",
                label: "Produção 3D & Prazos",
                icon: <Clock className="h-4 w-4" />,
              },
              {
                id: "reviews",
                label: `Avaliações (${reviews.length})`,
                icon: <Sparkles className="h-4 w-4" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer",
                  activeTab === tab.id
                    ? "bg-pink-500 text-white shadow-xs"
                    : "bg-white border border-pink-200 text-slate-700 hover:border-pink-300 hover:text-slate-900",
                )}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab 1: Full Rich Description */}
          {activeTab === "desc" && (
            <div className="p-6 sm:p-8 rounded-3xl border border-pink-100 bg-white space-y-6 text-slate-700 shadow-2xs animate-in fade-in duration-200">
              <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-900">
                  Sobre {product.name}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                  {product.description}
                </p>
              </div>

              {/* Highlights 3-column bento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-1.5">
                  <Sparkles className="h-5 w-5 text-pink-500" />
                  <h4 className="text-xs font-bold text-slate-800">
                    Acabamento Artesanal
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Cada peça passa por pós-processamento manual, remoção
                    minuciosa de suportes e inspeção de qualidade óptica.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-1.5">
                  <Leaf className="h-5 w-5 text-sky-600" />
                  <h4 className="text-xs font-bold text-slate-800">
                    Bio-Material Sustentável
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Produzido com polímeros derivados de amido de milho e
                    cana-de-açúcar. Não tóxico e seguro para toda a família.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-1.5">
                  <ShieldCheck className="h-5 w-5 text-amber-600" />
                  <h4 className="text-xs font-bold text-slate-800">
                    Estrutura Infill Otimizada
                  </h4>
                  <p className="text-[11px] text-slate-600">
                    Preenchimento interno giroidal inteligente que distribui
                    tensões mecânicas para máxima resistência e leveza.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Technical Specifications Table */}
          {activeTab === "specs" && (
            <div className="p-6 sm:p-8 rounded-3xl border border-pink-100 bg-white space-y-6 text-slate-700 shadow-2xs animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-slate-900">
                Ficha Técnica de Fabricação 3D
              </h3>

              <div className="overflow-hidden rounded-2xl border border-pink-100">
                <table className="w-full text-left text-xs border-collapse">
                  <tbody>
                    {product.origin && (
                      <tr className="border-b border-pink-100 bg-pink-50/50">
                        <td className="p-3.5 font-bold text-slate-700 w-1/3">
                          Origem / Envio
                        </td>
                        <td className="p-3.5 text-slate-800">
                          {product.origin}
                        </td>
                      </tr>
                    )}
                    <tr className="border-b border-pink-100 bg-pink-50/30">
                      <td className="p-3.5 font-bold text-slate-700 w-1/3">
                        Tecnologia de Manufatura
                      </td>
                      <td className="p-3.5 text-slate-800">
                        {MATERIAL_OPTIONS[0].technology}
                      </td>
                    </tr>
                    <tr className="border-b border-pink-100">
                      <td className="p-3.5 font-bold text-slate-700">
                        Material Selecionado
                      </td>
                      <td className="p-3.5 text-slate-800">
                        {MATERIAL_OPTIONS[0].name} ({MATERIAL_OPTIONS[0].badge})
                      </td>
                    </tr>
                    <tr className="border-b border-pink-100 bg-pink-50/30">
                      <td className="p-3.5 font-bold text-slate-700">
                        Altura de Camada (Resolução)
                      </td>
                      <td className="p-3.5 text-slate-800">
                        {product.technicalSpecs?.layerHeightMm || 0.16}mm
                        (Ultra-fino, linhas quase imperceptíveis)
                      </td>
                    </tr>
                    <tr className="border-b border-pink-100">
                      <td className="p-3.5 font-bold text-slate-700">
                        Preenchimento Interno (Infill)
                      </td>
                      <td className="p-3.5 text-slate-800">
                        {product.technicalSpecs?.infillPercent || 20}% Estrutura
                        Giroide Tridimensional
                      </td>
                    </tr>
                    <tr className="border-b border-pink-100 bg-pink-50/30">
                      <td className="p-3.5 font-bold text-slate-700">
                        Dimensões Físicas
                      </td>
                      <td className="p-3.5 text-slate-800">
                        {SIZE_OPTIONS[1].dimensions}
                      </td>
                    </tr>
                    <tr className="border-b border-pink-100">
                      <td className="p-3.5 font-bold text-slate-700">
                        Peso Líquido
                      </td>
                      <td className="p-3.5 text-slate-800">
                        {SIZE_OPTIONS[1].weightGrams} gramas
                      </td>
                    </tr>
                    <tr className="border-b border-pink-100 bg-pink-50/30">
                      <td className="p-3.5 font-bold text-slate-700">
                        Resistência Térmica Máxima
                      </td>
                      <td className="p-3.5 text-slate-800">
                        {MATERIAL_OPTIONS[0].id === "petg"
                          ? "75°C (Suporta sol moderado)"
                          : "55°C (Manter em ambiente interno)"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-bold text-slate-700">
                        Tolerância Dimensional
                      </td>
                      <td className="p-3.5 text-slate-800">
                        ± 0.1 mm calibrado em impressoras industriais
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Materials & Care */}
          {activeTab === "materials" && (
            <div className="p-6 sm:p-8 rounded-3xl border border-pink-100 bg-white space-y-6 text-slate-700 shadow-2xs animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-slate-900">
                Guia de Materiais & Cuidados com sua Peça 3D
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  As peças do <strong>Dengo 3D Lab</strong> são fabricadas com
                  polímeros termoplásticos de alta pureza. Para garantir que sua
                  peça dure anos com as cores vivas e textura impecável, siga
                  estas recomendações simples:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl border border-pink-100 bg-pink-50/30 space-y-2">
                    <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span>O que Fazer:</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                      <li>
                        Limpar com pano macio levemente umedecido em água ou
                        sabão neutro.
                      </li>
                      <li>
                        Guardar em local arejado, sobre estantes, mesas ou
                        nichos decorativos.
                      </li>
                      <li>
                        Aproveitar as articulações suaves para relaxamento
                        sensorial e fidget.
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl border border-rose-100 bg-rose-50/30 space-y-2">
                    <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                      <AlertTriangle className="h-4 w-4 text-rose-500" />
                      <span>O que Evitar:</span>
                    </h4>
                    <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                      <li>
                        Não expor a temperaturas acima de 55°C (ex: interior de
                        carros fechados no sol).
                      </li>
                      <li>
                        Não utilizar solventes químicos fortes, acetona ou
                        álcool isopropílico puro no PLA Silk.
                      </li>
                      <li>
                        Não levar à máquina de lavar louças ou forno
                        micro-ondas.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: 3D Production & Delivery Timelines */}
          {activeTab === "production" && (
            <div className="p-6 sm:p-8 rounded-3xl border border-pink-100 bg-white space-y-6 text-slate-700 shadow-2xs animate-in fade-in duration-200">
              <h3 className="text-lg font-black text-slate-900">
                Como Funciona a Produção no Dengo Lab
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  Diferente do varejo industrial massivo, a{" "}
                  <strong>Dengo 3D Lab</strong> combina impressão aditiva de
                  ponta com carinho artesanal maker. Cada modelo é fatiado
                  digitalmente e produzido com velocidade controlada para
                  garantir zero defeitos.
                </p>

                {/* Steps */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                  <div className="p-4 rounded-2xl border border-pink-100 bg-white text-center space-y-1.5">
                    <div className="h-8 w-8 rounded-full bg-pink-100 text-pink-600 font-black text-xs flex items-center justify-center mx-auto">
                      1
                    </div>
                    <h5 className="font-bold text-slate-800 text-xs">
                      Fatiamento Digital
                    </h5>
                    <p className="text-[10px] text-slate-500">
                      Configuração de parâmetros camada a camada no slicer
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-pink-100 bg-white text-center space-y-1.5">
                    <div className="h-8 w-8 rounded-full bg-pink-100 text-pink-600 font-black text-xs flex items-center justify-center mx-auto">
                      2
                    </div>
                    <h5 className="font-bold text-slate-800 text-xs">
                      Impressão 3D 8K
                    </h5>
                    <p className="text-[10px] text-slate-500">
                      Impressão a 300mm/s com calibração de fluxo ativa
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-pink-100 bg-white text-center space-y-1.5">
                    <div className="h-8 w-8 rounded-full bg-pink-100 text-pink-600 font-black text-xs flex items-center justify-center mx-auto">
                      3
                    </div>
                    <h5 className="font-bold text-slate-800 text-xs">
                      Controle de Qualidade
                    </h5>
                    <p className="text-[10px] text-slate-500">
                      Inspeção manual e pós-processamento cuidadoso
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl border border-pink-100 bg-white text-center space-y-1.5">
                    <div className="h-8 w-8 rounded-full bg-pink-100 text-pink-600 font-black text-xs flex items-center justify-center mx-auto">
                      4
                    </div>
                    <h5 className="font-bold text-slate-800 text-xs">
                      Embalagem Candy
                    </h5>
                    <p className="text-[10px] text-slate-500">
                      Caixa decorada com papel de seda, mimos e adesivos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Complete Customer Reviews Suite */}
          {activeTab === "reviews" && (
            <div className="animate-in fade-in duration-200">
              <ProductReviewsSection
                productId={product.id}
                productName={product.name}
                reviews={reviews}
                rating={product.rating ?? undefined}
                reviewCount={product.reviewCount ?? undefined}
              />
            </div>
          )}
        </div>

        {/* ========================================== */}
        {/* RELATED PRODUCTS SECTION                   */}
        {/* ========================================== */}
        <div className="pt-12 border-t border-pink-100 space-y-6 text-left">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                Quem viu este item também se apaixonou por:
              </h3>
              <p className="text-xs text-slate-600">
                Modelos 3D complementares da mesma categoria
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/produtos")}
              className="text-xs font-bold border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              Ver Todo o Catálogo
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* "Avise-me Quando Chegar" Dialog Modal */}
        <Dialog
          open={notifyModalOpen}
          onOpenChange={setNotifyModalOpen}
          title="Avise-me quando estiver em estoque"
          description={`Receba um e-mail imediato quando ${product.name} (${selectedVariant?.name || "Padrão"}) estiver disponível.`}
        >
          <form
            onSubmit={handleNotifySubmit}
            className="space-y-4 pt-2 text-left"
          >
            <div className="p-3 rounded-2xl bg-pink-50/60 border border-pink-100 flex items-center gap-3">
              <img
                src={product.featuredImage || product.images[0]}
                alt={product.name}
                className="h-12 w-12 rounded-xl object-cover border border-pink-200"
              />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">
                  {product.name}
                </span>
                <span className="text-slate-600 block">
                  Variação: {selectedVariant?.name || "Padrão"}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">
                Seu Melhor E-mail *
              </label>
              <input
                type="email"
                required
                placeholder="seu@email.com"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="w-full h-10 px-3 text-xs rounded-xl border border-pink-200 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-pink-100">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setNotifyModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="dengo"
                size="sm"
                className="font-bold"
              >
                Cadastrar Alerta
              </Button>
            </div>
          </form>
        </Dialog>
      </div>
    </StoreLayout>
  );
};

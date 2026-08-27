import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { ProductCard } from '@/src/components/business/ProductCard';
import { ProductGrid } from '@/src/components/business/ProductGrid';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { Rating } from '@/src/components/business/Rating';
import { mockProducts } from '@/src/mocks/products';
import { mockCategories } from '@/src/mocks/categories';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/hooks/useToast';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Heart,
  Truck,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight,
  Percent,
  Copy,
  Check,
  Boxes,
  Zap,
  Wand2,
  Smile,
  Leaf,
  Send,
  Star,
  Quote,
  Clock,
  Printer,
  Sparkle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { toast } = useToast();

  const [copiedCoupon, setCopiedCoupon] = React.useState(false);
  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);

  const featuredProducts = mockProducts.filter((p) => p.isFeatured).slice(0, 8);
  const bestSellers = mockProducts.filter((p) => p.isBestSeller).slice(0, 8);
  const newArrivals = mockProducts.filter((p) => p.isNew || p.createdAt >= '2026-03-01').slice(0, 8);
  const promoProducts = mockProducts.filter((p) => p.basePromotionalPrice && p.basePromotionalPrice < p.basePrice).slice(0, 8);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(true);
    toast.success('Cupom copiado! 🎁', `Código ${code} pronto para colar no carrinho.`);
    setTimeout(() => setCopiedCoupon(false), 3000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      toast.success('Bem-vindo ao Dengo Club! 💌', 'Você ganhou 10% OFF com o cupom DENGO10.');
    }
  };

  return (
    <StoreLayout>
      <div className="space-y-16 sm:space-y-24">
        {/* ==========================================
            1. HERO SECTION PREMIUM
           ========================================== */}
        <section className="relative overflow-hidden rounded-3xl sm:rounded-[36px] border border-pink-200/90 dark:border-pink-900/50 bg-gradient-to-br from-pink-100/90 via-pink-50/40 to-sky-100/80 dark:from-pink-950/40 dark:via-card dark:to-sky-950/40 p-6 sm:p-12 lg:p-16 shadow-sm">
          {/* Subtle Background Glow Circles */}
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-pink-300/30 dark:bg-pink-600/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-sky-300/30 dark:bg-sky-600/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight leading-[1.12]">
                O Estúdio de Impressão 3D{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-sky-500">
                  Mais Fofo do Brasil!
                </span>
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
                Colecionáveis articulados com toque aveludado Silk, suportes para seu setup gamer, vasos geométricos espirais e cortadores em PLA atóxico feitos com carinho artesanal.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button
                  variant="dengo"
                  size="lg"
                  onClick={() => navigate('/produtos')}
                  className="font-bold text-sm gap-2 h-12 px-6 shadow-lg shadow-pink-500/20 hover:scale-105 transition-all cursor-pointer"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Explorar Produtos</span>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/produtos', { sort: 'newest' })}
                  className="h-12 px-6 text-sm gap-2 border-pink-200 dark:border-pink-900/60 font-bold bg-white/70 dark:bg-card/70 hover:bg-pink-50 transition-all cursor-pointer"
                >
                  <Flame className="h-4 w-4 text-rose-500" />
                  <span>Ver Novidades</span>
                </Button>
              </div>

              {/* Trust Badges Bar */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-pink-200/60 dark:border-pink-900/40 text-xs font-semibold text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 rounded-full bg-pink-100 dark:bg-pink-950/60 items-center justify-center text-pink-600">
                    <Leaf className="h-3.5 w-3.5" />
                  </div>
                  <span>PLA Biodegradável</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 rounded-full bg-sky-100 dark:bg-sky-950/60 items-center justify-center text-sky-600">
                    <Truck className="h-3.5 w-3.5" />
                  </div>
                  <span>Envio p/ Todo Brasil</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <div className="flex h-6 w-6 rounded-full bg-rose-100 dark:bg-rose-950/60 items-center justify-center text-rose-600">
                    <Heart className="h-3.5 w-3.5" />
                  </div>
                  <span>+3.000 Makers Felizes</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <button 
                onClick={() => navigate('/')}
                className="relative w-full max-w-sm aspect-square rounded-full overflow-hidden shadow-2xl bg-white/20 p-4 border-4 border-white/50 backdrop-blur-sm group cursor-pointer transition-all hover:shadow-pink-500/20 hover:border-white focus:outline-none focus:ring-4 focus:ring-white/80"
                aria-label="Ir para o início"
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  <img src="/logo.jpg" alt="Dengo 3D Logo" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                </div>
              </button>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. CATEGORIAS EM DESTAQUE
           ========================================== */}
        <section className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider mb-1">
                <Layers className="h-3.5 w-3.5" />
                <span>Navegue por Universo</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                Categorias do Estúdio
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/categorias')}
              className="text-xs font-bold text-pink-600 dark:text-pink-400 gap-1 hover:bg-pink-50 dark:hover:bg-pink-950/40 self-start sm:self-auto"
            >
              <span>Ver todas as {mockCategories.length} categorias</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {mockCategories.slice(0, 6).map((cat) => (
              <div
                key={cat.id}
                onClick={() => navigate(`/categorias/${cat.slug}`, { categorySlug: cat.slug })}
                className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-pink-200/80 dark:border-pink-900/40 bg-card p-3 sm:p-4 text-center transition-all duration-300 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/10 hover:-translate-y-1 cursor-pointer select-none"
              >
                <div className="aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-pink-50 dark:bg-muted/40 mb-3 border border-pink-100 dark:border-border">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-bold text-xs text-foreground line-clamp-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                  {cat.productCount} produtos
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ==========================================
            3. PRODUTOS EM DESTAQUE
           ========================================== */}
        <section className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Curadoria Dengo Lab</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                Produtos em Destaque
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/produtos', { sort: 'featured' })}
              className="text-xs font-bold gap-1 border-pink-200 dark:border-pink-900/60 self-start sm:self-auto"
            >
              <span>Ver catálogo completo</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <ProductGrid products={featuredProducts} columns={4} />
        </section>

        {/* ==========================================
            4. BANNER DE CUPOM PROMOCIONAL
           ========================================== */}
        <section className="relative overflow-hidden rounded-3xl border border-pink-300 dark:border-pink-800 bg-gradient-to-r from-pink-500 via-rose-500 to-sky-500 p-6 sm:p-10 text-white shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2 text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-xs">
                <Percent className="h-3.5 w-3.5" />
                <span>Desconto Exclusivo de Boas-Vindas</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Ganhe 10% OFF na Sua Primeira Compra!
              </h3>
              <p className="text-xs sm:text-sm text-white/90 max-w-xl">
                Use o cupom <strong className="underline">DENGO10</strong> em qualquer modelo articulado, filamento Silk Candy ou item de decoração no carrinho.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => handleCopyCoupon('DENGO10')}
                className="w-full sm:w-auto md:w-full flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-white text-pink-600 hover:bg-pink-50 font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-102 cursor-pointer"
              >
                {copiedCoupon ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-600" />
                    <span>CUPOM COPIADO!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>COPIAR: DENGO10</span>
                  </>
                )}
              </button>
              <span className="text-[10px] text-white/80 font-medium">Válido para todo o site</span>
            </div>
          </div>
        </section>

        {/* ==========================================
            5. MAIS VENDIDOS
           ========================================== */}
        <section className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1">
                <Flame className="h-3.5 w-3.5 fill-current" />
                <span>Mais Amados pela Comunidade</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                Os Mais Vendidos
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/produtos', { sort: 'bestseller' })}
              className="text-xs font-bold gap-1 border-pink-200 dark:border-pink-900/60 self-start sm:self-auto"
            >
              <span>Ver ranking</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <ProductGrid products={bestSellers} columns={4} />
        </section>

        {/* ==========================================
            6. PROCESSO DE FABRICAÇÃO 3D (INTERATIVO)
           ========================================== */}
        <section className="rounded-3xl sm:rounded-[36px] border border-pink-200/80 dark:border-pink-900/50 bg-gradient-to-b from-card to-pink-50/30 dark:to-pink-950/20 p-6 sm:p-12 text-left space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="babyPink" className="font-bold text-xs uppercase tracking-wider">
              Como Fazemos a Mágica Acontecer ✨
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground">
              Do Modelo Digital ao Acabamento com Carinho
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Cada peça que sai da nossa fazenda de impressoras 3D passa por 4 etapas rigorosas de qualidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-3 shadow-2xs hover:border-pink-300 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-100 dark:bg-pink-950/70 text-pink-600 font-black text-base">
                1
              </div>
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <Cpu className="h-4 w-4 text-pink-500" />
                <span>Modelagem & Curadoria</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Designers especializados criam e refinam malhas 3D para garantir articulações livres e suportes imperceptíveis.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-3 shadow-2xs hover:border-pink-300 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 dark:bg-sky-950/70 text-sky-600 font-black text-base">
                2
              </div>
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <Layers className="h-4 w-4 text-sky-500" />
                <span>Fatiamento de Alta Resolução</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Camadas ultra finas (0.12mm a 0.05mm) que eliminam degraus visíveis e produzem acabamento acetinado.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-3 shadow-2xs hover:border-pink-300 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950/70 text-purple-600 font-black text-base">
                3
              </div>
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <Printer className="h-4 w-4 text-purple-500" />
                <span>Impressão FDM & Resina 8K</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Produção automatizada com filamentos Silk Candy virgens e resina fotopolímero de altíssima resistência mecânica.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl border border-pink-200/60 dark:border-pink-900/40 bg-card space-y-3 shadow-2xs hover:border-pink-300 transition-colors">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 font-black text-base">
                4
              </div>
              <h3 className="font-bold text-sm text-foreground flex items-center gap-1.5">
                <Heart className="h-4 w-4 text-rose-500" />
                <span>Pós-Processo & Embalagem</span>
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Polimento manual suave, inspeção visual minuciosa e embalagem anti-impacto com mimos e cheirinho de chiclete.
              </p>
            </div>
          </div>
        </section>

        {/* ==========================================
            7. NOVIDADES RECÉM-SAÍDAS DA MESA
           ========================================== */}
        <section className="space-y-6 text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wider mb-1">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Recém-Saídos da Mesa de Impressão</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                Últimos Lançamentos
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/produtos', { sort: 'newest' })}
              className="text-xs font-bold gap-1 border-pink-200 dark:border-pink-900/60 self-start sm:self-auto"
            >
              <span>Ver todas novidades</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <ProductGrid products={newArrivals} columns={4} />
        </section>

        {/* ==========================================
            8. DIFERENCIAIS E BENEFÍCIOS
           ========================================== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="p-6 rounded-3xl border border-pink-200/70 dark:border-pink-900/40 bg-card space-y-2 shadow-2xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
              <Leaf className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-foreground">100% PLA Biodegradável</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Origem vegetal a partir de amido de milho renovável, seguro para pets e crianças.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-pink-200/70 dark:border-pink-900/40 bg-card space-y-2 shadow-2xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
              <Truck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-foreground">Frete Cuidadoso</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Embalagem reforçada em multicamadas com plástico bolha e seguro contra avarias.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-pink-200/70 dark:border-pink-900/40 bg-card space-y-2 shadow-2xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
              <Wand2 className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-foreground">Customização sob Medida</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Envie seu STL ou escolha variações exclusivas de cor Candy para seu projeto.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-pink-200/70 dark:border-pink-900/40 bg-card space-y-2 shadow-2xs">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-foreground">Garantia Dengo</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Qualquer imperfeição de impressão é substituída sem burocracia pelo nosso suporte.
            </p>
          </div>
        </section>

        {/* ==========================================
            9. AVALIAÇÕES REAIS DE CLIENTES MAKERS
           ========================================== */}
        <section className="space-y-6 text-left">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="babyBlue" className="font-bold text-xs uppercase tracking-wider">
              Comunidade Maker Apaixonada
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Quem Compra, Ama o Dengo!
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Mais de 2.500 avaliações com nota média 4.9 de 5.0 estrelas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Review 1 */}
            <div className="p-6 rounded-3xl border border-pink-200/80 dark:border-pink-900/40 bg-card space-y-4 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Rating value={5} size="sm" showValue={false} />
                  <span className="text-[11px] text-muted-foreground font-medium">Compra Verificada</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed italic">
                  "O Dragão Cristalino e a Lontrinha são inacreditáveis! A articulação é super suave e a cor Candy Sunset tem um brilho acetinado que parece joia. Chegou em 3 dias com cheirinho de chiclete!"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-pink-100 dark:border-border/60">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Mariana Costa"
                  className="h-9 w-9 rounded-full object-cover border border-pink-200"
                />
                <div>
                  <h3 className="font-bold text-xs text-foreground">Mariana Costa</h3>
                  <p className="text-[10px] text-muted-foreground">São Paulo, SP • Dragão Silk Imperial</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="p-6 rounded-3xl border border-pink-200/80 dark:border-pink-900/40 bg-card space-y-4 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Rating value={5} size="sm" showValue={false} />
                  <span className="text-[11px] text-muted-foreground font-medium">Compra Verificada</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed italic">
                  "Comprei o suporte de headset do astronauta para meu setup e o acabamento é perfeito, sem nenhuma linha aparente. É pesado e não tomba de jeito nenhum. Nota 10!"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-pink-100 dark:border-border/60">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Lucas Ferreira"
                  className="h-9 w-9 rounded-full object-cover border border-sky-200"
                />
                <div>
                  <h3 className="font-bold text-xs text-foreground">Lucas Ferreira</h3>
                  <p className="text-[10px] text-muted-foreground">Curitiba, PR • Suporte Headset Astronauta</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="p-6 rounded-3xl border border-pink-200/80 dark:border-pink-900/40 bg-card space-y-4 shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Rating value={5} size="sm" showValue={false} />
                  <span className="text-[11px] text-muted-foreground font-medium">Compra Verificada</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed italic">
                  "Os filamentos PLA Rosa Bebê e Lavanda da Dengo são os melhores do mercado. Zero entupimento na minha Bambu Lab e adesão fantástica. Já sou cliente fiel!"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-pink-100 dark:border-border/60">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                  alt="Camila Rocha"
                  className="h-9 w-9 rounded-full object-cover border border-purple-200"
                />
                <div>
                  <h3 className="font-bold text-xs text-foreground">Camila Rocha</h3>
                  <p className="text-[10px] text-muted-foreground">Belo Horizonte, MG • Filamentos Candy 1kg</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            10. NEWSLETTER DENGO CLUB
           ========================================== */}
        <section className="rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-gradient-to-tr from-pink-100/60 via-pink-50/40 to-sky-100/60 dark:from-pink-950/30 dark:via-card dark:to-sky-950/30 p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white dark:bg-card shadow-xs text-pink-500 mx-auto">
              <Send className="h-6 w-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground">
              Junte-se ao Dengo Club
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Receba em primeira mão novidades de arquivos 3D, cupons secretos e lançamentos de cores Silk limitadas.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
              <Check className="h-4 w-4" />
              <span>Inscrição confirmada! Use o cupom DENGO10 para 10% OFF.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
              <Input
                type="email"
                placeholder="Seu melhor e-mail..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="h-11 rounded-2xl border-pink-200 text-xs bg-white dark:bg-card"
              />
              <Button
                type="submit"
                variant="dengo"
                className="h-11 px-6 text-xs font-bold shrink-0 rounded-2xl shadow-xs"
              >
                Quero Participar
              </Button>
            </form>
          )}
        </section>
      </div>
    </StoreLayout>
  );
};

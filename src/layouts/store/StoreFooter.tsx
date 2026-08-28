import * as React from "react";
import { DengoLogo } from "@/src/components/brand/DengoLogo";
import { Button } from "@/src/components/ui/Button";
import { useNavigationStore } from "@/src/stores/navigationStore";
import { useToast } from "@/src/components/ui/Toast";
import {
  Send,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  CreditCard,
  QrCode,
  Instagram,
  Youtube,
  MessageCircle,
  HelpCircle,
  Clock,
} from "lucide-react";
import { siteConfig } from "@/src/config/site";

export const StoreFooter: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      toast.error("Por favor, informe um e-mail válido.");
      return;
    }

    setIsSubscribed(true);
    toast.success(
      "Oba! Você ganhou 15% OFF com o cupom CANDY15 no seu primeiro pedido!",
    );
    setNewsletterEmail("");
  };

  return (
    <footer className="w-full border-t border-pink-200/60 dark:border-pink-900/40 bg-card text-foreground transition-colors mt-auto">
      {/* Value Proposition Strip (Candy Style) */}
      <div className="border-b border-pink-100 dark:border-pink-950/60 bg-linear-to-r from-pink-50/70 via-background to-sky-50/70 dark:from-pink-950/20 dark:via-card dark:to-sky-950/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-500 text-white shadow-sm">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Envio Seguro & Rastreável
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Embalagem protetora anti-impacto
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-sm">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Filamentos Premium
              </h4>
              <p className="text-[11px] text-muted-foreground">
                PLA Silk atóxico & alta precisão
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-pink-500 text-white shadow-sm">
              <RotateCcw className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Garantia Dengo Lab
              </h4>
              <p className="text-[11px] text-muted-foreground">
                7 dias para trocas e devoluções
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-sm">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">
                Pagamento Protegido
              </h4>
              <p className="text-[11px] text-muted-foreground">
                Pix instantâneo ou até 12x no cartão
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand & Mission Column */}
          <div className="col-span-2 space-y-4">
            <DengoLogo size="md" variant="full" />
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              O estúdio maker mais fofo do Brasil! Criamos peças colecionáveis
              articuladas, cortadores culinários em PLA atóxico e filamentos
              Candy Color com carinho e acabamento premium.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-pink-500 text-white hover:bg-pink-600 shadow-sm transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-sky-500 text-white hover:bg-sky-600 shadow-sm transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* 1. Empresa */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
              Empresa
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <button
                  onClick={() => navigate("/sobre")}
                  className="hover:text-pink-500 transition-colors text-left"
                >
                  Sobre Nós
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contato")}
                  className="hover:text-pink-500 transition-colors text-left"
                >
                  Fale Conosco
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/produtos")}
                  className="hover:text-pink-500 transition-colors text-left"
                >
                  Estúdio Maker
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/admin")}
                  className="hover:text-purple-500 transition-colors text-left font-semibold text-purple-600 dark:text-purple-400"
                >
                  Acesso Admin
                </button>
              </li>
            </ul>
          </div>

          {/* 2. Produtos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Produtos
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <button
                  onClick={() =>
                    navigate("/categorias/colecionaveis-articulados")
                  }
                  className="hover:text-sky-500 transition-colors text-left"
                >
                  Colecionáveis
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/categorias/filamentos-3d")}
                  className="hover:text-sky-500 transition-colors text-left"
                >
                  Filamentos Candy
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/categorias/cortadores-confeitaria")}
                  className="hover:text-sky-500 transition-colors text-left"
                >
                  Cortadores Culinários
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/categorias/decoracao-vasinhos")}
                  className="hover:text-sky-500 transition-colors text-left"
                >
                  Vasinhos Decorativos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/ofertas")}
                  className="hover:text-rose-500 transition-colors text-left text-rose-500 font-bold"
                >
                  Ofertas da Semana
                </button>
              </li>
            </ul>
          </div>

          {/* 3. Suporte & Ajuda */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pink-600 dark:text-pink-400">
              Suporte
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <button
                  onClick={() => navigate("/faq")}
                  className="hover:text-pink-500 transition-colors text-left"
                >
                  FAQ & Dúvidas
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/frete")}
                  className="hover:text-pink-500 transition-colors text-left"
                >
                  Frete & Prazos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/trocas")}
                  className="hover:text-pink-500 transition-colors text-left"
                >
                  Trocas & Devoluções
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/contato")}
                  className="hover:text-pink-500 transition-colors text-left"
                >
                  Atendimento WhatsApp
                </button>
              </li>
            </ul>
          </div>

          {/* 4. Conta & Políticas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Políticas & Conta
            </h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <button
                  onClick={() => navigate("/minha-conta")}
                  className="hover:text-sky-500 transition-colors text-left"
                >
                  Minha Conta
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/minha-conta/pedidos")}
                  className="hover:text-sky-500 transition-colors text-left"
                >
                  Meus Pedidos
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/termos")}
                  className="hover:text-sky-500 transition-colors text-left"
                >
                  Termos de Uso
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/privacidade")}
                  className="hover:text-sky-500 transition-colors text-left"
                >
                  Privacidade
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-linear-to-r from-pink-50/80 via-white to-sky-50/80 dark:from-pink-950/30 dark:via-card dark:to-sky-950/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <h4 className="text-sm sm:text-base font-bold text-foreground">
                Clube VIP Dengo 3D Lab
              </h4>
            </div>
            <p className="text-xs text-muted-foreground">
              Cadastre seu e-mail e receba 15% OFF de boas-vindas, lançamentos
              de arquivos 3D e novidades Candy Color!
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-2"
          >
            <input
              type="email"
              placeholder="Seu melhor e-mail..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full sm:w-72 h-10 px-4 text-xs rounded-2xl border border-pink-200 dark:border-pink-900 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-pink-400/20"
            />
            <Button
              type="submit"
              variant="dengo"
              size="lg"
              className="w-full sm:w-auto font-bold gap-1.5 shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Quero 15% OFF</span>
            </Button>
          </form>
        </div>

        {/* Bottom Bar with Copyright, Payments and Security */}
        <div className="pt-8 mt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>
              © {new Date().getFullYear()} {siteConfig.brandName}. Todos os
              direitos reservados.
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Feito com{" "}
              <Heart className="h-3 w-3 text-pink-500 fill-current inline" />{" "}
              para apaixonados por 3D
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <QrCode className="h-3.5 w-3.5 text-pink-500" />
              <span>Pix</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-foreground">
              <CreditCard className="h-3.5 w-3.5 text-sky-500" />
              <span>Cartão de Crédito</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>SSL Seguro</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

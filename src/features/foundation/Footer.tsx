import * as React from 'react';
import { Heart, Sparkles, Instagram, Send, MapPin, Mail, Phone } from 'lucide-react';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { siteConfig } from '@/src/config/site';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-pink-200/60 dark:border-pink-900/40 bg-gradient-to-b from-card/60 to-pink-50/40 dark:to-card/90 text-muted-foreground text-xs py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 text-center md:text-left">
          {/* Brand Presentation */}
          <div className="space-y-3 max-w-sm">
            <DengoLogo size="md" variant="full" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              O estúdio mais fofo do Brasil em manufatura aditiva! Colecionáveis articulados, filamentos candy colors (rosa bebê e azul céu), cortadores e projetos sob medida.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-pink-600 dark:text-pink-400 bg-pink-100/70 dark:bg-pink-950/60 px-2.5 py-1 rounded-full border border-pink-200 dark:border-pink-800">
                <Heart className="h-3 w-3 fill-current" />
                <span>Feito com Carinho Maker</span>
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-600 dark:text-sky-400 bg-sky-100/70 dark:bg-sky-950/60 px-2.5 py-1 rounded-full border border-sky-200 dark:border-sky-800">
                <Sparkles className="h-3 w-3" />
                <span>PLA Biodegradável</span>
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 gap-8 text-left">
            <div>
              <h4 className="font-bold text-foreground mb-2 text-xs uppercase tracking-wider">Categorias</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="hover:text-pink-500 cursor-pointer">Lontrinhas & Articulados</li>
                <li className="hover:text-pink-500 cursor-pointer">Filamentos Rosa & Azul Bebê</li>
                <li className="hover:text-pink-500 cursor-pointer">Cortadores de Biscoito</li>
                <li className="hover:text-pink-500 cursor-pointer">Vasinhos Bob & Decoração</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-2 text-xs uppercase tracking-wider">Atendimento & Dengo</h4>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-1.5">
                  <Mail className="h-3 w-3 text-pink-500" />
                  <span>{siteConfig.contact.email}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Phone className="h-3 w-3 text-sky-500" />
                  <span>{siteConfig.contact.phone}</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3 text-rose-500" />
                  <span>{siteConfig.contact.address}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-pink-200/50 dark:border-pink-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.brandName} ({siteConfig.name}). Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
            <span>Paleta Oficial Rosa & Azul Bebê</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Tailwind</span>
            <span>•</span>
            <span>Zustand & Zod</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

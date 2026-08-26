import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Textarea } from '@/src/components/ui/Textarea';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/components/ui/Toast';
import { Mail, MessageCircle, Clock, MapPin, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Mensagem enviada!', 'Nossa equipe de suporte maker responderá em até 24 horas.');
    }, 600);
  };

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Fale Conosco', isCurrent: true },
  ];

  return (
    <StoreLayout>
      <div className="max-w-4xl mx-auto space-y-8 text-left">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">Fale com o Dengo 3D Lab</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Dúvidas sobre encomendas personalizadas, fatiamento de arquivos ou status do seu pedido? Estamos aqui!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 p-6 sm:p-8 rounded-3xl border border-pink-200/80 dark:border-pink-900/50 bg-card space-y-4 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input label="Seu Nome" placeholder="Como podemos te chamar?" required />
              <Input label="Seu E-mail" type="email" placeholder="seu@email.com" required />
              <Input label="Número do Pedido (Opcional)" placeholder="Ex: #DENGO-8942" />
              <Textarea label="Mensagem" placeholder="Conte-nos como podemos te ajudar..." rows={4} required />
              <Button type="submit" variant="dengo" size="lg" isLoading={isSubmitting} className="w-full font-bold gap-2">
                <Send className="h-4 w-4" />
                <span>Enviar Mensagem</span>
              </Button>
            </form>
          </div>

          <div className="md:col-span-5 space-y-4">
            <div className="p-5 rounded-3xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                <MessageCircle className="h-4 w-4" />
                <span>Atendimento Rápido via WhatsApp</span>
              </div>
              <p className="text-xs text-muted-foreground">
                (11) 98765-4321 • Seg a Sex das 09h às 18h
              </p>
            </div>

            <div className="p-5 rounded-3xl border border-pink-100 dark:border-pink-950 bg-card space-y-2">
              <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400 font-bold text-xs">
                <Mail className="h-4 w-4" />
                <span>E-mail Oficial</span>
              </div>
              <p className="text-xs text-muted-foreground">
                contato@dengo3dlab.com.br
              </p>
            </div>

            <div className="p-5 rounded-3xl border border-sky-100 dark:border-sky-950 bg-card space-y-2">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 font-bold text-xs">
                <Clock className="h-4 w-4" />
                <span>Prazo de Resposta</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Respondemos em média em menos de 2 horas úteis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

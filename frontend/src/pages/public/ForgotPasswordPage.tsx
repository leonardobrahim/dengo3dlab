import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/components/ui/Toast';
import { ArrowLeft, Send } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'O e-mail é obrigatório').email('Insira um e-mail válido'),
});
type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPasswordPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  const [isSent, setIsSent] = React.useState(false);
  const [sentEmail, setSentEmail] = React.useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    // mock api call
    await new Promise((r) => setTimeout(r, 600));
    setSentEmail(data.email);
    setIsSent(true);
    toast.success('Link de recuperação enviado!', 'Verifique sua caixa de entrada e spam.');
  };

  return (
    <StoreLayout>
      <div className="max-w-md mx-auto py-8">
        <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 space-y-6 shadow-xs text-left">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <DengoLogo size="md" variant="icon" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Recuperar Senha</h1>
            <p className="text-xs text-slate-600">
              Informe seu e-mail cadastrado para redefinir o acesso à sua conta
            </p>
          </div>

          {isSent ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <p className="text-xs font-bold text-emerald-800">
                E-mail enviado com instruções para {sentEmail}!
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
                className="text-xs font-bold w-full border-emerald-200 text-emerald-700 hover:bg-emerald-100"
              >
                Voltar para o Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Seu E-mail Cadastrado"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                error={errors.email?.message}
              />

              <Button
                type="submit"
                variant="dengo"
                size="lg"
                isLoading={isSubmitting}
                className="w-full font-bold text-xs sm:text-sm gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Enviar Link de Recuperação</span>
              </Button>
            </form>
          )}

          <div className="text-center pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Voltar ao login</span>
            </button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

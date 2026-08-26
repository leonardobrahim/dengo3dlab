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
import { CheckCircle2 } from 'lucide-react';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'A senha deve conter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
    confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export const ResetPasswordPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordData) => {
    // mock api call
    await new Promise((r) => setTimeout(r, 600));
    setIsSuccess(true);
    toast.success('Senha alterada!', 'Você já pode acessar sua conta.');
  };

  return (
    <StoreLayout>
      <div className="max-w-md mx-auto py-8">
        <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 space-y-6 shadow-xs text-left">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <DengoLogo size="md" variant="icon" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Nova Senha</h1>
            <p className="text-xs text-slate-600">Crie uma nova senha segura para sua conta</p>
          </div>

          {isSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="flex justify-center">
                <CheckCircle2 className="h-8 w-8 text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-emerald-800">
                Sua senha foi redefinida com sucesso!
              </p>
              <Button
                onClick={() => navigate('/login')}
                className="w-full text-xs font-bold mt-2 border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                variant="outline"
              >
                Fazer Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Nova Senha"
                type="password"
                placeholder="Mínimo 8 caracteres com número e maiúscula"
                {...register('password')}
                error={errors.password?.message}
              />
              <Input
                label="Confirmar Nova Senha"
                type="password"
                placeholder="Digite a senha novamente"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />

              <Button
                type="submit"
                variant="dengo"
                size="lg"
                isLoading={isSubmitting}
                className="w-full font-bold text-xs sm:text-sm gap-2"
              >
                Redefinir Minha Senha
              </Button>
            </form>
          )}
        </div>
      </div>
    </StoreLayout>
  );
};

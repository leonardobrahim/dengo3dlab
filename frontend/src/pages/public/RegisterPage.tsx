import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { DengoLogo } from '@/src/components/brand/DengoLogo';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { useAuthStore } from '@/src/stores/authStore';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/components/ui/Toast';
import { Sparkles, ArrowRight } from 'lucide-react';
import { registerSchema, RegisterFormData } from '@/src/schemas';

export const RegisterPage: React.FC = () => {
  const { register: authRegister } = useAuthStore();
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      termsAccepted: true,
    }
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    const success = await authRegister(data);
    setIsLoading(false);

    if (success) {
      toast.success('Conta criada com sucesso! 💖', 'Bem-vindo ao Dengo 3D Lab!');
      navigate('/minha-conta');
    } else {
      toast.error('Erro no cadastro', 'Verifique os dados informados.');
    }
  };

  return (
    <StoreLayout>
      <div className="max-w-md mx-auto py-8">
        <div className="rounded-3xl border border-pink-100 bg-white p-6 sm:p-8 space-y-6 shadow-xs text-left">
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <DengoLogo size="md" variant="icon" />
            </div>
            <h1 className="text-2xl font-black text-slate-900">Criar Minha Conta</h1>
            <p className="text-xs text-slate-600">
              Cadastre-se e ganhe cupom de boas-vindas para seus pedidos
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Nome Completo"
              placeholder="Ex: Beatriz Lima"
              {...register('name')}
              error={errors.name?.message}
            />

            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="WhatsApp / Celular"
              placeholder="(11) 99999-9999"
              {...register('phone')}
              error={errors.phone?.message}
            />

            <Input
              label="CPF para Nota Fiscal"
              placeholder="123.456.789-00"
              {...register('cpf')}
              error={errors.cpf?.message}
            />

            <Input
              label="Senha"
              type="password"
              placeholder="Mínimo 8 caracteres com número e maiúscula"
              {...register('password')}
              error={errors.password?.message}
            />

            <Input
              label="Confirmar Senha"
              type="password"
              placeholder="Digite a senha novamente"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              variant="dengo"
              size="lg"
              isLoading={isLoading}
              className="w-full font-bold text-xs sm:text-sm gap-2 mt-2"
            >
              <Sparkles className="h-4 w-4" />
              <span>Concluir Cadastro</span>
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-slate-100 space-y-2">
            <p className="text-xs text-slate-600">Já possui uma conta?</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/login')}
              className="w-full text-xs font-bold border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              Fazer Login
            </Button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

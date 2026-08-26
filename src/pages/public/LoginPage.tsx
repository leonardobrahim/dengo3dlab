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
import { Lock, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { loginSchema, LoginFormData } from '@/src/schemas';

export const LoginPage: React.FC = () => {
  const { login } = useAuthStore();
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'cliente@example.com',
      password: 'dengo123',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    const success = await login(data);
    setIsLoading(false);

    if (success) {
      toast.success('Bem-vindo(a) de volta!', 'Login realizado com sucesso.');
      const user = useAuthStore.getState().user;
      if (user && ['admin', 'superadmin', 'production', 'stock', 'support'].includes(user.role)) {
        navigate('/admin');
      } else {
        navigate('/minha-conta');
      }
    } else {
      toast.error('Falha no login', 'Verifique seu e-mail e senha.');
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
            <h1 className="text-2xl font-black text-slate-900">Entrar na Dengo 3D</h1>
            <p className="text-xs text-slate-600">
              Acesse sua conta para acompanhar pedidos e favoritos
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Input
                label="E-mail"
                type="email"
                placeholder="seu@email.com"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">Senha</label>
                <button
                  type="button"
                  onClick={() => navigate('/recuperar-senha')}
                  className="text-[11px] text-pink-600 hover:underline cursor-pointer"
                >
                  Esqueceu a senha?
                </button>
              </div>
              <Input
                type="password"
                placeholder="Sua senha secreta"
                {...register('password')}
                error={errors.password?.message}
              />
            </div>

            <Button
              type="submit"
              variant="dengo"
              size="lg"
              isLoading={isLoading}
              className="w-full font-bold text-xs sm:text-sm gap-2 mt-2"
            >
              <span>Acessar Minha Conta</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            {/* Helper block for demo */}
            <div className="p-3 mt-4 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-slate-600 space-y-1">
              <p className="font-bold text-slate-800">Mock Accounts:</p>
              <ul className="list-disc list-inside">
                <li>cliente@example.com</li>
                <li>admin@example.com</li>
                <li>production@example.com</li>
              </ul>
              <p>Senha para todos: dengo123</p>
            </div>
          </form>

          {/* Switch to register */}
          <div className="text-center pt-4 border-t border-slate-100 space-y-2">
            <p className="text-xs text-slate-600">
              Ainda não tem uma conta no Dengo Lab?
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/cadastro')}
              className="w-full text-xs font-bold border-pink-200 text-pink-700 hover:bg-pink-50"
            >
              Criar Conta Grátis
            </Button>
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

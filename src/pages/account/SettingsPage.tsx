import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountLayout } from '@/src/layouts/account/AccountLayout';
import { Button } from '@/src/components/ui/Button';
import { Switch } from '@/src/components/ui/Switch';
import { Input } from '@/src/components/ui/Input';
import { Dialog } from '@/src/components/ui/Dialog';
import { useToast } from '@/src/components/ui/Toast';
import { Bell, Lock, Shield } from 'lucide-react';
import { useUIStore } from '@/src/stores/uiStore';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: z.string().min(8, 'A nova senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string().min(1, 'Confirmação é obrigatória')
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword']
});

type PasswordData = z.infer<typeof passwordSchema>;

export const SettingsPage: React.FC = () => {
  const { toast } = useToast();
  
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [whatsappUpdates, setWhatsappUpdates] = React.useState(true);
  const [marketingEmails, setMarketingEmails] = React.useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = React.useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema)
  });

  const handleSavePreferences = () => {
    toast.success('Preferências de segurança e notificações salvas!');
  };

  const onChangePassword = (data: PasswordData) => {
    toast.success('Senha alterada com sucesso!');
    setIsPasswordModalOpen(false);
    reset();
  };

  return (
    <AccountLayout currentPageTitle="Configurações da Conta" currentPageBreadcrumb="Configurações">
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Configurações & Notificações</h1>
          <p className="text-xs text-slate-600">
            Gerencie avisos de status de impressão, comunicações e segurança
          </p>
        </div>

        {/* Notifications */}
        <div className="p-6 sm:p-8 rounded-3xl border border-pink-100 bg-white space-y-6 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-bold text-sm text-slate-900">
            <Bell className="h-4 w-4 text-pink-500" />
            <span>Notificações & Avisos</span>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900">Avisos de Fatiamento e Envio por E-mail</p>
                <p className="text-[11px] text-slate-500">Receba alertas em cada etapa do seu pedido 3D</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900">Notificações no WhatsApp</p>
                <p className="text-[11px] text-slate-500">Rastreio em tempo real com links diretos</p>
              </div>
              <Switch checked={whatsappUpdates} onCheckedChange={setWhatsappUpdates} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-slate-900">Novidades & Cupons Candy</p>
                <p className="text-[11px] text-slate-500">Promoções de lançamentos e novos filamentos</p>
              </div>
              <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
            </div>
          </div>
        </div>

        {/* Security / Password */}
        <div className="p-6 sm:p-8 rounded-3xl border border-pink-100 bg-white space-y-4 shadow-xs">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 font-bold text-sm text-slate-900">
            <Lock className="h-4 w-4 text-pink-500" />
            <span>Segurança da Conta</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-slate-900">Alterar Senha de Acesso</p>
              <p className="text-[11px] text-slate-500">Última alteração há 2 meses</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPasswordModalOpen(true)}
              className="text-xs font-semibold"
            >
              Trocar Senha
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="dengo" size="md" onClick={handleSavePreferences} className="font-bold">
            Salvar Configurações
          </Button>
        </div>
      </div>

      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen} title="Trocar Senha" description="Sua nova senha precisa ter pelo menos 8 caracteres.">
        <form onSubmit={handleSubmit(onChangePassword)} className="space-y-4 mt-2">
          <Input type="password" label="Senha Atual" {...register('currentPassword')} error={errors.currentPassword?.message} />
          <Input type="password" label="Nova Senha" {...register('newPassword')} error={errors.newPassword?.message} />
          <Input type="password" label="Confirmar Nova Senha" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
          <div className="pt-2 flex justify-end gap-2">
             <Button type="button" variant="outline" onClick={() => setIsPasswordModalOpen(false)}>Cancelar</Button>
             <Button type="submit" variant="dengo">Atualizar Senha</Button>
          </div>
        </form>
      </Dialog>
    </AccountLayout>
  );
};

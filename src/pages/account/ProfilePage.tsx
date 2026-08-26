import * as React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountLayout } from '@/src/layouts/account/AccountLayout';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Avatar } from '@/src/components/ui/Avatar';
import { useAuthStore } from '@/src/stores/authStore';
import { useToast } from '@/src/components/ui/Toast';
import { Save, Camera } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  lastName: z.string().min(2, 'Sobrenome deve ter pelo menos 2 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
});

type ProfileData = z.infer<typeof profileSchema>;

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const { toast } = useToast();

  const [isSaving, setIsSaving] = React.useState(false);

  // Derive first and last name from user.name if needed
  const nameParts = user?.name ? user.name.split(' ') : [''];
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: firstName,
      lastName: lastName,
      phone: user?.phone || '',
    },
  });

  const handleSave = async (data: ProfileData) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    updateUser({ name: `${data.name} ${data.lastName}`.trim(), phone: data.phone });
    setIsSaving(false);
    toast.success('Perfil atualizado com carinho!', 'Alterações salvas com sucesso.');
  };

  const maskedCpf = user?.cpf
    ? user.cpf.replace(/(\d{3})\.(\d{3})\.(\d{3})-(\d{2})/, '***.$2.$3-**')
    : 'Não informado';

  return (
    <AccountLayout currentPageTitle="Meu Perfil" currentPageBreadcrumb="Meu Perfil">
      <div className="space-y-6 text-left">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">Dados Pessoais</h1>
          <p className="text-xs text-slate-600">
            Mantenha suas informações sempre atualizadas para notas fiscais e entregas
          </p>
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="p-6 sm:p-8 rounded-3xl border border-pink-100 bg-white space-y-6 shadow-xs">
          {/* Avatar Edit */}
          <div className="flex items-center gap-4 pb-4 border-b border-pink-100">
            <Avatar src={user?.avatarUrl} name={user?.name || 'Cliente'} size="lg" status="online" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">{user?.name}</h3>
              <p className="text-xs text-slate-500">Foto de perfil</p>
              <Button variant="outline" size="sm" type="button" className="mt-2 text-xs font-semibold">
                <Camera className="h-3.5 w-3.5 mr-1" />
                Alterar Foto
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nome"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="Sobrenome"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">E-mail</label>
              <input
                type="email"
                disabled
                value={user?.email || ''}
                className="w-full h-10 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
              <p className="text-[10px] text-slate-500">Para alterar seu e-mail, contate o suporte.</p>
            </div>

            <Input
              label="Telefone / WhatsApp"
              {...register('phone')}
              error={errors.phone?.message}
            />

            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">CPF (Nota Fiscal)</label>
              <input
                type="text"
                disabled
                value={maskedCpf}
                className="w-full sm:w-1/2 h-10 px-3 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button type="submit" variant="dengo" size="md" isLoading={isSaving} className="font-bold gap-1.5">
              <Save className="h-4 w-4" />
              <span>Salvar Alterações</span>
            </Button>
          </div>
        </form>
      </div>
    </AccountLayout>
  );
};

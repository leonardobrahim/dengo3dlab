import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AccountLayout } from '@/src/layouts/account/AccountLayout';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { Dialog } from '@/src/components/ui/Dialog';
import { useToast } from '@/src/components/ui/Toast';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { addressSchema, AddressFormData } from '@/src/schemas';

type Address = AddressFormData & { id: string };

export const AddressesPage: React.FC = () => {
  const { toast } = useToast();

  const [addresses, setAddresses] = React.useState<Address[]>([
    {
      id: 'addr-1',
      name: 'Casa',
      recipientName: 'Maria Maker Dengo',
      street: 'Av. Paulista',
      number: '1000',
      complement: 'Apto 42',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310100',
      isDefaultShipping: true,
    },
    {
      id: 'addr-2',
      name: 'Trabalho',
      recipientName: 'Estúdio Dengo Lab',
      street: 'Rua Augusta',
      number: '500',
      complement: 'Sala 12',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305000',
      isDefaultShipping: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const handleOpenModal = (address?: Address) => {
    if (address) {
      setEditingId(address.id);
      reset(address);
    } else {
      setEditingId(null);
      reset({
        name: '',
        recipientName: '',
        zipCode: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        isDefaultShipping: false,
      });
    }
    setIsModalOpen(true);
  };

  const onSubmit = (data: AddressFormData) => {
    let finalId = editingId;
    if (editingId) {
      setAddresses((prev) =>
        prev.map((a) => (a.id === editingId ? { ...a, ...data } : a))
      );
      toast.success('Endereço atualizado com sucesso!');
    } else {
      finalId = `addr-${Date.now()}`;
      const newAddr: Address = { ...data, id: finalId };
      setAddresses((prev) => [...prev, newAddr]);
      toast.success('Endereço adicionado com sucesso!');
    }
    
    // If set as default, update others
    if (data.isDefaultShipping && finalId) {
      // Actually we just want to set this one as default and others to false.
      // But handleSetDefault already does that:
      handleSetDefault(finalId);
    }

    setIsModalOpen(false);
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefaultShipping: a.id === id,
      }))
    );
    toast.success('Endereço padrão atualizado!');
  };

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success('Endereço removido!');
  };

  return (
    <AccountLayout currentPageTitle="Meus Endereços" currentPageBreadcrumb="Endereços">
      <div className="space-y-6 text-left">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900">Endereços de Entrega</h1>
            <p className="text-xs text-slate-600">
              Cadastre e gerencie os locais onde você recebe seus pacotes
            </p>
          </div>

          <Button
            variant="dengo"
            size="sm"
            onClick={() => handleOpenModal()}
            className="text-xs font-bold gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Novo Endereço</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className={`p-5 rounded-3xl border transition-all space-y-3 ${
                addr.isDefaultShipping
                  ? 'border-pink-500 bg-pink-50/40 bg-card ring-2 ring-pink-400/20'
                  : 'border-pink-100 bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-pink-500" />
                  <span className="font-bold text-xs text-slate-900">{addr.name} ({addr.recipientName})</span>
                </div>
                {addr.isDefaultShipping && <Badge variant="babyPink">Padrão</Badge>}
              </div>

              <div className="text-xs text-slate-600 space-y-0.5">
                <p>{addr.street}, {addr.number} {addr.complement && `• ${addr.complement}`}</p>
                <p>{addr.neighborhood} - {addr.city}/{addr.state}</p>
                <p className="font-mono text-[11px]">CEP: {addr.zipCode}</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                {!addr.isDefaultShipping ? (
                  <button
                    type="button"
                    onClick={() => handleSetDefault(addr.id)}
                    className="text-pink-600 font-semibold hover:underline cursor-pointer"
                  >
                    Definir como Padrão
                  </button>
                ) : (
                  <span className="text-emerald-600 flex items-center gap-1 font-semibold text-[11px]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Endereço Principal
                  </span>
                )}

                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenModal(addr)} className="p-1 text-slate-400 hover:text-slate-800 cursor-pointer">
                    <Edit2 className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => handleDelete(addr.id)} className="p-1 text-slate-400 hover:text-rose-500 cursor-pointer">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen} title={editingId ? 'Editar Endereço' : 'Novo Endereço'} description="Preencha os dados do endereço de entrega">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Identificador (ex: Casa)" {...register('name')} error={errors.name?.message} />
            <Input label="Nome do Recebedor" {...register('recipientName')} error={errors.recipientName?.message} />
            <Input label="CEP" {...register('zipCode')} error={errors.zipCode?.message} />
            <Input label="Rua / Logradouro" {...register('street')} error={errors.street?.message} />
            <Input label="Número" {...register('number')} error={errors.number?.message} />
            <Input label="Complemento" {...register('complement')} error={errors.complement?.message} />
            <Input label="Bairro" {...register('neighborhood')} error={errors.neighborhood?.message} />
            <Input label="Cidade" {...register('city')} error={errors.city?.message} />
            <Input label="UF" {...register('state')} error={errors.state?.message} />
          </div>
          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-slate-700">
             <input type="checkbox" id="isDefaultShipping" {...register('isDefaultShipping')} />
             <label htmlFor="isDefaultShipping">Definir como endereço padrão de entrega</label>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="submit" variant="dengo">Salvar Endereço</Button>
          </div>
        </form>
      </Dialog>
    </AccountLayout>
  );
};

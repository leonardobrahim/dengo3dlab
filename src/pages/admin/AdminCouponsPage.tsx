import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { Dialog } from '@/src/components/ui/Dialog';
import { useToast } from '@/src/components/ui/Toast';
import { Plus, Ticket, Trash2, Edit2 } from 'lucide-react';
import { formatCurrency, formatDate } from '@/src/utils/formatters';

export const AdminCouponsPage: React.FC = () => {
  const { toast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [coupons, setCoupons] = React.useState([
    {
      id: 'cp-1',
      code: 'DENGO10',
      type: 'percent',
      value: 10,
      minPurchase: 50.0,
      validUntil: '2026-12-31',
      limit: 500,
      limitPerUser: 1,
      status: 'active',
      usageCount: 142
    },
    {
      id: 'cp-2',
      code: 'FRETEOFF',
      type: 'free_shipping',
      value: 0,
      minPurchase: 150.0,
      validUntil: '2026-10-31',
      limit: 100,
      limitPerUser: 1,
      status: 'active',
      usageCount: 88
    }
  ]);

  const handleSave = () => {
    toast.success('Cupom salvo com sucesso!');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
    toast.success('Cupom excluído!');
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">Cupons de Desconto</h1>
            <p className="text-xs text-muted-foreground">Gerencie promoções e descontos especiais</p>
          </div>
          <Button
            variant="dengo"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold gap-1.5 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Cupom</span>
          </Button>
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Código</th>
                <th className="p-4 text-center">Tipo</th>
                <th className="p-4 text-right">Valor</th>
                <th className="p-4 text-right">Mínimo</th>
                <th className="p-4 text-center">Validade</th>
                <th className="p-4 text-center">Uso / Limite</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
                        <Ticket className="h-4 w-4" />
                      </div>
                      <span className="font-mono font-bold text-foreground text-sm tracking-wider">
                        {coupon.code}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {coupon.type === 'percent' && <Badge variant="outline">Percentual (%)</Badge>}
                    {coupon.type === 'fixed' && <Badge variant="outline">Valor Fixo (R$)</Badge>}
                    {coupon.type === 'free_shipping' && <Badge variant="outline">Frete Grátis</Badge>}
                  </td>
                  <td className="p-4 text-right font-bold text-emerald-600">
                    {coupon.type === 'percent' ? `${coupon.value}%` : coupon.type === 'fixed' ? formatCurrency(coupon.value) : '-'}
                  </td>
                  <td className="p-4 text-right text-muted-foreground">
                    {coupon.minPurchase > 0 ? formatCurrency(coupon.minPurchase) : 'Sem mínimo'}
                  </td>
                  <td className="p-4 text-center text-muted-foreground">
                    {coupon.validUntil ? formatDate(new Date(coupon.validUntil).toISOString()) : 'Sem validade'}
                  </td>
                  <td className="p-4 text-center font-mono">
                    {coupon.usageCount} / {coupon.limit > 0 ? coupon.limit : '∞'}
                  </td>
                  <td className="p-4 text-center">
                    {coupon.status === 'active' ? (
                      <Badge variant="candy">Ativo</Badge>
                    ) : (
                      <Badge variant="outline">Inativo</Badge>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setIsModalOpen(true)} className="p-1.5 bg-muted rounded-lg text-muted-foreground hover:text-pink-600 hover:bg-pink-50 transition-colors">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleDelete(coupon.id)} className="p-1.5 bg-muted rounded-lg text-muted-foreground hover:text-rose-600 hover:bg-rose-50 transition-colors">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      <Dialog 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Gerenciar Cupom"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold">Código do Cupom</label>
              <Input placeholder="Ex: VERAO20" className="uppercase font-mono tracking-wider" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold">Status</label>
              <select className="w-full bg-background border border-border rounded-xl p-2.5 text-sm">
                <option value="active">Ativo</option>
                <option value="disabled">Inativo</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold">Tipo de Desconto</label>
              <select className="w-full bg-background border border-border rounded-xl p-2.5 text-sm">
                <option value="percent">Percentual (%)</option>
                <option value="fixed">Valor Fixo (R$)</option>
                <option value="free_shipping">Frete Grátis</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold">Valor</label>
              <Input type="number" placeholder="0" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold">Pedido Mínimo (R$)</label>
              <Input type="number" placeholder="0" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold">Validade</label>
              <Input type="date" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold">Limite de Uso (Total)</label>
              <Input type="number" placeholder="Deixe em branco para ilimitado" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold">Limite por Usuário</label>
              <Input type="number" defaultValue="1" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button variant="dengo" onClick={handleSave}>Salvar Cupom</Button>
          </div>
        </div>
      </Dialog>
    </AdminLayout>
  );
};

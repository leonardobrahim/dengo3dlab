import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { Input } from '@/src/components/ui/Input';
import { Dialog } from '@/src/components/ui/Dialog';
import { Avatar } from '@/src/components/ui/Avatar';
import { useToast } from '@/src/components/ui/Toast';
import { Shield, Plus, Edit2, Lock, Unlock } from 'lucide-react';
import { formatDate } from '@/src/utils/formatters';

export const AdminUsersPage: React.FC = () => {
  const { toast } = useToast();
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [users, setUsers] = React.useState([
    {
      id: 'adm-1',
      name: 'Leonardo Brahim',
      email: 'leonardobrahim@gmail.com',
      role: 'superadmin',
      status: 'active',
      lastLogin: '2026-08-25T20:00:00Z',
    },
    {
      id: 'adm-2',
      name: 'Dengo 3D Labs',
      email: 'admin@dengo3d.com',
      role: 'admin',
      status: 'active',
      lastLogin: '2026-08-24T10:00:00Z',
    },
    {
      id: 'adm-3',
      name: 'Operador Produção',
      email: 'print@dengo3d.com',
      role: 'operator',
      status: 'blocked',
      lastLogin: '2026-07-15T09:00:00Z',
    }
  ]);

  const handleSave = () => {
    toast.success('Administrador salvo com sucesso!');
    setIsModalOpen(false);
  };

  const handleToggleBlock = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const newStatus = u.status === 'active' ? 'blocked' : 'active';
        toast.success(`Usuário ${newStatus === 'active' ? 'desbloqueado' : 'bloqueado'}!`);
        return { ...u, status: newStatus };
      }
      return u;
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-10">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">Administradores</h1>
            <p className="text-xs text-muted-foreground">Gerencie o acesso da equipe ao painel</p>
          </div>
          <Button
            variant="dengo"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold gap-1.5 shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Novo Admin</span>
          </Button>
        </div>

        <div className="rounded-3xl border border-border bg-card overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead className="bg-muted text-muted-foreground uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-4">Usuário</th>
                <th className="p-4 text-center">Permissão</th>
                <th className="p-4 text-center">Último Acesso</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar alt={user.name} size="sm" />
                      <div>
                        <p className="font-bold text-foreground">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {user.role === 'superadmin' && <Badge variant="cherry"><Shield className="h-3 w-3 mr-1" /> Super Admin</Badge>}
                    {user.role === 'admin' && <Badge variant="candy"><Shield className="h-3 w-3 mr-1" /> Administrador</Badge>}
                    {user.role === 'operator' && <Badge variant="outline">Operador</Badge>}
                  </td>
                  <td className="p-4 text-center text-muted-foreground">
                    {formatDate(user.lastLogin)}
                  </td>
                  <td className="p-4 text-center">
                    {user.status === 'active' ? (
                      <Badge variant="emerald">Ativo</Badge>
                    ) : (
                      <Badge variant="outline">Bloqueado</Badge>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setIsModalOpen(true)} className="p-1.5 bg-muted rounded-lg text-muted-foreground hover:text-sky-600 hover:bg-sky-50 transition-colors">
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={() => handleToggleBlock(user.id)} className={`p-1.5 bg-muted rounded-lg transition-colors ${user.status === 'active' ? 'text-muted-foreground hover:text-rose-600 hover:bg-rose-50' : 'text-rose-600 hover:text-emerald-600 hover:bg-emerald-50'}`}>
                        {user.status === 'active' ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
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
        title="Gerenciar Administrador"
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold">Nome Completo</label>
            <Input placeholder="Ex: João Silva" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold">E-mail</label>
            <Input type="email" placeholder="email@exemplo.com" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold">Nível de Permissão</label>
            <select className="w-full bg-background border border-border rounded-xl p-2.5 text-sm">
              <option value="admin">Administrador (Acesso total)</option>
              <option value="operator">Operador (Estoque e Produção)</option>
              <option value="superadmin">Super Admin (Configurações críticas)</option>
            </select>
          </div>
          
          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold">Nova Senha</label>
            <Input type="password" placeholder="Deixe em branco para manter" />
          </div>

          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button variant="dengo" onClick={handleSave}>Salvar Usuário</Button>
          </div>
        </div>
      </Dialog>
    </AdminLayout>
  );
};

import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { useToast } from '@/src/components/ui/Toast';
import { Store, CreditCard, Truck, Mail, Bell, Search, Shield, Save } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState('loja');

  const handleSave = () => {
    toast.success('Configurações salvas com sucesso!');
  };

  const tabs = [
    { id: 'loja', label: 'Loja', icon: <Store className="h-4 w-4" /> },
    { id: 'pagamento', label: 'Pagamento', icon: <CreditCard className="h-4 w-4" /> },
    { id: 'frete', label: 'Frete', icon: <Truck className="h-4 w-4" /> },
    { id: 'email', label: 'E-mail', icon: <Mail className="h-4 w-4" /> },
    { id: 'notificacoes', label: 'Notificações', icon: <Bell className="h-4 w-4" /> },
    { id: 'seo', label: 'SEO', icon: <Search className="h-4 w-4" /> },
    { id: 'seguranca', label: 'Segurança', icon: <Shield className="h-4 w-4" /> },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6 text-left pb-20">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">Configurações</h1>
            <p className="text-xs text-muted-foreground">Gerencie as preferências gerais da plataforma</p>
          </div>
          <Button variant="dengo" size="sm" onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" /> Salvar Alterações
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Tabs Navigation */}
          <div className="w-full md:w-64 shrink-0 space-y-1 border-r border-border pr-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 bg-card border border-border rounded-3xl p-6 md:p-8">
            
            {activeTab === 'loja' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h2 className="text-lg font-black text-foreground mb-4">Informações da Loja</h2>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">Nome da Loja</label>
                      <Input defaultValue="Dengo 3D" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">E-mail de Contato</label>
                      <Input defaultValue="contato@dengo3d.com" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">Telefone / WhatsApp</label>
                      <Input defaultValue="(11) 99999-9999" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">CNPJ / CPF</label>
                      <Input defaultValue="12.345.678/0001-90" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pagamento' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h2 className="text-lg font-black text-foreground mb-4">Gateways de Pagamento</h2>
                  <div className="space-y-4">
                    <div className="p-4 border border-border rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="font-bold">Stripe</p>
                        <p className="text-xs text-muted-foreground">Cartão de Crédito</p>
                      </div>
                      <Badge variant="emerald">Ativo</Badge>
                    </div>
                    <div className="p-4 border border-border rounded-2xl flex items-center justify-between">
                      <div>
                        <p className="font-bold">Mercado Pago</p>
                        <p className="text-xs text-muted-foreground">Pix e Boleto</p>
                      </div>
                      <Badge variant="outline">Configurar</Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'frete' && (
              <div className="space-y-6 max-w-2xl">
                <div>
                  <h2 className="text-lg font-black text-foreground mb-4">Configurações de Entrega</h2>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">CEP de Origem</label>
                      <Input defaultValue="01234-567" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-muted-foreground">Prazo Adicional de Produção (Dias)</label>
                      <Input type="number" defaultValue="3" />
                      <p className="text-[10px] text-muted-foreground mt-1">Este prazo será somado ao prazo dos Correios.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {(activeTab === 'email' || activeTab === 'notificacoes' || activeTab === 'seo' || activeTab === 'seguranca') && (
              <div className="space-y-6 max-w-2xl flex flex-col items-center justify-center py-10 text-center opacity-60">
                <Store className="h-12 w-12 text-muted-foreground mb-2" />
                <h2 className="text-lg font-bold">Módulo em Desenvolvimento</h2>
                <p className="text-sm text-muted-foreground max-w-md">
                  As configurações avançadas de {activeTab} estarão disponíveis na próxima atualização do sistema.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </AdminLayout>
  );
};

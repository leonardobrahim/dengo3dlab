import { useState } from 'react';
import { Package, Shield, Settings, Lock, Mail, Trash2, CheckCircle2, ChevronRight, Clock, Box, ShieldCheck, User } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface CustomerPortalProps {
  user: { name: string; email: string } | null;
  onLogout: () => void;
}

export function CustomerPortal({ user, onLogout }: CustomerPortalProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'privacy'>('orders');
  const [marketingConsent, setMarketingConsent] = useState(false);

  const orderStatuses = [
    'Pedido Pago',
    'Na Fila de Impressão',
    'Imprimindo',
    'Acabamento',
    'Pronto para Envio',
    'Em Trânsito',
    'Entregue'
  ];

  // Mocking the current status index (e.g., 2 = "Imprimindo")
  const currentStatusIndex = 2;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-600 border border-rose-200">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{user?.name}</h1>
            <p className="text-slate-500 font-medium">{user?.email}</p>
          </div>
        </div>
        <Button variant="outline" onClick={onLogout} className="w-full sm:w-auto">
          Sair da Conta
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 px-2 font-bold text-sm transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'orders' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Package className="w-4 h-4" />
          Meus Pedidos
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`pb-4 px-2 font-bold text-sm transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === 'privacy' ? 'border-rose-600 text-rose-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <Shield className="w-4 h-4" />
          Meus Dados & Privacidade
        </button>
      </div>

      {/* Content */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Pedidos Recentes</h2>
          
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm font-bold text-slate-900">Pedido #D3L-9824</div>
                <div className="text-xs font-medium text-slate-500">Realizado em 24/10/2026</div>
              </div>
              <div className="text-right sm:text-left">
                <div className="text-sm font-bold text-slate-900">Total: R$ 172,40</div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex gap-4 mb-8">
                <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                  <Box className="w-8 h-8 text-slate-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Suporte de Headset Articulado - Caveira Low Poly</h3>
                  <p className="text-sm text-slate-500">Cor: Preto Fosco • Acabamento: Liso</p>
                </div>
              </div>

              {/* Status Timeline */}
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                <div className="space-y-6 relative">
                  {orderStatuses.map((status, index) => {
                    const isCompleted = index < currentStatusIndex;
                    const isCurrent = index === currentStatusIndex;
                    const isFuture = index > currentStatusIndex;

                    return (
                      <div key={status} className={`flex items-center gap-4 ${isFuture ? 'opacity-40' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center relative z-10 border-2 transition-colors ${
                          isCompleted ? 'bg-emerald-500 border-emerald-500 text-white' :
                          isCurrent ? 'bg-white border-rose-500 text-rose-500' :
                          'bg-white border-slate-200 text-slate-300'
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : 
                           isCurrent ? <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse" /> :
                           <div className="w-2 h-2 bg-slate-200 rounded-full" />}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-bold text-sm ${isCurrent ? 'text-rose-600' : 'text-slate-900'}`}>
                            {status}
                          </h4>
                          {isCurrent && status === 'Imprimindo' && (
                            <p className="text-xs text-slate-500 font-medium mt-0.5">
                              Sua peça está na mesa de impressão 3D neste exato momento.
                            </p>
                          )}
                          {status === 'Em Trânsito' && isFuture && (
                            <p className="text-xs text-slate-400 font-medium mt-0.5">
                              O código de rastreio ficará disponível aqui.
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'privacy' && (
        <div className="space-y-6">
          <div className="bg-sky-50 p-5 rounded-2xl text-sm text-sky-800 font-medium flex gap-3 items-start border border-sky-100">
            <ShieldCheck className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-1">Seus dados estão protegidos</p>
              <p className="text-sky-700 leading-relaxed">
                De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem total controle sobre suas informações. 
                Nós armazenamos apenas o necessário para emitir notas fiscais e entregar seus produtos de impressão 3D.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Alterar Senha */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5 text-slate-400" />
                <h2 className="text-lg font-bold text-slate-900">Alterar Senha</h2>
              </div>
              <div className="space-y-4">
                <Input label="Senha Atual" type="password" placeholder="••••••••" />
                <Input label="Nova Senha" type="password" placeholder="••••••••" />
                <Input label="Confirmar Nova Senha" type="password" placeholder="••••••••" />
                <div className="pt-2">
                  <Button className="w-full">Atualizar Senha</Button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Preferências de Comunicação */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <h2 className="text-lg font-bold text-slate-900">Comunicações</h2>
                </div>
                <p className="text-sm text-slate-500 mb-4">
                  Escolha se deseja receber e-mails sobre novos lançamentos de modelos 3D, promoções de filamentos e novidades do laboratório.
                </p>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex-shrink-0 mt-0.5">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                      checked={marketingConsent}
                      onChange={(e) => setMarketingConsent(e.target.checked)}
                    />
                  </div>
                  <div className="text-sm font-bold text-slate-700">
                    Desejo receber e-mails promocionais
                  </div>
                </label>
              </div>

              {/* Direito ao Esquecimento */}
              <div className="bg-white rounded-2xl border border-red-200 p-6 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-500"></div>
                <div className="flex items-center gap-3 mb-4">
                  <Trash2 className="w-5 h-5 text-red-500" />
                  <h2 className="text-lg font-bold text-slate-900">Direito ao Esquecimento</h2>
                </div>
                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  Você pode solicitar a exclusão permanente da sua conta e de todos os seus dados pessoais da nossa base. 
                  Manteremos apenas os registros fiscais anonimizados exigidos por lei.
                </p>
                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 w-full">
                  Solicitar Exclusão de Dados
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { Mail, Lock, User, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface AuthProps {
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export function Auth({ onLoginSuccess }: AuthProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      // Mock login
      onLoginSuccess({
        name: 'Usuário Teste',
        email: loginEmail
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (regName && regEmail && regPassword && regPassword === regConfirmPassword && lgpdConsent) {
      // Mock register & auto login
      onLoginSuccess({
        name: regName,
        email: regEmail
      });
    }
  };

  return (
    <div className="flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        
        {/* Toggle Mode */}
        <div className="flex border-b border-slate-100">
          <button 
            className={`flex-1 py-4 text-sm font-bold transition-colors ${mode === 'login' ? 'text-rose-600 border-b-2 border-rose-600 bg-rose-50/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            onClick={() => setMode('login')}
          >
            Já tenho conta
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-bold transition-colors ${mode === 'register' ? 'text-rose-600 border-b-2 border-rose-600 bg-rose-50/30' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            onClick={() => setMode('register')}
          >
            Criar conta
          </button>
        </div>

        <div className="p-8">
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Bem-vindo de volta!</h2>
                <p className="text-slate-500 text-sm mt-1">Acesse sua conta para gerenciar pedidos.</p>
              </div>

              <div className="space-y-4">
                <Input 
                  label="E-mail" 
                  type="email" 
                  placeholder="voce@exemplo.com.br"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
                <div className="space-y-1">
                  <Input 
                    label="Senha" 
                    type="password" 
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <div className="flex justify-end">
                    <a href="#" className="text-xs font-semibold text-rose-600 hover:underline">Esqueceu a senha?</a>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-base mt-2" disabled={!loginEmail || !loginPassword}>
                Entrar na Conta
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Crie sua conta</h2>
                <p className="text-slate-500 text-sm mt-1">É rápido e só pedimos o essencial.</p>
              </div>

              <div className="bg-sky-50 p-4 rounded-xl text-xs text-sky-800 font-medium flex gap-3 items-start border border-sky-100 mb-4">
                <ShieldCheck className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
                <p>Nós não vendemos seus dados. Suas informações são usadas apenas para processamento de nota fiscal e envio da sua peça.</p>
              </div>

              <div className="space-y-4">
                <Input 
                  label="Nome Completo" 
                  type="text" 
                  placeholder="Como no seu documento"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
                <Input 
                  label="E-mail" 
                  type="email" 
                  placeholder="voce@exemplo.com.br"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <Input 
                    label="Senha" 
                    type="password" 
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                  <Input 
                    label="Confirme a Senha" 
                    type="password" 
                    placeholder="••••••••"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    required
                    error={regPassword !== regConfirmPassword && regConfirmPassword.length > 0 ? "Senhas não coincidem" : undefined}
                  />
                </div>
              </div>

              {/* Explicit LGPD Consent Checkbox (Opt-in) */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex-shrink-0 mt-0.5">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                      checked={lgpdConsent}
                      onChange={(e) => setLgpdConsent(e.target.checked)}
                    />
                  </div>
                  <div className="text-xs text-slate-700 font-medium leading-relaxed">
                    Li e aceito a <a href="#" className="text-rose-600 hover:underline">Política de Privacidade</a>. Consinto com a coleta e tratamento do meu Nome e E-mail para criação da conta e futura emissão de Nota Fiscal/Envio (Art. 7º LGPD).
                  </div>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base mt-2" 
                disabled={!regName || !regEmail || !regPassword || regPassword !== regConfirmPassword || !lgpdConsent}
              >
                Concluir Cadastro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

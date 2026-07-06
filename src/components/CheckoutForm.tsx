import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, User, MapPin, CreditCard, Shield, AlertCircle, Info, Lock, QrCode } from 'lucide-react';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { maskCPF, maskEmail } from '../utils/masking';

type Step = 'identification' | 'shipping' | 'payment';

export function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const [activeStep, setActiveStep] = useState<Step>('identification');

  // Form States (Mocked for UI visualization)
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit'>('pix');
  const [lgpdConsent, setLgpdConsent] = useState(false);

  // Status checks
  const isIdComplete = email.includes('@') && name.length > 2 && cpf.length >= 11;
  const isShippingComplete = isIdComplete && cep.length >= 8 && street.length > 2 && number.length > 0;

  return (
    <div className="space-y-4">
      {/* STEP 1: IDENTIFICATION */}
      <div className={`bg-white rounded-2xl border transition-colors ${activeStep === 'identification' ? 'border-rose-600 shadow-sm ring-1 ring-rose-600' : 'border-slate-200'}`}>
        <div 
          className="p-5 flex items-center justify-between cursor-pointer"
          onClick={() => setActiveStep('identification')}
        >
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${activeStep === 'identification' ? 'bg-rose-600 text-white' : isIdComplete ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {isIdComplete && activeStep !== 'identification' ? <Check className="w-4 h-4" /> : '1'}
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Identificação</h2>
              {isIdComplete && activeStep !== 'identification' && (
                <p className="text-sm text-slate-500 mt-0.5 font-medium">
                  {maskEmail(email)} • CPF {maskCPF(cpf)}
                </p>
              )}
            </div>
          </div>
          {activeStep !== 'identification' && (
            <Button variant="ghost" className="text-rose-600" onClick={(e) => { e.stopPropagation(); setActiveStep('identification'); }}>
              Editar
            </Button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {activeStep === 'identification' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-5">
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 font-medium flex gap-3 items-start border border-slate-100">
                  <Shield className="w-5 h-5 text-rose-500 flex-shrink-0" />
                  <p>Coletamos apenas os dados essenciais para o faturamento (NF-e) e entrega do seu produto impresso, em estrita conformidade com a LGPD.</p>
                </div>
                
                <div className="space-y-4">
                  <Input 
                    label="E-mail" 
                    type="email" 
                    placeholder="voce@exemplo.com.br"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input 
                      label="Nome Completo" 
                      placeholder="Como consta no documento"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input 
                      label="CPF" 
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                      helperText="Obrigatório por lei para emissão de Nota Fiscal."
                      infoMode="privacy"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button 
                    onClick={() => isIdComplete && setActiveStep('shipping')}
                    disabled={!isIdComplete}
                  >
                    Continuar para Entrega
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* STEP 2: SHIPPING */}
      <div className={`bg-white rounded-2xl border transition-colors ${activeStep === 'shipping' ? 'border-rose-600 shadow-sm ring-1 ring-rose-600' : 'border-slate-200'} ${!isIdComplete ? 'opacity-60 pointer-events-none' : ''}`}>
        <div 
          className="p-5 flex items-center justify-between cursor-pointer"
          onClick={() => isIdComplete && setActiveStep('shipping')}
        >
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${activeStep === 'shipping' ? 'bg-rose-600 text-white' : isShippingComplete ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {isShippingComplete && activeStep !== 'shipping' ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Endereço de Entrega</h2>
              {isShippingComplete && activeStep !== 'shipping' && (
                <p className="text-sm text-slate-500 mt-0.5 font-medium">
                  CEP {cep} • Nº {number}
                </p>
              )}
            </div>
          </div>
          {activeStep !== 'shipping' && isShippingComplete && (
            <Button variant="ghost" className="text-rose-600" onClick={(e) => { e.stopPropagation(); setActiveStep('shipping'); }}>
              Editar
            </Button>
          )}
        </div>

        <AnimatePresence initial={false}>
          {activeStep === 'shipping' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-5">
                <div className="bg-amber-50 p-4 rounded-xl text-sm text-amber-800 font-medium flex gap-3 items-start border border-amber-200">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <p>A modalidade "Retirada no Laboratório Dengo3DLab" está temporariamente indisponível devido a restrições operacionais.</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input 
                      label="CEP" 
                      placeholder="00000-000"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3">
                      <Input 
                        label="Endereço" 
                        placeholder="Rua, Avenida, etc."
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                      />
                    </div>
                    <Input 
                      label="Número" 
                      placeholder="123"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                  <Input 
                    label="Complemento (Opcional)" 
                    placeholder="Apto, Bloco, Referência"
                  />
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <Button variant="ghost" onClick={() => setActiveStep('identification')}>
                    Voltar
                  </Button>
                  <Button 
                    onClick={() => isShippingComplete && setActiveStep('payment')}
                    disabled={!isShippingComplete}
                  >
                    Ir para Pagamento
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* STEP 3: PAYMENT & LGPD CONSENT */}
      <div className={`bg-white rounded-2xl border transition-colors ${activeStep === 'payment' ? 'border-rose-600 shadow-sm ring-1 ring-rose-600' : 'border-slate-200'} ${!isShippingComplete ? 'opacity-60 pointer-events-none' : ''}`}>
        <div 
          className="p-5 flex items-center gap-4 cursor-pointer"
          onClick={() => isShippingComplete && setActiveStep('payment')}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${activeStep === 'payment' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
            3
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Pagamento Seguro</h2>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {activeStep === 'payment' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-6">
                
                {/* Payment Tabs */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('pix')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'pix' ? 'border-rose-600 bg-rose-50/50 text-rose-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                  >
                    <QrCode className="w-6 h-6 mb-2" />
                    <span className="font-bold text-sm">Pix (Aprovação Imediata)</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('credit')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'credit' ? 'border-rose-600 bg-rose-50/50 text-rose-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                  >
                    <CreditCard className="w-6 h-6 mb-2" />
                    <span className="font-bold text-sm">Cartão de Crédito</span>
                  </button>
                </div>

                {/* Conditional Payment UI */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                  {paymentMethod === 'pix' ? (
                    <div className="text-center space-y-2">
                      <h4 className="font-bold text-slate-900">Pague com Pix</h4>
                      <p className="text-sm text-slate-600">O código será gerado na próxima etapa após confirmar o pedido. A produção da sua peça inicia imediatamente após a confirmação.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 w-fit px-3 py-1.5 rounded-full">
                        <Lock className="w-3.5 h-3.5" />
                        Ambiente Seguro (PCI-DSS). Seu CVV não é armazenado.
                      </div>
                      <Input label="Número do Cartão" placeholder="0000 0000 0000 0000" />
                      <div className="grid grid-cols-2 gap-4">
                        <Input label="Validade" placeholder="MM/AA" />
                        <Input label="CVV" placeholder="123" />
                      </div>
                      <Input label="Nome no Cartão" placeholder="Como impresso" />
                      
                      <div className="flex flex-col space-y-1.5 pt-2">
                        <label className="text-sm font-semibold text-slate-700">Parcelamento</label>
                        <select className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-rose-500 focus:ring-rose-500 outline-none transition-colors">
                          <option>1x de R$ 172,40 s/ juros</option>
                          <option>2x de R$ 86,20 s/ juros</option>
                          <option>3x de R$ 57,46 s/ juros</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Explicit LGPD Consent Checkbox (Opt-in) */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 mt-6">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="flex-shrink-0 mt-0.5">
                      <input 
                        type="checkbox" 
                        id="lgpd-consent"
                        className="w-5 h-5 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
                        checked={lgpdConsent}
                        onChange={(e) => setLgpdConsent(e.target.checked)}
                      />
                    </div>
                    <div className="text-sm text-slate-700 font-medium leading-relaxed">
                      Concordo explicitamente com o tratamento dos meus dados pessoais (Nome, CPF e Endereço) exclusivamente para o processamento deste pedido, realização da entrega e emissão legal da Nota Fiscal, conforme os <a href="#" className="text-rose-600 hover:underline">Termos de Uso</a> e <a href="#" className="text-rose-600 hover:underline">Política de Privacidade</a> da Dengo3DLab.
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex justify-between items-center">
                  <Button variant="ghost" onClick={() => setActiveStep('shipping')}>
                    Voltar
                  </Button>
                  <Button 
                    size="lg" 
                    className="w-full md:w-auto text-base px-8 h-12"
                    disabled={!lgpdConsent}
                    onClick={onSuccess}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Finalizar Pedido
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

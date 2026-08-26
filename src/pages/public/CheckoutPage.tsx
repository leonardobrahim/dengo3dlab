import * as React from 'react';
import { StoreLayout } from '@/src/layouts/store/StoreLayout';
import { Breadcrumb } from '@/src/components/ui/Breadcrumb';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Badge } from '@/src/components/ui/Badge';
import { useCartStore } from '@/src/stores/cartStore';
import { useAuthStore } from '@/src/stores/authStore';
import { useNavigationStore } from '@/src/stores/navigationStore';
import { useToast } from '@/src/hooks/useToast';
import {
  ShieldCheck, CreditCard, QrCode, Truck, CheckCircle2,
  Lock, ArrowRight, User as UserIcon, MapPin, Search, ChevronDown, Check, Copy, AlertTriangle
} from 'lucide-react';
import { formatCurrency } from '@/src/utils/formatters';
import { shippingService, ShippingOption } from '@/src/services/checkout/shippingService';
import { paymentProvider, PaymentResult } from '@/src/services/checkout/paymentProvider';
import { AddressFormData } from '@/src/schemas';

// --- Mocks para checkout rápido (usados se não houver backend) ---
const mockAddresses = [
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
  }
];

export const CheckoutPage: React.FC = () => {
  const { navigate } = useNavigationStore();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuthStore();
  const { items, getSubtotal, getDiscount, getTotal, clearCart, shippingCost, setShippingCost } = useCartStore();

  // Estados dos Passos
  const [activeStep, setActiveStep] = React.useState<'identification' | 'address' | 'shipping' | 'payment' | 'review'>('identification');

  // Dados do Fluxo
  const [selectedAddress, setSelectedAddress] = React.useState(mockAddresses[0]);
  const [isAddingAddress, setIsAddingAddress] = React.useState(false);
  const [shippingCep, setShippingCep] = React.useState(mockAddresses[0].zipCode);
  const [shippingOptions, setShippingOptions] = React.useState<ShippingOption[]>([]);
  const [selectedShipping, setSelectedShipping] = React.useState<ShippingOption | null>(null);
  const [isCalculatingShipping, setIsCalculatingShipping] = React.useState(false);
  
  // Pagamento
  const [paymentMethod, setPaymentMethod] = React.useState<'pix' | 'credit_card'>('pix');
  const [ccData, setCcData] = React.useState({ number: '', name: '', expiry: '', cvv: '' });
  const [paymentResult, setPaymentResult] = React.useState<PaymentResult | null>(null);
  
  // Controle de loading e finalização
  const [isProcessing, setIsProcessing] = React.useState(false);
  
  // Subtotais (pegamos do store)
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  // Hook inicial para verificar usuário
  React.useEffect(() => {
    if (isAuthenticated) {
      if (activeStep === 'identification') setActiveStep('address');
    } else {
      setActiveStep('identification');
    }
  }, [isAuthenticated]);

  // Busca frete
  const handleCalculateShipping = async () => {
    if (!shippingCep || shippingCep.length < 8) return;
    setIsCalculatingShipping(true);
    try {
      const options = await shippingService.calculateShipping(shippingCep);
      setShippingOptions(options);
      // Auto-seleciona a primeira opção
      if (options.length > 0) {
        setSelectedShipping(options[0]);
        setShippingCost(options[0].price);
      }
    } catch (err: any) {
      toast.error('Erro no frete', err.message);
      setShippingOptions([]);
    } finally {
      setIsCalculatingShipping(false);
    }
  };

  const handleSelectShipping = (opt: ShippingOption) => {
    setSelectedShipping(opt);
    setShippingCost(opt.price);
  };

  const handleCreateOrder = async () => {
    if (items.length === 0) {
       toast.error('Carrinho vazio', 'Adicione produtos antes de finalizar.');
       return;
    }

    setIsProcessing(true);
    try {
      // Cria a intenção de pagamento no gateway
      const result = await paymentProvider.createPayment({
        method: paymentMethod,
        amount: total,
        ...(paymentMethod === 'credit_card' && {
          cardNumber: ccData.number,
          cardName: ccData.name,
          cardExpiry: ccData.expiry,
          cardCvv: ccData.cvv
        })
      });

      if (!result.success) {
        throw new Error(result.error || 'Erro no pagamento');
      }

      setPaymentResult(result);
      
      // Se for Cartão de Crédito, está aprovado imediato no mock.
      // Se for PIX, abriremos uma tela esperando.
      if (paymentMethod === 'credit_card') {
        completeOrderAndRedirect();
      }

    } catch (err: any) {
      toast.error('Falha na transação', err.message || 'Erro inesperado. Tente novamente.');
      setIsProcessing(false);
    }
  };

  const completeOrderAndRedirect = () => {
    // Pedido criado
    const orderId = `3D-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    clearCart();
    toast.success('Pedido finalizado com sucesso!', `Acompanhe pelo código #${orderId}`);
    // Navegando para página de sucesso do pedido
    setTimeout(() => {
      navigate(`/pedido/${orderId}`);
    }, 1500);
  };

  const breadcrumbs = [
    { label: 'Início', href: '/' },
    { label: 'Carrinho', href: '/carrinho' },
    { label: 'Checkout Seguro', isCurrent: true },
  ];

  // Render do PIX
  if (paymentResult && paymentMethod === 'pix') {
    return (
      <StoreLayout>
        <div className="max-w-xl mx-auto py-12 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-slate-900">Pagamento Pix Gerado</h1>
            <p className="text-sm text-slate-500">
              Escaneie o QR Code abaixo no app do seu banco ou copie e cole o código.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center gap-4">
            <img src={paymentResult.qrCode} alt="QR Code Pix" className="w-48 h-48 rounded-xl border border-slate-200" />
            <div className="w-full">
              <label className="text-xs font-bold text-slate-900 mb-1 block text-left">Código Pix (Copia e Cola)</label>
              <div className="flex items-center gap-2">
                <Input value={paymentResult.pixCopyPaste} readOnly className="text-xs" />
                <Button 
                  variant="outline" 
                  onClick={() => {
                     navigator.clipboard.writeText(paymentResult.pixCopyPaste || '');
                     toast.success('Código copiado!');
                  }}
                  className="px-3"
                >
                  <Copy className="h-4 w-4 text-slate-700" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
               <span>Aguardando pagamento... Expira em 15 minutos.</span>
            </div>
          </div>

          <Button 
            variant="dengo" 
            size="lg" 
            className="w-full font-bold" 
            onClick={() => {
              // Simulando callback de PIX aprovado
              setIsProcessing(true);
              setTimeout(() => {
                completeOrderAndRedirect();
              }, 1500);
            }}
            isLoading={isProcessing}
          >
            Simular Pix Pago (Mock)
          </Button>
        </div>
      </StoreLayout>
    );
  }

  return (
    <StoreLayout>
      <div className="space-y-8 text-left pb-16">
        <Breadcrumb items={breadcrumbs} onNavigate={navigate} />

        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Lock className="h-5 w-5 text-emerald-500" />
          <h1 className="text-2xl font-black text-slate-900">Checkout Seguro</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Steps Accordion */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Step 1: Identification */}
            <div className={`rounded-3xl border transition-all ${activeStep === 'identification' ? 'border-pink-200 bg-white shadow-sm ring-4 ring-pink-50' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
               <div className="p-5 flex items-center justify-between cursor-pointer" onClick={() => !isAuthenticated && setActiveStep('identification')}>
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${activeStep === 'identification' ? 'bg-pink-100 text-pink-600' : 'bg-slate-200 text-slate-500'}`}>1</div>
                    <span className="font-bold text-slate-900">Identificação</span>
                  </div>
                  {isAuthenticated && activeStep !== 'identification' && (
                    <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
                      <CheckCircle2 className="h-4 w-4" /> Logado como {user?.name.split(' ')[0]}
                    </div>
                  )}
               </div>
               {activeStep === 'identification' && (
                 <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                   {isAuthenticated ? (
                     <div className="space-y-4 pt-4">
                       <p className="text-sm text-slate-600">Você está logado como <strong>{user?.email}</strong>.</p>
                       <Button variant="dengo" onClick={() => setActiveStep('address')}>Continuar para Entrega</Button>
                     </div>
                   ) : (
                     <div className="pt-4 max-w-sm space-y-3">
                       <p className="text-xs text-slate-500 mb-2">Para continuar com o checkout, acesse sua conta.</p>
                       <Input label="E-mail" placeholder="voce@exemplo.com" id="checkout-email" />
                       <Input label="Senha" type="password" placeholder="••••••••" id="checkout-password" />
                       <Button 
                         variant="dengo" 
                         className="w-full"
                         onClick={() => {
                           // Mock login action
                           useAuthStore.getState().login({ email: 'voce@exemplo.com' }, 'mock-token');
                         }}
                       >
                         Entrar
                       </Button>
                       <div className="mt-4 text-center">
                         <span className="text-xs text-slate-500">Ainda não tem conta?</span>
                         <Button variant="link" className="text-xs text-pink-600" onClick={() => navigate('/cadastro')}>Cadastre-se</Button>
                       </div>
                     </div>
                   )}
                 </div>
               )}
            </div>

            {/* Step 2: Address */}
            <div className={`rounded-3xl border transition-all ${activeStep === 'address' ? 'border-pink-200 bg-white shadow-sm ring-4 ring-pink-50' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
               <div className="p-5 flex items-center gap-3 cursor-pointer" onClick={() => isAuthenticated && setActiveStep('address')}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${activeStep === 'address' ? 'bg-pink-100 text-pink-600' : 'bg-slate-200 text-slate-500'}`}>2</div>
                  <span className="font-bold text-slate-900">Endereço de Entrega</span>
               </div>
               {activeStep === 'address' && (
                 <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-4">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                     {mockAddresses.map((addr) => (
                       <div 
                         key={addr.id} 
                         onClick={() => { setSelectedAddress(addr); setShippingCep(addr.zipCode); }}
                         className={`p-3 rounded-2xl border cursor-pointer transition-colors ${selectedAddress.id === addr.id ? 'border-pink-500 bg-pink-50' : 'border-slate-200 hover:border-pink-300'}`}
                       >
                         <p className="font-bold text-sm text-slate-900">{addr.name}</p>
                         <p className="text-xs text-slate-500 mt-1">{addr.street}, {addr.number}</p>
                         <p className="text-xs text-slate-500">{addr.city} - {addr.state}</p>
                         <p className="text-xs text-slate-500 font-semibold mt-1">CEP: {addr.zipCode}</p>
                       </div>
                     ))}
                     <div 
                       onClick={() => setIsAddingAddress(true)}
                       className="p-3 rounded-2xl border border-dashed border-slate-300 hover:border-pink-400 cursor-pointer flex flex-col items-center justify-center text-slate-500 hover:text-pink-600 transition-colors"
                     >
                       <MapPin className="h-5 w-5 mb-1" />
                       <span className="text-xs font-bold">Novo Endereço</span>
                     </div>
                   </div>
                   
                   {isAddingAddress && (
                     <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mt-4">
                       <p className="text-xs font-bold text-slate-900">Adicionar novo endereço</p>
                       <div className="grid grid-cols-2 gap-3">
                         <Input label="CEP" placeholder="Ex: 00000-000" />
                         <Input label="Identificação" placeholder="Ex: Casa, Trabalho" />
                         <div className="col-span-2">
                           <Input label="Rua / Logradouro" placeholder="Av. Principal" />
                         </div>
                         <Input label="Número" placeholder="1000" />
                         <Input label="Complemento" placeholder="Apto 42" />
                       </div>
                       <div className="flex justify-end gap-2 pt-2">
                         <Button variant="outline" size="sm" onClick={() => setIsAddingAddress(false)}>Cancelar</Button>
                         <Button variant="dengo" size="sm" onClick={() => setIsAddingAddress(false)}>Salvar Endereço</Button>
                       </div>
                     </div>
                   )}

                   <div className="pt-2">
                     <Button variant="dengo" onClick={() => {
                        setActiveStep('shipping');
                        handleCalculateShipping();
                     }}>
                       Confirmar Endereço
                     </Button>
                   </div>
                 </div>
               )}
            </div>

            {/* Step 3: Shipping */}
            <div className={`rounded-3xl border transition-all ${activeStep === 'shipping' ? 'border-pink-200 bg-white shadow-sm ring-4 ring-pink-50' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
               <div className="p-5 flex items-center gap-3 cursor-pointer" onClick={() => isAuthenticated && setActiveStep('shipping')}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${activeStep === 'shipping' ? 'bg-pink-100 text-pink-600' : 'bg-slate-200 text-slate-500'}`}>3</div>
                  <span className="font-bold text-slate-900">Frete</span>
               </div>
               {activeStep === 'shipping' && (
                 <div className="p-5 pt-0 border-t border-slate-100 mt-2">
                   <div className="pt-4 space-y-4">
                     {isCalculatingShipping ? (
                       <div className="text-center py-6 text-slate-500">
                         <div className="animate-spin h-6 w-6 border-2 border-pink-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                         <p className="text-xs font-semibold">Calculando fretes...</p>
                       </div>
                     ) : shippingOptions.length > 0 ? (
                       <div className="space-y-2">
                         {shippingOptions.map((opt) => (
                           <div 
                             key={opt.id}
                             onClick={() => handleSelectShipping(opt)}
                             className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${selectedShipping?.id === opt.id ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-100' : 'border-slate-200 hover:border-pink-300'}`}
                           >
                             <div className="flex items-center gap-3">
                               <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${selectedShipping?.id === opt.id ? 'border-pink-500' : 'border-slate-300'}`}>
                                 {selectedShipping?.id === opt.id && <div className="h-2 w-2 rounded-full bg-pink-500" />}
                               </div>
                               <div>
                                 <p className="text-sm font-bold text-slate-900">{opt.name}</p>
                                 <p className="text-xs text-slate-500">Até {opt.estimatedDays} dias úteis</p>
                               </div>
                             </div>
                             <span className="font-black text-pink-600 text-sm">{opt.price === 0 ? 'Grátis' : formatCurrency(opt.price)}</span>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <p className="text-sm text-rose-500">Nenhuma opção de frete encontrada para o CEP {shippingCep}.</p>
                     )}
                     
                     <div className="pt-2 flex justify-between items-center">
                       <Button variant="ghost" className="text-slate-500" onClick={() => setActiveStep('address')}>Voltar</Button>
                       <Button variant="dengo" onClick={() => setActiveStep('payment')} disabled={!selectedShipping}>Ir para Pagamento</Button>
                     </div>
                   </div>
                 </div>
               )}
            </div>

            {/* Step 4: Payment */}
            <div className={`rounded-3xl border transition-all ${activeStep === 'payment' ? 'border-pink-200 bg-white shadow-sm ring-4 ring-pink-50' : 'border-slate-100 bg-slate-50 opacity-70'}`}>
               <div className="p-5 flex items-center gap-3 cursor-pointer" onClick={() => isAuthenticated && setActiveStep('payment')}>
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm ${activeStep === 'payment' ? 'bg-pink-100 text-pink-600' : 'bg-slate-200 text-slate-500'}`}>4</div>
                  <span className="font-bold text-slate-900">Pagamento</span>
               </div>
               {activeStep === 'payment' && (
                 <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-4">
                   <div className="grid grid-cols-2 gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('pix')}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                          paymentMethod === 'pix'
                            ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-400/20'
                            : 'border-slate-200 bg-white hover:border-emerald-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <QrCode className="h-5 w-5 text-emerald-600" />
                          <Badge variant="cherry">5% OFF</Badge>
                        </div>
                        <p className="text-xs font-bold text-slate-900">Pix Instantâneo</p>
                        <p className="text-[10px] text-slate-500">Aprovação imediata</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('credit_card')}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                          paymentMethod === 'credit_card'
                            ? 'border-pink-500 bg-pink-50 ring-2 ring-pink-400/20'
                            : 'border-slate-200 bg-white hover:border-pink-300'
                        }`}
                      >
                        <CreditCard className="h-5 w-5 text-pink-500" />
                        <p className="text-xs font-bold text-slate-900">Cartão de Crédito</p>
                        <p className="text-[10px] text-slate-500">Até 12x sem juros</p>
                      </button>
                   </div>

                   {paymentMethod === 'credit_card' && (
                     <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 mt-2">
                       <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                          <span className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider">Aviso de Segurança</span>
                       </div>
                       <p className="text-xs text-slate-500 leading-relaxed pb-2 border-b border-slate-200">
                         Em produção, estes dados nunca tocam o servidor (PCI Compliance). Eles são tokenizados nativamente pelo gateway (Stripe, Mercado Pago) diretamente no navegador do cliente. O número, nome, data e CVV nunca são persistidos em nossa base de dados.
                       </p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                         <div className="sm:col-span-2">
                           <Input 
                             label="Número do Cartão" 
                             placeholder="0000 0000 0000 0000" 
                             value={ccData.number}
                             onChange={e => setCcData({...ccData, number: e.target.value})}
                           />
                         </div>
                         <Input 
                           label="Validade" 
                           placeholder="MM/AA" 
                           value={ccData.expiry}
                           onChange={e => setCcData({...ccData, expiry: e.target.value})}
                         />
                         <Input 
                           label="CVV" 
                           placeholder="123" 
                           type="password"
                           maxLength={4}
                           value={ccData.cvv}
                           onChange={e => setCcData({...ccData, cvv: e.target.value})}
                         />
                         <div className="sm:col-span-2">
                           <Input 
                             label="Nome no Cartão" 
                             placeholder="NOME COMPLETO IGUAL AO CARTÃO" 
                             value={ccData.name}
                             onChange={e => setCcData({...ccData, name: e.target.value})}
                           />
                         </div>
                       </div>
                     </div>
                   )}

                   <div className="pt-4 flex justify-between items-center">
                     <Button variant="ghost" className="text-slate-500" onClick={() => setActiveStep('shipping')}>Voltar</Button>
                     <Button variant="dengo" onClick={() => setActiveStep('review')}>Revisar Pedido</Button>
                   </div>
                 </div>
               )}
            </div>

          </div>

          {/* RIGHT: Order Review Sidebar */}
          <div className="lg:col-span-5 rounded-3xl border border-pink-100 bg-white p-6 space-y-5 shadow-sm sticky top-24">
            <h2 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Resumo da Compra
            </h2>

            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative">
                      <img src={i.imageUrl} alt={i.productName} className="h-12 w-12 rounded-xl object-cover bg-pink-50 border border-pink-100" />
                      <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[9px] font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-sm">
                        {i.quantity}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{i.productName}</p>
                      <p className="text-[10px] text-slate-500 truncate">{i.variantName}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">{formatCurrency(i.unitPrice * i.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-slate-500 pt-4 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-pink-600 font-bold">
                  <span>Desconto Aplicado</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Frete {selectedShipping ? `(${selectedShipping.name})` : ''}</span>
                <span className={shippingCost === 0 ? "text-emerald-600 font-bold" : "text-slate-900 font-semibold"}>
                  {shippingCost === 0 ? 'Grátis ou a calcular' : formatCurrency(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-3 border-t border-slate-100">
                <span>Total a Pagar</span>
                <span className="text-pink-600 text-lg">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {activeStep === 'review' && (
              <div className="pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <Button
                  variant="dengo"
                  size="lg"
                  onClick={handleCreateOrder}
                  isLoading={isProcessing}
                  disabled={isProcessing || !isAuthenticated || !selectedShipping}
                  className="w-full font-bold text-sm gap-2 shadow-md h-12"
                >
                  <ShieldCheck className="h-5 w-5" />
                  <span>Finalizar Pedido Seguro</span>
                </Button>
                <p className="text-center text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1">
                  <Lock className="h-3 w-3" /> Ambiente 100% Seguro e Criptografado
                </p>
              </div>
            )}
            
            {activeStep !== 'review' && (
              <div className="pt-2">
                 <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    Preencha as etapas para finalizar
                 </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

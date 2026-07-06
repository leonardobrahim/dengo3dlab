import { CheckCircle2, Package, Truck, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';

interface OrderSuccessProps {
  onBackToHome: () => void;
  onTrackOrder: () => void;
  user: { name: string; email: string } | null;
}

export function OrderSuccess({ onBackToHome, onTrackOrder, user }: OrderSuccessProps) {
  return (
    <div className="max-w-3xl mx-auto text-center space-y-8 py-12">
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center animate-bounce">
          <CheckCircle2 className="w-12 h-12 text-emerald-600" />
        </div>
      </div>
      
      <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Pedido Confirmado!</h1>
      <p className="text-lg text-slate-600 max-w-xl mx-auto leading-relaxed">
        Obrigado pela sua compra, <span className="font-bold">{user?.name?.split(' ')[0] || 'Cliente'}</span>! Recebemos seu pedido e em breve iniciaremos a produção da sua peça 3D.
      </p>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-left mt-10">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Acompanhe seu pedido</h2>
        
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Pagamento Aprovado</h3>
              <p className="text-sm text-slate-500 mt-1">Seu pagamento foi processado com sucesso.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0 border border-sky-100">
              <Package className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Na Fila de Impressão</h3>
              <p className="text-sm text-slate-500 mt-1">Sua peça está na fila para ser impressa em nossos equipamentos de alta precisão. Avisaremos quando a impressão começar.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 opacity-50">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-slate-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Envio</h3>
              <p className="text-sm text-slate-500 mt-1">Após a impressão e acabamento, seu pedido será despachado via Correios PAC.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="outline" className="w-full sm:w-auto h-12 px-8" onClick={onTrackOrder}>
          Acompanhar Pedido
        </Button>
        <Button className="w-full sm:w-auto h-12 px-8" onClick={onBackToHome}>
          Voltar para Vitrine
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

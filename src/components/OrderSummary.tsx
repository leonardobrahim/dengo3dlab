import { Package, Truck, Clock, ShieldCheck } from 'lucide-react';

export function OrderSummary() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
        <h2 className="font-semibold text-lg text-slate-900">Resumo do Pedido</h2>
        <span className="bg-rose-100 text-rose-700 text-xs font-bold px-2 py-1 rounded-md">1 item</span>
      </div>
      
      <div className="p-6 flex flex-col gap-6">
        {/* Product Item */}
        <div className="flex gap-4">
          <div className="w-20 h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
            {/* Visual placeholder for 3D printed object */}
            <div className="w-12 h-12 bg-rose-500/20 rounded-lg transform rotate-12 shadow-sm border border-rose-500/30 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent"></div>
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-2">
              <h3 className="font-semibold text-slate-900 leading-snug">Suporte de Headset Articulado - Caveira Low Poly</h3>
              <span className="font-semibold text-slate-900 whitespace-nowrap">R$ 149,90</span>
            </div>
            <div className="mt-1 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium border border-slate-200">
                Cor: Preto Fosco
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium border border-slate-200">
                Acabamento: Liso
              </span>
            </div>
            <div className="mt-2 text-xs text-rose-700 font-semibold flex items-center gap-1.5 bg-rose-50 w-fit px-2.5 py-1 rounded-md border border-rose-100">
              <Clock className="w-3.5 h-3.5" />
              <span>Prazo de Impressão: 3 dias úteis</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100"></div>

        {/* Financial Totals */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-slate-600">
            <span className="font-medium">Subtotal</span>
            <span className="font-semibold text-slate-900">R$ 149,90</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <div className="flex items-center gap-1.5 font-medium">
              <span>Frete</span>
              <span className="text-xs text-slate-400 font-normal">(Correios PAC)</span>
            </div>
            <span className="font-semibold text-slate-900">R$ 22,50</span>
          </div>
        </div>

        <div className="h-px bg-slate-100"></div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-slate-900 text-lg">Total</span>
          <div className="text-right">
            <div className="font-black text-2xl text-rose-600 tracking-tight">R$ 172,40</div>
            <div className="text-xs text-slate-500 font-semibold mt-0.5">Em até 3x de R$ 57,46 s/ juros</div>
          </div>
        </div>
      </div>
      
      <div className="bg-emerald-50/50 p-5 text-xs text-emerald-800 flex gap-3 items-start border-t border-emerald-100">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <p className="font-medium leading-relaxed">
          Compra 100% segura. Seus dados são processados através de tokenização PCI-DSS e tratados sob estrita conformidade com a LGPD.
        </p>
      </div>
    </div>
  );
}

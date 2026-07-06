import { useState } from 'react';
import { ArrowLeft, Box, Clock, Truck, ShieldCheck, Check, Info } from 'lucide-react';
import { Product } from '../data/products';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: () => void;
}

export function ProductDetails({ product, onBack, onAddToCart }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState('Preto Fosco');
  const [selectedScale, setSelectedScale] = useState('100%');
  const [selectedFinish, setSelectedFinish] = useState('Liso');
  const [cep, setCep] = useState('');
  const [freightResult, setFreightResult] = useState<{ price: number, days: number } | null>(null);

  const colors = [
    { name: 'Preto Fosco', hex: '#1e293b' },
    { name: 'Branco Neve', hex: '#f8fafc' },
    { name: 'Cinza Espacial', hex: '#64748b' },
    { name: 'Vermelho Translúcido', hex: '#ef4444' },
    { name: 'Verde Néon', hex: '#22c55e' },
  ];

  const scales = ['50% (Miniatura)', '100% (Padrão)', '150% (Grande)'];
  const finishes = ['Liso (Padrão)', 'Rústico (Texturizado)', 'Polido (Brilhante +R$20)'];

  const calculateFreight = () => {
    if (cep.length >= 8) {
      // Mock calculation
      setFreightResult({ price: 22.50, days: 5 });
    }
  };

  const getPriceMultiplier = () => {
    let multiplier = 1;
    if (selectedScale === '150% (Grande)') multiplier = 1.8;
    if (selectedScale === '50% (Miniatura)') multiplier = 0.6;
    return multiplier;
  };

  const getAditionalPrice = () => {
    let additional = 0;
    if (selectedFinish === 'Polido (Brilhante +R$20)') additional = 20;
    return additional;
  };

  const finalPrice = (product.price * getPriceMultiplier()) + getAditionalPrice();
  const printTime = product.status === 'Pronta Entrega' ? 0 : Math.ceil(product.basePrintTimeDays * getPriceMultiplier());

  return (
    <div className="space-y-6">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-rose-600 transition-colors w-fit px-3 py-1.5 -ml-3 rounded-lg hover:bg-slate-100"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para a Vitrine
      </button>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left: Media Gallery */}
          <div className="bg-slate-50 p-8 lg:p-12 flex flex-col justify-center items-center relative border-b lg:border-b-0 lg:border-r border-slate-200">
            <span className={`absolute top-6 left-6 text-xs font-bold px-3 py-1.5 rounded-md border backdrop-blur-sm ${
              product.status === 'Pronta Entrega' 
                ? 'bg-emerald-100/90 text-emerald-800 border-emerald-200' 
                : 'bg-amber-100/90 text-amber-800 border-amber-200'
            }`}>
              {product.status}
            </span>

            {/* Simulated 3D Viewer */}
            <div className="w-full max-w-sm aspect-square bg-rose-500/10 rounded-2xl shadow-inner border border-rose-500/20 relative flex items-center justify-center cursor-move">
              <Box className="w-32 h-32 text-rose-400 opacity-80 transform rotate-12" />
              <div className="absolute bottom-4 left-0 w-full text-center text-xs font-medium text-slate-400">
                Arraste para girar a visualização 3D
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex gap-3 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center bg-white cursor-pointer ${i === 1 ? 'border-rose-600' : 'border-slate-200 hover:border-slate-300'}`}>
                  <Box className="w-6 h-6 text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Configurator */}
          <div className="p-8 lg:p-12 flex flex-col">
            <div className="mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{product.category}</span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {product.name}
            </h1>
            <p className="text-slate-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* 3D Print Selectors */}
            <div className="space-y-6 mb-8">
              {/* Color */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-slate-900">Cor do Filamento</label>
                  <span className="text-xs font-medium text-slate-500">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.name ? 'border-rose-600 scale-110 shadow-md' : 'border-slate-200 hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Scale */}
              <div>
                <label className="text-sm font-semibold text-slate-900 mb-3 block">Escala / Tamanho</label>
                <div className="grid grid-cols-3 gap-3">
                  {scales.map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setSelectedScale(scale)}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${selectedScale === scale ? 'border-rose-600 bg-rose-50 text-rose-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {scale.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Finish */}
              <div>
                <label className="text-sm font-semibold text-slate-900 mb-3 block">Acabamento</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {finishes.map((finish) => (
                    <button
                      key={finish}
                      onClick={() => setSelectedFinish(finish)}
                      className={`py-2 px-3 rounded-xl border text-sm font-medium transition-colors ${selectedFinish === finish ? 'border-rose-600 bg-rose-50 text-rose-700' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 mb-8 w-full"></div>

            {/* Shipping & Time Estimates */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-8 space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-slate-900">Prazo de Produção</div>
                  <div className="text-sm text-slate-600">
                    {printTime === 0 ? 'Peça em estoque. Envio em até 1 dia útil.' : `Cerca de ${printTime} dia(s) útil(eis) para impressão e acabamento.`}
                  </div>
                </div>
              </div>

              <div className="h-px bg-slate-200 w-full"></div>

              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <div className="w-full">
                  <div className="text-sm font-bold text-slate-900 mb-2">Simular Frete</div>
                  <div className="flex gap-2">
                    <Input 
                      label="" 
                      placeholder="00000-000" 
                      value={cep} 
                      onChange={(e) => setCep(e.target.value)}
                      className="h-10 bg-white"
                    />
                    <Button variant="outline" className="h-10" onClick={calculateFreight}>Calcular</Button>
                  </div>
                  {freightResult && (
                    <div className="mt-3 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 p-3 rounded-lg flex items-center gap-2">
                      <Check className="w-4 h-4" />
                      Correios PAC: R$ {freightResult.price.toFixed(2).replace('.', ',')} (Chega em ~{freightResult.days} dias úteis)
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Price & Action */}
            <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
              <div>
                <div className="text-sm text-slate-500 font-medium mb-1">Preço Final Configurado</div>
                <div className="font-black text-3xl text-rose-600 tracking-tight">
                  R$ {finalPrice.toFixed(2).replace('.', ',')}
                </div>
              </div>
              
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-rose-200 shadow-lg" onClick={onAddToCart}>
                <Box className="w-5 h-5 mr-2" />
                Adicionar ao Carrinho
              </Button>
            </div>
          </div>

        </div>
      </div>
      
      {/* Privacy Notice */}
      <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        Seus dados de navegação são minimizados. Você só informará dados pessoais no Checkout.
      </div>
    </div>
  );
}

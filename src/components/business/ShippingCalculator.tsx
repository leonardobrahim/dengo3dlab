import * as React from 'react';
import { Truck, CheckCircle2, Clock, Sparkles, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/src/components/ui/Button';
import { formatCurrency } from '@/src/utils/formatters';
import { ShippingQuoteOption } from '@/src/types';
import { cn } from '@/src/lib/utils';

export interface ShippingCalculatorProps {
  productPrice?: number;
  productWeightGrams?: number;
  className?: string;
  onSelectOption?: (option: ShippingQuoteOption) => void;
}

export const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({
  productPrice = 99,
  productWeightGrams = 120,
  className,
  onSelectOption,
}) => {
  const [cep, setCep] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [options, setOptions] = React.useState<ShippingQuoteOption[] | null>(null);
  const [selectedOptionId, setSelectedOptionId] = React.useState<string | null>(null);
  const [cityFound, setCityFound] = React.useState<string | null>(null);

  const formatCep = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 8);
    if (raw.length <= 5) return raw;
    return `${raw.slice(0, 5)}-${raw.slice(5)}`;
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setCep(formatCep(e.target.value));
  };

  const calculateShipping = (e?: React.FormEvent) => {
    e?.preventDefault();
    const rawCep = cep.replace(/\D/g, '');

    if (rawCep.length !== 8) {
      setError('Por favor, digite um CEP válido com 8 dígitos.');
      return;
    }

    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);

      // Derive mock destination based on first digits
      const firstDigit = rawCep[0];
      let regionName = 'São Paulo, SP';
      let pacPrice = 14.9;
      let pacDays = 4;
      let sedexPrice = 24.9;
      let sedexDays = 1;

      if (['0', '1'].includes(firstDigit)) {
        regionName = 'Grande São Paulo / SP Capital';
        pacPrice = 11.9;
        pacDays = 3;
        sedexPrice = 18.9;
        sedexDays = 1;
      } else if (['2', '3'].includes(firstDigit)) {
        regionName = 'Rio de Janeiro / Minas Gerais';
        pacPrice = 15.9;
        pacDays = 4;
        sedexPrice = 27.9;
        sedexDays = 2;
      } else if (['8', '9'].includes(firstDigit)) {
        regionName = 'Paraná / Região Sul';
        pacPrice = 12.5;
        pacDays = 3;
        sedexPrice = 21.9;
        sedexDays = 1;
      } else {
        regionName = 'Brasil / Demais Regiões';
        pacPrice = 21.5;
        pacDays = 6;
        sedexPrice = 38.9;
        sedexDays = 3;
      }

      const isFreePac = productPrice >= 149;

      const quotes: ShippingQuoteOption[] = [
        {
          id: 'sedex',
          name: 'SEDEX Expresso 3D',
          serviceType: 'SEDEX',
          carrierName: 'Correios Sedex',
          price: sedexPrice,
          estimatedDeliveryDays: sedexDays,
          deliveryDateFormatted: `Chega em até ${sedexDays} dia${sedexDays > 1 ? 's' : ''} útil${sedexDays > 1 ? 'eis' : ''}`,
          highlightBadge: 'Mais Rápido',
        },
        {
          id: 'pac',
          name: 'PAC Econômico Protegido',
          serviceType: 'PAC',
          carrierName: 'Correios PAC',
          price: isFreePac ? 0 : pacPrice,
          originalPrice: isFreePac ? pacPrice : undefined,
          isFree: isFreePac,
          estimatedDeliveryDays: pacDays,
          deliveryDateFormatted: `Chega em ${pacDays} a ${pacDays + 2} dias úteis`,
          highlightBadge: isFreePac ? 'Frete Grátis' : 'Melhor Custo-Benefício',
        },
        {
          id: 'pickup',
          name: 'Retirada no Dengo 3D Lab',
          serviceType: 'PICKUP',
          carrierName: 'Balcão Dengo Lab (Curitiba & SP)',
          price: 0,
          isFree: true,
          estimatedDeliveryDays: 1,
          deliveryDateFormatted: 'Disponível para retirada em 24h úteis',
          highlightBadge: '100% Grátis',
        },
      ];

      setOptions(quotes);
      setCityFound(regionName);
      setSelectedOptionId(quotes[0].id);
      onSelectOption?.(quotes[0]);
    }, 450);
  };

  return (
    <div
      id="shipping-calculator-box"
      className={cn(
        'p-5 rounded-3xl border border-pink-100 bg-white text-left space-y-4 shadow-2xs',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-center text-sky-600">
            <Truck className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800">Calcular Frete e Prazos</h4>
            <p className="text-[11px] text-slate-600">Simule para o seu endereço</p>
          </div>
        </div>

        <a
          href="https://buscacepinter.correios.com.br/app/endereco/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold text-pink-600 hover:text-pink-700 hover:underline"
        >
          Não sei meu CEP
        </a>
      </div>

      {/* Input Form */}
      <form onSubmit={calculateShipping} className="flex gap-2">
        <div className="relative flex-1">
          <input
            id="shipping-cep-input"
            type="text"
            placeholder="00000-000"
            value={cep}
            onChange={handleCepChange}
            maxLength={9}
            className="w-full h-10 px-3.5 text-xs font-semibold rounded-2xl border border-pink-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-400 transition-all"
          />
        </div>
        <Button
          id="shipping-calc-button"
          type="submit"
          variant="dengo"
          size="sm"
          disabled={isLoading || cep.length < 8}
          className="h-10 px-4 text-xs font-bold rounded-2xl shrink-0"
        >
          {isLoading ? (
            <div className="flex items-center gap-1.5">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Calculando...</span>
            </div>
          ) : (
            <span>Calcular</span>
          )}
        </Button>
      </form>

      {/* Error Feedback */}
      {error && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Results List */}
      {options && (
        <div className="space-y-2.5 pt-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {cityFound && (
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 pb-1">
              <MapPin className="h-3.5 w-3.5 text-pink-500" />
              <span>
                Destino identificado: <strong className="text-slate-800">{cityFound}</strong>
              </span>
            </div>
          )}

          <div className="space-y-2">
            {options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    setSelectedOptionId(opt.id);
                    onSelectOption?.(opt);
                  }}
                  className={cn(
                    'p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 text-xs',
                    isSelected
                      ? 'border-pink-400 bg-pink-50/50 ring-2 ring-pink-300/30'
                      : 'border-pink-100 bg-white hover:border-pink-200'
                  )}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={cn(
                        'mt-0.5 h-4 w-4 rounded-full border flex items-center justify-center transition-all',
                        isSelected
                          ? 'border-pink-500 bg-pink-500 text-white'
                          : 'border-slate-300 bg-white'
                      )}
                    >
                      {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800">{opt.name}</span>
                        {opt.highlightBadge && (
                          <span
                            className={cn(
                              'text-[10px] font-bold px-1.5 py-0.2 rounded-md',
                              opt.isFree
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-pink-100 text-pink-700'
                            )}
                          >
                            {opt.highlightBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3 text-slate-400" />
                        <span>{opt.deliveryDateFormatted}</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {opt.isFree ? (
                      <span className="font-black text-emerald-600 text-xs uppercase tracking-wider">
                        Grátis
                      </span>
                    ) : (
                      <div className="space-y-0.5">
                        <span className="font-black text-slate-800 text-xs">
                          {formatCurrency(opt.price)}
                        </span>
                        {opt.originalPrice && (
                          <span className="block text-[10px] text-slate-400 line-through">
                            {formatCurrency(opt.originalPrice)}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

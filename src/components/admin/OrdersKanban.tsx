import { useState } from 'react';
import { Package, Truck, Printer, MoveRight, Send, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

type OrderStatus = 
  | 'Pedido Pago'
  | 'Na Fila de Impressão'
  | 'Imprimindo'
  | 'Acabamento'
  | 'Pronto para Envio'
  | 'Em Trânsito'
  | 'Entregue';

interface Order {
  id: string;
  customer: string;
  product: string;
  status: OrderStatus;
  trackingCode?: string;
}

const initialOrders: Order[] = [
  { id: 'D3L-9824', customer: 'João Silva', product: 'Suporte Headset Caveira', status: 'Pedido Pago' },
  { id: 'D3L-9825', customer: 'Maria Oliveira', product: 'Vaso Geométrico', status: 'Na Fila de Impressão' },
  { id: 'D3L-9826', customer: 'Carlos Souza', product: 'Luminária Lua', status: 'Imprimindo' },
  { id: 'D3L-9827', customer: 'Ana Clara', product: 'Organizador Cabos', status: 'Acabamento' },
  { id: 'D3L-9828', customer: 'Lucas Lima', product: 'Suporte Notebook', status: 'Pronto para Envio' },
  { id: 'D3L-9829', customer: 'Beatriz Santos', product: 'Vaso Geométrico', status: 'Em Trânsito', trackingCode: 'BR123456789BR' },
];

const COLUMNS: OrderStatus[] = [
  'Pedido Pago',
  'Na Fila de Impressão',
  'Imprimindo',
  'Acabamento',
  'Pronto para Envio',
  'Em Trânsito',
  'Entregue'
];

export function OrdersKanban() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [trackingInput, setTrackingInput] = useState<{ [key: string]: string }>({});

  const moveOrder = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const handleTrackingSubmit = (orderId: string) => {
    const code = trackingInput[orderId];
    if (code) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, trackingCode: code, status: 'Em Trânsito' } : o));
      // Notify visual
      alert(`Notificação enviada ao cliente com o rastreio: ${code}`);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Esteira de Produção</h1>
        <p className="text-slate-500">Arraste os pedidos ou clique para avançar na esteira.</p>
      </div>

      <div className="flex-1 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {COLUMNS.map((column, colIdx) => (
          <div key={column} className="flex-shrink-0 w-80 bg-slate-200/50 rounded-2xl flex flex-col overflow-hidden border border-slate-200">
            <div className="p-4 bg-slate-200/80 border-b border-slate-300 flex items-center justify-between">
              <h3 className="font-bold text-slate-800 text-sm">{column}</h3>
              <span className="bg-white text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                {orders.filter(o => o.status === column).length}
              </span>
            </div>
            
            <div className="flex-1 p-3 space-y-3 overflow-y-auto">
              {orders.filter(o => o.status === column).map((order) => (
                <div key={order.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col gap-3 group">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-bold text-rose-600 mb-1">{order.id}</div>
                      <div className="font-semibold text-slate-900 text-sm">{order.customer}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1.5 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <Package className="w-3.5 h-3.5" />
                    {order.product}
                  </div>
                  
                  {column === 'Pronto para Envio' && (
                    <div className="mt-2 space-y-2 border-t pt-3">
                      <label className="text-xs font-semibold text-slate-700">Código de Rastreio</label>
                      <div className="flex gap-2">
                        <Input 
                          label=""
                          placeholder="BR...BR" 
                          className="h-8 text-xs"
                          value={trackingInput[order.id] || ''}
                          onChange={(e) => setTrackingInput({ ...trackingInput, [order.id]: e.target.value })}
                        />
                        <Button 
                          size="sm" 
                          className="h-8 px-2 bg-emerald-600 hover:bg-emerald-700 text-white"
                          onClick={() => handleTrackingSubmit(order.id)}
                          title="Enviar e Notificar Cliente"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {column === 'Em Trânsito' && order.trackingCode && (
                    <div className="text-xs font-mono text-slate-600 bg-slate-100 p-1.5 rounded text-center mt-1 border border-slate-200">
                      {order.trackingCode}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-2 flex justify-end gap-2 border-t border-slate-100 pt-3">
                    {colIdx < COLUMNS.length - 1 && column !== 'Pronto para Envio' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-xs h-8"
                        onClick={() => moveOrder(order.id, COLUMNS[colIdx + 1])}
                      >
                        Avançar <MoveRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    )}
                    {column === 'Em Trânsito' && (
                       <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full text-xs h-8 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                        onClick={() => moveOrder(order.id, 'Entregue')}
                      >
                        Marcar Entregue <Check className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {orders.filter(o => o.status === column).length === 0 && (
                <div className="text-center p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 text-xs font-medium">
                  Vazio
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

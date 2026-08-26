import * as React from 'react';
import { AdminLayout } from '@/src/layouts/admin/AdminLayout';
import { Button } from '@/src/components/ui/Button';
import { Badge } from '@/src/components/ui/Badge';
import { useToast } from '@/src/components/ui/Toast';
import { Settings, Printer, Clock, CheckCircle2, ChevronRight, Layers, Palette } from 'lucide-react';

export const AdminProductionPage: React.FC = () => {
  const { toast } = useToast();

  const columns = [
    { id: 'fila', title: 'Fila', color: 'border-slate-200' },
    { id: 'imprimindo', title: 'Imprimindo', color: 'border-sky-200 bg-sky-50/50 dark:bg-sky-950/20' },
    { id: 'acabamento', title: 'Acabamento', color: 'border-amber-200 bg-amber-50/50 dark:bg-amber-950/20' },
    { id: 'pronto', title: 'Pronto', color: 'border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/20' },
  ];

  const initialCards = [
    { id: 1, col: 'fila', order: '3DF-0010', product: 'Lontrinha 3D', material: 'PLA', color: 'Rosa Candy', qty: 2, time: '4h 30m', priority: 'high' },
    { id: 2, col: 'fila', order: '3DF-0011', product: 'Vaso Bob', material: 'PETG', color: 'Preto', qty: 1, time: '2h 15m', priority: 'normal' },
    { id: 3, col: 'imprimindo', order: '3DF-0008', product: 'Dragão Articulado', material: 'PLA Silk', color: 'Dourado', qty: 1, time: '8h 00m', printer: 'Bambu X1C', priority: 'normal' },
    { id: 4, col: 'acabamento', order: '3DF-0005', product: 'Suporte Fone', material: 'PLA', color: 'Branco', qty: 1, time: '1h 30m', priority: 'low' },
  ];

  const [cards, setCards] = React.useState(initialCards);

  const handleDragStart = (e: React.DragEvent, cardId: number) => {
    e.dataTransfer.setData('cardId', cardId.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    const cardIdStr = e.dataTransfer.getData('cardId');
    if (!cardIdStr) return;
    const cardId = parseInt(cardIdStr, 10);

    const cardExists = cards.find(c => c.id === cardId);
    if (cardExists && cardExists.col !== colId) {
      toast.success(`Pedido ${cardExists.order} movido para ${columns.find(c => c.id === colId)?.title}`);
    }

    setCards(prev => {
      return prev.map(card => {
        if (card.id === cardId) {
          return { ...card, col: colId };
        }
        return card;
      });
    });
  };

  return (
    <AdminLayout>
      <div className="flex flex-col h-[calc(100vh-6rem)]">
        
        <div className="flex items-center justify-between gap-4 border-b border-border pb-4 mb-4 shrink-0">
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-foreground">Fila de Produção</h1>
            <p className="text-xs text-muted-foreground">Kanban de impressão 3D e acabamento</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={() => toast.info('Acessando impressoras')}>
              <Printer className="h-4 w-4" /> Impressoras
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => toast.info('Acessando filamentos')}>
              <Layers className="h-4 w-4" /> Filamentos
            </Button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
          
          {columns.map(col => {
            const columnCards = cards.filter(c => c.col === col.id);
            return (
              <div 
                key={col.id} 
                className={`w-80 shrink-0 rounded-3xl border ${col.color} bg-card flex flex-col`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-bold text-sm">{col.title}</h3>
                  <span className="text-xs font-bold bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{columnCards.length}</span>
                </div>
                
                <div className="p-3 flex-1 overflow-y-auto space-y-3">
                  {columnCards.map(card => (
                    <div 
                      key={card.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, card.id)}
                      className="bg-background border border-border rounded-2xl p-4 shadow-sm hover:border-pink-300 transition-colors cursor-grab active:cursor-grabbing"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-muted-foreground">#{card.order}</span>
                        {card.priority === 'high' && <Badge variant="cherry">Urgente</Badge>}
                      </div>
                      
                      <h4 className="font-bold text-sm text-foreground mb-3">{card.product}</h4>
                      
                      <div className="space-y-1.5 mb-3">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Layers className="h-3 w-3" /> {card.material}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Palette className="h-3 w-3" /> {card.color}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                          <span className="text-muted-foreground">Qtd:</span> {card.qty}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                          <Clock className="h-3 w-3" /> {card.time}
                        </div>
                      </div>
                      
                      {card.printer && (
                        <div className="mt-3 text-[10px] font-bold bg-sky-100 text-sky-700 px-2 py-1 rounded-lg flex items-center justify-center gap-1">
                          <Printer className="h-3 w-3" /> {card.printer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

import * as React from 'react';
import { Badge } from '@/src/components/ui/Badge';
import { CheckCircle2, Clock, AlertTriangle, XCircle, Package } from 'lucide-react';

export type InventoryStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order' | 'made_to_order';

export interface StatusBadgeProps {
  status: InventoryStatus;
  stockCount?: number;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  stockCount,
  className,
}) => {
  switch (status) {
    case 'in_stock':
      return (
        <Badge variant="success" dot className={className}>
          Em Estoque {stockCount !== undefined && `(${stockCount} un)`}
        </Badge>
      );
    case 'low_stock':
      return (
        <Badge variant="warning" dot className={className}>
          Últimas {stockCount} unidades
        </Badge>
      );
    case 'out_of_stock':
      return (
        <Badge variant="destructive" dot className={className}>
          Esgotado
        </Badge>
      );
    case 'made_to_order':
      return (
        <Badge variant="filament" className={className}>
          Impressão Sob Demanda
        </Badge>
      );
    case 'pre_order':
      return (
        <Badge variant="tech" className={className}>
          Pré-Venda
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

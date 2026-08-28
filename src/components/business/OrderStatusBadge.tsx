import * as React from "react";
import { OrderStatus } from "@/src/types";
import { Badge } from "@/src/components/ui/Badge";
import {
  Clock,
  CheckCircle2,
  Cpu,
  PackageCheck,
  Truck,
  CheckCheck,
  XCircle,
} from "lucide-react";

export interface OrderStatusBadgeProps {
  status: OrderStatus;
  showIcon?: boolean;
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({
  status,
  showIcon = true,
  className,
}) => {
  const configs: Record<
    OrderStatus,
    {
      label: string;
      variant:
        | "default"
        | "secondary"
        | "warning"
        | "success"
        | "destructive"
        | "filament"
        | "tech";
      icon: React.ReactNode;
    }
  > = {
    pending: {
      label: "Aguardando Pagamento",
      variant: "warning",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    confirmed: {
      label: "Pagamento Confirmado",
      variant: "success",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    in_production: {
      label: "Em Produção",
      variant: "filament",
      icon: <Cpu className="h-3 w-3 mr-1" />,
    },
    ready_to_ship: {
      label: "Em Preparação",
      variant: "secondary",
      icon: <PackageCheck className="h-3 w-3 mr-1" />,
    },
    shipped: {
      label: "Enviado",
      variant: "tech",
      icon: <Truck className="h-3 w-3 mr-1" />,
    },
    delivered: {
      label: "Entregue",
      variant: "success",
      icon: <CheckCheck className="h-3 w-3 mr-1" />,
    },
    cancelled: {
      label: "Cancelado",
      variant: "destructive",
      icon: <XCircle className="h-3 w-3 mr-1" />,
    },
  };

  const config = configs[status] || {
    label: status,
    variant: "secondary",
    icon: null,
  };

  return (
    <Badge variant={config.variant} className={className}>
      {showIcon && config.icon}
      {config.label}
    </Badge>
  );
};

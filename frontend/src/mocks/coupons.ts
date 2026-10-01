import { Coupon } from '@/src/types';

export const mockCoupons: Coupon[] = [
  {
    id: 'cpn-1',
    code: 'BEMVINDO10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 80,
    maxDiscountValue: 80,
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
    description: '10% OFF de boas-vindas no Estúdio Criativo Dengo 3D',
  },
  {
    id: 'cpn-2',
    code: 'PRIMEIRA15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 150,
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
    description: '15% OFF em sua primeira compra (acima de R$ 150)',
  },
  {
    id: 'cpn-3',
    code: 'FRETEGRATIS',
    discountType: 'free_shipping',
    discountValue: 0,
    minOrderValue: 120,
    expiresAt: '2026-12-31T23:59:59Z',
    isActive: true,
    description: 'Frete Grátis em pedidos acima de R$ 120',
  },
];

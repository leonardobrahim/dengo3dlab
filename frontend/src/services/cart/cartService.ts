import { ENV } from '@/src/config/env';
import { apiClient } from '../api/apiClient';
import { Coupon, ApiResponse } from '@/src/types';
import { mockCoupons } from '@/src/mocks';

export interface ShippingCalculationResult {
  carrier: string;
  name: string;
  price: number;
  deliveryDays: number;
}

export const cartService = {
  async validateCoupon(code: string, subtotal: number): Promise<ApiResponse<Coupon>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const coupon = mockCoupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);

      if (!coupon) {
        throw { message: 'Cupom inválido ou expirado', statusCode: 404 };
      }

      if (coupon.minOrderValue && subtotal < coupon.minOrderValue) {
        throw {
          message: `Cupom aplicável apenas em compras acima de R$ ${coupon.minOrderValue.toFixed(2)}`,
          statusCode: 400,
        };
      }

      return {
        success: true,
        data: coupon,
        message: 'Cupom aplicado com sucesso!',
        statusCode: 200,
      };
    }

    return apiClient.post<Coupon>('/cart/coupon/validate', { code, subtotal });
  },

  async estimateShipping(cep: string): Promise<ApiResponse<ShippingCalculationResult[]>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const cleanCep = cep.replace(/\D/g, '');
      const isSP = cleanCep.startsWith('0') || cleanCep.startsWith('1');

      const options: ShippingCalculationResult[] = [
        {
          carrier: 'Jadlog',
          name: 'Jadlog Express (Entrega Segura Filamentos)',
          price: isSP ? 16.90 : 28.50,
          deliveryDays: isSP ? 2 : 4,
        },
        {
          carrier: 'Correios',
          name: 'SEDEX Industrial Rápido',
          price: isSP ? 22.90 : 39.90,
          deliveryDays: isSP ? 1 : 2,
        },
        {
          carrier: 'Loggi',
          name: 'Loggi Econômico',
          price: isSP ? 12.90 : 21.00,
          deliveryDays: isSP ? 3 : 6,
        },
      ];

      return {
        success: true,
        data: options,
        statusCode: 200,
      };
    }

    return apiClient.post<ShippingCalculationResult[]>('/cart/shipping/estimate', { cep });
  },
};

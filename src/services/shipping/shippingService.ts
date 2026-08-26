import { ENV } from '@/src/config/env';
import { apiClient } from '../api/apiClient';
import { Shipment, ApiResponse } from '@/src/types';
import { mockOrders } from '@/src/mocks';

export const shippingService = {
  async trackShipment(trackingCode: string): Promise<ApiResponse<Shipment>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const order = mockOrders.find((o) => o.shipment?.trackingCode === trackingCode) || mockOrders[0];
      if (order.shipment) {
        return { success: true, data: order.shipment, statusCode: 200 };
      }
      throw { message: 'Código de rastreio não encontrado', statusCode: 404 };
    }
    return apiClient.get<Shipment>(`/shipping/track/${trackingCode}`);
  },
};

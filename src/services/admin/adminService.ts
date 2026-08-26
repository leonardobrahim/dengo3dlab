import { ENV } from '@/src/config/env';
import { apiClient } from '../api/apiClient';
import { ApiResponse, ProductionOrder, InventoryItem } from '@/src/types';

export interface AdminMetrics {
  totalRevenueMonth: number;
  totalOrdersMonth: number;
  active3DPrinters: number;
  filamentsStockKg: number;
  pendingShipments: number;
  printHoursLoggedMonth: number;
}

export const adminService = {
  async getDashboardMetrics(): Promise<ApiResponse<AdminMetrics>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        success: true,
        data: {
          totalRevenueMonth: 48920.50,
          totalOrdersMonth: 342,
          active3DPrinters: 12,
          filamentsStockKg: 1840,
          pendingShipments: 19,
          printHoursLoggedMonth: 2180,
        },
        statusCode: 200,
      };
    }
    return apiClient.get<AdminMetrics>('/admin/metrics');
  },

  async getProductionQueue(): Promise<ApiResponse<ProductionOrder[]>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      return {
        success: true,
        data: [
          {
            id: 'prod-ord-901',
            orderId: 'ord-101',
            orderItemId: 'item-2',
            status: 'printing',
            printerAssigned: 'Voron 2.4 StealthBurner #04',
            materialUsed: 'PETG-CF 15% Preto',
            gramsEstimated: 140,
            printTimeEstimatedHours: 4.5,
            startedAt: '2026-08-25T09:00:00Z',
          },
          {
            id: 'prod-ord-902',
            orderId: 'ord-102',
            orderItemId: 'item-5',
            status: 'queued',
            printerAssigned: 'Bambu Lab X1-Carbon #01',
            materialUsed: 'PLA Hyper Laranja',
            gramsEstimated: 85,
            printTimeEstimatedHours: 2.1,
          },
        ],
        statusCode: 200,
      };
    }
    return apiClient.get<ProductionOrder[]>('/admin/production-queue');
  },
};

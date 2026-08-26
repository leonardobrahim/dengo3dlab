import { ENV } from '@/src/config/env';
import { apiClient } from '../api/apiClient';
import { Order, ApiResponse, PaginatedResponse } from '@/src/types';
import { mockOrders } from '@/src/mocks';

export const orderService = {
  async getOrders(): Promise<PaginatedResponse<Order>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return {
        success: true,
        data: mockOrders,
        pagination: {
          page: 1,
          limit: 10,
          total: mockOrders.length,
          totalPages: 1,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
    }

    const response = await apiClient.get<PaginatedResponse<Order>>('/orders');
    return response.data;
  },

  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 250));
      const order = mockOrders.find((o) => o.id === id || o.orderNumber === id);
      if (!order) {
        throw { message: 'Pedido não encontrado', statusCode: 404 };
      }
      return { success: true, data: order, statusCode: 200 };
    }

    return apiClient.get<Order>(`/orders/${id}`);
  },

  async createOrder(payload: Partial<Order>): Promise<ApiResponse<Order>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newOrder: Order = {
        ...mockOrders[0],
        id: `ord-${Date.now()}`,
        orderNumber: `3DF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...payload,
      };
      mockOrders.unshift(newOrder);
      return {
        success: true,
        data: newOrder,
        message: 'Pedido criado com sucesso',
        statusCode: 201,
      };
    }

    return apiClient.post<Order>('/orders', payload);
  },
};

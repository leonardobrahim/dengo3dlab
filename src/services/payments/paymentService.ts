import { ENV } from '@/src/config/env';
import { apiClient } from '../api/apiClient';
import { Payment, PaymentMethod, ApiResponse } from '@/src/types';

export interface ProcessPaymentPayload {
  orderId: string;
  method: PaymentMethod;
  amount: number;
  installments?: number;
  creditCardToken?: string;
}

export const paymentService = {
  async processPayment(payload: ProcessPaymentPayload): Promise<ApiResponse<Payment>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const payment: Payment = {
        id: `pay-${Date.now()}`,
        orderId: payload.orderId,
        method: payload.method,
        status: payload.method === 'pix' ? 'pending' : 'paid',
        amount: payload.amount,
        installments: payload.installments || 1,
        pixQrCode: payload.method === 'pix' ? '00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865405109.905802BR59133D FORGE LABS6009SAO PAULO62070503***6304E8A2' : undefined,
        paidAt: payload.method !== 'pix' ? new Date().toISOString() : undefined,
        transactionReference: `TRX-${Date.now()}`,
      };
      return {
        success: true,
        data: payment,
        message: 'Pagamento iniciado com sucesso',
        statusCode: 200,
      };
    }

    return apiClient.post<Payment>('/payments/process', payload);
  },

  async getPaymentStatus(paymentId: string): Promise<ApiResponse<Payment>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return {
        success: true,
        data: {
          id: paymentId,
          orderId: 'ord-101',
          method: 'pix',
          status: 'paid',
          amount: 289.72,
          paidAt: new Date().toISOString(),
        },
        statusCode: 200,
      };
    }
    return apiClient.get<Payment>(`/payments/${paymentId}/status`);
  },
};

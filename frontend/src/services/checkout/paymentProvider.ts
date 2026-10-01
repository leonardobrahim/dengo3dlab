export interface PaymentDetails {
  method: 'pix' | 'credit_card';
  amount: number;
  // CC specific
  cardNumber?: string;
  cardName?: string;
  cardExpiry?: string;
  cardCvv?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
  // Pix specific
  qrCode?: string;
  pixCopyPaste?: string;
  expiresAt?: Date;
}

export interface PaymentProvider {
  createPayment(details: PaymentDetails): Promise<PaymentResult>;
  confirmPayment(transactionId: string): Promise<boolean>;
  cancelPayment(transactionId: string): Promise<boolean>;
  refundPayment(transactionId: string): Promise<boolean>;
}

// Arquitetura preparada para integração com Mercado Pago, Stripe, Pagar.me
export class MockPaymentProvider implements PaymentProvider {
  async createPayment(details: PaymentDetails): Promise<PaymentResult> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (details.amount <= 0) {
      return { success: false, error: 'Valor inválido para pagamento.' };
    }

    const transactionId = `txn_${Date.now()}`;

    if (details.method === 'pix') {
      return {
        success: true,
        transactionId,
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=mock_pix_code',
        pixCopyPaste: '00020126580014br.gov.bcb.pix0136dengo-3d-mock-code-123456789',
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 mins
      };
    }

    if (details.method === 'credit_card') {
      // Mock validation
      const cleaned = details.cardNumber?.replace(/\D/g, '') || '';
      if (cleaned.length < 14) {
         return { success: false, error: 'Cartão de crédito inválido (mock).' };
      }
      return {
        success: true,
        transactionId,
      };
    }

    return { success: false, error: 'Método de pagamento não suportado.' };
  }

  async confirmPayment(transactionId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  async cancelPayment(transactionId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  async refundPayment(transactionId: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }
}

export const paymentProvider = new MockPaymentProvider();

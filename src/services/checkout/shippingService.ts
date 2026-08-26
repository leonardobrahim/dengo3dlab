export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
}

export class ShippingService {
  async calculateShipping(cep: string): Promise<ShippingOption[]> {
    // Mock network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const cleanCep = cep.replace(/\D/g, '');
    if (!cleanCep || cleanCep.length !== 8) {
      throw new Error('CEP inválido');
    }

    return [
      {
        id: 'pac',
        name: 'PAC (Correios)',
        price: 15.9,
        estimatedDays: 7,
      },
      {
        id: 'sedex',
        name: 'SEDEX (Correios)',
        price: 32.5,
        estimatedDays: 3,
      },
      {
        id: 'transportadora',
        name: 'Transportadora Dengo',
        price: 22.0,
        estimatedDays: 5,
      },
    ];
  }
}

export const shippingService = new ShippingService();

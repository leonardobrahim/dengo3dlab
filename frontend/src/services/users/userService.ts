import { ENV } from '@/src/config/env';
import { apiClient } from '../api/apiClient';
import { User, Address, ApiResponse } from '@/src/types';
import { mockUsers } from '@/src/mocks';

export const userService = {
  async getProfile(): Promise<ApiResponse<User>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return { success: true, data: mockUsers[0], statusCode: 200 };
    }
    return apiClient.get<User>('/users/me');
  },

  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const updatedUser = { ...mockUsers[0], ...data, updatedAt: new Date().toISOString() };
      return { success: true, data: updatedUser, message: 'Perfil atualizado com sucesso', statusCode: 200 };
    }
    return apiClient.patch<User>('/users/me', data);
  },

  async saveAddress(address: Partial<Address>): Promise<ApiResponse<Address>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const newAddress: Address = {
        id: address.id || `addr-${Date.now()}`,
        userId: mockUsers[0].id,
        name: address.name || 'Novo Endereço',
        recipientName: address.recipientName || mockUsers[0].name,
        zipCode: address.zipCode || '01310-100',
        street: address.street || '',
        number: address.number || '',
        neighborhood: address.neighborhood || '',
        city: address.city || '',
        state: address.state || 'SP',
        ...address,
      };
      return { success: true, data: newAddress, message: 'Endereço salvo com sucesso', statusCode: 200 };
    }
    return apiClient.post<Address>('/users/me/addresses', address);
  },
};

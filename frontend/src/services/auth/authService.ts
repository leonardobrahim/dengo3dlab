import { ENV } from '@/src/config/env';
import { apiClient } from '../api/apiClient';
import { User, ApiResponse } from '@/src/types';
import { mockUsers, mockAdminUser } from '@/src/mocks';
import { LoginFormData, RegisterFormData } from '@/src/schemas';

export interface AuthResponseData {
  user: User;
  token: string;
  refreshToken?: string;
}

export const authService = {
  async login(credentials: LoginFormData): Promise<ApiResponse<AuthResponseData>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 350));
      let user = mockUsers.find(u => u.email === credentials.email);
      if (!user && credentials.email.includes('admin')) {
        user = mockAdminUser;
      }
      
      if (!user) {
        throw new Error('Usuário ou senha incorretos');
      }

      const token = `mock_jwt_token_${Date.now()}_${user.id}`;
      apiClient.setToken(token);
      return {
        success: true,
        data: { user, token },
        message: 'Login realizado com sucesso',
        statusCode: 200,
      };
    }

    const response = await apiClient.post<AuthResponseData>('/auth/login', credentials);
    if (response.data?.token) {
      apiClient.setToken(response.data.token);
    }
    return response;
  },

  async register(data: RegisterFormData): Promise<ApiResponse<AuthResponseData>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const newUser: User = {
        id: `usr-${Date.now()}`,
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        role: 'customer',
        addresses: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const token = `mock_jwt_token_${Date.now()}_${newUser.id}`;
      apiClient.setToken(token);
      return {
        success: true,
        data: { user: newUser, token },
        message: 'Conta criada com sucesso',
        statusCode: 201,
      };
    }

    const response = await apiClient.post<AuthResponseData>('/auth/register', data);
    if (response.data?.token) {
      apiClient.setToken(response.data.token);
    }
    return response;
  },

  async getCurrentUser(): Promise<ApiResponse<User>> {
    if (ENV.USE_MOCK_API) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      return {
        success: true,
        data: mockUsers[0],
        statusCode: 200,
      };
    }
    return apiClient.get<User>('/auth/me');
  },

  async logout(): Promise<void> {
    apiClient.setToken(null);
    if (!ENV.USE_MOCK_API) {
      await apiClient.post('/auth/logout').catch(() => {});
    }
  },
};

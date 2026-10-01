import { create } from 'zustand';
import { User } from '@/src/types';
import { authService } from '@/src/services/auth/authService';
import { LoginFormData, RegisterFormData } from '@/src/schemas';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (credentials: LoginFormData | { email: string; password?: string }, customToken?: string) => Promise<boolean>;
  register: (data: RegisterFormData | Partial<User>, customToken?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  updateUser: (data: Partial<User>) => void;
  clearError: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials, customToken) => {
    set({ isLoading: true, error: null });
    try {
      if (customToken && 'name' in credentials) {
        // Direct mock login
        const mockUser = credentials as unknown as User;
        set({
          user: mockUser,
          token: customToken,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }

      const response = await authService.login(credentials as LoginFormData);
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (err: any) {
      set({
        error: err.message || 'Erro ao realizar login',
        isLoading: false,
      });
      return false;
    }
  },

  register: async (data, customToken) => {
    set({ isLoading: true, error: null });
    try {
      if (customToken && 'name' in data) {
        const mockUser = data as unknown as User;
        set({
          user: mockUser,
          token: customToken,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }

      const response = await authService.register(data as RegisterFormData);
      set({
        user: response.data.user,
        token: response.data.token,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (err: any) {
      set({
        error: err.message || 'Erro ao criar conta',
        isLoading: false,
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore
    }
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },

  updateUser: (data) => {
    const current = get().user;
    if (current) {
      set({
        user: { ...current, ...data, updatedAt: new Date().toISOString() },
      });
    }
  },

  clearError: () => set({ error: null }),

  initialize: async () => {
    try {
      const res = await authService.getCurrentUser();
      if (res.data) {
        set({ user: res.data, isAuthenticated: true });
      }
    } catch {
      // Not logged in or expired
    }
  },
}));

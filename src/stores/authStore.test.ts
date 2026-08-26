import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().logout();
  });

  it('should initialize unauthenticated', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it('should authenticate user and set state', () => {
    const mockUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      avatarUrl: ''
    };

    useAuthStore.getState().login(mockUser, 'mock-token-123');

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.name).toBe('Test User');
    expect(state.token).toBe('mock-token-123');
  });

  it('should clear state on logout', async () => {
    const mockUser = {
      id: '123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'user',
      avatarUrl: ''
    };

    const store = useAuthStore.getState();
    await store.login(mockUser, 'mock-token-123');
    
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    
    await store.logout();
    
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
    expect(useAuthStore.getState().token).toBeNull();
  });
});

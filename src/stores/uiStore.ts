import { create } from 'zustand';

export type ThemeMode = 'light' | 'dark';

interface UIState {
  theme: ThemeMode;
  isSidebarOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchModalOpen: boolean;
  activeModal: string | null;

  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setCartDrawerOpen: (isOpen: boolean) => void;
  setSearchModalOpen: (isOpen: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'light',
  isSidebarOpen: false,
  isCartDrawerOpen: false,
  isSearchModalOpen: false,
  activeModal: null,

  setTheme: (theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: 'light' });
  },

  toggleTheme: () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('dark');
    }
    set({ theme: 'light' });
  },

  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setCartDrawerOpen: (isCartDrawerOpen) => set({ isCartDrawerOpen }),
  setSearchModalOpen: (isSearchModalOpen) => set({ isSearchModalOpen }),
  openModal: (activeModal) => set({ activeModal }),
  closeModal: () => set({ activeModal: null }),
}));

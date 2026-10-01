import { create } from 'zustand';

interface UIState {
  isSidebarOpen: boolean;
  isCartDrawerOpen: boolean;
  isSearchModalOpen: boolean;
  activeModal: string | null;

  setSidebarOpen: (isOpen: boolean) => void;
  setCartDrawerOpen: (isOpen: boolean) => void;
  setSearchModalOpen: (isOpen: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isCartDrawerOpen: false,
  isSearchModalOpen: false,
  activeModal: null,

  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  setCartDrawerOpen: (isCartDrawerOpen) => set({ isCartDrawerOpen }),
  setSearchModalOpen: (isSearchModalOpen) => set({ isSearchModalOpen }),
  openModal: (activeModal) => set({ activeModal }),
  closeModal: () => set({ activeModal: null }),
}));

import { create } from 'zustand';

export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastItem = { ...toast, id, duration: toast.duration || 4000 };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, newToast.duration);
    }

    return id;
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  clearToasts: () => set({ toasts: [] }),
}));

export function useToast() {
  const { toasts, addToast, removeToast, clearToasts } = useToastStore();

  const toast = (props: { title: string; description?: string; type?: ToastType; duration?: number }) => {
    return addToast(props);
  };

  toast.success = (title: string, description?: string) => addToast({ title, description, type: 'success' });
  toast.error = (title: string, description?: string) => addToast({ title, description, type: 'error' });
  toast.warning = (title: string, description?: string) => addToast({ title, description, type: 'warning' });
  toast.info = (title: string, description?: string) => addToast({ title, description, type: 'info' });

  return { toast, toasts, removeToast, clearToasts };
}

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WishlistState {
  productIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: ['prod-1'],

      toggleWishlist: (productId) => {
        set((state) => {
          const exists = state.productIds.includes(productId);
          return {
            productIds: exists
              ? state.productIds.filter((id) => id !== productId)
              : [...state.productIds, productId],
          };
        });
      },

      isInWishlist: (productId) => {
        return get().productIds.includes(productId);
      },

      isWishlisted: (productId) => {
        return get().productIds.includes(productId);
      },

      clearWishlist: () => set({ productIds: [] }),
    }),
    {
      name: 'dengo-wishlist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

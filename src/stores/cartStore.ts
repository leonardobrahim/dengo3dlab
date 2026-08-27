import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Coupon, Address } from '@/src/types';

interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
  shippingAddress: Address | null;
  shippingCost: number;

  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setCoupon: (coupon: Coupon | null) => void;
  setShippingAddress: (address: Address | null) => void;
  setShippingCost: (cost: number) => void;

  // Computed helper getters
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getTotalItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,
      shippingAddress: null,
      shippingCost: 0,

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.variantId === item.variantId
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const newQty = Math.min(
              updated[existingIndex].quantity + item.quantity,
              item.maxStock || 99
            );
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: newQty,
            };
            return { items: updated };
          }

          const newItem: CartItem = {
            ...item,
            id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          };
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId
              ? { ...item, quantity: Math.min(quantity, item.maxStock || 99) }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], coupon: null, shippingCost: 0 });
      },

      setCoupon: (coupon) => {
        set({ coupon });
      },

      setShippingAddress: (address) => {
        set({ shippingAddress: address });
      },

      setShippingCost: (cost) => {
        set({ shippingCost: cost });
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
      },

      getDiscount: () => {
        const { coupon, shippingCost } = get();
        const subtotal = get().getSubtotal();
        if (!coupon) return 0;

        if (coupon.discountType === 'percentage') {
          const disc = (subtotal * coupon.discountValue) / 100;
          return coupon.maxDiscountValue ? Math.min(disc, coupon.maxDiscountValue) : disc;
        }

        if (coupon.discountType === 'free_shipping') {
          return shippingCost;
        }

        return Math.min(coupon.discountValue, subtotal);
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const { shippingCost } = get();
        return Math.max(0, subtotal - discount + shippingCost);
      },

      getTotalItemsCount: () => {
        const { items } = get();
        return items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'dengo-cart-storage',
      // Ensure we don't persist functions (Zustand persist handles this fine typically, but we should be aware getters are functions).
    }
  )
);

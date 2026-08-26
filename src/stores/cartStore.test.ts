import { describe, it, expect, beforeEach } from 'vitest';
import { useCartStore } from './cartStore';

describe('CartStore', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('should start with an empty cart', () => {
    expect(useCartStore.getState().items.length).toBe(0);
    expect(useCartStore.getState().getSubtotal()).toBe(0);
  });

  it('should add items to cart', () => {
    useCartStore.getState().addItem({
      productId: 'p-1',
      variantId: 'v-1',
      sku: 'SKU-1',
      productName: 'Product 1',
      productSlug: 'product-1',
      variantName: 'Base',
      unitPrice: 100,
      quantity: 1,
      imageUrl: 'img.png',
      maxStock: 10
    });

    const state = useCartStore.getState();
    expect(state.items.length).toBe(1);
    expect(state.items[0].productName).toBe('Product 1');
    expect(state.getSubtotal()).toBe(100);
  });

  it('should update item quantities', () => {
    const store = useCartStore.getState();
    store.addItem({
      productId: 'p-1',
      variantId: 'v-1',
      sku: 'SKU-1',
      productName: 'Product 1',
      productSlug: 'product-1',
      variantName: 'Base',
      unitPrice: 100,
      quantity: 1,
      imageUrl: 'img.png',
      maxStock: 10
    });
    
    // We need the generated ID
    const addedItemId = useCartStore.getState().items[0].id;
    store.updateQuantity(addedItemId, 3);
    
    expect(useCartStore.getState().items[0].quantity).toBe(3);
    expect(useCartStore.getState().getSubtotal()).toBe(300);
  });

  it('should apply and calculate coupon discounts', () => {
    const store = useCartStore.getState();
    store.addItem({
      productId: 'p-1',
      variantId: 'v-1',
      sku: 'SKU-1',
      productName: 'Product 1',
      productSlug: 'product-1',
      variantName: 'Base',
      unitPrice: 200,
      quantity: 1,
      imageUrl: 'img.png',
      maxStock: 10
    });

    store.setCoupon({
      id: 'coupon-1',
      code: 'PROMO10',
      discountType: 'percentage',
      discountValue: 10,
      isActive: true,
      minOrderValue: 0,
      description: 'Test coupon',
      expiresAt: '2027-01-01T00:00:00Z'
    });

    expect(useCartStore.getState().getDiscount()).toBe(20);
    expect(useCartStore.getState().getTotal()).toBe(180);
  });
});


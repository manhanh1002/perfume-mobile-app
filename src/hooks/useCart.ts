
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Cart, Product, CartItem } from '@/types';

interface CartState extends Cart {
  addItem: (product: Product, quantity: number, size: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromo: (code: string) => void;
}

const calculateTotals = (items: CartItem[], discount: number = 0) => {
  const subtotal = items.reduce((sum, item) => sum + item.priceAtTime * item.quantity, 0);
  const shipping = subtotal > 1500000 ? 0 : 30000; // Free shipping over 1.5M VND
  const tax = subtotal * 0.1; // 10% VAT
  const total = subtotal + shipping + tax - discount;
  return { subtotal, shipping, tax, total };
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,
      promoCode: undefined,
      discount: 0,
      giftWrap: false,
      giftMessage: undefined,

      addItem: (product, quantity, size) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          item => item.productId === product.id && item.selectedSize === size
        );

        let newItems;
        if (existingItemIndex > -1) {
          newItems = [...currentItems];
          newItems[existingItemIndex].quantity += quantity;
        } else {
          newItems = [
            ...currentItems,
            {
              productId: product.id,
              quantity,
              selectedSize: size,
              priceAtTime: product.price,
              addedAt: new Date(),
              // We need to store minimal product info to display in cart without fetching
              name: product.name,
              image: product.images[0],
              brand: product.brand
            } as CartItem & { name: string; image: string; brand: string } // Extending type locally for convenience
          ];
        }

        set({ items: newItems, ...calculateTotals(newItems, get().discount) });
      },

      removeItem: (productId) => {
        const newItems = get().items.filter(item => item.productId !== productId);
        set({ items: newItems, ...calculateTotals(newItems, get().discount) });
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        const newItems = get().items.map(item => 
          item.productId === productId ? { ...item, quantity } : item
        );
        set({ items: newItems, ...calculateTotals(newItems, get().discount) });
      },

      clearCart: () => set({ 
        items: [], 
        subtotal: 0, 
        shipping: 0, 
        tax: 0, 
        total: 0,
        discount: 0,
        promoCode: undefined
      }),

      applyPromo: (code) => {
        if (code === 'WELCOME10') {
          const discount = get().subtotal * 0.1;
          set({ promoCode: code, discount, ...calculateTotals(get().items, discount) });
        }
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

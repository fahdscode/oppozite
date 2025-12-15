import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';
import { ShopifyProduct, ShopifyCartItem, createStorefrontCheckout } from '@/lib/shopify';

interface CartStore {
  items: ShopifyCartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isCartOpen: boolean;

  // Actions
  addItem: (item: ShopifyCartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  createCheckout: () => Promise<void>;
  openCart: () => void;
  closeCart: () => void;

  // Computed
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isCartOpen: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        const availableStock = item.quantityAvailable ?? Infinity; // Default to infinity if not tracked/available

        if (existingItem) {
          const newQuantity = existingItem.quantity + item.quantity;
          if (newQuantity > availableStock) {
            toast.error("Cannot add to cart", {
              description: `Only ${availableStock} items available in stock`
            });
            return;
          }

          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: newQuantity }
                : i
            ),
            isCartOpen: true,
          });
        } else {
          if (item.quantity > availableStock) {
            toast.error("Cannot add to cart", {
              description: `Only ${availableStock} items available in stock`
            });
            return;
          }
          set({ items: [...items, item], isCartOpen: true });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        const item = get().items.find(i => i.variantId === variantId);
        if (item) {
          const availableStock = item.quantityAvailable ?? Infinity;
          if (quantity > availableStock) {
            toast.error("Cannot update quantity", {
              description: `Only ${availableStock} items available in stock`
            });
            return;
          }
        }

        set({
          items: get().items.map(item =>
            item.variantId === variantId ? { ...item, quantity } : item
          )
        });
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      createCheckout: async () => {
        const { items, setLoading, setCheckoutUrl } = get();
        if (items.length === 0) return;

        setLoading(true);
        try {
          const checkoutUrl = await createStorefrontCheckout(items);
          setCheckoutUrl(checkoutUrl);
          window.open(checkoutUrl, '_blank');
        } catch (error) {
          console.error('Failed to create checkout:', error);
        } finally {
          setLoading(false);
        }
      },

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);
      },
    }),
    {
      name: 'oppozite-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);

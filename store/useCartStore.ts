import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  variantId?: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  attributes: Record<string, string>;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          // Unique ID combination of Product + Variant
          const itemKey = newItem.variantId || newItem.productId;
          const existing = state.items.find(
            (i) => (i.variantId || i.productId) === itemKey,
          );

          if (existing) {
            const totalQty = Math.min(
              existing.quantity + newItem.quantity,
              newItem.stock,
            );
            return {
              items: state.items.map((i) =>
                (i.variantId || i.productId) === itemKey
                  ? { ...i, quantity: totalQty }
                  : i,
              ),
            };
          }
          return { items: [...state.items, newItem] };
        }),
      updateQuantity: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            (i.variantId || i.productId) === id
              ? { ...i, quantity: Math.min(qty, i.stock) }
              : i,
          ),
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => (i.variantId || i.productId) !== id),
        })),
      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      },
    }),
    { name: "shopping-cart" },
  ),
);

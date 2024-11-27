import { Product } from "@prisma/client";
import { create } from "zustand";
import { OrderItem } from "../types";

interface Store {
  order: OrderItem[];
  addToOrder: (product: Product) => void;
}

export const useStore = create<Store>((set) => ({
  order: [],
  addToOrder: (product) => {
    const { id, name, price } = product;
    set((state) => ({
      order: [
        ...state.order,
        { id, name, price, quantity: 1, subtotal: 1 * product.price },
      ],
    }));
  },
}));

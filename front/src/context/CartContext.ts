import { createContext } from "react";
import type { Cart, CartItemRequest, CartItem } from "../types/cartTypes";

type CartContextType = {
  carrito: Cart | null;
  addItem: (payload: {
    guestItem?: CartItem;
    authItem?: CartItemRequest;
  }) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  updateItem: (itemId: string, cantidad: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | null>(null)
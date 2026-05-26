import type { Cart, CartItem } from "../types/cartTypes";
import { useState } from "react";
import { guestCartService } from "../services/GuestCartService";

export interface UseGuestCartReturnType {
  guestCart: Cart;
  handleAddCartItem: (cartItem: CartItem) => void;
  handleRemoveCartItem: (itemId: string) => void;
  handleUpdateCartItem: (itemId: string, cantidad: number) => void;
}

export const useGuestCart = (): UseGuestCartReturnType => {
  const [guestCart, setGuestCart] = useState<Cart>(()=> guestCartService.getCart());

  const handleAddCartItem = (cartItem: CartItem) => {
    const updatedCart = guestCartService.addCartItem(cartItem)
    setGuestCart(updatedCart)
  }

  const handleRemoveCartItem = (itemId: string) => {
    const updatedCart = guestCartService.removeCartItem(itemId)
    setGuestCart(updatedCart)
  }

  const handleUpdateCartItem = (itemId: string, cantidad: number) => {
    const updatedCart = guestCartService.updateCartItem(itemId, cantidad)
    setGuestCart(updatedCart)
  }

  return {
    guestCart,
    handleAddCartItem,
    handleRemoveCartItem,
    handleUpdateCartItem
  }

}
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { CartContext } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import type { Cart, CartItem, CartItemRequest } from "../types/cartTypes";
import { authCartService } from "../services/AuthcartService";
import { useGuestCart } from "../hooks/useGuestCart";
import type { ReactNode } from "react";

type CartProviderPropsType = {
  children: ReactNode
}

export function CartProvider({ children } : CartProviderPropsType) {

  const { user, token } = useAuth()
  const queryClient = useQueryClient()
  const isAuthenticated = !!user
  const { guestCart, handleAddCartItem, handleRemoveCartItem, handleUpdateCartItem } = useGuestCart()

  const { data: authCart = null } = useQuery<Cart | null>({
    queryKey: ["cart", user?.id],
    queryFn: ()=> authCartService.getCart(token!),
    enabled: isAuthenticated
  })

  const carrito = isAuthenticated ? authCart : guestCart;

  const addItem = async ({
    guestItem,
    authItem
  }: {
    guestItem?: CartItem;
    authItem?: CartItemRequest;
  }): Promise<void> => {
    if(isAuthenticated) {
      if (!authItem) {
        return
      }

      await authCartService.addCartItem(authItem, token!)
      queryClient.invalidateQueries({
        queryKey: ["cart", user?.id]
      })
    } else {
      if (!guestItem) {
        return
      }

      handleAddCartItem(guestItem)
    }
  }

  const removeItem= async (itemId: string): Promise<void> => {
    if(isAuthenticated) {
      await authCartService.removeCartItem(itemId, token!)
      queryClient.invalidateQueries({
        queryKey: ["cart", user?.id]
      })
    } else {
      handleRemoveCartItem(itemId)
    }
  }
  const updateItem= async (itemId: string, cantidad: number): Promise<void> => {
    if(isAuthenticated) {
      await authCartService.updateCartItem(itemId, cantidad, token!)
      queryClient.invalidateQueries({
        queryKey: ["cart", user?.id]
      })
    } else {
      handleUpdateCartItem(itemId, cantidad)
    }
  }

  return (
   <CartContext.Provider value={{
      carrito,
      addItem,
      removeItem,
      updateItem

   }}>
      {children}
   </CartContext.Provider> 
  )
}
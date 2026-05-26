import type { Cart, CartItemRequest } from "../types/cartTypes"
import type { ErrorResponseType } from "../types/genericTypes"
import { BASE_API_URL } from "../config/api"

export const authCartService = {

  async getCart(token: string) : Promise<Cart | null> {
    const response = await fetch(`${BASE_API_URL}/Carrito`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      if(!response.ok) {
        return null
      }
  
      const data: Cart = await response.json()
      return data
  },
  
  async addCartItem(cartItemRequest: CartItemRequest, token: string) : Promise<void> {
    
    const response = await fetch(`${BASE_API_URL}/Carrito/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(cartItemRequest)
    })
  
    if (!response.ok) {
      const errorData: ErrorResponseType = await response.json()
      throw new Error(errorData.message || "Error al agregar el producto al carrito")
    }
  
  },
  
  async removeCartItem(itemId: string, token: string) : Promise<void>{
    const response = await fetch(`${BASE_API_URL}/Carrito/item/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
    })
  
    if (!response.ok) {
      const errorData: ErrorResponseType = await response.json()
      throw new Error(errorData.message || "Error al remover el producto al carrito")
    }
  },
  
  async updateCartItem(itemId: string, cantidad: number, token: string) : Promise<void> {
    const response = await fetch(`${BASE_API_URL}/Carrito/item/${itemId}/cantidad`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ cantidad })
    })
  
    if (!response.ok) {
      const errorData: ErrorResponseType = await response.json()
      throw new Error(errorData.message || "Error al actualizar la cantidad del producto en el carrito")
    }
  }
}

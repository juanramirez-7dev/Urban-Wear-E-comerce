import type { Cart, CartItem } from "../types/cartTypes"

export const guestCartService = {
  getCart (){
    const data = localStorage.getItem("guest_cart")
    return data ? JSON.parse(data) as Cart : { id: "", items: []}
  },

  addCartItem (cartItem: CartItem): Cart {
    const cart = this.getCart()
    const existingItem = cart.items.find(
      item => item.productoVarianteId === cartItem.productoVarianteId
    )

    if (existingItem) {
      const maxStock = existingItem.stock ?? cartItem.stock
      let nextQty = existingItem.cantidad + cartItem.cantidad

      if (typeof maxStock === "number") {
        nextQty = Math.min(nextQty, maxStock)
      }

      if (nextQty <= 0) {
        cart.items = cart.items.filter(item => item.id !== existingItem.id)
      } else {
        existingItem.cantidad = nextQty
        if (typeof maxStock === "number") {
          existingItem.stock = maxStock
        }
      }
    } else {
      let nextQty = cartItem.cantidad
      if (typeof cartItem.stock === "number") {
        nextQty = Math.min(nextQty, cartItem.stock)
      }

      if (nextQty > 0) {
        cart.items.push({
          ...cartItem,
          cantidad: nextQty
        })
      }
    }
    localStorage.setItem("guest_cart", JSON.stringify(cart))
    return cart
  },
  removeCartItem (itemId: string): Cart{
    const cart = this.getCart()
    cart.items = cart.items.filter(item => item.id !== itemId)
    localStorage.setItem("guest_cart", JSON.stringify(cart))
    return cart
  },

  updateCartItem (itemId: string, cantidad: number): Cart{
    const cart = this.getCart()
    const itemIndex = cart.items.findIndex(item => item.id === itemId)
    if (itemIndex !== -1) {
      const current = cart.items[itemIndex]
      const maxStock = current.stock
      let nextQty = cantidad

      if (typeof maxStock === "number") {
        nextQty = Math.min(nextQty, maxStock)
      }

      if (nextQty <= 0) {
        cart.items = cart.items.filter(item => item.id !== itemId)
      } else {
        current.cantidad = nextQty
      }
      localStorage.setItem("guest_cart", JSON.stringify(cart))
      return cart
    }
    return cart
  }
}
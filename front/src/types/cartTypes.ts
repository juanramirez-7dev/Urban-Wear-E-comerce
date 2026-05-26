interface CartItem {
  id: string;
  imagenPrincipal: string;
  nombre: string;
  talla: string;
  cantidad: number;
  precio: number;
  productoVarianteId: string;
  stock?: number;
}

interface Cart {
  id: string;
  items: CartItem[];
}

interface CartItemRequest {
  cantidad: number;
  carritoId?: string;
  productoVarianteId: string;
}

export type {
  Cart,
  CartItem,
  CartItemRequest
}
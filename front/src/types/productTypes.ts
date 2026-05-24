interface Product {
  id: string,
  nombre: string,
  precio: number,
  imagenPrincipal: string
}

interface ProductDetails extends Product {
  descripcion: string
}

export type {
  Product,
  ProductDetails
}
interface Product {
  id: string,
  nombre: string,
  precio: number,
  imagenPrincipal: string
}

interface PrductImage {
  id: string,
  url: string,
}

interface ProductoVariante {
  id: string,
  stock: number,
  talla : string,
}

interface ProductDetails extends Product {
  descripcion: string,
  imagenes: PrductImage[],
  variantes: ProductoVariante[],
}

interface ProductPagedResponse {
  items: Product[];
  total: number;
  limit: number;
  offset: number;
}

interface Params {
  limit?: number;
  offset?: number;
  categoriaId?: string | number;
  min?: number;
  max?: number;
};

export type {
  Product,
  ProductDetails,
  ProductPagedResponse,
  Params
}
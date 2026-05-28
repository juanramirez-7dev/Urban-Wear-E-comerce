interface Product {
  id: string,
  nombre: string,
  precio: number,
  imagenPrincipal: string,
  categoriaNombre: string,
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

interface ProductoVarianteRequest { 
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

interface ProductRequest {
  nombre: string,
  descripcion: string,
  precio: number,
  imaenPrincipal: File,
  categoriaId: string
  imagenes: File[],
  variantes: string
}

type Talla = "S" | "M" | "L" | "XL" 


export type {
  Product,
  ProductoVariante,
  ProductDetails,
  ProductPagedResponse,
  Params,
  ProductRequest,
  ProductoVarianteRequest,
  Talla
}
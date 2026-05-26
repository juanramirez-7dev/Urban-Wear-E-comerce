import { LoadingState } from "../ui/LoadingState";
import { ProductCard } from "../products/ProductCard";
import type { Product } from "../../types/productTypes";

export interface ShopProductGridProps {
  readonly title: string;
  readonly products: ReadonlyArray<Product>;
  readonly isLoading: boolean;
  readonly isError: boolean;
}

export function ShopProductGrid({
  title,
  products,
  isLoading,
  isError
}: Readonly<ShopProductGridProps>) {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <h1 className="font-display-lg text-display-lg uppercase">{title}</h1>
      </div>
      {isLoading ? (
        <LoadingState label="Loading products" />
      ) : isError ? (
        <p className="font-body-md text-secondary">
          No pudimos cargar los productos.
        </p>
      ) : products.length === 0 ? (
        <p className="font-body-md text-secondary">
          No hay productos para los filtros seleccionados.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </section>
  );
}

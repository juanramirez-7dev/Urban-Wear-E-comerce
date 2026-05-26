import { ProductCard } from "../products/ProductCard";
import { LoadingState } from "../ui/LoadingState";
import type { ProductPagedResponse } from "../../types/productTypes";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productService";


export interface LandingFeaturedProductsProps {
  label: string;
  title: string;
  viewAllLabel: string;
}

export function LandingFeaturedProducts({
  label,
  title,
  viewAllLabel
}: Readonly<LandingFeaturedProductsProps>) {

  const { data: products = null, isLoading } = useQuery<ProductPagedResponse | null>({
    queryKey: ["featuredProducs"],
    queryFn: () => getProducts({ limit: 4, offset: 0 }),
  })

  const featuredItems = products?.items ?? []

  if (isLoading) {
    return (
      <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="flex justify-between items-end mb-stack-lg">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">
              {label}
            </span>
            <h2 className="font-display-lg text-headline-md md:text-display-lg-mobile uppercase mt-2">
              {title}
            </h2>
          </div>
          <a
            className="font-label-md text-label-md uppercase tracking-widest border-b border-primary pb-1 hover:opacity-70 transition-opacity"
            href="#"
          >
            {viewAllLabel}
          </a>
        </div>
        <LoadingState label="Loading products" />
      </section>
    );
  }

  return (
    <section className="py-stack-lg px-margin-mobile md:px-margin-desktop bg-surface-container-low">
      <div className="flex justify-between items-end mb-stack-lg">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-[0.2em] text-secondary">
            {label}
          </span>
          <h2 className="font-display-lg text-headline-md md:text-display-lg-mobile uppercase mt-2">
            {title}
          </h2>
        </div>
        <a
          className="font-label-md text-label-md uppercase tracking-widest border-b border-primary pb-1 hover:opacity-70 transition-opacity"
          href="#"
        >
          {viewAllLabel}
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-gutter gap-y-stack-md">
        {featuredItems.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            nombre={product.nombre}
            precio={product.precio}
            imagenPrincipal={product.imagenPrincipal}
          />
        ))}
      </div>
    </section>
  );
}

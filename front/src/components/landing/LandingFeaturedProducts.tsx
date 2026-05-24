import { ProductCard } from "../products/ProductCard";

export interface FeaturedProduct {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
}

export interface LandingFeaturedProductsProps {
  label: string;
  title: string;
  viewAllLabel: string;
  products: ReadonlyArray<FeaturedProduct>;
}

export function LandingFeaturedProducts({
  label,
  title,
  viewAllLabel,
  products
}: Readonly<LandingFeaturedProductsProps>) {
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
        {products.map((product) => (
          <ProductCard key={product.id} id={product.id} title={product.title} price={product.price} imageUrl={product.imageUrl} imageAlt={product.imageAlt} />
        ))}
      </div>
    </section>
  );
}

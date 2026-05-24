import { Link } from "react-router";

export interface ProductCardProps {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  imageAlt: string;
}

export function ProductCard({
  id,
  title,
  price,
  imageUrl,
  imageAlt
}: Readonly<ProductCardProps>) {
  return (
    <Link to={`/product?id=${encodeURIComponent(id)}`} className="group block">
      <div className="aspect-3/4 overflow-hidden mb-4 relative bg-surface-container-lowest">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={imageAlt}
          src={imageUrl}
        />
        <button
          className="absolute bottom-4 right-4 bg-surface-container-lowest p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label={`Add ${title} to cart`}
        >
          <span className="material-symbols-outlined text-primary">add</span>
        </button>
      </div>
      <h4 className="font-label-md text-label-md uppercase tracking-widest">
        {title}
      </h4>
      <p className="font-body-md text-secondary mt-1">{price}</p>
    </Link>
  );
}

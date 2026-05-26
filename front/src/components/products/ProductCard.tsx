import { Link } from "react-router";
import type { Product } from "../../types/productTypes";


export function ProductCard({
  id,
  nombre,
  precio,
  imagenPrincipal
}: Readonly<Product>) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(precio);

  return (
    <Link to={`/product?id=${encodeURIComponent(id)}`} className="group block">
      <div className="aspect-3/4 overflow-hidden mb-4 relative bg-surface-container-lowest">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={nombre}
          src={imagenPrincipal}
        />
      </div>
      <h4 className="font-label-md text-label-md uppercase tracking-widest">
        {nombre}
      </h4>
      <p className="font-body-md text-secondary mt-1">{formattedPrice}</p>
    </Link>
  );
}

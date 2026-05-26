import { useCart } from "../../hooks/useCart";
import type { CartItem as CartItemType } from "../../types/cartTypes";

export function CartItem({
  id,
  imagenPrincipal,
  nombre,
  talla,
  cantidad,
  precio,
  productoVarianteId
}: CartItemType) {
  const { removeItem, updateItem } = useCart();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(precio);

  const handleDecrease = async () => {
    const nextQty = cantidad - 1;
    if (nextQty <= 0) {
      await removeItem(id);
      return;
    }

    await updateItem(id, nextQty);
  };

  const handleIncrease = async () => {
    await updateItem(id, cantidad + 1);
  };

  return (
    <article className="flex flex-col md:flex-row gap-6 border-b border-outline-variant pb-6">
      <div className="w-full md:w-36 aspect-3/4 bg-surface-container-low overflow-hidden">
        <img
          src={imagenPrincipal}
          alt={nombre}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-label-lg text-label-lg uppercase text-primary">
              {nombre}
            </h3>
            <p className="font-label-sm text-label-sm uppercase text-secondary mt-1">
              Talla {talla}
            </p>
            <p className="font-body-md text-body-md text-primary mt-2">
              {formattedPrice}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(id)}
            className="text-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            Remove
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-outline-variant">
            <button
              type="button"
              onClick={handleDecrease}
              className="px-3 py-2 text-secondary hover:text-primary transition-colors"
              aria-label="Disminuir cantidad"
            >
              -
            </button>
            <span className="px-4 py-2 font-label-md text-label-md text-primary">
              {cantidad}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              className="px-3 py-2 text-secondary hover:text-primary transition-colors"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
          <span className="text-xs text-secondary">SKU {productoVarianteId}</span>
        </div>
      </div>
    </article>
  );
}

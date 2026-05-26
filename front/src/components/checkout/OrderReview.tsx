import type { CartItem } from "../../types/cartTypes";

export interface OrderReviewProps {
  readonly items: ReadonlyArray<CartItem>;
}

export function OrderReview({ items }: Readonly<OrderReviewProps>) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const total = subtotal;

  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(subtotal);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(total);

  return (
    <aside className="w-full lg:w-96 border border-outline-variant p-6 bg-surface-container-lowest h-fit sticky top-24">
      <h2 className="font-label-lg text-label-lg uppercase tracking-widest text-primary mb-6">
        Order Review
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-4">
            <div className="w-16 h-20 bg-surface-container-low overflow-hidden">
              <img
                src={item.imagenPrincipal}
                alt={item.nombre}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="font-label-md text-label-md uppercase text-primary">
                {item.nombre}
              </p>
              <p className="text-xs text-secondary">Talla {item.talla}</p>
              <p className="text-xs text-secondary">Qty {item.cantidad}</p>
            </div>
            <span className="text-sm text-primary">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(item.precio * item.cantidad)}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t border-outline-variant pt-4 space-y-2">
        <div className="flex items-center justify-between text-secondary">
          <span className="font-label-sm uppercase tracking-widest">Subtotal</span>
          <span className="font-body-md text-primary">{formattedSubtotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-label-sm uppercase tracking-widest text-secondary">
            Total
          </span>
          <span className="font-headline-md text-headline-md text-primary">
            {formattedTotal}
          </span>
        </div>
      </div>
    </aside>
  );
}

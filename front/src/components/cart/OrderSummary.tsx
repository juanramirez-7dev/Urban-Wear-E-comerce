import type { CartItem } from "../../types/cartTypes";

export interface OrderSummaryProps {
  readonly items: ReadonlyArray<CartItem>;
}

export function OrderSummary({ items }: Readonly<OrderSummaryProps>) {
  const subtotal = items.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  const formattedSubtotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(subtotal);

  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(total);

  return (
    <aside className="w-full md:w-80 border border-outline-variant p-6 bg-surface-container-lowest h-fit sticky top-24">
      <h2 className="font-label-lg text-label-lg uppercase tracking-widest text-primary mb-6">
        Order Summary
      </h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-secondary">
          <span className="font-label-sm uppercase tracking-widest">Subtotal</span>
          <span className="font-body-md text-primary">{formattedSubtotal}</span>
        </div>
        <div className="flex items-center justify-between text-secondary">
          <span className="font-label-sm uppercase tracking-widest">Shipping</span>
          <span className="font-body-md text-primary">
            {shipping === 0 ? "Free" : "$" + shipping}
          </span>
        </div>
        <div className="border-t border-outline-variant pt-4 flex items-center justify-between">
          <span className="font-label-sm uppercase tracking-widest text-secondary">
            Total
          </span>
          <span className="font-headline-md text-headline-md text-primary">
            {formattedTotal}
          </span>
        </div>
      </div>
      <button className="mt-6 w-full bg-primary text-on-primary font-label-md uppercase tracking-widest py-4 hover:opacity-90 active:scale-[0.98] transition-all">
        Checkout
      </button>
    </aside>
  );
}

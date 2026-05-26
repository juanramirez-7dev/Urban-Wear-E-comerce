import { Link } from "react-router";
import { useCart } from "../hooks/useCart";
import { CartItem } from "../components/cart/CartItem";
import { OrderSummary } from "../components/cart/OrderSummary";

export default function CartPage() {
  const { carrito } = useCart();
  const items = carrito?.items ?? [];

  if (items.length === 0) {
    return (
      <main className="pt-24 pb-stack-lg container mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h1 className="font-display-md text-display-md text-primary">
            Tu carrito esta vacio
          </h1>
          <p className="text-secondary">
            Explora la tienda y agrega tus piezas favoritas.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center border border-outline-variant px-6 py-3 font-label-md uppercase tracking-widest text-primary hover:border-primary transition-colors"
          >
            Ir a la tienda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-stack-lg container mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="flex flex-col gap-10">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="font-label-sm uppercase tracking-widest text-secondary">
              Tu carrito
            </p>
            <h1 className="font-display-md text-display-md text-primary">
              Carrito de compras
            </h1>
          </div>
          <span className="text-secondary">{items.length} items</span>
        </header>
        <div className="flex flex-col lg:flex-row gap-10">
          <section className="flex-1 space-y-6">
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </section>
          <OrderSummary items={items} />
        </div>
      </div>
    </main>
  );
}

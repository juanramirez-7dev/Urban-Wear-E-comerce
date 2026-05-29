import { useState } from "react";
import { Link } from "react-router";
import { CheckoutData } from "../components/checkout/CheckoutData";
import { OrderReview } from "../components/checkout/OrderReview";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { orderService } from "../services/orderService";
import type { PedidoRequest, PedidoResponse } from "../types/orderTypes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export default function CheckoutPage() {
  const { carrito, clearCart } = useCart();
  const { user, token } = useAuth();
  const items = carrito?.items ?? [];

  const [values, setValues] = useState(() => ({
    nombre: user?.name ?? "",
    telefono: user?.telefono ?? "",
    email: user?.email ?? "",
    direccion: ""
  }));

  const navigate = useNavigate();

  const createPedidoMutation = useMutation<PedidoResponse, Error, PedidoRequest>({
    mutationFn: (pedido) => orderService.createPedido(pedido, token),
    onSuccess: (data) => {
      clearCart();
      navigate(`/bill/${data.id}`);
    },
    onError: (error) => {
      setErrorMessage(error.message || "No se pudo crear el pedido.");
    }
  })


  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const handleChange = (
    field: keyof typeof values,
    value: string
  ) => {
    setValues((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage("Tu carrito esta vacio.");
      return;
    }

    if (!values.nombre || !values.email || !values.telefono || !values.direccion) {
      setErrorMessage("Completa todos los campos para continuar.");
      return;
    }

    const pedido: PedidoRequest = {
      nombreCliente: values.nombre,
      telefonoCliente: values.telefono,
      emailCliente: values.email,
      direccion: values.direccion,
      itemsPedido: items.map((item) => ({
        productoVarianteId: item.productoVarianteId,
        cantidad: item.cantidad
      }))
    };

    createPedidoMutation.mutate(pedido);
  };

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
        <header className="flex flex-col gap-2">
          <p className="font-label-sm uppercase tracking-widest text-secondary">
            Checkout
          </p>
          <h1 className="font-display-md text-display-md text-primary">
            Checkout de compra
          </h1>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          <section className="flex-1">
            <CheckoutData
              values={values}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isSubmitting={createPedidoMutation.isPending}
              errorMessage={errorMessage ?? createPedidoMutation.error?.message ?? null}
            />
          </section>
          <OrderReview items={items} />
        </div>
      </div>
    </main>
  );
}

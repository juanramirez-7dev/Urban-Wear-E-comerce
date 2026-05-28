import { useState } from "react";
import { useSearchParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { LoadingState } from "../components/ui/LoadingState";
import { getProductDetails } from "../services/productService";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import type { CartItemRequest } from "../types/cartTypes";

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const { carrito, addItem, updateItem } = useCart();
  const { user } = useAuth();
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    null
  );
  const [selectionError, setSelectionError] = useState<string | null>(null);

  const {
    data: product,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id),
    enabled: Boolean(id)
  });

  if (!id) {
    return (
      <div className="px-margin-mobile md:px-margin-desktop py-stack-lg">
        <p className="text-primary">Product not found.</p>
        <Link to="/" className="text-primary underline">
          Back to shop
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="px-margin-mobile md:px-margin-desktop py-stack-lg">
        <LoadingState label="Loading product" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="px-margin-mobile md:px-margin-desktop py-stack-lg">
        <p className="text-primary">Product not found.</p>
        <Link to="/" className="text-primary underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(product.precio);

  const selectedVariant = product.variantes.find(
    (variant) => variant.id === selectedVariantId
  );

  const handleSelectVariant = (variantId: string, isDisabled: boolean) => {
    if (isDisabled) {
      return;
    }

    setSelectedVariantId(variantId);
    setSelectionError(null);
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      setSelectionError("Selecciona una talla para continuar.");
      return;
    }

    setSelectionError(null);

    const isGuest = !user;

    const existingItem = carrito?.items.find(
      (item) => item.productoVarianteId === selectedVariant.id
    );

    const currentQuantity = existingItem?.cantidad ?? 0;
    const nextQuantity = currentQuantity + 1;
    const maxStock = selectedVariant.stock;

    if (typeof maxStock === "number" && nextQuantity > maxStock) {
      setSelectionError("No hay mas stock disponible para esta talla.");
      return;
    }

    if (existingItem) {
      await updateItem(existingItem.id, nextQuantity);
      return;
    }

    if (isGuest && selectedVariant.stock <= 0) {
      setSelectionError("No hay stock disponible para esta talla.");
      return;
    }

    if (user) {
      const request: CartItemRequest = {
        cantidad: 1,
        productoVarianteId: selectedVariant.id,
        carritoId: carrito?.id
      };

      await addItem({ authItem: request });
      return;
    }

    await addItem({
      guestItem: {
        id: selectedVariant.id,
        imagenPrincipal: product.imagenPrincipal,
        nombre: product.nombre,
        talla: selectedVariant.talla,
        cantidad: 1,
        precio: product.precio,
        productoVarianteId: selectedVariant.id,
        stock: selectedVariant.stock
      }
    });
  };

  return (
    <main className="pt-24 pb-stack-lg container mx-auto px-margin-mobile md:px-margin-desktop">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter md:gap-stack-lg">
        <div className="md:col-span-7 lg:col-span-8">
          <div className="w-full bg-surface-container-low overflow-hidden">
            <img
              alt={product.nombre}
              className="w-full h-auto object-cover"
              src={product.imagenPrincipal}
            />
          </div>
          {product.imagenes.length > 0 ? (
            <div className="hidden md:grid md:grid-cols-2 md:gap-4 mt-4">
              {product.imagenes.map((image) => (
                <div
                  key={image.id}
                  className="aspect-3/4 bg-surface-container-low overflow-hidden"
                >
                  <img
                    className="w-full h-full object-cover"
                    src={image.url}
                    alt={product.nombre}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="md:col-span-5 lg:col-span-4 sticky top-24 self-start">
          <div className="flex flex-col gap-stack-sm">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary">
              {product.nombre}
            </h1>
            <p className="font-headline-md text-headline-md text-primary mt-2">
              {formattedPrice}
            </p>
            <div className="mt-stack-md">
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {product.descripcion}
              </p>
            </div>
            <div className="mt-stack-md">
              <div className="flex justify-between items-end mb-4">
                <span className="font-label-md text-label-md uppercase text-primary">
                  Select Size
                </span>
                <span className="font-label-sm text-label-sm text-secondary underline cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.variantes.map((variant) => {
                  const isDisabled = variant.stock === 0;
                  const isSelected = variant.id === selectedVariantId;

                  return (
                    <button
                      key={variant.id}
                      type="button"
                      disabled={isDisabled}
                      onClick={() => handleSelectVariant(variant.id, isDisabled)}
                      className={`border h-12 flex items-center justify-center font-label-md transition-colors ${
                        isDisabled
                          ? "border-outline-variant text-secondary line-through cursor-not-allowed opacity-60"
                          : isSelected
                            ? "border-black bg-black text-white"
                            : "border-outline text-primary hover:border-primary"
                      }`}
                    >
                      {variant.talla}
                    </button>
                  );
                })}
              </div>
              {selectionError ? (
                <p className="mt-3 text-sm text-error">{selectionError}</p>
              ) : null}
            </div>
            <div className="mt-stack-md flex flex-col gap-4">
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-primary text-on-primary font-label-md uppercase tracking-widest py-5 px-8 hover:opacity-90 active:scale-[0.98] transition-all"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

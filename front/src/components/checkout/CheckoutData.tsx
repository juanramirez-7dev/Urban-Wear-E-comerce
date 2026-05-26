import type { FormEvent } from "react";

export interface CheckoutDataValues {
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface CheckoutDataProps {
  readonly values: CheckoutDataValues;
  readonly onChange: (field: keyof CheckoutDataValues, value: string) => void;
  readonly onSubmit: () => void;
  readonly isSubmitting: boolean;
  readonly errorMessage?: string | null;
}

export function CheckoutData({
  values,
  onChange,
  onSubmit,
  isSubmitting,
  errorMessage
}: Readonly<CheckoutDataProps>) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-label-lg text-label-lg uppercase tracking-widest text-primary mb-4">
          Datos de envio
        </h2>
        <div className="grid grid-cols-1 gap-4">
          <label className="space-y-2">
            <span className="font-label-sm uppercase tracking-widest text-secondary">
              Nombre
            </span>
            <input
              type="text"
              value={values.nombre}
              onChange={(event) => onChange("nombre", event.target.value)}
              className="w-full border-b border-outline-variant bg-transparent px-0 py-2 text-body-md outline-none focus:border-primary"
              placeholder="Nombre completo"
            />
          </label>
          <label className="space-y-2">
            <span className="font-label-sm uppercase tracking-widest text-secondary">
              Telefono
            </span>
            <input
              type="tel"
              value={values.telefono}
              onChange={(event) => onChange("telefono", event.target.value)}
              className="w-full border-b border-outline-variant bg-transparent px-0 py-2 text-body-md outline-none focus:border-primary"
              placeholder="Telefono"
            />
          </label>
          <label className="space-y-2">
            <span className="font-label-sm uppercase tracking-widest text-secondary">
              Email
            </span>
            <input
              type="email"
              value={values.email}
              onChange={(event) => onChange("email", event.target.value)}
              className="w-full border-b border-outline-variant bg-transparent px-0 py-2 text-body-md outline-none focus:border-primary"
              placeholder="Email"
            />
          </label>
          <label className="space-y-2">
            <span className="font-label-sm uppercase tracking-widest text-secondary">
              Direccion
            </span>
            <input
              type="text"
              value={values.direccion}
              onChange={(event) => onChange("direccion", event.target.value)}
              className="w-full border-b border-outline-variant bg-transparent px-0 py-2 text-body-md outline-none focus:border-primary"
              placeholder="Direccion"
            />
          </label>
        </div>
      </div>

      {errorMessage ? (
        <p className="text-sm text-error">{errorMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-on-primary font-label-md uppercase tracking-widest py-4 hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Procesando..." : "Finalizar compra"}
      </button>
    </form>
  );
}

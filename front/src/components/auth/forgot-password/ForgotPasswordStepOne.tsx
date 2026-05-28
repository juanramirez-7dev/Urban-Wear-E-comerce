import { useState, type FormEvent } from "react"
import { useMutation } from "@tanstack/react-query"
import { Link } from "react-router"
import { forgotPassword } from "../../../services/userService"

export interface ForgotPasswordStepOneProps {
  readonly initialEmail: string
  readonly onSuccess: (email: string) => void
}

export function ForgotPasswordStepOne({
  initialEmail,
  onSuccess
}: Readonly<ForgotPasswordStepOneProps>) {
  const [email, setEmail] = useState(initialEmail)

  const forgotPasswordMutation = useMutation<void, Error, string>({
    mutationFn: forgotPassword,
    onSuccess: (_, submittedEmail) => {
      onSuccess(submittedEmail)
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const sanitizedEmail = email.trim().toLowerCase()
    forgotPasswordMutation.mutate(sanitizedEmail)
  }

  return (
    <section className="w-full max-w-130 border border-outline-variant bg-surface-container-lowest p-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:p-12">
      <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
        Recuperar Contraseña - Paso 1
      </p>
      <h1 className="mt-3 font-headline-md text-headline-md text-primary uppercase tracking-tight">
        Ingresa tu correo
      </h1>
      <p className="mt-3 font-body-md text-body-md text-secondary">
        Te enviaremos un código de verificación para recuperar el acceso a tu cuenta.
      </p>

      {forgotPasswordMutation.isError ? (
        <div
          className="mt-6 rounded-lg border border-error bg-error-container px-4 py-3 font-body-md text-body-md text-on-error-container"
          role="alert"
        >
          {forgotPasswordMutation.error.message}
        </div>
      ) : null}

      <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="forgot-password-email"
            className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant"
          >
            Email
          </label>
          <input
            id="forgot-password-email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="name@example.com"
            autoComplete="email"
            required
            className="w-full border-b border-outline-variant bg-transparent px-0 py-3 text-body-md font-body-md outline-none transition-all focus:border-primary focus:ring-0"
          />
        </div>

        <button
          type="submit"
          disabled={forgotPasswordMutation.isPending}
          className="w-full bg-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-all duration-300 hover:opacity-90 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {forgotPasswordMutation.isPending ? "Enviando..." : "Enviar código"}
        </button>
      </form>

      <Link
        to="/login"
        className="mt-8 inline-flex font-label-sm text-label-sm uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        Volver a login
      </Link>
    </section>
  )
}
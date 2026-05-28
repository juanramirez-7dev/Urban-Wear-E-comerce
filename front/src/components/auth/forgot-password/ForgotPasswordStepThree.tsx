import { useState, type FormEvent } from "react"
import { useMutation } from "@tanstack/react-query"
import { resetPassword } from "../../../services/userService"

export interface ForgotPasswordStepThreeProps {
  readonly recoveryToken: string
  readonly onSuccess: () => void
}

export function ForgotPasswordStepThree({
  recoveryToken,
  onSuccess
}: Readonly<ForgotPasswordStepThreeProps>) {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [validationError, setValidationError] = useState<string | null>(null)

  const resetPasswordMutation = useMutation<void, Error, { token: string; password: string }>({
    mutationFn: ({ token, password }) => resetPassword(token, password),
    onSuccess: () => {
      onSuccess()
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (newPassword !== confirmPassword) {
      setValidationError("La nueva contraseña y su confirmación deben coincidir.")
      return
    }

    setValidationError(null)

    resetPasswordMutation.mutate({
      token: recoveryToken,
      password: newPassword
    })
  }

  return (
    <section className="w-full max-w-130 border border-outline-variant bg-surface-container-lowest p-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:p-12">
      <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
        Recuperar Contraseña - Paso 3
      </p>
      <h1 className="mt-3 font-headline-md text-headline-md text-primary uppercase tracking-tight">
        Crea una nueva contraseña
      </h1>
      <p className="mt-3 font-body-md text-body-md text-secondary">
        Usa una contraseña segura que no hayas utilizado anteriormente.
      </p>

      {validationError ? (
        <div
          className="mt-6 rounded-lg border border-error bg-error-container px-4 py-3 font-body-md text-body-md text-on-error-container"
          role="alert"
        >
          {validationError}
        </div>
      ) : null}

      {resetPasswordMutation.isError ? (
        <div
          className="mt-6 rounded-lg border border-error bg-error-container px-4 py-3 font-body-md text-body-md text-on-error-container"
          role="alert"
        >
          {resetPasswordMutation.error.message}
        </div>
      ) : null}

      <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="reset-new-password"
            className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant"
          >
            Nueva contraseña
          </label>
          <input
            id="reset-new-password"
            name="new-password"
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            autoComplete="new-password"
            required
            className="w-full border-b border-outline-variant bg-transparent px-0 py-3 text-body-md font-body-md outline-none transition-all focus:border-primary focus:ring-0"
          />
        </div>

        <div>
          <label
            htmlFor="reset-confirm-password"
            className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant"
          >
            Confirmar contraseña
          </label>
          <input
            id="reset-confirm-password"
            name="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
            required
            className="w-full border-b border-outline-variant bg-transparent px-0 py-3 text-body-md font-body-md outline-none transition-all focus:border-primary focus:ring-0"
          />
        </div>

        <button
          type="submit"
          disabled={resetPasswordMutation.isPending}
          className="w-full bg-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-all duration-300 hover:opacity-90 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {resetPasswordMutation.isPending ? "Actualizando..." : "Restablecer contraseña"}
        </button>
      </form>
    </section>
  )
}

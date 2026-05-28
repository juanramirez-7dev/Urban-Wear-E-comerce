import { useState, type FormEvent } from "react"
import { useMutation } from "@tanstack/react-query"
import { verifyResetCode } from "../../../services/userService"

export interface ForgotPasswordStepTwoProps {
  readonly email: string
  readonly onBack: () => void
  readonly onSuccess: (recoveryToken: string) => void
}

export function ForgotPasswordStepTwo({
  email,
  onBack,
  onSuccess
}: Readonly<ForgotPasswordStepTwoProps>) {
  const [code, setCode] = useState("")

  const verifyResetCodeMutation = useMutation<
    { recoveryToken: string },
    Error,
    { resetCode: string; email: string }
  >({
    mutationFn: ({ resetCode, email: requestEmail }) =>
      verifyResetCode(resetCode, requestEmail),
    onSuccess: (data) => {
      onSuccess(data.recoveryToken)
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    verifyResetCodeMutation.mutate({
      resetCode: code.trim(),
      email
    })
  }

  return (
    <section className="w-full max-w-130 border border-outline-variant bg-surface-container-lowest p-10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] md:p-12">
      <p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
        Recuperar Contraseña - Paso 2
      </p>
      <h1 className="mt-3 font-headline-md text-headline-md text-primary uppercase tracking-tight">
        Verifica el código
      </h1>
      <p className="mt-3 font-body-md text-body-md text-secondary">
        Ingresa el código enviado a <span className="font-label-md text-primary">{email}</span>.
      </p>

      {verifyResetCodeMutation.isError ? (
        <div
          className="mt-6 rounded-lg border border-error bg-error-container px-4 py-3 font-body-md text-body-md text-on-error-container"
          role="alert"
        >
          {verifyResetCodeMutation.error.message}
        </div>
      ) : null}

      <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="verify-code"
            className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant"
          >
            Código de recuperación
          </label>
          <input
            id="verify-code"
            name="code"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="000000"
            autoComplete="one-time-code"
            required
            className="w-full border-b border-outline-variant bg-transparent px-0 py-3 text-body-md font-body-md outline-none transition-all focus:border-primary focus:ring-0"
          />
        </div>

        <button
          type="submit"
          disabled={verifyResetCodeMutation.isPending}
          className="w-full bg-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-all duration-300 hover:opacity-90 active:opacity-70 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {verifyResetCodeMutation.isPending ? "Validando..." : "Validar código"}
        </button>
      </form>

      <button
        type="button"
        onClick={onBack}
        className="mt-8 inline-flex font-label-sm text-label-sm uppercase tracking-widest text-secondary transition-colors hover:text-primary"
      >
        Cambiar correo
      </button>
    </section>
  )
}

import { useState, type FormEvent } from "react"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "../../hooks/useAuth"
import { updatePassword, updateUserProfile } from "../../services/userService"

export default function ClientProfile() {
	const { user, token, logout } = useAuth()
	const [formValues, setFormValues] = useState({
		nombre: user?.name ?? "",
		email: user?.email ?? "",
		telefono: user?.telefono ?? ""
	})

	const updateProfileMutation = useMutation<void, Error, typeof formValues>({
		mutationFn: (values) => updateUserProfile(values, user?.id ?? "", token)
	})

	const [passwordValues, setPasswordValues] = useState({
		currentPassword: "",
		newPassword: ""
	})

	const updatePasswordMutation = useMutation<
		void,
		Error,
		{ currentPassword: string; newPassword: string }
	>({
		mutationFn: (values) =>
			updatePassword(values.currentPassword, values.newPassword, token)
	})

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!user?.id) {
			return
		}

		updateProfileMutation.mutate(formValues, {
      onSuccess: () => {
        logout()
      }
    })
	}

	const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		updatePasswordMutation.mutate(passwordValues, {
			onSuccess: () => {
				logout()
			}
		})
	}

	return (
		<section className="space-y-stack-lg">
			<header className="space-y-4 border-b border-outline-variant pb-stack-md">
				<p className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Perfil</p>
				<h1 className="font-display-lg text-display-lg-mobile md:text-display-lg uppercase text-primary">
					Mi perfil
				</h1>
				<p className="max-w-2xl font-body-lg text-body-lg text-secondary">
					Actualiza tus datos de contacto y mantén tu información al día.
				</p>
			</header>

			<div className="max-w-3xl border border-outline-variant bg-surface-container-lowest p-8 md:p-10">
        <h2 className="mb-6 font-headline-sm text-headline-sm uppercase tracking-tight text-primary">
					Editar Perfil
				</h2>
        
				<div className="mb-6 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md text-body-md text-secondary" role="note">
					Si actualizas tu información, se cerrará tu sesión y serás redirigido al login para refrescar tus datos.
				</div>

				{updateProfileMutation.isError ? (
					<div className="mb-6 rounded-lg border border-error bg-error-container px-4 py-3 font-body-md text-body-md text-on-error-container" role="alert">
						{updateProfileMutation.error.message}
					</div>
				) : null}

				<form className="space-y-8" onSubmit={handleSubmit}>
					<div>
						<label className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant" htmlFor="client-name">
							Nombre
						</label>
						<input
							id="client-name"
							type="text"
							value={formValues.nombre}
							onChange={(event) => setFormValues((current) => ({ ...current, nombre: event.target.value }))}
							className="w-full border-b border-outline-variant bg-transparent px-0 py-3 font-body-md text-body-md outline-none transition-all focus:border-primary"
							required
						/>
					</div>
					<div>
						<label className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant" htmlFor="client-email">
							Email
						</label>
						<input
							id="client-email"
							type="email"
							value={formValues.email}
							onChange={(event) => setFormValues((current) => ({ ...current, email: event.target.value }))}
							className="w-full border-b border-outline-variant bg-transparent px-0 py-3 font-body-md text-body-md outline-none transition-all focus:border-primary"
							required
						/>
					</div>
					<div>
						<label className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant" htmlFor="client-phone">
							Teléfono
						</label>
						<input
							id="client-phone"
							type="text"
							value={formValues.telefono}
							onChange={(event) => setFormValues((current) => ({ ...current, telefono: event.target.value }))}
							className="w-full border-b border-outline-variant bg-transparent px-0 py-3 font-body-md text-body-md outline-none transition-all focus:border-primary"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={updateProfileMutation.isPending}
						className="w-full bg-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
					>
						{updateProfileMutation.isPending ? "Guardando..." : "Guardar cambios"}
					</button>
				</form>
			</div>

			<div className="max-w-3xl border border-outline-variant bg-surface-container-lowest p-8 md:p-10">
				<h2 className="mb-6 font-headline-sm text-headline-sm uppercase tracking-tight text-primary">
					Cambiar contraseña
				</h2>

				<div className="mb-6 rounded-lg border border-outline-variant bg-surface-container-low px-4 py-3 font-body-md text-body-md text-secondary" role="note">
					Después de actualizar tu contraseña, se cerrará tu sesión y deberás iniciar sesión nuevamente.
				</div>

				{updatePasswordMutation.isError ? (
					<div className="mb-6 rounded-lg border border-error bg-error-container px-4 py-3 font-body-md text-body-md text-on-error-container" role="alert">
						{updatePasswordMutation.error.message}
					</div>
				) : null}

				<form className="space-y-8" onSubmit={handlePasswordSubmit}>
					<div>
						<label className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant" htmlFor="client-current-password">
							Contraseña actual
						</label>
						<input
							id="client-current-password"
							type="password"
							value={passwordValues.currentPassword}
							onChange={(event) =>
								setPasswordValues((current) => ({
									...current,
									currentPassword: event.target.value
								}))
							}
							className="w-full border-b border-outline-variant bg-transparent px-0 py-3 font-body-md text-body-md outline-none transition-all focus:border-primary"
							required
						/>
					</div>

					<div>
						<label className="mb-2 block font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant" htmlFor="client-new-password">
							Nueva contraseña
						</label>
						<input
							id="client-new-password"
							type="password"
							value={passwordValues.newPassword}
							onChange={(event) =>
								setPasswordValues((current) => ({
									...current,
									newPassword: event.target.value
								}))
							}
							className="w-full border-b border-outline-variant bg-transparent px-0 py-3 font-body-md text-body-md outline-none transition-all focus:border-primary"
							required
						/>
					</div>

					<button
						type="submit"
						disabled={updatePasswordMutation.isPending}
						className="w-full bg-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest text-on-primary transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
					>
						{updatePasswordMutation.isPending
							? "Actualizando..."
							: "Actualizar contraseña"}
					</button>
				</form>
			</div>
		</section>
	)
}
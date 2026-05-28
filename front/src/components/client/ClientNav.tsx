import { NavLink } from "react-router"
import {
	IconChevronLeft,
	IconChevronRight,
	IconHome2,
	IconUser,
	IconLogout,
	IconShoppingBag
} from "@tabler/icons-react"
import { useAuth } from "../../hooks/useAuth"

export interface NavClientProps {
	readonly isCollapsed: boolean
	readonly onToggleCollapse: () => void
}

export function NavClient({ isCollapsed, onToggleCollapse }: Readonly<NavClientProps>) {
	const { user, logout } = useAuth()
	const userName = user?.name?.trim() || "Cliente"
	const sidebarWidthClass = isCollapsed ? "w-20" : "w-20 md:w-64"
	const headerVisibilityClass = isCollapsed ? "hidden" : "hidden md:block"
	const linkBaseClass =
		"w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200"
	const linkSpacingClass = isCollapsed
		? "justify-center gap-0"
		: "justify-center md:justify-start gap-0 md:gap-4"
	const labelClass = isCollapsed ? "hidden" : "hidden md:inline"

	return (
		<aside
			className={`fixed left-0 top-0 z-50 flex h-full flex-col border-r border-outline-variant bg-surface-container-low py-8 ${sidebarWidthClass}`}
		>
			<div className="mb-8 px-6">
				<button
					type="button"
					onClick={onToggleCollapse}
					className="mb-6 hidden h-10 w-10 items-center justify-center rounded-full border border-outline-variant text-secondary transition-colors hover:text-primary md:flex"
					aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
				>
					{isCollapsed ? (
						<IconChevronRight className="size-5" />
					) : (
						<IconChevronLeft className="size-5" />
					)}
				</button>
				<h1 className={`font-display-lg text-headline-sm text-primary tracking-tighter ${headerVisibilityClass}`}>
					Mi Cuenta
				</h1>
				<p className={`mt-1 font-label-sm text-secondary-fixed-dim uppercase tracking-widest ${headerVisibilityClass}`}>
					Cliente Portal
				</p>
				<div className={`mt-6 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 ${headerVisibilityClass}`}>
					<span className="font-label-sm uppercase tracking-widest text-secondary">
						{userName}
					</span>
				</div>
			</div>

			<nav className="flex-1 space-y-2 px-4">
				<NavLink
					to="/"
					className={({ isActive }) =>
						`${linkBaseClass} ${linkSpacingClass} ${
							isActive
								? "bg-primary text-on-primary font-bold"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<IconHome2 className="size-5" />
					<span className={`font-label-md text-label-md ${labelClass}`}>Inicio</span>
				</NavLink>
				<NavLink
					to="/cliente"
					end
					className={({ isActive }) =>
						`${linkBaseClass} ${linkSpacingClass} ${
							isActive
								? "bg-primary text-on-primary font-bold"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<IconUser className="size-5" />
					<span className={`font-label-md text-label-md ${labelClass}`}>Perfil</span>
				</NavLink>
				<NavLink
					to="/cliente/orders"
					className={({ isActive }) =>
						`${linkBaseClass} ${linkSpacingClass} ${
							isActive
								? "bg-primary text-on-primary font-bold"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<IconShoppingBag className="size-5" />
					<span className={`font-label-md text-label-md ${labelClass}`}>Mis órdenes</span>
				</NavLink>
			</nav>

			<div className="mt-auto space-y-2 border-t border-outline-variant px-4 pt-6">
				<button
					type="button"
					onClick={logout}
					className="flex w-full px-4 py-3 text-left font-label-md text-label-md uppercase tracking-widest text-secondary transition-colors duration-200 hover:text-primary"
				>
					<IconLogout className="size-5" />
					<span className={`ml-2 font-label-md text-label-md ${labelClass}`}>Logout</span>
				</button>
			</div>
		</aside>
	)
}
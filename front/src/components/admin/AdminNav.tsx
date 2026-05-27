import { NavLink } from "react-router"
import {
	IconChevronLeft,
	IconChevronRight,
	IconCreditCard,
	IconLayoutDashboard,
	IconLogout,
	IconPackage,
	IconSettings,
	IconShoppingCart,
} from "@tabler/icons-react"
import { useAuth } from "../../hooks/useAuth"

export interface NavAdminProps
	extends Readonly<{
		isCollapsed: boolean
		onToggleCollapse: () => void
	}> {}

export function NavAdmin({ isCollapsed, onToggleCollapse }: NavAdminProps) {
	const { user } = useAuth()
	const userName = user?.name?.trim() || "Admin"
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
			className={`fixed left-0 top-0 h-full flex flex-col py-8 bg-surface-container-low border-r border-outline-variant ${sidebarWidthClass} z-50`}
		>
			<div className="px-6 mb-8">
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
				<h1
					className={`font-display-lg text-headline-sm text-primary tracking-tighter ${headerVisibilityClass}`}
				>
					Admin Console
				</h1>
				<p
					className={`font-label-sm text-secondary-fixed-dim uppercase tracking-widest mt-1 ${headerVisibilityClass}`}
				>
					Management Suite
				</p>
				<div
					className={`mt-6 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 ${headerVisibilityClass}`}
				>
					<span className="font-label-sm text-secondary uppercase tracking-widest">
						{userName}
					</span>
				</div>
			</div>
			<nav className="flex-1 px-4 space-y-2">
				<NavLink
					to="/admin"
					end
					className={({ isActive }) =>
						`${linkBaseClass} ${linkSpacingClass} ${
							isActive
								? "bg-primary text-on-primary font-bold"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<IconLayoutDashboard className="size-5" />
					<span className={`font-label-md text-label-md ${labelClass}`}>
						Dashboard
					</span>
				</NavLink>
				<NavLink
					to="/admin/inventory"
					className={({ isActive }) =>
						`${linkBaseClass} ${linkSpacingClass} ${
							isActive
								? "bg-primary text-on-primary font-bold"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<IconPackage className="size-5" />
					<span className={`font-label-md text-label-md ${labelClass}`}>
						Inventory
					</span>
				</NavLink>
				<NavLink
					to="/admin/orders"
					className={({ isActive }) =>
						`${linkBaseClass} ${linkSpacingClass} ${
							isActive
								? "bg-primary text-on-primary font-bold"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<IconShoppingCart className="size-5" />
					<span className={`font-label-md text-label-md ${labelClass}`}>
						Orders
					</span>
				</NavLink>
				<NavLink
					to="/admin/billing"
					className={({ isActive }) =>
						`${linkBaseClass} ${linkSpacingClass} ${
							isActive
								? "bg-primary text-on-primary font-bold"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<IconCreditCard className="size-5" />
					<span className={`font-label-md text-label-md ${labelClass}`}>
						Billing
					</span>
				</NavLink>
			</nav>
			<div className="px-4 mt-auto border-t border-outline-variant pt-6 space-y-2">
				<NavLink
					to="/admin/settings"
					className={({ isActive }) =>
						`${linkBaseClass} ${linkSpacingClass} ${
							isActive
								? "bg-primary text-on-primary font-bold"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<IconSettings className="size-5" />
					<span className={`font-label-md text-label-md ${labelClass}`}>
						Settings
					</span>
				</NavLink>
				<NavLink
					to="/login"
					className={({ isActive }) =>
						`${linkBaseClass} ${linkSpacingClass} ${
							isActive
								? "bg-primary text-on-primary font-bold"
								: "text-on-surface-variant hover:bg-surface-container-high"
						}`
					}
				>
					<IconLogout className="size-5" />
					<span className={`font-label-md text-label-md ${labelClass}`}>
						Logout
					</span>
				</NavLink>
			</div>
		</aside>
	)
}

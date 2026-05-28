import { useState } from "react"
import { Outlet } from "react-router"
import { NavClient } from "../components/client/ClientNav"

export default function ClientLayout() {
	const [isNavCollapsed, setIsNavCollapsed] = useState(false)
	const mainOffsetClass = isNavCollapsed ? "ml-20" : "ml-20 md:ml-64"

	return (
		<div className="bg-background text-on-background">
			<NavClient
				isCollapsed={isNavCollapsed}
				onToggleCollapse={() => setIsNavCollapsed((prev) => !prev)}
			/>
			<main className={`${mainOffsetClass} min-h-screen p-margin-desktop`}>
				<Outlet />
			</main>
		</div>
	)
}
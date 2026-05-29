import { useState } from "react"
import { Outlet } from "react-router"
import { NavAdmin } from "../components/admin/AdminNav"


export default function LayoutAdmin() {
	const [isNavCollapsed, setIsNavCollapsed] = useState(false)
	const mainOffsetClass = isNavCollapsed ? "ml-20" : "ml-20 md:ml-64"

	return (
		<div className="bg-background text-on-background">
			<NavAdmin
				isCollapsed={isNavCollapsed}
				onToggleCollapse={() => setIsNavCollapsed((prev) => !prev)}
			/>
			<main className={`${mainOffsetClass} p-margin-desktop min-h-screen`}>
				<Outlet />
			</main>
		</div>
	)
}

import { useAuth } from "../../hooks/useAuth"
import { Navigate, Outlet } from "react-router"
import { PremiumLoadingScreen } from "../ui/PremiumLoadingScreen"


type ProtectedRouteProps = {
  roles: string[]
}

export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const { token, user, isLoadingGetMe } = useAuth()

  if (isLoadingGetMe) return <PremiumLoadingScreen/>

  if (!token || !user) return <Navigate to="/login"  replace/>

  if (!roles.includes(user.role)) return <Navigate to="/"  replace/>

  return <Outlet />
}
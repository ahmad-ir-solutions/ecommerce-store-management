import { useAuthStore } from "@/store/authStore"
import { Navigate } from "react-router-dom"

interface PublicRouteProps {
  children: React.ReactNode
}

// Public route component - redirects authenticated users to their dashboard
export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { token, user } = useAuthStore()

  if (token && user) {
    // Redirect to appropriate dashboard based on role
    if (user.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />
    } else {
      return <Navigate to="/seller/dashboard" replace />
    }
  }

  return <>{children}</>
}
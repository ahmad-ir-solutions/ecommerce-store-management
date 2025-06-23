import { useAuthStore } from "@/store/authStore"
import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

// Protected route component
export const ProtectedRoute = ({
    children,
    allowedRoles = [],
  }: ProtectedRouteProps) => {
    const { token, user } = useAuthStore()
  
    if (!token) {
      return <Navigate to="/auth/login" replace />
    }
  
    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on role
      if (user.role === "ADMIN") {
        return <Navigate to="/admin/dashboard" replace />
      } else if (user.role === "USER") {
        return <Navigate to="/seller/products" replace />
      }
      return <Navigate to="/unauthorized" replace />
    }
  
    return <>{children}</>
  }
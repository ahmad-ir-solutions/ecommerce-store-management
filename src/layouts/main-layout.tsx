import { Outlet } from "react-router-dom"
import { useAuthStore } from "@/store/userStore"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "@/pages/auth/core/_requests"

export default function MainLayout() {
  const { user, clearUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    // clearUser()
    navigate("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">E-commerce Store Management</h1>
          </div>
          {user && (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t bg-white py-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} E-commerce Store Management. All rights reserved.
      </footer>
    </div>
  )
}

import { Outlet, NavLink } from "react-router-dom"
import { useAuthStore } from "@/store/userStore"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "@/pages/auth/core/_requests"

export default function AdminLayout() {
  const { user, clearUser } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    // clearUser()
    navigate("/auth/login")
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-xl font-bold">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center rounded-md px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `flex items-center rounded-md px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `flex items-center rounded-md px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center rounded-md px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/inventory"
                className={({ isActive }) =>
                  `flex items-center rounded-md px-4 py-2 ${isActive ? "bg-gray-700" : "hover:bg-gray-700"}`
                }
              >
                Inventory
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            {user && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Welcome, {user.name}</span>
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
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

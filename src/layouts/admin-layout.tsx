import { Outlet, useLocation } from "react-router-dom"
import { BaseLayout } from "@/layouts/BaseLayout"
import { Sidebar } from "@/components/shared/sidebar"
import { useState } from "react"
import { LayoutDashboard, Package, Settings, ShoppingCart, Users, Warehouse } from "lucide-react"

export default function AdminLayout() {
  const pathname = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const adminNavItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      isActive: pathname.pathname === "admin/dashboard" || pathname.pathname === "/admin",
    },
    {
      title: "Orders", 
      key: "orders",
      icon: ShoppingCart,
      hasChildren: true,
      children: [
        { title: "Manage Order", href: "/admin/orders/manage" },
        { title: "CSV", href: "/admin/orders/csv" },
      ],
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "Warehouse",
      key: "warehouse",
      icon: Warehouse,
      hasChildren: true,
      children: [
        { title: "pickwave", href: "/admin/warehouse/pickwave" },
        { title: "Deliveries", href: "/admin/warehouse/deliveries" },
        { title: "Manifests", href: "/admin/warehouse/manifests" },
      ],
    },
    {
      title: "Products",
      key: "products",
      icon: Package,
      hasChildren: true,
      children: [
        { title: "All Products", href: "/admin/products/all-products" },
        { title: "Suppliers", href: "/admin/products/suppliers" },
        { title: "CSV", href: "/admin/products/csv" },
      ],
    },
    { title: "Sellers", href: "/admin/sellers", icon: Users },
    {
      title: "Settings",
      key: "settings",
      icon: Settings,
      hasChildren: true,
      children: [
        { title: "Company", href: "/admin/settings/company" },
        { title: "Users", href: "/admin/settings/users" },
        { title: "Integrations", href: "/admin/settings/integrations" },
        { title: "Warehouse", href: "/admin/settings/warehouse" },
      ],
    },
  ]

  return (
    <div className="flex h-screen relative overflow-hidden bg-[#E6EDF3]">
      <Sidebar mainNavItems={adminNavItems} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <BaseLayout title="Admin Dashboard">
          <div className="p-6 overflow-auto h-full">
            <Outlet />
          </div>
        </BaseLayout>
      </div>
    </div>
  )
}

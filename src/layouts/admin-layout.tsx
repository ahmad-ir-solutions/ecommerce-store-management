import { Outlet, useLocation } from "react-router-dom"
import { BaseLayout } from "@/components/layouts/BaseLayout"
import { Sidebar } from "@/components/layouts/Sidebar"
import { useState } from "react"
import { LayoutDashboard, Package, ShoppingCart, Users, Warehouse } from "lucide-react"

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
        { title: "All Orders", href: "/admin/orders" },
        { title: "Pending", href: "/admin/orders/pending" },
        { title: "Completed", href: "/admin/orders/completed" },
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
        { title: "Inventory", href: "/admin/warehouse/inventory" },
        { title: "Stock Control", href: "/admin/warehouse/stock" },
      ],
    },
    {
      title: "Products",
      key: "products",
      icon: Package,
      hasChildren: true,
      children: [
        { title: "All Products", href: "/admin/products" },
        { title: "Categories", href: "/admin/products/categories" },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen bg-[#E6EDF3]">
      <Sidebar mainNavItems={adminNavItems} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <BaseLayout title="Admin Dashboard">
          <div className="p-6">
            <Outlet />
          </div>
        </BaseLayout>
      </div>
    </div>
  )
}

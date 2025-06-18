import { Outlet, useLocation } from "react-router-dom"
import { BaseLayout } from "@/layouts/BaseLayout"
import { CreditCard, FileText, PackageSearch, Store, Tags } from "lucide-react";
import { Sidebar } from "@/components/shared/sidebar";
import { useState } from "react";

export default function SellerLayout() {
  const pathname = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)


  const sellerNavItems = [
    {
      title: "Products",
      href: "/seller/products",
      icon: PackageSearch,
      isActive: pathname.pathname === "/seller/products",
    },
    {
      title: "Listings",
      href: "/seller/listings",
      icon: Tags,
      isActive: pathname.pathname === "/seller/listings",
    },
    {
      title: "Shops",
      href: "/seller/shops",
      icon: Store,
      isActive: pathname.pathname === "/seller/shops",
    },
    {
      title: "Payments",
      href: "/seller/payments",
      icon: CreditCard,
      isActive: pathname.pathname === "/seller/payments",
    },
    {
      title: "Orders",
      href: "/seller/orders",
      icon: FileText,
      isActive: pathname.pathname === "/seller/orders",
    },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar mainNavItems={sellerNavItems} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex flex-1 flex-col">
        <BaseLayout title="Seller Dashboard">
          <div className="p-6">
            <Outlet />
          </div>
        </BaseLayout>
      </div>
    </div>
  )
}

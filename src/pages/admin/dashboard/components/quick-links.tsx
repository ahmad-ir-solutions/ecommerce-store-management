
import { Package, ShoppingCart, Warehouse, FileText, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

export function QuickLinks() {
  const links = [
    {
      title: "Products",
      icon: Package,
      color: "bg-blue-100 text-blue-600",
      href: "/products",
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      color: "bg-green-100 text-green-600",
      href: "/orders",
    },
    {
      title: "Warehouse",
      icon: Warehouse,
      color: "bg-purple-100 text-purple-600",
      href: "/warehouse",
    },
    {
      title: "Listings",
      icon: FileText,
      color: "bg-yellow-100 text-yellow-600",
      href: "/listings",
    },
    {
      title: "Others",
      icon: MoreHorizontal,
      color: "bg-red-100 text-red-600",
      href: "/others",
    },
  ]

  return (
    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      {links.map((link) => (
        <a
          key={link.title}
          href={link.href}
          className="flex flex-col items-center p-4 rounded-md hover:bg-slate-50 transition-colors"
        >
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-2", link.color)}>
            <link.icon className="h-6 w-6" />
          </div>
          <span className="text-sm">{link.title}</span>
        </a>
      ))}
    </div>
  )
}

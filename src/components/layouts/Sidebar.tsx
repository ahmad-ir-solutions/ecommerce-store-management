import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Settings,
  HelpCircle,
  CreditCard,
  LogOut,
  ChevronRight,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NavChildItem {
  title: string;
  href: string;
}

interface NavItem {
  title: string;
  href?: string;
  key?: string;
  icon: LucideIcon;
  isActive?: boolean;
  hasChildren?: boolean;
  children?: NavChildItem[];
}

interface SidebarNavProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  mainNavItems: NavItem[]
}


export function Sidebar({ isOpen, 
  // setIsOpen,
   mainNavItems }: SidebarNavProps) {
  const pathname = useLocation()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    orders: false,
    warehouse: false,
    products: false,
  })

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }


  const bottomNavItems = [
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
    {
      title: "Support",
      href: "/support",
      icon: HelpCircle,
    },
    {
      title: "Billing",
      href: "/billing",
      icon: CreditCard,
    },
    {
      title: "Logout",
      href: "/logout",
      icon: LogOut,
    },
  ]

  return (
    <div
      className={cn(
        "h-screen bg-[#E6EDF3] text-[#333333] transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex items-center justify-start h-24">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500">
          <span className="text-2xl font-bold">D</span>
        </div>
      </div>

      {/* Main navigation items */}
      <nav className="space-y-1 px-2 py-4 flex-grow overflow-y-auto">
        {mainNavItems.map((item) => (
          <div key={item.title} className="mb-1">
            {item.hasChildren ? (
              <div>
                <button
                  onClick={() => toggleItem(item.key as string)}
                  className={cn(
                    "flex items-center w-full px-4 py-3 text-sm rounded-md transition-colors",
                    " hover:bg-slate-800 hover:text-white",
                  )}
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                  {isOpen && <span className="flex-1 text-left">{item.title}</span>}
                  {isOpen && (
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedItems[item.key as string] ? "rotate-90" : "",
                      )}
                    />
                  )}
                </button>
                {isOpen && expandedItems[item.key as string] && (
                  <div className="pl-10 space-y-1 mt-1">
                    {item.children?.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
                          pathname.pathname.startsWith(child.href)
                            ? "bg-slate-800"
                            : "hover:bg-slate-800 hover:text-white",
                        )}
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={item.href || "#"}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                  pathname.pathname.startsWith(item.href || '') || item.isActive
                    ? "bg-slate-800 text-white"
                    : "hover:bg-slate-800 hover:text-white",
                )}
              >
                {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                {isOpen && <span className="flex-1">{item.title}</span>}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Bottom navigation items */}
      <nav className="space-y-1 px-2 py-4 mt-auto">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
              pathname.pathname === item.href ? "bg-slate-800 text-white" : "hover:bg-slate-800 hover:text-white",
            )}
          >
            {item.icon && <item.icon className="h-5 w-5 mr-3" />}
            {isOpen && <span className="flex-1">{item.title}</span>}
          </Link>
        ))}
      </nav>
    </div>
  )
}

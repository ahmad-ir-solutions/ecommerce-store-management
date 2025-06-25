import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  // HelpCircle,
  // CreditCard,
  LogOut,
  ChevronRight,
  LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import logo from "@/assets/images/logo.svg"
import { Button } from "../ui/button"
import { useAuthStore } from "@/store/authStore"

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
  const location = useLocation()
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    orders: false,
    warehouse: false,
    products: false,
  })

  const handleLogout = () => {
    useAuthStore.getState().logout()
  }

  const toggleItem = (key: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }


  // const bottomNavItems = [
  //   // {
  //   //   title: "Settings",
  //   //   href: "/settings",
  //   //   icon: Settings,
  //   // },
  //   {
  //     title: "Support",
  //     href: "/support",
  //     icon: HelpCircle,
  //   },
  //   {
  //     title: "Billing",
  //     href: "/billing",
  //     icon: CreditCard,
  //   },
  // ]

  return (
    <div
      className={cn(
        "h-screen bg-[#E6EDF3] text-[#333333] transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-16",
      )}
    >
      <div className="flex items-center justify-start h-24 px-4">
        <div className="relative w-12 h-12">
          <img 
            src={logo} 
            alt="Logo" 
            className="w-full h-full object-contain"
            style={{ 
              imageRendering: 'crisp-edges',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          />
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
                          location.pathname.startsWith(child.href)
                            ? "bg-slate-800 text-white"
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
                  location.pathname.startsWith(item.href || '') || item.isActive
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
      {/* <nav className="space-y-1 px-2 mt-auto">
        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
              location.pathname === item.href ? "bg-slate-800 text-white" : "hover:bg-slate-800 hover:text-white",
            )}
          >
            {item.icon && <item.icon className="h-5 w-5 mr-3" />}
            {isOpen && <span className="flex-1">{item.title}</span>}
          </Link>
        ))}
      </nav> */}
      <Button className="mx-2 mt-2 mb-4 shadow-none hover:bg-[#1d293d] hover:text-white text-center cursor-pointer py-3 px-4 h-11"	 onClick={handleLogout}>
        <div className="flex items-center justify-start w-full">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </div>
      </Button>
    </div>
  )
}

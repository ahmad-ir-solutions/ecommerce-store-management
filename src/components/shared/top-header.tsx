import { useState } from "react"
import { Bell, ChevronDown, ChevronLeft, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import UserProfile from "../../assets/images/avatar.png"
import useBack from "@/hooks/use-back"

export function TopHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const { handleBack } = useBack();

  return (
    <header className="flex items-center justify-between h-16 px-6 gap-6">
      <Button variant="ghost" size="icon" className="text-[#172E45] bg-white rounded-lg cursor-pointer" onClick={handleBack}>
        <ChevronLeft />
      </Button>
      <div className="flex items-center justify-end h-16 px-6 gap-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for orders, products, pages, actions & help"
            className="w-full pl-9 rounded-md border-slate-100 bg-white"
          />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-[#172E45] relative bg-white">
            <Bell className="h-6 w-6" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
          </Button>
          <Avatar className="h-9 w-9 bg-gray-300">
            <AvatarImage src={UserProfile} alt="User" />
            <AvatarFallback>user</AvatarFallback>
          </Avatar>
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild className="px-0 mr-3">
              <Button variant="ghost" className="relative rounded-full right-0 focus:border-none focus:ring-0 p-0">
                <p className="text-sm font-medium leading-none">Harsh</p>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border-none" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Harsh</p>
                  <p className="text-xs leading-none text-muted-foreground">admin@example.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}
              {/* <DropdownMenuItem>Log out</DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
     
    </header>
  )
}

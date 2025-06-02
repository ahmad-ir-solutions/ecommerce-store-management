import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { SearchModal } from "../modals/search-modal"

interface CustomSearchProps {
  onClick?: () => void
  placeholder?: string
}

export function CustomTopHeaderSearch({ onClick, placeholder = "Search..." }: CustomSearchProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleInputFocus = () => {
    setIsModalOpen(true)
    onClick?.()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSearchQuery("")
  }

  return (
    <>
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder={placeholder}
          className="pl-10 bg-white border-gray-200 focus-visible:ring-1 focus-visible:ring-blue-500"
          onFocus={handleInputFocus}
          readOnly
        />
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </>
  )
}

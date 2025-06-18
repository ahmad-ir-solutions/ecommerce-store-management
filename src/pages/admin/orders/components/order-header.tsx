import { ChevronRight } from "lucide-react"

export function OrderHeader() {
  return (
    <div className="bg-white p-4 shadow-sm border-b">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xl font-semibold">Edit Orders</h1>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <span className="text-gray-500">Manage Order</span>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-[#024AFE]">Add Products</span>
        </div>
      </div>
    </div>
  )
}

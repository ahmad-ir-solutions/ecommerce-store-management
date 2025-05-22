import { Button } from "@/components/ui/button"
import { PenIcon } from "lucide-react"
import { useProductsStore } from "@/store/admin/products-store"
import { CustomSelect } from "@/components/shared/custom-select"

export function SavedFilters() {
  const { savedFilters, applySavedFilter } = useProductsStore()

  const handleSelectChange = (value: string | number) => {
    applySavedFilter(String(value))
  }

  return (
    <div className="flex items-center space-x-2">
      <CustomSelect
        placeholder="Saved Filters"
        // defaultValue="Saved Filters"
        options={savedFilters}
        className="w-[200px]"
        onChange={handleSelectChange}
      />
      <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
        <PenIcon className="h-4 w-4 text-white" />
      </Button>
    </div>
  )
}

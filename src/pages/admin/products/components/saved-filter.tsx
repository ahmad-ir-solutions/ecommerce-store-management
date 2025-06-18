import { Button } from "@/components/ui/button"
import { PenIcon } from "lucide-react"
import { CustomSelect } from "@/components/shared/custom-select"
import { useGetProductFilters } from "@/pages/admin/products/core/hooks/useProductFilter"
import { useState } from "react"
import { SaveFilterModal } from "./modals/save-filter-modal"

interface SavedFiltersProps {
  onApplyFilter: (filters: any) => void
}

export function SavedFilters({ onApplyFilter }: SavedFiltersProps) {
  const { data: savedFiltersData, isLoading } = useGetProductFilters()
  // The backend returns an array of objects with _id, name, filters, etc.
  const savedFilters: any[] = Array.isArray(savedFiltersData) ? savedFiltersData : savedFiltersData?.data || []
  const [selectedFilterId, setSelectedFilterId] = useState<string | null>(null)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [editingFilter, setEditingFilter] = useState<any>(null)

  const handleSelectChange = (value: string | number) => {
    setSelectedFilterId(String(value))
    const selected = savedFilters.find(f => f._id === value || f._id === String(value))
    if (selected && onApplyFilter) {
      onApplyFilter(selected.filters)
    }
  }

  const handleEditClick = () => {
    const current = savedFilters.find(f => f._id === selectedFilterId)
    setEditingFilter(current)
    setIsSaveModalOpen(true)
  }

  return (
    <div className="flex items-center space-x-2">
      <CustomSelect
        placeholder={isLoading ? "Loading..." : "Saved Filters"}
        options={savedFilters.map(f => ({
          id: f._id,
          label: f.name,
          value: f._id,
        }))}
        className="w-[200px]"
        onChange={handleSelectChange}
      />
      <Button
        variant="default"
        className="bg-[#0228fe] hover:bg-[#0228fe]"
        onClick={handleEditClick}
        disabled={isLoading || !selectedFilterId}
      >
        <PenIcon className="h-4 w-4 text-white" />
      </Button>
      <SaveFilterModal
        isOpen={isSaveModalOpen}
        onClose={() => {
          setIsSaveModalOpen(false)
          setEditingFilter(null)
        }}
        currentFilters={editingFilter?.filters || {}}
        editingFilter={editingFilter}
      />
    </div>
  )
}

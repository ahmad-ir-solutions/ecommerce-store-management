import { Button } from "@/components/ui/button"
import { PenIcon } from "lucide-react"
import { CustomSelect } from "@/components/shared/custom-select"
import { useGetOrderFilters } from "../core/hooks/useOrderFilter"
import { useState } from "react"
import { SaveFilterModal } from "./modals/save-filter-modal"
import { SavedFilter } from "../core/_modals"

interface SavedFiltersProps {
  onApplyFilter: (filters: any) => void
}

export function SavedFilters({ onApplyFilter }: SavedFiltersProps) {
  const { data: responseData, isLoading } = useGetOrderFilters()

  const savedFilters: SavedFilter[] = Array.isArray(responseData?.data) ? responseData.data : [];


  const [selectedFilterId, setSelectedFilterId] = useState<string | null>(null)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [editingFilter, setEditingFilter] = useState<SavedFilter | undefined>(undefined)

  const handleSelectChange = (value: string | number) => {
    setSelectedFilterId(String(value))
    const selected = savedFilters?.find(f => (f as any)._id === value || (f as any)._id === String(value))
    if (selected && onApplyFilter) {
      onApplyFilter(selected.filters)
    }
  }

  const handleEditClick = () => {
    const current = savedFilters?.find(f => (f as any)._id === selectedFilterId)
    setEditingFilter(current)
    setIsSaveModalOpen(true)
  }

  return (
    <div className="flex items-center space-x-2">
      <CustomSelect
        placeholder={isLoading ? "Loading..." : "Saved Filters"}
        options={savedFilters?.map(f => ({
          id: (f as any)?._id || '',
          label: f?.name || '',
          value: (f as any)?._id || '',
        })) || []}
        className="w-[200px]"
        onChange={handleSelectChange}
      />
      <Button
        variant="default"
        className="bg-[#024AFE] hover:bg-[#0228fe]"
        onClick={handleEditClick}
        disabled={isLoading || !selectedFilterId}
      >
        <PenIcon className="h-4 w-4 text-white" />
      </Button>
      <SaveFilterModal
        isOpen={isSaveModalOpen}
        onClose={() => {
          setIsSaveModalOpen(false)
          setEditingFilter(undefined)
        }}
        currentFilters={editingFilter?.filters || {}}
        editingFilter={editingFilter}
      />
    </div>
  )
} 
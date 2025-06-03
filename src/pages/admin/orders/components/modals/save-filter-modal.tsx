import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSaveOrderFilter } from "@/pages/admin/orders/core/hooks/useOrderFilter"
import { SavedFilter } from "@/pages/admin/orders/core/_modals"

interface SaveFilterModalProps {
  isOpen: boolean
  onClose: () => void
  currentFilters: any
  editingFilter?: SavedFilter
}

export function SaveFilterModal({ isOpen, onClose, currentFilters, editingFilter }: SaveFilterModalProps) {
  const saveFilter = useSaveOrderFilter()
  const [filterName, setFilterName] = useState(editingFilter?.name || "")

  const handleSave = () => {
    if (!filterName.trim()) return
    const filterData = {
      name: filterName,
      module: "order",
      filters: currentFilters,
    }
    saveFilter.mutate(filterData, {
      onSuccess: () => {
        setFilterName("")
        onClose()
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>{editingFilter ? "Edit Saved Filter" : "Save New Filter"}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            {editingFilter 
              ? "Edit the current saved filter and apply the currently applied filters and sorting."
              : "Save the current filter settings for future use."}
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex-1">
                <Label htmlFor="filter-name" className="text-sm font-medium">
                  Filter Name
                </Label>
                <div className="flex items-center mt-1">
                  <Input
                    id="filter-name"
                    value={filterName}
                    onChange={(e) => setFilterName(e.target.value)}
                    placeholder="Enter filter name"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="public" className="text-sm font-medium">
                Make Filter Public
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Label className="text-sm font-medium">Created by</Label>
              <span className="text-sm">Current User</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex space-x-2">
            <Button onClick={handleSave}>
              {editingFilter ? "Update" : "Save"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
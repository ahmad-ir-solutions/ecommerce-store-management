import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useProductsStore } from "@/store/admin/products-store"
import { Star } from "lucide-react"

interface SaveFilterModalProps {
  isOpen: boolean
  onClose: () => void
  currentFilters: any
}

export function SaveFilterModal({ isOpen, onClose, currentFilters }: SaveFilterModalProps) {
  const { saveFilter } = useProductsStore()
  const [filterName, setFilterName] = useState("")
  const [isPublic, setIsPublic] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleSave = () => {
    if (!filterName.trim()) return
    saveFilter({
      id: filterName.toLowerCase().replace(/\s+/g, "-"),
      label: filterName,
      value: filterName.toLowerCase().replace(/\s+/g, "-"),
      isPublic,
      isFavorite,
      filters: currentFilters,
      createdBy: "Current User", // In a real app, get this from auth context
      createdAt: new Date().toISOString(),
    })

    setFilterName("")
    setIsPublic(false)
    setIsFavorite(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Saved Filter</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">
            Edit the current saved filter and apply the currently applied filters and sorting.
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
                  <Button variant="ghost" size="icon" className="ml-2" onClick={() => setIsFavorite(!isFavorite)}>
                    <Star
                      className={`h-4 w-4 ${isFavorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                    />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="public" checked={isPublic} onCheckedChange={(checked) => setIsPublic(!!checked)} />
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
        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex space-x-2">
            <Button variant="destructive">Delete</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

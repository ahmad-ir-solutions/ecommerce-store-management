
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
} from "@/components/ui/dialog"

interface AddWarehouseZoneModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (zoneName: string) => void
}

export function AddWarehouseZoneModal({ isOpen, onClose, onSave }: AddWarehouseZoneModalProps) {
  const [zoneName, setZoneName] = useState("")

  const handleSave = () => {
    if (zoneName.trim()) {
      onSave(zoneName)
      setZoneName("")
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white rounded-2xl border-none">
        <DialogHeader className="px-6 pt-3 pb-2 flex justify-between items-center">
          <DialogTitle className="text-lg font-medium text-start w-full">Add Warehouse Zone</DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 pt-2">
          <div className="space-y-4">
            <div className="space-y-2 grid grid-cols-5 items-center text-[#4E5967] gap-3">
              <label htmlFor="zone-name" className="text-sm font-medium whitespace-nowrap col-span-2">
                Warehouse Zone Name
              </label>
              <Input
                id="zone-name"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                className="w-full rounded-lg border-gray-300 col-span-3"
                placeholder="Enter zone name"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl px-4"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="primary"
                className="rounded-xl px-6"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

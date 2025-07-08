import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Loader2 } from "lucide-react"
import { useGetWarehouses, useCreateWarehouseZone, useUpdateWarehouseZone } from "../../core/hooks/useWarehouse"
import { SelectDropdown } from "@/components/shared/select-dropdown"

interface AddWarehouseZoneModalProps {
  isOpen: boolean
  onClose: () => void
  zoneToEdit?: {
    _id: string
    warehouseZoneName: string
    warehouse: string
  } | null
}

export function AddWarehouseZoneModal({
  isOpen,
  onClose,
  zoneToEdit = null,
}: AddWarehouseZoneModalProps) {
  const [zoneName, setZoneName] = useState("")
  const [warehouse, setWarehouse] = useState("")
// console.log(warehouse,"warehouse");
  const { data: warehouses } = useGetWarehouses()
  const createWarehouseZoneMutation = useCreateWarehouseZone()
  const updateWarehouseZoneMutation = useUpdateWarehouseZone()

  const warehousesList = useMemo(() => {
    return (
      warehouses?.data?.map((warehouse: any) => ({
        id: warehouse._id,
        label: warehouse.warehouseName,
        value: warehouse._id,
      })) || []
    )
  }, [warehouses])

  // Prefill values on edit
  useEffect(() => {
    if (isOpen) {
      if (zoneToEdit) {
        setZoneName(zoneToEdit.warehouseZoneName || "")
        setWarehouse(zoneToEdit.warehouse || "")
      } else {
        setZoneName("")
        setWarehouse(warehousesList?.[0]?.value || "")
      }
    }
  }, [zoneToEdit, isOpen])

  const handleSave = () => {
    if (!zoneName.trim() || !warehouse) return

    const payload = {
      warehouseZoneName: zoneName,
      warehouse: warehouse,
    }

    if (zoneToEdit?._id) {
      updateWarehouseZoneMutation.mutate(
        { id: zoneToEdit._id, data: payload },
        {
          onSuccess: () => {
            onClose()
            setZoneName("")
            setWarehouse("")
          },
        },
      )
    } else {
      createWarehouseZoneMutation.mutate(payload, {
        onSuccess: () => {
          onClose()
          setZoneName("")
          setWarehouse("")
        },
      })
    }
  }
  const isSaving = createWarehouseZoneMutation.isPending || updateWarehouseZoneMutation.isPending

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white rounded-2xl border-none">
        <DialogHeader className="px-6 pt-3 pb-2 flex justify-between items-center">
          <DialogTitle className="text-lg font-medium text-start w-full">
            {zoneToEdit ? "Edit Warehouse Zone" : "Add Warehouse Zone"}
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6 pt-2">
          <div className="space-y-4">
            {/* Zone Name */}
            <div className="space-y-2 grid grid-cols-5 items-center text-[#4E5967] gap-3">
              <label htmlFor="zone-name" className="text-sm font-medium whitespace-nowrap col-span-2">
                Warehouse Zone Name
              </label>
              <Input
                id="zone-name"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                className="w-full rounded-lg border-gray-300 col-span-3 bg-white"
                placeholder="Enter zone name"
              />
            </div>

            {/* Warehouse Select */}
            <div className="space-y-2 grid grid-cols-5 items-center text-[#4E5967] gap-3">
              <label className="text-sm font-medium whitespace-nowrap col-span-2">Warehouse</label>
              <div className="col-span-3">
                <SelectDropdown
                  placeholder="Select warehouse"
                  options={warehousesList}
                  defaultValue={warehouse}
                  onChange={(value) => setWarehouse(String(value))}
                  className="border-gray-200 bg-white w-full"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={onClose} className="rounded-xl px-4 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                variant="primary"
                className="rounded-xl px-6"
                disabled={isSaving || !zoneName.trim() || !warehouse}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {zoneToEdit ? "Updating..." : "Saving..."}
                  </>
                ) : zoneToEdit ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

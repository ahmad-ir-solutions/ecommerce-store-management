import { useState } from "react"
import { Controller, type Control, type UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { EditOrderFormValues } from "../core/_modals"
import { showSuccessMessage } from "@/lib/utils/messageUtils"
import { CustomSelect } from "@/components/shared/custom-select"

interface ShippingHandlingProps {
  control: Control<EditOrderFormValues>
  register: UseFormRegister<EditOrderFormValues>
}

export function ShippingHandling({ control, register }: ShippingHandlingProps) {
  const [updateOrderTotal, setUpdateOrderTotal] = useState(false)

  const handleUpdateTotal = (checked: boolean) => {
    setUpdateOrderTotal(checked)
    if (checked) {
     showSuccessMessage("The order total will be updated based on the shipping cost")
    }
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-4">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Shipping & Handling</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-4">
          <div className="grid grid-cols-2 gap-y-4 items-center">
            <div className="text-sm text-gray-500">Warehouse</div>
            <div className="text-sm">10/03/2023 @ 09:40</div>

            <div className="text-sm text-gray-500">Shipping Method *</div>
            <div className="flex items-center gap-2">
              <Controller
                name="shippingMethod"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    defaultValue={field.value}
                    placeholder="Please Select"
                    options={[
                      { id: "Complete (Ready to pick)", label: "Complete (Ready to pick)", value: "Complete (Ready to pick)" },
                      { id: "Tracked 24", label: "Tracked 24", value: "Tracked 24" },
                      { id: "Tracked 48", label: "Tracked 48", value: "Tracked 48" },
                      { id: "Standard", label: "Standard", value: "Standard" },
                    ]}
                    onChange={field.onChange}
                    className="border-gray-200 bg-white max-w-52"
                    />
                  )}
              />
              <Checkbox
                id="update-total"
                checked={updateOrderTotal}
                onCheckedChange={(checked) => handleUpdateTotal(!!checked)}
              />
              <label htmlFor="update-total" className="text-xs">
                Update Order Total
              </label>
            </div>

            <div className="text-sm text-gray-500">Shipping Cost</div>
            <div>
              <Input {...register("shippingCost")} className="h-8 border-gray-300 max-w-20" />
            </div>

            <div className="text-sm text-gray-500">Channel Shipping Method</div>
            <div>
              <Input
                {...register("channelShippingMethod")}
                className="h-8 border-gray-300 max-w-48"
                placeholder="ex_RoyalMailFirstClass"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-4 items-center">
            <div className="text-sm text-gray-500">Trucking Number</div>
            <div>
              <Input {...register("trackingNumber")} className="h-8 border-gray-300 max-w-48" />
            </div>

            <div className="text-sm text-gray-500">Special Instructions</div>
            <div>
              <Input {...register("specialInstructions")} className="h-8 border-gray-300 max-w-48" />
            </div>

            <div className="text-sm text-gray-500">Picker Instructions</div>
            <div>
              <Input {...register("pickerInstructions")} className="h-8 border-gray-300 max-w-48" />
            </div>

            <div className="text-sm text-gray-500">Order Weight</div>
            <div className="flex items-center gap-2">
              <Input {...register("orderWeight")} className="h-8 border-gray-300 max-w-18" />
              <span className="text-xs whitespace-nowrap">Override Weight</span>
            </div>

            <div className="text-sm text-gray-500">Package Size</div>
            <div>
              <Input {...register("packageSize")} className="h-8 border-gray-300 max-w-48" />
            </div>

            <div className="text-sm text-gray-500">Number Of Parcels</div>
            <div>
              <Input {...register("numberOfParcels")} className="h-8 border-gray-300 max-w-20" />
            </div>

            <div className="text-sm text-gray-500">AIR Number</div>
            <div>
              <Input {...register("airNumber")} className="h-8 border-gray-300 max-w-48" placeholder="ex_RoyalMailFirstClass" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

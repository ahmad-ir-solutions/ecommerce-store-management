// import { useState } from "react"
// import { Controller, type Control, type UseFormRegister } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { Checkbox } from "@/components/ui/checkbox"
// import { EditOrderFormValues, IOrder } from "../core/_modals"
// import { CustomSelect } from "@/components/shared/custom-select"
// import { useUpdateOrder } from "../core/hooks/use-orders"

// interface ShippingHandlingProps {
//   control: Control<EditOrderFormValues>
//   register: UseFormRegister<EditOrderFormValues>
//   order: IOrder
// }

// export function ShippingHandling({ control, register, order }: ShippingHandlingProps) {
//   const [updateOrderTotal, setUpdateOrderTotal] = useState(false)

//   const { mutate: updateOrderMutation, isPending: isUpdating } = useUpdateOrder()

//   const handleUpdateTotal = (checked: boolean) => {
//     setUpdateOrderTotal(checked)
//     if (checked) {
//       updateOrderMutation({
//         id: order._id,
//         data: {
//           shippingCost: 10,
//           total: 100,
//         },
//       })
//     }
//   }

//   return (
//     <div className="bg-white rounded-2xl overflow-hidden mb-4">
//       <div className="p-6">
//         <h2 className="text-lg font-medium mb-4">Shipping & Handling</h2>
//         <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-4">
//           <div className="grid grid-cols-2 gap-y-4 items-center">
//             <div className="text-sm text-gray-500">Warehouse</div>
//             <div className="text-sm">10/03/2023 @ 09:40</div>

//             <div className="text-sm text-gray-500">Shipping Method *</div>
//             <div className="flex items-center gap-2">
//               <Controller
//                 name="shippingMethod"
//                 control={control}
//                 render={({ field }) => (
//                   <CustomSelect
//                     defaultValue={field.value}
//                     placeholder="Please Select"
//                     options={[
//                       { id: "Complete (Ready to pick)", label: "Complete (Ready to pick)", value: "Complete (Ready to pick)" },
//                       { id: "Tracked 24", label: "Tracked 24", value: "Tracked 24" },
//                       { id: "Tracked 48", label: "Tracked 48", value: "Tracked 48" },
//                       { id: "Standard", label: "Standard", value: "Standard" },
//                     ]}
//                     onChange={field.onChange}
//                     className="border-gray-200 bg-white max-w-52"
//                   />
//                 )}
//               />
//               <Checkbox
//                 id="update-total"
//                 checked={updateOrderTotal}
//                 onCheckedChange={(checked) => handleUpdateTotal(!!checked)}
//               />
//               <label htmlFor="update-total" className="text-xs">
//                 Update Order Total
//               </label>
//             </div>

//             <div className="text-sm text-gray-500">Shipping Cost</div>
//             <div>
//               <Input {...register("shippingCost")} className="h-8 border-gray-300 max-w-20" />
//             </div>

//             <div className="text-sm text-gray-500">Channel Shipping Method</div>
//             <div>
//               <Input
//                 {...register("channelShippingMethod")}
//                 className="h-8 border-gray-300 max-w-48"
//                 placeholder="ex_RoyalMailFirstClass"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-y-4 items-center">
//             <div className="text-sm text-gray-500">Trucking Number</div>
//             <div>
//               <Input {...register("trackingNumber")} className="h-8 border-gray-300 max-w-48" />
//             </div>

//             <div className="text-sm text-gray-500">Special Instructions</div>
//             <div>
//               <Input {...register("specialInstructions")} className="h-8 border-gray-300 max-w-48" />
//             </div>

//             <div className="text-sm text-gray-500">Picker Instructions</div>
//             <div>
//               <Input {...register("pickerInstructions")} className="h-8 border-gray-300 max-w-48" />
//             </div>

//             <div className="text-sm text-gray-500">Order Weight</div>
//             <div className="flex items-center gap-2">
//               <Input {...register("orderWeight")} className="h-8 border-gray-300 max-w-18" />
//               <span className="text-xs whitespace-nowrap">Override Weight</span>
//             </div>

//             <div className="text-sm text-gray-500">Package Size</div>
//             <div>
//               <Input {...register("packageSize")} className="h-8 border-gray-300 max-w-48" />
//             </div>

//             <div className="text-sm text-gray-500">Number Of Parcels</div>
//             <div>
//               <Input defaultValue={order?.shippingAndHandling?.airNumber} {...register("numberOfParcels")} className="h-8 border-gray-300 max-w-20" />
//             </div>

//             <div className="text-sm text-gray-500">AIR Number</div>
//             <div>
//               <Input defaultValue={order?.shippingAndHandling?.airNumber} {...register("airNumber")} className="h-8 border-gray-300 max-w-48" placeholder="ex_RoyalMailFirstClass" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import { useState } from "react"
import { Controller, type Control, type UseFormRegister, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { EditOrderFormValues, IOrder } from "../core/_modals"
import { CustomSelect } from "@/components/shared/custom-select"
import { useUpdateOrder } from "../core/hooks/use-orders"
// import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils"
import { Check } from "lucide-react"

interface ShippingHandlingProps {
  control: Control<EditOrderFormValues>
  register: UseFormRegister<EditOrderFormValues>
  order: IOrder
}

export function ShippingHandling({ control, register, order }: ShippingHandlingProps) {
  const [updateOrderTotal, setUpdateOrderTotal] = useState(false)
  const { mutate: updateOrderMutation, isPending: isUpdating } = useUpdateOrder()

  // Watch all form values to detect changes
  const watchedValues = useWatch({ control })

  const handleUpdateTotal = (checked: boolean) => {
    setUpdateOrderTotal(checked)
  }

  console.log(handleUpdateTotal, "watchedValues")

  const handleUpdateShippingData = async () => {
    // try {
      const shippingData = {
        warehouse: watchedValues.warehouse,
        shippingMethod: watchedValues.shippingMethod,
        shippingCost: Number.parseFloat(watchedValues.shippingCost ?? "0") || 0,
        channelShippingMethod: watchedValues.channelShippingMethod,
        trackingNumber: watchedValues.trackingNumber,
        specialInstructions: watchedValues.specialInstructions,
        pickerInstructions: watchedValues.pickerInstructions,
        orderWeight: Number.parseFloat(watchedValues.orderWeight ?? "0") || 0,
        packageSize: watchedValues.packageSize,
        numberOfParcels: Number.parseInt(watchedValues.numberOfParcels?.toString() ?? "0") || 0,
        airNumber: watchedValues.airNumber,
      }

      // If update order total is checked, include total calculation
      if (updateOrderTotal) {
        // shippingData.total = 100
        updateOrderMutation({
          id: order._id,
          data: {
            shippingAndHandling: shippingData,
          },
        })
      } else {

      updateOrderMutation({
        id: order._id,
        data: {
          shippingAndHandling: shippingData,
          },
        })
      }

    // } catch (error) {
    //   showErrorMessage("Failed to update shipping & handling information. Please try again.")
    // }
  }
  console.log(order.shippingAndHandling?.warehouse?.warehouseName, "order.shippingAndHandling?.warehouse")

  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-4">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Shipping & Handling</h2>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="h-8 bg-[#024AFE] text-white disabled:opacity-50"
            onClick={handleUpdateShippingData}
            disabled={isUpdating}
          >
            <Check className="h-4 w-4 mr-1" />
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-4 px-4">
          <div className="grid grid-cols-2 gap-y-4 items-center">
            <div className="text-sm text-gray-500">Warehouse</div>
            <Controller
                name="warehouse"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    defaultValue={order.shippingAndHandling?.warehouse?.warehouseName}
                    placeholder="Please Select"
                    options={[
                      {
                        id: "683962e0257e6c5861f7472e",
                        label: "Fiona Peck",
                        value: "683962e0257e6c5861f7472e",
                      },
                      { id: "683962bd257e6c5861f74729", label: "Camilla Baker", value: "683962bd257e6c5861f74729" },
                      { id: "683960f5257e6c5861f7470c", label: "Phillip Newman", value: "683960f5257e6c5861f7470c" },
                      { id: "683960bc257e6c5861f74708", label: "Baxter Clark", value: "683960bc257e6c5861f74708" },
                    ]}
                    onChange={field.onChange}
                    className="border-gray-200 bg-white max-w-52"
                  />
                )}
              />

            <div className="text-sm text-gray-500">Shipping Method *</div>
            <div className="flex items-center gap-2">
              <Controller
                name="shippingMethod"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    defaultValue={order.shippingAndHandling?.shippingMethod}
                    placeholder="Please Select"
                    options={[
                      {
                        id: "Complete (Ready to pick)",
                        label: "Complete (Ready to pick)",
                        value: "Complete (Ready to pick)",
                      },
                      { id: "Tracked 24", label: "Tracked 24", value: "Tracked 24" },
                      { id: "Tracked 48", label: "Tracked 48", value: "Tracked 48" },
                      { id: "Standard", label: "Standard", value: "Standard" },
                    ]}
                    onChange={field.onChange}
                    className="border-gray-200 bg-white max-w-52"
                  />
                )}
              />
              {/* <Checkbox
                id="update-total"
                checked={updateOrderTotal}
                onCheckedChange={(checked) => handleUpdateTotal(!!checked)}
                disabled={isUpdating}
              /> */}
              {/* <label htmlFor="update-total" className="text-xs">
                Update Order Total
              </label> */}
            </div>

            <div className="text-sm text-gray-500">Shipping Cost</div>
            <div>
              <Input {...register("shippingCost")} className="h-8 border-gray-300 max-w-20" disabled={isUpdating} />
            </div>

            <div className="text-sm text-gray-500">Channel Shipping Method</div>
            <div>
              <Input
                {...register("channelShippingMethod")}
                className="h-8 border-gray-300 max-w-48"
                placeholder="ex_RoyalMailFirstClass"
                disabled={isUpdating}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-4 items-center">
            <div className="text-sm text-gray-500">Tracking Number</div>
            <div>
              <Input {...register("trackingNumber")} className="h-8 border-gray-300 max-w-48" disabled={isUpdating} />
            </div>

            <div className="text-sm text-gray-500">Special Instructions</div>
            <div>
              <Input
                {...register("specialInstructions")}
                className="h-8 border-gray-300 max-w-48"
                disabled={isUpdating}
              />
            </div>

            <div className="text-sm text-gray-500">Picker Instructions</div>
            <div>
              <Input
                {...register("pickerInstructions")}
                className="h-8 border-gray-300 max-w-48"
                disabled={isUpdating}
              />
            </div>

            <div className="text-sm text-gray-500">Order Weight</div>
            <div className="flex items-center gap-2">
              <Input {...register("orderWeight")} className="h-8 border-gray-300 max-w-18" disabled={isUpdating} />
              <span className="text-xs whitespace-nowrap">Override Weight</span>
            </div>

            <div className="text-sm text-gray-500">Package Size</div>
            <div>
              <Input {...register("packageSize")} className="h-8 border-gray-300 max-w-48" disabled={isUpdating} />
            </div>

            <div className="text-sm text-gray-500">Number Of Parcels</div>
            <div>
              <Input
                defaultValue={order?.shippingAndHandling?.numberOfParcels}
                {...register("numberOfParcels")}
                className="h-8 border-gray-300 max-w-20"
                disabled={isUpdating}
              />
            </div>

            <div className="text-sm text-gray-500">AIR Number</div>
            <div>
              <Input
                defaultValue={order?.shippingAndHandling?.airNumber}
                {...register("airNumber")}
                className="h-8 border-gray-300 max-w-48"
                placeholder="ex_RoyalMailFirstClass"
                disabled={isUpdating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

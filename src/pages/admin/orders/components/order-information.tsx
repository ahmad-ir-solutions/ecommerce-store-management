import { Controller, UseFormRegister, type Control, UseFormWatch } from "react-hook-form"
import { Checkbox } from "@/components/ui/checkbox"
import { EditOrderFormValues, IOrder } from "../core/_modals"
import { CustomSelect } from "@/components/shared/custom-select"
import { CustomerInformation } from "./customer-information"
import { ShippingHandling } from "./shipping-handling"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import { useUpdateOrder } from "../core/hooks/use-orders"

interface OrderInformationProps {
  order: IOrder
  control: Control<EditOrderFormValues>
  register: UseFormRegister<EditOrderFormValues>
  refetch: () => void
  watch: UseFormWatch<EditOrderFormValues>
}

export function OrderInformation({ order, control, register, refetch, watch }: OrderInformationProps) {

  const { mutate: updateOrderMutation, isPending: isUpdatingOrder } = useUpdateOrder()

  // Get watch from react-hook-form context
  const watchedOrderStatus = watch("orderStatus")
  const watchedAttentionRequired = watch("attentionRequired")

  // Determine if values have changed
  const isChanged =
    watchedOrderStatus !== order.orderStatus ||
    watchedAttentionRequired !== order.attentionRequired

  const handleUpdateOrder = (orderStatus: string, attentionRequired: boolean) => {
    updateOrderMutation({
      id: order._id,
      data: {
        orderStatus,
        attentionRequired,
      },
    })
    refetch()
  }

  return (
    <div className="grid md:grid-cols-2 gap-4 mb-4 mt-6">
      <div className="bg-white rounded-2xl overflow-hidden relative">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Order Information</h2>

          <div className="grid grid-cols-2 gap-y-4 bg-[#ECF6FF] rounded-xl">
            <div className="text-sm text-gray-500 p-2 pl-4">Order ID</div>
            <div className="text-sm p-2">{order._id}</div>

            <div className="text-sm text-gray-500 p-2 pl-4">Company Identity</div>
            <div className="text-sm p-2">{order.companyIdentity || "-"}</div>

            <div className="text-sm text-gray-500 p-2 pl-4">Channel Purchased From</div>
            <div className="text-sm p-2">{order.channelPurhasedFrom}</div>

            <div className="text-sm text-gray-500 p-2 pl-4">Channel Order ID</div>
            <div className="text-sm text-[#024AFE] p-2">{order.channelOrderNumber}</div>

            <div className="text-sm text-gray-500 p-2 pl-4">Order Status</div>
            <div className="text-sm p-2">
              <Controller
                name="orderStatus"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    defaultValue={order.orderStatus}
                    placeholder="Please Select"
                    options={[
                      { id: "confirmed", label: "Confirmed (Ready to pick)", value: "confirmed" },
                      { id: "Pending", label: "Pending", value: "Pending" },
                      { id: "Shipped", label: "Shipped", value: "Shipped" },
                      { id: "Cancelled", label: "Cancelled", value: "Cancelled" },
                    ]}
                    onChange={field.onChange}
                    className="border-gray-200 bg-white max-w-48"
                  />
                )}
              />
            </div>

            <div className="text-sm text-gray-500 p-2 pl-4">Attention Required</div>
            <div className="text-sm p-2">
              <Controller
                name="attentionRequired"
                control={control}
                render={({ field }) => <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-gray-400" />}
              />
            </div>
          </div>
        </div>
        {/* customer Information */}
        <CustomerInformation
          order={order}
          refetch={refetch}
        />

        {/* eBay logo */}
        <div className="absolute top-6 right-6">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="16" viewBox="0 0 1000 400">
            <path
              d="M296.3,129.7c-65.5,0-118.5,25.8-118.5,115.9c0,62.5,33.1,110.4,119.9,110.4c98.4,0,104.1-64.8,104.1-64.8h-47.3 c0,0-13.2,32.9-59.6,32.9c-40.7,0-70.6-27.5-70.6-65.8h180.1C404.4,258.3,407.9,129.7,296.3,129.7z M225.7,221.4 c0-30.9,23.2-59.6,68.2-59.6c35.1,0,61.9,22.4,61.9,59.6H225.7z"
              fill="#e53238"
            />
            <path
              d="M721.1,250.7c0,29.8-0.5,57.1,0.2,71.3c1.2,22.8,13.9,38.3,42.7,38.3c11.3,0,24.9-1.5,24.9-1.5v-33.4 c0,0-6.9,0.7-13,0.7c-11.5,0-17.1-5.7-17.1-22.4c0-16.7,0-151.4,0-151.4h-37.6V250.7z"
              fill="#0064d2"
            />
            <path
              d="M911.8,152.4v32.6c0,0-28.7-14.2-71.8,0.7c-73.5,25.3-69.2,110.1-8.5,135.5c33.9,14.2,80.2,5.5,80.2,5.5v32.6 c0,0-41.4,7.1-81.9-3.4c-94.3-24.4-112.9-132.2-41.7-180.1C835.7,144.1,911.8,152.4,911.8,152.4z"
              fill="#f5af02"
            />
            <path
              d="M138.8,152.4h-57.1l-76,201.9h51.7l15.5-44.2h74.9l15.5,44.2h51.7L138.8,152.4z M84.1,276.3l27.3-78.1l27.3,78.1H84.1z"
              fill="#86b817"
            />
            <path
              d="M577.2,152.4h-47.8v201.9h47.8c0,0,0-79.8,0-114.2c0-34.4,46.9-40.9,69.6-11.3c0,34.4,0,125.5,0,125.5h47.8V215.9 c0-59.6-35.8-73.5-59.6-73.5c-23.9,0-44.9,13.9-57.8,32.6C577.2,175,577.2,152.4,577.2,152.4z"
              fill="#0064d2"
            />
          </svg> */}
          <Button
            type="button"
            className="bg-[#024AFE] text-white w-7 h-7"
            onClick={() => handleUpdateOrder(watchedOrderStatus, watchedAttentionRequired)}
            disabled={!isChanged || isUpdatingOrder}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Order Information</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-4 gap-x-15">
              <div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Order Date</div>
                  <div className="text-sm p-2">{order.orderDate || "-"}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Imported from Channel on</div>
                  <div className="text-sm p-2">{order.importedFromChannelOn || "-"}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Assigned to Picker on</div>
                  <div className="text-sm p-2">{order.assignedToPickerOn || "-"}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Pickwave ID</div>
                  <div className="text-sm p-2">{order.pickwave || "-"}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Despatched on</div>
                  <div className="text-sm p-2">{order.dispatchedOn || "-"}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Despatch sent to Channel</div>
                  <div className="text-sm p-2">{order.dispatchSentToChannel || "-"}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Payment ID</div>
                  <div className="text-sm p-2">{order.paymentId || "-"}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Delivered on</div>
                  <div className="text-sm p-2">{order.deliveredOn || "-"}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Manifested on</div>
                  <div className="text-sm p-2">{order.manifestedOn || "-"}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Pickwave ID</div>
                  <div className="text-sm p-2">{order.pickwave || "-"}</div>
                </div>

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Designated Picker</div>
                  <div className="text-sm p-2">{order.designatedPacker || "-"}</div>
                </div>

                {/* <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Designated Picker</div>
                  <div className="text-sm p-2">{order.designatedPacker || "-"}</div>
                </div> */}

                <div className="flex justify-between">
                  <div className="text-sm text-gray-500 p-2 pl-4">Signed for by</div>
                  <div className="text-sm p-2">{order.signedForBy || "-"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* shipping and handling */}
        <ShippingHandling order={order} control={control} register={register} />
      </div>
    </div>
  )
}

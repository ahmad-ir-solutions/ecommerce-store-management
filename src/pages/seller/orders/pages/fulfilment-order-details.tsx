import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

// Import components
import { Header } from "@/components/shared/header"
import { Loader2 } from "lucide-react"
import { useEffect } from 'react'
// import { useGetFulfilmentOrders } from "../core/hooks/useWooCommerceOrders"
import { useGetOrder } from "@/pages/admin/orders/core/hooks/use-orders"
// import { ActionButtons } from "@/pages/admin/orders/components/action-buttons"
import { OrderInformation } from "@/pages/admin/orders/components/order-information"
import { ItemsOrdered } from "@/pages/admin/orders/components/items-ordered"
import { OrderTotals } from "@/pages/admin/orders/components/order-total"
import { OrderNotes } from "@/pages/admin/orders/components/order-notes"
// import { FormActions } from "@/pages/admin/orders/components/form-actions"
import type { EditOrderFormValues } from "@/pages/admin/orders/core/_modals"
import { editOrderSchema } from "@/pages/admin/orders/core/_schema"

export function FulfilmentOrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>()

  const {
    order,
    isLoading,
    error,
    refetch,
  } = useGetOrder(orderId || "")

  console.log(order, "order");

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EditOrderFormValues>({
    resolver: zodResolver(editOrderSchema),
    defaultValues: {
      orderStatus: "Complete (Ready to pick)",
      attentionRequired: false,
      shippingMethod: "Complete (Ready to pick)",
      shippingCost: "0.00",
      channelShippingMethod: "",
      trackingNumber: "",
      specialInstructions: "",
      pickerInstructions: "",
      orderWeight: "0.0",
      packageSize: "",
      numberOfParcels: 1,
      airNumber: "",
      overrideWeight: false,
      updateOrderTotal: false,
    },
  })
  console.log(isSubmitting, "isSubmitting")

  // Update form when order data is loaded
  useEffect(() => {
    if (order) {
      reset({
        orderStatus: "Complete (Ready to pick)",
        attentionRequired: false,
        shippingMethod: order.shippingAndHandling?.shippingMethod ?? "Complete (Ready to pick)",
        shippingCost: String(order.shippingAndHandling?.shippingCost ?? "0.00"),
        channelShippingMethod: order.shippingAndHandling?.channelShippingMethod ?? "",
        trackingNumber: order.shippingAndHandling?.trackingNumber ?? "",
        specialInstructions: order.shippingAndHandling?.specialInstructions ?? "",
        pickerInstructions: order.shippingAndHandling?.pickerInstructions ?? "",
        orderWeight: String(order.shippingAndHandling?.orderWeight ?? "0.0"),
        packageSize: order.shippingAndHandling?.packageSize ?? "",
        numberOfParcels: order.shippingAndHandling?.numberOfParcels ?? 1,
        airNumber: order.shippingAndHandling?.airNumber ?? "",
        overrideWeight: order.shippingAndHandling?.overrideWeight ?? false,
        updateOrderTotal: order.shippingAndHandling?.updateOrderTotal ?? false,
      })
    }
  }, [order, reset])

  console.log(errors, "errors")

  const onSubmit = async (data: EditOrderFormValues) => {
    console.log(data);

  }

  // const handleCancel = () => {
  //   navigate("/seller/orders")
  // }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
      </div>
    )
  }

  if (error) return <div className="p-8">Error loading order: {(error as Error).message}</div>
  if (!order) return <div className="p-8">Order not found</div>

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header title="Order">
          {/* <ActionButtons
            orderId={order._id}
          // onClone={cloneOrder}
          // onCancel={cancelOrder}
          // isCloning={isCloning}
          // isCancelling={isCancelling}
          /> */}
        </Header>

        <OrderInformation
          order={order}
          control={control}
          register={register}
          refetch={refetch}
          watch={watch}
        // onUpdateBillingAddress={updateBillingAddress}
        // onUpdateShippingAddress={updateShippingAddress}
        />

        {/* <OrderProductTable /> */}
        <ItemsOrdered order={order}
        //  onUpdateItems={updateOrderItems} 
        />

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <OrderTotals order={order} />

          <OrderNotes order={order}
          // onAddNote={addOrderNote} 
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
      {/* <Button
        type="button"
        variant="outline"
        className="px-8 bg-white border-gray-300"
        onClick={handleCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button> */}
      {/* <Button type="submit" className="bg-[#024AFE] hover:bg-[#021bfe] px-8 text-white" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button> */}
    </div>
      </form>
    </div>
  )
}

export default FulfilmentOrderDetailsPage;
import { useParams, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
// import { useOrder } from "../core/hooks/use-order"
import type { EditOrderFormValues } from "../core/_modals"
import { editOrderSchema } from "../core/_schema"
// import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils"

// Import components
import { ActionButtons } from "../components/action-buttons"
import { OrderInformation } from "../components/order-information"
import { ItemsOrdered } from "../components/items-ordered"
import { OrderTotals } from "../components/order-total"
import { OrderNotes } from "../components/order-notes"
import { FormActions } from "../components/form-actions"
import { Header } from "@/components/shared/header"
// import { OrderProductTable } from "../components/order-product-table"
import { Loader2 } from "lucide-react"
import { useGetOrder } from '../core/hooks/use-orders'
// import { useEffect } from "react"

export default function EditOrderPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const navigate = useNavigate()

  const {
    order,
    isLoading,
    error,
    // submitForm,
    // updateBillingAddress,
    // updateShippingAddress,
    // updateOrderItems,
    // addOrderNote,
    // cancelOrder,
    // cloneOrder,
    // isCancelling,
    // isCloning,
  } = useGetOrder(orderId || "")

  console.log(order, "order");

  const {
    register,
    handleSubmit,
    control,
    // reset,
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
      numberOfParcels: "",
      airNumber: "",
    },
  })

  // Update form when order data is loaded
  // useEffect(() => {
  //   if (order) {
  //     reset({
  //       orderStatus: order.status || "Complete (Ready to pick)",
  //       attentionRequired: order.attentionRequired || false,
  //       shippingMethod: order.shippingMethod || "Complete (Ready to pick)",
  //       shippingCost: order.totals.shippingCosts.toString() || "0.00",
  //       channelShippingMethod: "",
  //       trackingNumber: order.trackingNumber || "",
  //       specialInstructions: order.specialInstructions || "",
  //       pickerInstructions: order.pickerInstructions || "",
  //       orderWeight: order.orderWeight || "0.0",
  //       packageSize: order.packageSize || "",
  //       numberOfParcels: order.numberOfParcels || "",
  //       airNumber: order.airNumber || "",
  //     })
  //   }
  // }, [order, reset])

  console.log(errors, "errors")

  const onSubmit = async (data: EditOrderFormValues) => {
    // const success = await submitForm(data)
    // if (success) {
    //   showSuccessMessage("The order has been updated successfully")
    // } else {
    //   showErrorMessage("There was an error updating the order. Please try again.")
    // }
    console.log(data);

  }

  const handleCancel = () => {
    navigate("/admin/orders")
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) return <div className="p-8">Error loading order: {(error as Error).message}</div>
  if (!order) return <div className="p-8">Order not found</div>

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header title="Edit Orders">
          <ActionButtons
            orderId={order._id}
          // onClone={cloneOrder}
          // onCancel={cancelOrder}
          // isCloning={isCloning}
          // isCancelling={isCancelling}
          />
        </Header>

        <OrderInformation
          order={order}
          control={control}
          register={register}
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

        <FormActions onCancel={handleCancel} isSubmitting={isSubmitting} />
      </form>
    </div>
  )
}

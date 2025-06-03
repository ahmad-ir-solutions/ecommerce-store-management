// import { useParams, useNavigate } from "react-router-dom"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// // import { useOrder } from "../core/hooks/use-order"
// // import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils"

// // Import components
// import { ActionButtons } from "../components/action-buttons"
// import { OrderInformation } from "../components/order-information"
// import { ItemsOrdered } from "../components/items-ordered"
// import { OrderTotals } from "../components/order-total"
// import { OrderNotes } from "../components/order-notes"
// import { FormActions } from "../components/form-actions"
// import { Header } from "@/components/shared/header"
// // import { OrderProductTable } from "../components/order-product-table"
// import { Loader2 } from "lucide-react"
// import { useCreateOrder, useGetOrder } from '../core/hooks/use-orders'
// import { OrderFormValues, orderSchema } from "../core/_schema"
// import { useEffect } from "react"

export default function AddOrderPage() {

  //   const navigate = useNavigate()
  // const createOrderMutation = useCreateOrder()

  // const form = useForm<OrderFormValues>({
  //   resolver: zodResolver(orderSchema),
  //   defaultValues: {
  //     productDetails: "",
  //     customerDetails: {
  //       firstName: "",
  //       lastName: "",
  //       email: "",
  //       phoneNumber: "",
  //       emailCC: "",
  //       customerReference: "",
  //       vatNumbers: "",
  //       abn: "",
  //       shippingAddress: {
  //         firstName: "",
  //         lastName: "",
  //         company: "",
  //         addressLine1: "",
  //         addressLine2: "",
  //         city: "",
  //         state: "",
  //         postalCode: "",
  //         country: "",
  //         phone: "",
  //       },
  //       billingAddress: {
  //         firstName: "",
  //         lastName: "",
  //         company: "",
  //         addressLine1: "",
  //         addressLine2: "",
  //         city: "",
  //         state: "",
  //         postalCode: "",
  //         country: "",
  //         phone: "",
  //       },
  //       channelDetails: "",
  //     },
  //     channelDetails: "",
  //     companyIdentity: "",
  //     channelPurhasedFrom: "",
  //     channelOrderNumber: "",
  //     orderStatus: "Processing",
  //     attentionRequired: false,
  //     sellerId: "",
  //     quantity: 1,
  //     itemOptions: 1,
  //     quantityAllocated: 0,
  //     unitSubtotal: 0,
  //     taxRate: 0,
  //     taxTotal: 0,
  //     discount: 0,
  //     totalPrice: 0,
  //     status: "Pending",
  //     orderDate: new Date().toISOString().split("T")[0],
  //     shippingAndHandling: {
  //       warehouse: "",
  //       shippingMethod: "",
  //       updateOrderTotal: false,
  //       shippingCost: 0,
  //       channelShippingMethod: "",
  //       trackingNumber: "",
  //       specialInstructions: "",
  //       pickerInstructions: "",
  //       orderWeight: 0,
  //       overrideWeight: false,
  //       packageSize: "",
  //       numberOfParcels: 1,
  //       airNumber: "",
  //     },
  //     notes: "",
  //   },
  // })

  // const onSubmit = async (data: OrderFormValues) => {
  //   try {
  //     await createOrderMutation.mutateAsync(data)
  //     // Navigation is handled in the mutation's onSuccess callback
  //   } catch (error) {
  //     console.error("Error creating order:", error)
  //   }
  // }

  // const handleCancel = () => {
  //   navigate("/admin/orders")
  // }

  //   if (isLoading) {
  //       return (
  //           <div className="flex justify-center items-center h-64">
  //               <Loader2 className="h-8 w-8 animate-spin" />
  //           </div>
  //       )
  //   }

  //   if (error) return <div className="p-8">Error loading order: {(error as Error).message}</div>
  //   if (!order) return <div className="p-8">Order not found</div>

    return (
        <div className="mt-6">
            {/* <form onSubmit={handleSubmit(onSubmit)}>
                <Header title="Add Orders">
                    <ActionButtons
                        orderId={order._id}
                    />
                </Header>

                <OrderInformation
                    order={order}
                    control={control}
                    register={register}
                />

                <OrderProductTable />

                <ItemsOrdered order={order} />

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <OrderTotals order={order} />

                    <OrderNotes order={order} />
                </div>

                <FormActions onCancel={handleCancel} isSubmitting={isSubmitting} />
            </form> */}
        </div>
    )
}

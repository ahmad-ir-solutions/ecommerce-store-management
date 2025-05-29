// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
// import { useNavigate } from "react-router-dom"
// import { useState } from "react"
// import { getSpecificOrder, updateOrder, deleteOrder, cloneOrder, cancelOrder } from "../_request"
// import type { UpdateOrderData, OrderDetails, OrderQueryParams } from "../_modals"
// import type { AddressFormValues, BasicOrderDetailsFormValues, EditOrderFormValues } from "../_schema"
// import { transformOrderToOrderDetails } from '../order-mapper'



// // Query keys
// export const orderKeys = {
//   all: ["orders"] as const,
//   lists: () => [...orderKeys.all, "list"] as const,
//   list: (filters: OrderQueryParams) => [...orderKeys.lists(), filters] as const,
//   details: () => [...orderKeys.all, "detail"] as const,
//   detail: (id: string) => [...orderKeys.details(), id] as const,
//   stats: () => [...orderKeys.all, "stats"] as const,
// }

// // Custom hook for managing a specific order with all its operations
// export const useOrder = (orderId: string) => {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()
//   const [isUpdating, setIsUpdating] = useState(false)

//   // Fetch order data
// //   const {
// //     data: apiOrder,
// //     isLoading,
// //     error,
// //   } = useQuery({
// //     queryKey: orderKeys.detail(orderId),
// //     queryFn: () => getSpecificOrder(orderId),
// //     select: (data) => data.data,
// //     enabled: !!orderId,
// //   })

// //   // Transform API order to component format
// //   const order: OrderDetails | undefined = apiOrder ? transformOrderToOrderDetails(apiOrder) : undefined
// // console.log(order,"dklgjhskdjhfkl");

// //   // Update order mutation
// //   const updateOrderMutation = useMutation({
// //     mutationFn: (data: UpdateOrderData) => updateOrder(orderId, data),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) })
// //       queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
// //     },
// //   })

// //   // Delete order mutation
// //   const deleteOrderMutation = useMutation({
// //     mutationFn: () => deleteOrder(orderId),
// //     onSuccess: () => {
// //       queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
// //       navigate("/admin/orders")
// //     },
// //   })

//   // Clone order mutation
//   const cloneOrderMutation = useMutation({
//     mutationFn: () => cloneOrder(orderId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
//     },
//   })

//   // Cancel order mutation
//   const cancelOrderMutation = useMutation({
//     mutationFn: () => cancelOrder(orderId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: orderKeys.detail(orderId) })
//       queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
//     },
//   })

//   // Update basic order details
//   const updateBasicDetails = async (data: BasicOrderDetailsFormValues) => {
//     setIsUpdating(true)
//     try {
//       await updateOrderMutation.mutateAsync({
//         channelOrderNumber: data.channelOrderNumber,
//         orderStatus: data.orderStatus,
//         attentionRequired: data.attentionRequired,
//         quantity: data.quantity,
//         totalPrice: data.totalPrice,
//         notes: data.notes,
//       })
//       setIsUpdating(false)
//       showSuccessMessage("Order details updated successfully")
//       return true
//     } catch (error) {
//       setIsUpdating(false)
//       showErrorMessage("Failed to update order details")
//       return false
//     }
//   }

//   // Update shipping address
//   const updateShippingAddress = async (data: AddressFormValues) => {
//     setIsUpdating(true)
//     try {
//       await updateOrderMutation.mutateAsync({
//         customerDetails: {
//           ...apiOrder?.customerDetails,
//           shippingAddress: {
//             firstName: data.firstName,
//             lastName: data.lastName,
//             company: data.company,
//             addressLine1: data.addressLine1,
//             addressLine2: data.addressLine2,
//             city: data.city,
//             state: data.state,
//             postalCode: data.postalCode,
//             country: data.country,
//             phone: data.phone
//           },
//         },
//       })
//       setIsUpdating(false)
//       showSuccessMessage("Shipping address updated successfully")
//       return order! // Return transformed order
//     } catch (error) {
//       setIsUpdating(false)
//       showErrorMessage("Failed to update shipping address")
//       throw error
//     }
//   }

//   // Update billing address
//   const updateBillingAddress = async (data: AddressFormValues) => {
//     setIsUpdating(true)
//     try {
//       await updateOrderMutation.mutateAsync({
//         billingAddress: {
//           firstName: data.firstName,
//           lastName: data.lastName,
//           company: data.company,
//           addressLine1: data.addressLine1,
//           addressLine2: data.addressLine2,
//           city: data.city,
//           state: data.state,
//           postalCode: data.postalCode,
//           country: data.country,
//           phone: data.phone
//         },
//       })
//       setIsUpdating(false)
//       showSuccessMessage("Billing address updated successfully")
//       return order! // Return transformed order
//     } catch (error) {
//       setIsUpdating(false)
//       showErrorMessage("Failed to update billing address")
//       throw error
//     }
//   }

//   // Submit form (for edit order form)
//   const submitForm = async (formData: EditOrderFormValues) => {
//     setIsUpdating(true)
//     try {
//       await updateOrderMutation.mutateAsync({
//         orderStatus: formData.orderStatus,
//         attentionRequired: formData.attentionRequired,
//         shippingAndHandling: {
//           ...apiOrder?.shippingAndHandling,
//           shippingMethod: formData.shippingMethod,
//           shippingCost: Number.parseFloat(formData.shippingCost),
//           channelShippingMethod: formData.channelShippingMethod,
//           trackingNumber: formData.trackingNumber,
//           specialInstructions: formData.specialInstructions,
//           pickerInstructions: formData.pickerInstructions,
//           orderWeight: formData.orderWeight ? Number.parseFloat(formData.orderWeight) : undefined,
//           packageSize: formData.packageSize,
//           numberOfParcels: formData.numberOfParcels ? Number.parseInt(formData.numberOfParcels) : undefined,
//           airNumber: formData.airNumber,
//         },
//       })
//       setIsUpdating(false)
//       showSuccessMessage("Order updated successfully")
//       return true
//     } catch (error) {
//       setIsUpdating(false)
//       showErrorMessage("Failed to update order")
//       return false
//     }
//   }

//   // Legacy methods for backward compatibility
//   const updateOrderItems = async (items: any[]) => {
//     console.log(items, "items");
    
//     // Implementation for updating order items
//     return order!
//   }

//   // const addOrderNote = async (note: { subject: string; note: string; createdBy: string }) => {
//   //   setIsUpdating(true)
//   //   try {
//   //     const currentNotes = apiOrder?.notes || ""
//   //     const newNote = `${note.subject}: ${note.note} (by ${note.createdBy})`
//   //     const updatedNotes = currentNotes ? `${currentNotes}\n${newNote}` : newNote

//   //     await updateOrderMutation.mutateAsync({
//   //       notes: updatedNotes,
//   //     })
//   //     setIsUpdating(false)
//   //     showSuccessMessage("Note added successfully")
//   //     return order!
//   //   } catch (error) {
//   //     setIsUpdating(false)
//   //     showErrorMessage("Failed to add note")
//   //     throw error
//   //   }
//   // }

//   // Delete order
//   // const deleteOrderHandler = async () => {
//   //   try {
//   //     await deleteOrderMutation.mutateAsync()
//   //     showSuccessMessage("Order deleted successfully")
//   //     return true
//   //   } catch (error) {
//   //     showErrorMessage("Failed to delete order")
//   //     return false
//   //   }
//   // }

//   // Clone order
//   const cloneOrderHandler = async () => {
//     try {
//       await cloneOrderMutation.mutateAsync()
//       showSuccessMessage("Order cloned successfully")
//       return true
//     } catch (error) {
//       showErrorMessage("Failed to clone order")
//       return false
//     }
//   }

//   // Cancel order
//   const cancelOrderHandler = async () => {
//     try {
//       await cancelOrderMutation.mutateAsync()
//       showSuccessMessage("Order cancelled successfully")
//       return true
//     } catch (error) {
//       showErrorMessage("Failed to cancel order")
//       return false
//     }
//   }

//   return {
//     // order,
//     // isLoading,
//     // error,
//     isUpdating,
//     updateBasicDetails,
//     updateShippingAddress,
//     updateBillingAddress,
//     updateOrderItems,
//     addOrderNote,
//     submitForm,
//     // deleteOrder: deleteOrderHandler,
//     cloneOrder: cloneOrderHandler,
//     cancelOrder: cancelOrderHandler,
//     isCancelling: cancelOrderMutation.isPending,
//     isCloning: cloneOrderMutation.isPending,
//   }
// }

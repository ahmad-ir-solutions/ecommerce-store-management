import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useOrderStore } from "@/store/admin/order-store"
import { cancelOrder, cloneOrder, fetchOrderDetails, updateOrder } from "../_dummy"
import { Address, CreateOrderData, EditOrderFormValues, OrderDetails, OrderItem, OrderQueryParams, OrderTotals, UpdateOrderData } from "../_modals"
import { useEffect } from "react"

export function useOrder(orderId: string) {
  const queryClient = useQueryClient()
  const {
    setOrder,
    updateOrderStatus,
    updateShippingMethod,
    updateShippingCost,
    updateAttentionRequired,
    updateBillingAddress,
    updateShippingAddress,
    updateOrderItems,
    addOrderNote,
    addProductsToOrder,
    setLoading,
    setError,
  } = useOrderStore()

  // Fetch order details
  // const { data, isLoading, error, refetch } = useQuery<OrderDetails, Error>({
  //   queryKey: ["orderDetails", orderId],
  //   queryFn: () => fetchOrderDetails(orderId),
  //   enabled: !!orderId,
  //   onSuccess: (data: any) => {
  //     setOrder(data)
  //   },
  //   onError: (error: any) => {
  //     console.log(error,"asfsdfsd");
      
  //     setError(error)
  //   },
  // })

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["orderDetails", orderId],
    queryFn: () => fetchOrderDetails(orderId),
    enabled: !!orderId,
  });

  useEffect(() => {
    if (data) {
      setOrder(data);
    }
    if (error) {
      setError(error as Error);
    }
  }, [data, error]);

  // Update order mutation
  const updateOrderMutation = useMutation({
    mutationFn: (data: Partial<OrderDetails>) => updateOrder(orderId, data),
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["order", orderId] })

      // Snapshot the previous value
      const previousOrder = queryClient.getQueryData<OrderDetails>(["order", orderId])

      // Optimistically update to the new value
      if (previousOrder) {
        queryClient.setQueryData<OrderDetails>(["order", orderId], {
          ...previousOrder,
          ...newData,
        })
      }

      return { previousOrder }
    },
    onError: (err, newData, context) => {
      console.log(newData, "newData");
      
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousOrder) {
        queryClient.setQueryData<OrderDetails>(["order", orderId], context.previousOrder)
      }
      setError(err as Error)
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({ queryKey: ["order", orderId] })
    },
  })

  // Cancel order mutation
  const cancelOrderMutation = useMutation({
    mutationFn: () => cancelOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", orderId] })
    },
  })

  // Clone order mutation
  const cloneOrderMutation = useMutation({
    mutationFn: () => cloneOrder(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] })
    },
  })

  // Submit form data
  const submitForm = async (formData: EditOrderFormValues) => {
    setLoading(true)

    try {
      // Update order status
      updateOrderStatus(formData.orderStatus)

      // Update shipping method
      updateShippingMethod(formData.shippingMethod)

      // Update shipping cost
      updateShippingCost(Number.parseFloat(formData.shippingCost))

      // Update attention required
      updateAttentionRequired(!!formData.attentionRequired)

      // Submit to server
      await updateOrderMutation.mutateAsync({
        status: formData.orderStatus,
        shippingMethod: formData.shippingMethod,
        attentionRequired: !!formData.attentionRequired,
        totals: {
          ...(data?.totals || {}),
          shippingCosts: Number.parseFloat(formData.shippingCost),
        } as OrderTotals,
        // Add other form fields as needed
        trackingNumber: formData.trackingNumber,
        specialInstructions: formData.specialInstructions,
        pickerInstructions: formData.pickerInstructions,
        orderWeight: formData.orderWeight,
        packageSize: formData.packageSize,
        numberOfParcels: formData.numberOfParcels,
        airNumber: formData.airNumber,
      })

      return true
    } catch (error) {
      setError(error as Error)
      return false
    } finally {
      setLoading(false)
    }
  }

  // Update billing address
  const updateBillingAddressFn = async (address: Address) => {
    updateBillingAddress(address)
    return updateOrderMutation.mutateAsync({ billingAddress: address })
  }

  // Update shipping address
  const updateShippingAddressFn = async (address: Address) => {
    updateShippingAddress(address)
    return updateOrderMutation.mutateAsync({ shippingAddress: address })
  }

  // Update order items
  const updateOrderItemsFn = async (items: OrderItem[]) => {
    updateOrderItems(items)
    return updateOrderMutation.mutateAsync({ items })
  }

  // Add order note
  const addOrderNoteFn = async (note: { subject: string; note: string; createdBy: string }) => {
    addOrderNote(note)
    return updateOrderMutation.mutateAsync({
      notes: [
        ...(data?.notes || []),
        {
          id: `note-${Date.now()}`,
          subject: note.subject,
          note: note.note,
          createdOn: new Date(),
          createdBy: note.createdBy,
        },
      ],
    })
  }

  // Add products to order
  const addProductsToOrderFn = async (products: any[]) => {
    addProductsToOrder(products)

    // Convert products to order items
    const newItems: OrderItem[] = products.map((product) => ({
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      sku: product.sku,
      name: product.name,
      quantity: product.quantity || 1,
      unitSubtotal: product.price,
      taxRate: 20, // Default tax rate
      taxTotal: product.price * 0.2, // 20% tax
      discount: 0,
      status: "Pending",
      quantityAllocated: 0,
      options: "",
    }))

    return updateOrderMutation.mutateAsync({
      items: [...(data?.items || []), ...newItems],
    })
  }

  return {
    order: data,
    isLoading: isLoading || updateOrderMutation.isPending,
    error,
    refetch,
    submitForm,
    updateBillingAddress: updateBillingAddressFn,
    updateShippingAddress: updateShippingAddressFn,
    updateOrderItems: updateOrderItemsFn,
    addOrderNote: addOrderNoteFn,
    addProductsToOrder: addProductsToOrderFn,
    cancelOrder: cancelOrderMutation.mutate,
    cloneOrder: cloneOrderMutation.mutate,
    isCancelling: cancelOrderMutation.isPending,
    isCloning: cloneOrderMutation.isPending,
  }
}




// import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
// import type { AxiosError } from "axios"
// import { useNavigate } from "react-router-dom"
// import { createOrder, deleteOrder, getAllOrders, getSpecificOrder } from '../_request'

// // Query keys
// export const orderKeys = {
//   all: ["orders"] as const,
//   lists: () => [...orderKeys.all, "list"] as const,
//   list: (filters: OrderQueryParams) => [...orderKeys.lists(), filters] as const,
//   details: () => [...orderKeys.all, "detail"] as const,
//   detail: (id: string) => [...orderKeys.details(), id] as const,
// }

// // Get all orders with optional filtering
// export const useGetOrders = (params?: OrderQueryParams) => {
//   return useQuery({
//     queryKey: orderKeys.list(params || {}),
//     queryFn: () => getAllOrders(params),
//     select: (data) => data.data,
//   })
// }

// // Get a specific order by ID
// export const useGetOrder = (id: string) => {
//   return useQuery({
//     queryKey: orderKeys.detail(id),
//     queryFn: () => getSpecificOrder(id),
//     select: (data) => data.data,
//     enabled: !!id, // Only run if ID is provided
//   })
// }

// // Create a new order
// export const useCreateOrder = () => {
//   const queryClient = useQueryClient()
//   const navigate = useNavigate()

//   return useMutation({
//     mutationFn: (data: CreateOrderData) => createOrder(data),
//     onSuccess: (response) => {
//       queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
//       showSuccessMessage(response.data.message || "Order created successfully!")
//       const newOrderId = response.data?._id
//       navigate(`/admin/orders/${newOrderId}`)
//     },
//     onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
//       if (error.response?.data.errors) {
//         Object.values(error.response.data.errors).forEach((errorMessage) => {
//           showErrorMessage(errorMessage)
//         })
//       } else {
//         showErrorMessage(error.response?.data?.message || "Failed to create order. Please try again.")
//       }
//     },
//   })
// }

// // Update an existing order
// export const useUpdateOrder = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: ({ id, data }: { id: string; data: UpdateOrderData }) => updateOrder(id, data),
//     onSuccess: (response, variables) => {
//       // Invalidate specific order query and list queries
//       queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) })
//       queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
//       showSuccessMessage(response.data.message || "Order updated successfully!")
//     },
//     onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
//       if (error.response?.data.errors) {
//         Object.values(error.response.data.errors).forEach((errorMessage) => {
//           showErrorMessage(errorMessage)
//         })
//       } else {
//         showErrorMessage(error.response?.data?.message || "Failed to update order. Please try again.")
//       }
//     },
//   })
// }

// // Delete an order
// export const useDeleteOrder = () => {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (id: string) => deleteOrder(id),
//     onSuccess: (response) => {
//       // Invalidate list queries after deletion
//       queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
//       showSuccessMessage(response.data.message || "Order deleted successfully!")
//     },
//     onError: (error: AxiosError<{ message: string }>) => {
//       showErrorMessage(error.response?.data?.message || "Failed to delete order. Please try again.")
//     },
//   })
// }

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSpecificOrder,
  updateOrder,
  bulkUpdateOrderStatus,
  bulkExportOrders,
  bulkAssignOrders,
  bulkDeleteOrders,
  uploadOrdersCsv,
//   getOrderStats,
  cloneOrder,
  cancelOrder,
} from "../_request"
import { useNavigate } from "react-router-dom"
import type {
  CreateOrderData,
  OrderQueryParams,
  UpdateOrderData,
  BulkStatusUpdateData,
  BulkExportData,
  BulkAssignData,
} from "../_modals"

// Query keys
export const orderKeys = {
  all: ["orders"] as const,
  lists: () => [...orderKeys.all, "list"] as const,
  list: (filters: OrderQueryParams) => [...orderKeys.lists(), filters] as const,
  details: () => [...orderKeys.all, "detail"] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  stats: () => [...orderKeys.all, "stats"] as const,
}

// Get all orders with optional filtering
export const useGetOrders = (params?: OrderQueryParams) => {
  const query = useQuery({
    queryKey: orderKeys.list(params || {}),
    queryFn: () => getAllOrders(params),
    select: (data) => data.data,
  })

  return {
    ...query,
    orders: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}


export const useGetOrder = (id: string) => {
  const query = useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => getSpecificOrder(id),
    select: (data) => {
      return data.data
    },
    enabled: !!id,
  })

  return {
    ...query,
    order: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  }
}


// Get order statistics
// export const useGetOrderStats = (params?: { startDate?: string; endDate?: string }) => {
//   return useQuery({
//     queryKey: [...orderKeys.stats(), params],
//     queryFn: () => getOrderStats(params),
//     select: (data) => data.data,
//   })
// }

// Create a new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateOrderData) => createOrder(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      showSuccessMessage(response.data.message || "Order created successfully!")
      const newOrderId = response.data?._id
      navigate(`/admin/orders/${newOrderId}`)
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to create order. Please try again.")
      }
    },
  })
}

// Update an existing order
export const useUpdateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderData }) => updateOrder(id, data),
    onSuccess: (response, variables) => {
      // Invalidate specific order query and list queries
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      showSuccessMessage(response.data.message || "Order updated successfully!")
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to update order. Please try again.")
      }
    },
  })
}

// Delete an order
export const useDeleteOrder = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: string) => deleteOrder(id),
    onSuccess: (response) => {
      // Invalidate list queries after deletion
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      showSuccessMessage(response.data.message || "Order deleted successfully!")
      navigate("/admin/orders")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete order. Please try again.")
    },
  })
}

// Bulk operations hooks
export const useBulkUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BulkStatusUpdateData) => bulkUpdateOrderStatus(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      showSuccessMessage(
        `Successfully updated ${response.data.processedCount} orders. ${
          response.data.failedCount > 0 ? `${response.data.failedCount} failed.` : ""
        }`,
      )
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to update order status")
    },
  })
}

export const useBulkExportOrders = () => {
  return useMutation({
    mutationFn: (data: BulkExportData) => bulkExportOrders(data),
    onSuccess: (response) => {
      showSuccessMessage("Export prepared successfully. Download will start shortly.")

      // Trigger download
      const link = document.createElement("a")
      link.href = response.data.downloadUrl
      link.download = response.data.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to export orders")
    },
  })
}

export const useBulkAssignOrders = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: BulkAssignData) => bulkAssignOrders(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      showSuccessMessage(
        `Successfully assigned ${response.data.processedCount} orders. ${
          response.data.failedCount > 0 ? `${response.data.failedCount} failed.` : ""
        }`,
      )
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to assign orders")
    },
  })
}

export const useBulkDeleteOrders = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (orderIds: string[]) => bulkDeleteOrders(orderIds),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      showSuccessMessage(
        `Successfully deleted ${response.data.processedCount} orders. ${
          response.data.failedCount > 0 ? `${response.data.failedCount} failed.` : ""
        }`,
      )
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete orders")
    },
  })
}

// CSV upload hook
export const useUploadOrdersCsv = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ file, channelId }: { file: File; channelId: string }) => uploadOrdersCsv(file, channelId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      showSuccessMessage(
        `Successfully processed ${response.data.successCount} orders. ${
          response.data.failCount > 0 ? `${response.data.failCount} failed.` : ""
        }`,
      )
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to upload CSV file")
    },
  })
}

// Clone order hook
export const useCloneOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => cloneOrder(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      showSuccessMessage(response.data.message || "Order cloned successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to clone order")
    },
  })
}

// Cancel order hook
export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => cancelOrder(id),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables) })
      queryClient.invalidateQueries({ queryKey: orderKeys.lists() })
      showSuccessMessage(response.data.message || "Order cancelled successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to cancel order")
    },
  })
}


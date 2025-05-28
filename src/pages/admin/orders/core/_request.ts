import authApi from "@/lib/axios"
import type {
  IOrdersResponse,
  CreateOrderData,
  UpdateOrderData,
  OrderQueryParams,
  IOrder,
  BulkStatusUpdateData,
  BulkExportData,
  BulkAssignData,
  BulkOperationResponse,
  ExportResponse,
  CsvImportResponse,
} from "./_modals"

const ORDERS_URL = "/orders"

// Get all orders with optional query parameters
export function getAllOrders(params?: OrderQueryParams) {
  return authApi.get<IOrdersResponse>(ORDERS_URL, { params })
}

// Get a specific order by ID
export function getSpecificOrder(id: string) {
  return authApi.get<IOrder>(`${ORDERS_URL}/${id}`)
}

// Create a new order
export function createOrder(body: CreateOrderData) {
  return authApi.post<IOrdersResponse>(ORDERS_URL, body)
}

// Update an existing order
export function updateOrder(id: string, body: UpdateOrderData) {
  return authApi.patch<IOrdersResponse>(`${ORDERS_URL}/${id}`, body)
}

// Delete an order
export function deleteOrder(id: string) {
  return authApi.delete<{ message: string }>(`${ORDERS_URL}/${id}`)
}

// Bulk operations
export function bulkUpdateOrderStatus(data: BulkStatusUpdateData) {
  return authApi.patch<BulkOperationResponse>(`${ORDERS_URL}/bulk/status`, data)
}

export function bulkExportOrders(data: BulkExportData) {
  return authApi.post<ExportResponse>(`${ORDERS_URL}/bulk/export`, data)
}

export function bulkAssignOrders(data: BulkAssignData) {
  return authApi.patch<BulkOperationResponse>(`${ORDERS_URL}/bulk/assign`, data)
}

export function bulkDeleteOrders(orderIds: string[]) {
  return authApi.delete<BulkOperationResponse>(`${ORDERS_URL}/bulk`, { data: { orderIds } })
}

// CSV operations
export function uploadOrdersCsv(file: File, channelId: string) {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("channelId", channelId)

  return authApi.post<CsvImportResponse>(`${ORDERS_URL}/import/csv`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

// Order statistics
// export function getOrderStats(params?: { startDate?: string; endDate?: string }) {
//   return authApi.get<OrderStats>(`${ORDERS_URL}/stats`, { params })
// }

// Clone order
export function cloneOrder(id: string) {
  return authApi.post<IOrdersResponse>(`${ORDERS_URL}/${id}/clone`)
}

// Cancel order
export function cancelOrder(id: string) {
  return authApi.patch<IOrdersResponse>(`${ORDERS_URL}/${id}/cancel`)
}

// Print shipping labels
export function printShippingLabels(orderIds: string[]) {
  return authApi.post<{ downloadUrl: string }>(`${ORDERS_URL}/bulk/print-labels`, { orderIds })
}

// Update order tracking
export function updateOrderTracking(id: string, trackingNumber: string, shippingMethod?: string) {
  return authApi.patch<IOrdersResponse>(`${ORDERS_URL}/${id}/tracking`, {
    trackingNumber,
    shippingMethod,
  })
}

// Mark order as dispatched
export function markOrderDispatched(id: string) {
  return authApi.patch<IOrdersResponse>(`${ORDERS_URL}/${id}/dispatch`)
}

// Mark order as delivered
export function markOrderDelivered(id: string, signedBy?: string) {
  return authApi.patch<IOrdersResponse>(`${ORDERS_URL}/${id}/deliver`, { signedBy })
}

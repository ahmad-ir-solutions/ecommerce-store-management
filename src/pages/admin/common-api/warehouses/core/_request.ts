import authApi from "@/lib/axios"
import type {
    IWarehouse
} from "./_modals"

const WAREHOUSES_URL = "/warehouses"

// Get all warehouses
export function getAllWarehouses() {
  return authApi.get<IWarehouse[]>(WAREHOUSES_URL)
}

// Get a specific warehouse by ID
export function getSpecificWarehouse(id: string) {
  return authApi.get<IWarehouse>(`${WAREHOUSES_URL}/${id}`)
}

// Create a new warehouse
export function createWarehouse(body: { channelId: string, channelName: string }) {
  return authApi.post<IWarehouse>(WAREHOUSES_URL, body)
}

// Update an existing warehouse
export function updateWarehouse(id: string, body: { channelName?: string }) {
  return authApi.patch<IWarehouse>(`${WAREHOUSES_URL}/${id}`, body)
}

// Delete a warehouse
export function deleteWarehouse(id: string) {
  return authApi.delete<{ message: string }>(`${WAREHOUSES_URL}/${id}`)
} 
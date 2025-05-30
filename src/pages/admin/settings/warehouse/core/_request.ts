import authApi from "@/lib/axios"
import type {
  IWarehouseResponse,
  IWarehousesResponse,
  CreateWarehouseData,
  UpdateWarehouseData,
  WarehouseQueryParams,
  IWarehouseModel,
} from "./_modal"

const WAREHOUSES_URL = "/warehouses"

export function getAllWarehouses(params?: WarehouseQueryParams) {
  return authApi.get<IWarehousesResponse>(WAREHOUSES_URL, { params })
}

export function getSpecificWarehouse(id: string) {
  return authApi.get<IWarehouseModel>(`${WAREHOUSES_URL}/${id}`)
}

export function createWarehouse(body: CreateWarehouseData) {
  return authApi.post<IWarehouseResponse>(WAREHOUSES_URL, body)
}

export function updateWarehouse(id: string, body: UpdateWarehouseData) {
  return authApi.patch<IWarehouseResponse>(`${WAREHOUSES_URL}/${id}`, body)
}

export function deleteWarehouse(id: string) {
  return authApi.delete<{ success: boolean; message: string }>(`${WAREHOUSES_URL}/${id}`)
}

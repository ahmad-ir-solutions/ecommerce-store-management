import authApi from "@/lib/axios"
import type {
  IWarehouseResponse,
  IWarehousesResponse,
  CreateWarehouseData,
  UpdateWarehouseData,
  WarehouseQueryParams,
  IWarehouseModel,
  IWarehouseZoneModel,
  IWarehouseZonesResponse,
  CreateWarehouseZoneData,
  UpdateWarehouseZoneData,
  WarehouseZoneQueryParams,
} from "./_modal"

const WAREHOUSES_URL = "/warehouses"
const WAREHOUSE_ZONES_URL = "/warehouse-zones"

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

// warehouse zone
export function getAllWarehouseZones(params?: WarehouseZoneQueryParams) {
  return authApi.get<IWarehouseZonesResponse>(WAREHOUSE_ZONES_URL, { params })
}

export function createWarehouseZone(body: CreateWarehouseZoneData) {
  return authApi.post<IWarehouseZoneModel>(WAREHOUSE_ZONES_URL, body)
}

export function updateWarehouseZone(id: string, body: UpdateWarehouseZoneData) {
  return authApi.patch<IWarehouseZoneModel>(`${WAREHOUSE_ZONES_URL}/${id}`, body)
}

export function deleteWarehouseZone(id: string) {
  return authApi.delete<{ success: boolean; message: string }>(`${WAREHOUSE_ZONES_URL}/${id}`)
}

import type { z } from "zod"
import type { warehouseSchema } from "./_schema"

export type WarehouseFormValues = z.infer<typeof warehouseSchema>

export interface IWarehouseResponse {
  success: boolean
  data: WarehouseFormValues & { id: string; createdAt: string; updatedAt: string }
  message?: string
}

export interface IWarehousesResponse {
  success: boolean
  data: Array<WarehouseFormValues & { _id: string; createdAt: string; updatedAt: string }>
    page: number
    limit: number
    total: number
}

export interface WarehouseQueryParams {
  page?: number
  limit?: number
  search?: string
}

export type CreateWarehouseData = WarehouseFormValues
export type UpdateWarehouseData = Partial<WarehouseFormValues>

export interface IWarehouseModel extends WarehouseFormValues {
  id: string
  createdAt: string
  updatedAt: string
}

export interface WarehouseZone {
  id: string
  name: string
  warehouseId: string
  createdAt: string
  updatedAt: string
}

export interface IWarehouseZoneModel extends WarehouseZone {
  warehouseZoneName: string
  warehouse: string
  _id: string
  createdAt: string
  updatedAt: string
  __v: number
  message?: string
}

export interface IWarehouseZonesResponse {
  success: boolean
  data: Array<WarehouseZone & { _id: string; createdAt: string; updatedAt: string }>
  page: number
  limit: number
  total: number
  
}

export interface CreateWarehouseZoneData {
  warehouseZoneName: string
  warehouse: string
}

export interface UpdateWarehouseZoneData extends Partial<CreateWarehouseZoneData> {}

export interface WarehouseZoneQueryParams {
  page?: number
  limit?: number
  search?: string
}
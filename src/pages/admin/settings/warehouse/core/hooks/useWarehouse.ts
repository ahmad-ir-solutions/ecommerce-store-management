import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import {
  getAllWarehouses,
  getSpecificWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  createWarehouseZone,
  getAllWarehouseZones,
  updateWarehouseZone,
  deleteWarehouseZone,
} from "../_request"
import type { WarehouseQueryParams, CreateWarehouseData, UpdateWarehouseData, CreateWarehouseZoneData, WarehouseZoneQueryParams, UpdateWarehouseZoneData } from "../_modal"

// Query keys
export const warehouseKeys = {
  all: ["warehouses"] as const,
  lists: () => [...warehouseKeys.all, "list"] as const,
  list: (filters: WarehouseQueryParams) => [...warehouseKeys.lists(), filters] as const,
  details: () => [...warehouseKeys.all, "detail"] as const,
  detail: (id: string) => [...warehouseKeys.details(), id] as const,
}

export const warehouseZoneKeys = {
  all: ["warehouse-zones"] as const,
  lists: () => [...warehouseZoneKeys.all, "list"] as const,
  list: (filters: WarehouseZoneQueryParams) => [...warehouseZoneKeys.lists(), filters] as const,
}

// Get all warehouses with optional filtering
export const useGetWarehouses = (params?: WarehouseQueryParams) => {
  return useQuery({
    queryKey: warehouseKeys.list(params || {}),
    queryFn: () => getAllWarehouses(params),
    select: (data) => data.data,
  })
}

// Get a specific warehouse by ID
export const useGetWarehouse = (id: string) => {
  return useQuery({
    queryKey: warehouseKeys.detail(id),
    queryFn: () => getSpecificWarehouse(id),
    select: (data) => data.data,
    enabled: !!id, // Only run if ID is provided
  })
}

// Create a new warehouse
export const useCreateWarehouse = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateWarehouseData) => createWarehouse(data),
    onSuccess: (response) => {
      console.log(response, "response")

      queryClient.invalidateQueries({ queryKey: warehouseKeys.lists() })
      showSuccessMessage(response.data.message || "Warehouse created successfully!")
      navigate(`/admin/settings/warehouse`)
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      }
    },
  })
}

// Update an existing warehouse
export const useUpdateWarehouse = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWarehouseData }) => updateWarehouse(id, data),
    onSuccess: (response, variables) => {
      // Invalidate specific warehouse query and list queries
      queryClient.invalidateQueries({ queryKey: warehouseKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: warehouseKeys.lists() })
      showSuccessMessage(response.data.message || "Warehouse updated successfully!")
      navigate(`/admin/settings/warehouse`)
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      }
    },
  })
}

// Delete a warehouse
export const useDeleteWarehouse = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteWarehouse(id),
    onSuccess: (response) => {
      // Invalidate list queries after deletion
      queryClient.invalidateQueries({ queryKey: warehouseKeys.lists() })
      showSuccessMessage(response.data.message || "Warehouse deleted successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete warehouse. Please try again.")
    },
  })
}


// warehouse zone

export const useCreateWarehouseZone = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: CreateWarehouseZoneData) => createWarehouseZone(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: warehouseZoneKeys.lists() })
      showSuccessMessage(response.data.message || "Warehouse zone created successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to create warehouse zone. Please try again.")
    },
  })
}

export const useGetWarehouseZones = (params?: WarehouseZoneQueryParams) => {
  return useQuery({
    queryKey: warehouseZoneKeys.list(params || {}),
    queryFn: () => getAllWarehouseZones(params),
    select: (data) => data.data,
  })
}

export const useUpdateWarehouseZone = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWarehouseZoneData }) => updateWarehouseZone(id, data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: warehouseZoneKeys.lists() })
        showSuccessMessage(response.data.message || "Warehouse zone updated successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to update warehouse zone. Please try again.")
    },
  })
}

export const useDeleteWarehouseZone = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteWarehouseZone(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: warehouseZoneKeys.lists() })
      showSuccessMessage(response.data.message || "Warehouse zone deleted successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete warehouse zone. Please try again.")
    },
  })
}
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
} from "../_request"
import type { WarehouseQueryParams, CreateWarehouseData, UpdateWarehouseData } from "../_modal"

// Query keys
export const warehouseKeys = {
  all: ["warehouses"] as const,
  lists: () => [...warehouseKeys.all, "list"] as const,
  list: (filters: WarehouseQueryParams) => [...warehouseKeys.lists(), filters] as const,
  details: () => [...warehouseKeys.all, "detail"] as const,
  detail: (id: string) => [...warehouseKeys.details(), id] as const,
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

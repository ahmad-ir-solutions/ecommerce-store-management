import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import { CreateSupplierData, SupplierQueryParams, UpdateSupplierData } from '../_modals'
import { createSupplier, deleteSupplier, getAllSuppliers, getSpecificSupplier, updateSupplier } from '../_request'

// Query keys
export const supplierKeys = {
  all: ["suppliers"] as const,
  lists: () => [...supplierKeys.all, "list"] as const,
  list: (filters: SupplierQueryParams) => [...supplierKeys.lists(), filters] as const,
  details: () => [...supplierKeys.all, "detail"] as const,
  detail: (id: string) => [...supplierKeys.details(), id] as const,
}

// Get all suppliers with optional filtering
export const useGetSuppliers = (params?: SupplierQueryParams) => {
  return useQuery({
    queryKey: supplierKeys.list(params || {}),
    queryFn: () => getAllSuppliers(params),
    select: (data) => data.data,
  })
}

// Get a specific supplier by ID
export const useGetSupplier = (id: string) => {
  return useQuery({
    queryKey: supplierKeys.detail(id),
    queryFn: () => getSpecificSupplier(id),
    select: (data) => data.data,
    enabled: !!id, // Only run if ID is provided
  })
}

// Create a new supplier
export const useCreateSupplier = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateSupplierData) => createSupplier(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
      showSuccessMessage(response.data.message || "Supplier created successfully!")
      const newSupplierId = response.data?._id
      navigate(`/admin/suppliers/${newSupplierId}`)
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to create supplier. Please try again.")
      }
    },
  })
}

// Update an existing supplier
export const useUpdateSupplier = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSupplierData }) => updateSupplier(id, data),
    onSuccess: (response, variables) => {
      // Invalidate specific supplier query and list queries
      queryClient.invalidateQueries({ queryKey: supplierKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
      showSuccessMessage(response.data.message || "Supplier updated successfully!")
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to update supplier. Please try again.")
      }
    },
  })
}

// Delete a supplier
export const useDeleteSupplier = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    onSuccess: (response) => {
      // Invalidate list queries after deletion
      queryClient.invalidateQueries({ queryKey: supplierKeys.lists() })
      showSuccessMessage(response.data.message || "Supplier deleted successfully!")
      navigate("/admin/suppliers")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete supplier. Please try again.")
    },
  })
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { SavedFilter } from '../_modals'
import { saveOrderFilter, getOrderFilters, deleteOrderFilter, updateOrderFilter } from '../_request'

// Query keys
export const filterKeys = {
  all: ["order-filters"] as const,
  lists: () => [...filterKeys.all, "list"] as const,
  details: () => [...filterKeys.all, "detail"] as const,
  detail: (id: string) => [...filterKeys.details(), id] as const,
}

// Get all saved filters
export const useGetOrderFilters = () => {
  return useQuery({
    queryKey: filterKeys.lists(),
    queryFn: () => getOrderFilters(),
    select: (data) => data,
  })
}

// Save a new filter
export const useSaveOrderFilter = () => {
    const queryClient = useQueryClient()
  
    return useMutation({
      mutationFn: (filter: SavedFilter) => saveOrderFilter(filter),
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: filterKeys.lists() })
        showSuccessMessage(response.data.message || "Filter saved successfully!")
      },
      onError: (error: AxiosError<{ message: string }>) => {
        showErrorMessage(error.response?.data?.message || "Failed to save filter. Please try again.")
      },
    })
  }


// Delete a filter
export const useDeleteOrderFilter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteOrderFilter(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: filterKeys.lists() })
      showSuccessMessage(response.data.message || "Filter deleted successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete filter. Please try again.")
    },
  })
}

// Update a filter
export const useUpdateOrderFilter = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, filter }: { id: string; filter: Partial<SavedFilter> }) => 
      updateOrderFilter(id, filter),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: filterKeys.lists() })
      showSuccessMessage(response.data.message || "Filter updated successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to update filter. Please try again.")
    },
  })
} 
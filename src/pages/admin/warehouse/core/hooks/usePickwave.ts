import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import {
  getAllPickwaves,
  getSpecificPickwave,
  createPickwave,
  updatePickwave,
  deletePickwave,
  createPickList,
  scanProduct,
  getOrderLabel,
  completePickwave,
  assignPicker,
  startPicking,
  cancelPickwave,
} from "../_request"
import type {
  PickwaveQueryParams,
  CreatePickwaveData,
  UpdatePickwaveData,
  ScanProductData,
  OrderLabelParams,
} from "../_modals"

// Query keys
export const pickwaveKeys = {
  all: ["pickwaves"] as const,
  lists: () => [...pickwaveKeys.all, "list"] as const,
  list: (filters: PickwaveQueryParams) => [...pickwaveKeys.lists(), filters] as const,
  details: () => [...pickwaveKeys.all, "detail"] as const,
  detail: (id: string) => [...pickwaveKeys.details(), id] as const,
  picklists: () => [...pickwaveKeys.all, "picklists"] as const,
  picklist: (id: string) => [...pickwaveKeys.picklists(), id] as const,
  labels: () => [...pickwaveKeys.all, "labels"] as const,
  label: (orderId: string) => [...pickwaveKeys.labels(), orderId] as const,
}

// Get all pickwaves with optional filtering
export const useGetPickwaves = (params?: PickwaveQueryParams) => {
  return useQuery({
    queryKey: pickwaveKeys.list(params || {}),
    queryFn: () => getAllPickwaves(params),
    select: (data) => data.data,
  })
}

// Get a specific pickwave by ID
export const useGetPickwave = (id: string) => {
  return useQuery({
    queryKey: pickwaveKeys.detail(id),
    queryFn: () => getSpecificPickwave(id),
    select: (data) => data.data,
    enabled: !!id, // Only run if ID is provided
  })
}

// Create a new pickwave
export const useCreatePickwave = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePickwaveData) => createPickwave(data),
    onSuccess: (response) => {
      console.log(response);
      
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.lists() })
      showSuccessMessage("Pickwave created successfully!")
    },
    onError: (error: AxiosError<{ message: string | undefined; errors?: { [key: string]: string } }>) => {
        showErrorMessage(error?.response?.data?.message || "Failed to create pickwave")
    },
  })
}

// Update an existing pickwave
export const useUpdatePickwave = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePickwaveData }) => updatePickwave(id, data),
    onSuccess: (response, variables) => {
      console.log(response);
      // Invalidate specific pickwave query and list queries
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.lists() })
      showSuccessMessage("Pickwave updated successfully!")
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to update pickwave")
      }
    },
  })
}

// Delete a pickwave
export const useDeletePickwave = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deletePickwave(id),
    onSuccess: (response) => {
      // Invalidate list queries after deletion
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.lists() })
      showSuccessMessage(response.data.message || "Pickwave deleted successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete pickwave. Please try again.")
    },
  })
}

// Create a pick list for a pickwave
export const useCreatePickList = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (pickwaveId: string) => createPickList(pickwaveId),
    onSuccess: (response, pickwaveId) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.detail(pickwaveId) })
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.picklist(pickwaveId) })
      showSuccessMessage("Pick list generated successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to generate pick list")
    },
  })
}

// Scan a product
export const useScanProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ScanProductData) => scanProduct(data),
    onSuccess: (response, variables) => {
      if (variables.pickwaveId) {
        queryClient.invalidateQueries({ queryKey: pickwaveKeys.detail(variables.pickwaveId) })
      }
      if (variables.picklistId) {
        queryClient.invalidateQueries({ queryKey: pickwaveKeys.picklist(variables.picklistId) })
      }
      if (response.data.success) {
        showSuccessMessage(response.data.message || "Product scanned successfully!")
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to scan product")
    },
  })
}

// Get order label
export const useGetOrderLabel = (params: OrderLabelParams) => {
  return useQuery({
    queryKey: pickwaveKeys.label(params.orderId),
    queryFn: () => getOrderLabel(params),
    select: (data) => data.data,
    enabled: !!params.orderId, // Only run if orderId is provided
  })
}

// Complete pickwave
export const useCompletePickwave = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => completePickwave(id),
    onSuccess: (response, id) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.lists() })
      showSuccessMessage("Pickwave completed successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to complete pickwave")
    },
  })
}

// Assign picker to pickwave
export const useAssignPicker = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, picker }: { id: string; picker: string }) => assignPicker(id, picker),
    onSuccess: (response, variables) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.lists() })
      showSuccessMessage("Picker assigned successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to assign picker")
    },
  })
}

// Start picking process
export const useStartPicking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => startPicking(id),
    onSuccess: (response, id) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.lists() })
      showSuccessMessage("Picking process started!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to start picking process")
    },
  })
}

// Cancel pickwave
export const useCancelPickwave = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => cancelPickwave(id),
    onSuccess: (response, id) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: pickwaveKeys.lists() })
      showSuccessMessage("Pickwave cancelled successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to cancel pickwave")
    },
  })
}
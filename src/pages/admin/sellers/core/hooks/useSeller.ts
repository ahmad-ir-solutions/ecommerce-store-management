import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { addSeller, deleteSeller, getSellerById, getSellerOrders, getSellerOrderStats, getSellers, getSellerTransactions, updateSeller } from "../_request"
import { SellerQueryParams } from "../_modals"

export const useGetAllSellers = (queryParams: SellerQueryParams) => {
  return useQuery({
    queryKey: ["sellers", queryParams],
    queryFn: () => getSellers(queryParams),
    select: (sellerData) => sellerData.data,
  })
}

export const useGetSellerById = (sellerId: string) => {

  return useQuery({
    queryKey: ["seller", sellerId],
    queryFn: () => getSellerById(sellerId),
    select: (sellerData) => sellerData.data,
  })
}

export const useAddSeller = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sellerData: any) => addSeller(sellerData),
    onSuccess: (response) => {
      showSuccessMessage(response.data.message || "Seller added successfully!")
      queryClient.invalidateQueries({ queryKey: ["sellers"] })
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to add seller. Please try again.")
      }
    },
  })
}

export const useUpdateSeller = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ sellerId, sellerData }: { sellerId: string; sellerData: any }) => updateSeller(sellerId, sellerData),
    onSuccess: (response) => {
      showSuccessMessage(response.data.message || "Seller updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["sellers"] })
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to update seller. Please try again.")
      }
    },
  })
}

export const useDeleteSeller = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sellerId: string) => deleteSeller(sellerId),
    onSuccess: (response) => {
      showSuccessMessage(response.data.message || "Seller deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["sellers"] })
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete seller. Please try again.")
    },
  })
}

// useGetSellerOrderStats
export const useGetSellerOrderStats = (sellerId: string) => {
  return useQuery({
    queryKey: ["seller-order-stats", sellerId],
    queryFn: () => getSellerOrderStats(sellerId),
    select: (sellerData) => sellerData.data,
  })
}

// useGetSellerOrders
export const useGetSellerOrders = (sellerId: string, queryParams: SellerQueryParams) => {
  return useQuery({
    queryKey: ["seller-orders", sellerId, queryParams],
    queryFn: () => getSellerOrders(sellerId, queryParams),
    select: (sellerData) => sellerData.data,
  })
}

// useGetSellerTransactions
export const useGetSellerTransactions = (sellerId: string, queryParams: SellerQueryParams) => {
  return useQuery({
    queryKey: ["seller-transactions", sellerId, queryParams],
    queryFn: () => getSellerTransactions(sellerId, queryParams),
    select: (sellerData) => sellerData.data,
  })
} 
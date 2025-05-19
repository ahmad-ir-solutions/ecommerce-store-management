import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { CreateProductData, ProductQueryParams, UpdateProductData } from '../_modals'
import { createProduct, deleteProduct, getAllProducts, getSpecificProduct, updateProduct } from '../_request'
import { useNavigate } from 'react-router-dom'

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductQueryParams) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
}

// Get all products with optional filtering
export const useGetProducts = (params?: ProductQueryParams) => {
  return useQuery({
    queryKey: productKeys.list(params || {}),
    queryFn: () => getAllProducts(params),
    select: (data) => data.data,
  })
}

// Get a specific product by ID
export const useGetProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getSpecificProduct(id),
    select: (data) => data.data,
    enabled: !!id, // Only run if ID is provided
  })
}

// Create a new product
export const useCreateProduct = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateProductData) => createProduct(data),
    onSuccess: (response) => {
      console.log(response, "response")	;
      
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
      showSuccessMessage(response.data.message || "Product created successfully!")
      const newProductId = response.data?._id
      navigate(`/admin/products/${newProductId}`)
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to create product. Please try again.")
      }
    },
  })
}

// Update an existing product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProductData }) => updateProduct(id, data),
    onSuccess: (response, variables) => {
      // Invalidate specific product query and list queries
      queryClient.invalidateQueries({ queryKey: productKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
      showSuccessMessage(response.data.message || "Product updated successfully!")
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to update product. Please try again.")
      }
    },
  })
}

// Delete a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess: (response) => {
      // Invalidate list queries after deletion
      queryClient.invalidateQueries({ queryKey: productKeys.lists() })
      showSuccessMessage(response.data.message || "Product deleted successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete product. Please try again.")
    },
  })
}

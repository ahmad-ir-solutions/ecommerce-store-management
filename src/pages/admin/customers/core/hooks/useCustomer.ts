import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { createCustomer, deleteCustomer, getAllCustomers, getSpecificCustomer, updateCustomer } from "../_request"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { CreateCustomerData, CustomerQueryParams, ICustomer, UpdateCustomerData } from '../_modals'
import { AddressFormValues, BasicDetailsFormValues } from '../_schema'

// Query keys
export const customerKeys = {
  all: ["customers"] as const,
  lists: () => [...customerKeys.all, "list"] as const,
  list: (filters: CustomerQueryParams) => [...customerKeys.lists(), filters] as const,
  details: () => [...customerKeys.all, "detail"] as const,
  detail: (id: string) => [...customerKeys.details(), id] as const,
}

// Get all customers with optional filtering
export const useGetCustomers = (params?: CustomerQueryParams) => {
  return useQuery({
    queryKey: customerKeys.list(params || {}),
    queryFn: () => getAllCustomers(params),
    select: (data) => data.data,
  })
}

// Get a specific customer by ID
export const useGetCustomer = (id: string) => {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => getSpecificCustomer(id),
    select: (data) => {
      // Transform API response to match the Customer interface used in components
      const customer = data.data
      return {
        _id: customer._id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        name: `${customer.firstName} ${customer.lastName}`,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        emailCC: customer.emailCC,
        customerReference: customer.customerReference,
        vatNumber: customer.vatNumber,
        abn: customer.abn,
        shippingAddress: customer.shippingAddress,
        billingAddress: customer.billingAddress,
        tags: customer.tags,
        notes: customer.notes,
        orders: [],
        channel: customer.channel,
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        __v: customer.__v,
      } as ICustomer
    },
    enabled: !!id, // Only run if ID is provided
  })
}

// Create a new customer
export const useCreateCustomer = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateCustomerData) => createCustomer(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
      showSuccessMessage(response.data.message || "Customer created successfully!")
      const newCustomerId = response.data?._id
      navigate(`/admin/customers/${newCustomerId}`)
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to create customer. Please try again.")
      }
    },
  })
}

// Update an existing customer
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerData }) => updateCustomer(id, data),
    onSuccess: (response, variables) => {
      // Invalidate specific customer query and list queries
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
      showSuccessMessage(response.data.message || "Customer updated successfully!")
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to update customer. Please try again.")
      }
    },
  })
}

// Delete a customer
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (id: string) => deleteCustomer(id),
    onSuccess: (response) => {
      // Invalidate list queries after deletion
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
      showSuccessMessage(response.data.message || "Customer deleted successfully!")
      navigate("/admin/customers")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete customer. Please try again.")
    },
  })
}

// Custom hook for managing a specific customer with all its operations
export const useCustomer = (customerId: string) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isUpdating, setIsUpdating] = useState(false)

  // Fetch customer data
  const { data: customer, isLoading, error } = useGetCustomer(customerId)

  // Update customer mutation
  const updateCustomerMutation = useMutation({
    mutationFn: (data: UpdateCustomerData) => updateCustomer(customerId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(customerId) })
    },
  })

  // Delete customer mutation
  const deleteCustomerMutation = useMutation({
    mutationFn: () => deleteCustomer(customerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() })
      navigate("/admin/customers")
    },
  })

  // Update basic details
  const updateBasicDetails = async (data: BasicDetailsFormValues) => {
    setIsUpdating(true)
    try {
      await updateCustomerMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phoneNumber,
        emailCC: data.emailCC,
        customerReference: data.customerReference,
        vatNumber: data.vatNumber,
        abn: data.abn,
      })
      setIsUpdating(false)
      showSuccessMessage("Basic details updated successfully")
      return true
    } catch (error) {
      setIsUpdating(false)
      showErrorMessage("Failed to update basic details")
      return false
    }
  }

  // Update shipping address
  const updateShippingAddress = async (data: AddressFormValues) => {
    console.log(data,"fsdfsd");
    
    setIsUpdating(true)
    try {
      await updateCustomerMutation.mutateAsync({
        shippingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        },
      })
      setIsUpdating(false)
      showSuccessMessage("Shipping address updated successfully")
      return true
    } catch (error) {
      setIsUpdating(false)
      showErrorMessage("Failed to update shipping address")
      return false
    }
  }

  // Update billing address
  const updateBillingAddress = async (data: AddressFormValues) => {
    setIsUpdating(true)
    try {
      await updateCustomerMutation.mutateAsync({
        billingAddress: {
          firstName: data.firstName,
          lastName: data.lastName,
          company: data.company,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        },
      })
      setIsUpdating(false)
      showSuccessMessage("Billing address updated successfully")
      return true
    } catch (error) {
      setIsUpdating(false)
      showErrorMessage("Failed to update billing address")
      return false
    }
  }

  // Add tag
  const addTag = async (tag: string) => {
    if (!customer) return false

    const currentTags = customer.tags || []
    if (currentTags.includes(tag)) return true // Tag already exists

    setIsUpdating(true)
    try {
      await updateCustomerMutation.mutateAsync({
        tags: [...currentTags, tag],
      })
      setIsUpdating(false)
      showSuccessMessage("Tag added successfully")
      return true
    } catch (error) {
      setIsUpdating(false)
      showErrorMessage("Failed to add tag")
      return false
    }
  }

  // Remove tag
  const removeTag = async (tag: string) => {
    if (!customer) return false

    const currentTags = customer.tags || []
    if (!currentTags.includes(tag)) return true // Tag doesn't exist

    setIsUpdating(true)
    try {
      await updateCustomerMutation.mutateAsync({
        tags: currentTags.filter((t) => t !== tag),
      })
      setIsUpdating(false)
      showSuccessMessage("Tag removed successfully")
      return true
    } catch (error) {
      setIsUpdating(false)
      showErrorMessage("Failed to remove tag")
      return false
    }
  }

  // Update notes
  const updateNotes = async (notes: string) => {
    setIsUpdating(true)
    try {
      await updateCustomerMutation.mutateAsync({
        notes,
      })
      setIsUpdating(false)
      showSuccessMessage("Notes updated successfully")
      return true
    } catch (error) {
      setIsUpdating(false)
      showErrorMessage("Failed to update notes")
      return false
    }
  }

  // Delete customer
  const deleteCustomerHandler = async () => {
    try {
      await deleteCustomerMutation.mutateAsync()
      showSuccessMessage("Customer deleted successfully")
      return true
    } catch (error) {
      showErrorMessage("Failed to delete customer")
      return false
    }
  }

  return {
    customer,
    isLoading,
    error,
    isUpdating,
    updateBasicDetails,
    updateShippingAddress,
    updateBillingAddress,
    addTag,
    removeTag,
    updateNotes,
    deleteCustomer: deleteCustomerHandler,
  }
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import {
  getAllCompanies,
  getSpecificCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../_request"
import { CompanyQueryParams, CreateCompanyData, UpdateCompanyData } from "../_modal"

// Query keys
export const companyKeys = {
  all: ["companies"] as const,
  lists: () => [...companyKeys.all, "list"] as const,
  list: (filters: CompanyQueryParams) => [...companyKeys.lists(), filters] as const,
  details: () => [...companyKeys.all, "detail"] as const,
  detail: (id: string) => [...companyKeys.details(), id] as const,
}

// Get all companies with optional filtering
export const useGetCompanies = (params?: CompanyQueryParams) => {
  return useQuery({
    queryKey: companyKeys.list(params || {}),
    queryFn: () => getAllCompanies(params),
    select: (data) => data.data,
  })
}

// Get a specific company by ID
export const useGetCompany = (id: string) => {
  return useQuery({
    queryKey: companyKeys.detail(id),
    queryFn: () => getSpecificCompany(id),
    select: (data) => data.data,
    enabled: !!id, // Only run if ID is provided
  })
}

// Create a new company
export const useCreateCompany = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: CreateCompanyData) => createCompany(data),
    onSuccess: (response) => {
      console.log(response, "response")

      queryClient.invalidateQueries({ queryKey: companyKeys.lists() })
      showSuccessMessage(response.data.message || "Company created successfully!")
      const newCompanyId = response.data?.data._id
      navigate(`/admin/settings/company/edit-company-details/${newCompanyId}`)
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

// Update an existing company
export const useUpdateCompany = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCompanyData }) => updateCompany(id, data),
    onSuccess: (response, variables) => {
      // Invalidate specific company query and list queries
      queryClient.invalidateQueries({ queryKey: companyKeys.detail(variables.id) })
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() })
      showSuccessMessage(response.data.message || "Company updated successfully!")
      navigate(`/admin/settings/company`)
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

// Delete a company
export const useDeleteCompany = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteCompany(id),
    onSuccess: (response) => {
      // Invalidate list queries after deletion
      queryClient.invalidateQueries({ queryKey: companyKeys.lists() })
      showSuccessMessage(response.data.message || "Company deleted successfully!")
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete company. Please try again.")
    },
  })
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils"
import type { AxiosError } from "axios"
import { addUser, deleteUser, getAllUsers, updateUser } from "../_requests"

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUsers(),
    select: (data) => data.data.users,
  })
}

export const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userData: any) => addUser(userData),
    onSuccess: (response) => {
      showSuccessMessage(response.data.message || "User added successfully!")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to add user. Please try again.")
      }
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: any }) => updateUser(userId, userData),
    onSuccess: (response) => {
      showSuccessMessage(response.data.message || "User updated successfully!")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        Object.values(error.response.data.errors).forEach((errorMessage) => {
          showErrorMessage(errorMessage)
        })
      } else {
        showErrorMessage(error.response?.data?.message || "Failed to update user. Please try again.")
      }
    },
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: (response) => {
      showSuccessMessage(response.data.message || "User deleted successfully!")
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete user. Please try again.")
    },
  })
}

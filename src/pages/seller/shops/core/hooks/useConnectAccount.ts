// hooks/ecommerce/woocommerce.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils";
import type { AxiosError } from "axios";
import {
  createAccountConnection,
  generateWoocommerceUrl,
  getConnectedAccounts,
  getConnectedAccountsBySellerId,
  getConnectedAccount,
  updateAccountConnection,
  deleteAccountConnection,
} from "../_request";

// Keys
export const woocommerceKeys = {
  all: ["woocommerce"] as const,
  connectedAccounts: () => [...woocommerceKeys.all, "connected-accounts"] as const,
  products: () => [...woocommerceKeys.all, "products"] as const,
  connectedAccount: (id: string) => [...woocommerceKeys.all, "connected-account", id] as const,
};

// Create Account Connection
export const useCreateAccountConnection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAccountConnection,
    onSuccess: (res) => {
      console.log(res, "res");
      showSuccessMessage("Account connection created!");
      queryClient.invalidateQueries({ queryKey: woocommerceKeys.connectedAccounts() });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorMessage(err.response?.data?.message || "Failed to create account connection");
    },
  });
};

// Generate WooCommerce URL
export const useGenerateWoocommerceUrl = () => {
  return useMutation({
    mutationFn: ({ site_url, account_creation_id }: { site_url: string; account_creation_id: string }) =>
      generateWoocommerceUrl(site_url, account_creation_id),
    onSuccess: (res) => {
      const url = res.data?.url;
      if (url) {
        window.open(url, "_blank");
        showSuccessMessage("WooCommerce URL generated");
      } else {
        showErrorMessage("URL not found in response");
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorMessage(err.response?.data?.message || "Failed to generate URL");
    },
  });
};

// Get Connected Accounts
export const useGetConnectedAccounts = () => {
  return useQuery({
    queryKey: woocommerceKeys.connectedAccounts(),
    queryFn: getConnectedAccounts,
    select: (res) => res.data,
    refetchOnMount: true,
    // refetchOnWindowFocus: false, // optional: disable on tab focus
    // refetchOnReconnect: true,
    staleTime: 0,
  });
};

// Get all Connected Accounts of single seller
export const useGetConnectedAccountsBySellerId = (sellerId: string) => {
  return useQuery({
    queryKey: woocommerceKeys.connectedAccounts(),
    queryFn: () => getConnectedAccountsBySellerId(sellerId),
    select: (res) => res.data,
    refetchOnMount: true,
    // refetchOnWindowFocus: false, // optional: disable on tab focus
    // refetchOnReconnect: true,
    staleTime: 0,
  });
};

// Get Single Connected Account
export const useGetConnectedAccount = (id?: string) =>
  useQuery({
    queryKey: woocommerceKeys.connectedAccount(id || ""),
    queryFn: () => getConnectedAccount(id!),
    enabled: !!id,
    select: (res) => res.data,
    
  });

// Update Account Connection
export const useUpdateAccountConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<any> }) =>
      updateAccountConnection(id, data),
    onSuccess: () => {
      showSuccessMessage("Account details updated");
      queryClient.invalidateQueries({ queryKey: woocommerceKeys.connectedAccounts() });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorMessage(err.response?.data?.message || "Failed to update account details");
    },
  });
};

// Delete Account Connection
export const useDeleteAccountConnection = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAccountConnection,
    onSuccess: () => {
      showSuccessMessage("Account connection deleted");
      queryClient.invalidateQueries({ queryKey: woocommerceKeys.connectedAccounts() });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorMessage(err.response?.data?.message || "Failed to delete account connection");
    },
  });
};
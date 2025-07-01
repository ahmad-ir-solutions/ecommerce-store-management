// hooks/ecommerce/woocommerce.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils";
import type { AxiosError } from "axios";
import {
  createAccountConnection,
  generateWoocommerceUrl,
  getConnectedAccount,
  getConnectedAccounts,
  updateAccountConnection,
} from "../_request";

// Keys
export const woocommerceKeys = {
  all: ["woocommerce"] as const,
  connectedAccounts: () => [...woocommerceKeys.all, "connected-accounts"] as const,
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
  });
};

// Get Single Connected Account
export const useGetConnectedAccount = (id?: string) =>
  useQuery({
    queryKey: ["connected-account", id],
    queryFn: () => getConnectedAccount(id!),
    enabled: !!id,
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
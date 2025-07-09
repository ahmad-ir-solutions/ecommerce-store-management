import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getWooCommerceOrders,
  updateWooCommerceOrderStatus,
  deleteWooCommerceProduct,
  getFulfilmentOrders
} from "../_request";
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils";

export interface WooCommerceOrderQueryParams {
  sortBy?: string
  sortOrder?: "asc" | "desc"
  limit?: number
  page?: number
  search?: string
  customerId?: string
}

// Query Keys
export const woocommerceOrderKeys = {
  all: ["woocommerce-orders"] as const,
  list: () => [...woocommerceOrderKeys.all, "list"] as const,
  listWithFilters: (queryParams: WooCommerceOrderQueryParams) => [...woocommerceOrderKeys.all, "list", queryParams] as const,
  byId: (id: string) => [...woocommerceOrderKeys.all, id] as const,
};

// GET: Orders
export const useGetWooCommerceOrders = (queryParams: WooCommerceOrderQueryParams) =>
  useQuery({
    queryKey: woocommerceOrderKeys.listWithFilters(queryParams),
    queryFn: () => getWooCommerceOrders(),
    select: (res) => res.data,
  });

export const useGetFulfilmentOrders = () =>
  useQuery({
    queryKey: ["fulfilment-orders"],
    queryFn: () => getFulfilmentOrders(),
    select: (res) => res.data,
  });

// PATCH: Update Order Status
export const useUpdateWooCommerceOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, data }: { orderId: string; data: any }) =>
      updateWooCommerceOrderStatus(orderId, data),
    onSuccess: ({ data }) => {
      showSuccessMessage(data.message || "Order status updated successfully");
      queryClient.invalidateQueries({ queryKey: woocommerceOrderKeys.list() });
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      const errorMsg = err.response?.data?.message || "Failed to update order status";
      showErrorMessage(errorMsg);
    },
  });
};

// DELETE: WooCommerce Product (reference use)
export const useDeleteWooCommerceProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      productId,
      masterProductId,
      sellerPrice,
    }: {
      productId: string;
      masterProductId: string;
      sellerPrice: number;
    }) =>
      deleteWooCommerceProduct(productId, masterProductId, sellerPrice),
    onSuccess: ({ data }) => {
      showSuccessMessage(data.message || "Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: woocommerceOrderKeys.list() });
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      const errorMsg = err.response?.data?.message || "Failed to delete product";
      showErrorMessage(errorMsg);
    },
  });
};

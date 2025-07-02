
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils";
import type { AxiosError } from "axios";
import { deleteWoocommerceProduct, getWoocommerceProductById, getWoocommerceProducts, listWoocommerceProduct, updateWoocommerceProduct } from "../_request";
import { ProductQueryParams } from "@/pages/admin/products/core/_modals";

// Keys
export const woocommerceKeys = {
  all: ["woocommerce"] as const,
  products: () => [...woocommerceKeys.all, "products"] as const,
  productsWithFilters: (filters: ProductQueryParams) => [...woocommerceKeys.products(), filters] as const,
};

// Get WooCommerce Products
export const useGetWoocommerceProducts = (queryParams: ProductQueryParams) =>
  useQuery({
    queryKey: woocommerceKeys.productsWithFilters(queryParams),
    queryFn: () => getWoocommerceProducts(queryParams),
    select: (res) => res.data,
  });

// List WooCommerce Product
export const useListWoocommerceProduct = () =>
  useMutation({
    mutationFn: listWoocommerceProduct,
    onSuccess: ({data}) => {
      console.log(data, "data");
        showSuccessMessage(data.message || "Product listed successfully");
    },
    onError: (err: AxiosError<{ message?: string }>) => {
      const errorMsg = err.response?.data?.message || "Failed to list product";
      showErrorMessage(errorMsg);
    },
  });

// Delete WooCommerce Product
export const useDeleteWoocommerceProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, siteUrl }: { productId: string; siteUrl: string }) =>
      deleteWoocommerceProduct(productId, siteUrl),
    onSuccess: () => {
      showSuccessMessage("Product deleted successfully");
      queryClient.invalidateQueries({ queryKey: woocommerceKeys.products() });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorMessage(err.response?.data?.message || "Failed to delete product");
    },
  });
};

// Get Specific WooCommerce Product
export const useGetWoocommerceProductById = (id?: string, siteUrl?: string) =>
  useQuery({
    queryKey: [...woocommerceKeys.products(), id],
    queryFn: () => getWoocommerceProductById(id!, siteUrl!),
    enabled: !!id, // only runs if id is truthy
    select: (res) => res.data,
  });

// Update WooCommerce Product
export const useUpdateWoocommerceProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ listingId, data, siteUrl }: { listingId: string; data: any; siteUrl: string }) =>
      updateWoocommerceProduct(listingId, data, siteUrl),
    onSuccess: () => {
      showSuccessMessage("Listed Product updated successfully");
      queryClient.invalidateQueries({ queryKey: woocommerceKeys.products() });
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorMessage(err.response?.data?.message || "Failed to update listed product");
    },
  });
}
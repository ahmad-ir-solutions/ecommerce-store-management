
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showSuccessMessage, showErrorMessage } from "@/lib/utils/messageUtils";
import type { AxiosError } from "axios";
import { deleteWoocommerceProduct, getWoocommerceProducts, listWoocommerceProduct } from "../_request";

// Keys
export const woocommerceKeys = {
  all: ["woocommerce"] as const,
  products: () => [...woocommerceKeys.all, "products"] as const,
};

// Get WooCommerce Products
export const useGetWoocommerceProducts = () =>
  useQuery({
    queryKey: woocommerceKeys.products(),
    queryFn: getWoocommerceProducts,
    select: (res) => res.data,
  });


type ListProductResponse = {
  createdProducts: any[];
  failedProducts: { siteUrl: string; error: string }[];
};

// List WooCommerce Product
export const useListWoocommerceProduct = () =>
  useMutation({
    mutationFn: listWoocommerceProduct,
    onSuccess: (res: { data: ListProductResponse }) => {
      const { createdProducts, failedProducts } = res.data;

      if (failedProducts.length > 0) {
        const messages = failedProducts
          .map((f) => `${f.siteUrl}: ${f.error}`)
          .join("\n");
        showErrorMessage(`Some products failed to list:\n${messages}`);
      }

      if (createdProducts.length > 0) {
        showSuccessMessage("Product(s) listed successfully");
      }
    },
    onError: (err: AxiosError<{ message: string }>) => {
      showErrorMessage(err.response?.data?.message || "Failed to list product");
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

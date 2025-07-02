import authApi from "@/lib/axios";
import { ProductQueryParams } from "@/pages/admin/products/core/_modals";

// WooCommerce product listing APIs
export function listWoocommerceProduct(data: { masterProductId: string; sellerPrice: number, accountConnectionId: string }) {
  return authApi.post("/woocommerce/list-product", data);
}

export function getWoocommerceProducts(queryParams: ProductQueryParams) {
  return authApi.get("/woocommerce", { params: queryParams });
}

// GET: Get specific WooCommerce product by ID
export function getWoocommerceProductById(id: string, siteUrl: string) {
  return authApi.get(`/woocommerce/${id}?site_url=${siteUrl}`);
}

export function deleteWoocommerceProduct(productId: string, siteUrl: string) {
  return authApi.delete(`/woocommerce/${productId}`, {
    data: { siteUrl },
  });
}

export function updateWoocommerceProduct(listingId: string, data: any, siteUrl: string) {
  return authApi.patch(`/woocommerce/${listingId}?site_url=${siteUrl}`, data);
}

import authApi from "@/lib/axios";

// WooCommerce product listing APIs
export function deleteWoocommerceProduct(productId: string, siteUrl: string) {
  return authApi.delete(`/woocommerce/${productId}`, {
    data: { siteUrl },
  });
}

export function listWoocommerceProduct(data: { masterProductId: string; sellerPrice: number, accountConnectionId: string }) {
  return authApi.post("/woocommerce/list-product", data);
}

export function getWoocommerceProducts() {
  return authApi.get("/woocommerce");
}
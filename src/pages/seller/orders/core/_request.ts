import authApi from "@/lib/axios";

// GET: List all WooCommerce orders
export function getWooCommerceOrders() {
  return authApi.get("/woocommerce-orders");
}

// PATCH: Update status of a specific WooCommerce order
export function updateWooCommerceOrderStatus(orderId: string, data:any) {
  return authApi.patch(`/woocommerce-orders/${orderId}/status`, data);
}

// DELETE: Delete a WooCommerce product (for reference, as shown)
export function deleteWooCommerceProduct(productId: string, masterProductId: string, sellerPrice: number) {
  return authApi.delete(`/woocommerce/${productId}`, {
    data: {
      masterProductId,
      sellerPrice,
    },
  });
}

export function getFulfilmentOrders() {
  return authApi.get("/orders/sellers-all-orders");
}

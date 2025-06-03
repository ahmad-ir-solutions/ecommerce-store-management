import authApi from "@/lib/axios"
import type {
    ITopSellingProduct,
    IOrderStat
} from "./_modals"

const PRODUCTS_URL = "/products"
const ORDERS_URL = "/orders"

// Get top selling products with optional limit
export function getTopSellingProducts(limit?: number) {
  return authApi.get<ITopSellingProduct[]>(`${PRODUCTS_URL}/top-selling`, { params: { limit } })
}

// Get order stats
export function getOrderStats() {
    return authApi.get<IOrderStat[]>(`${ORDERS_URL}/get-orders-stats`);
} 
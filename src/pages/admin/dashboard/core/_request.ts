import authApi from "@/lib/axios"
import type {
    ITopSellingProduct
} from "./_modals"

const PRODUCTS_URL = "/products"

// Get top selling products with optional limit
export function getTopSellingProducts(limit?: number) {
  return authApi.get<ITopSellingProduct[]>(`${PRODUCTS_URL}/top-selling`, { params: { limit } })
} 
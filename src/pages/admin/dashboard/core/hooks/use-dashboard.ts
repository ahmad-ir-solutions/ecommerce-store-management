import { useQuery } from "@tanstack/react-query";
import { getTopSellingProducts, getOrderStats } from "../_request";

const DASHBOARD_KEYS = {
  topSellingProducts: (limit?: number) => ['dashboard', 'top-selling-products', limit] as const,
  orderStats: ['dashboard', 'order-stats'] as const,
};

// Hook to fetch top selling products
export function useGetTopSellingProducts(limit?: number) {
  return useQuery({
    queryKey: DASHBOARD_KEYS.topSellingProducts(limit),
    queryFn: () => getTopSellingProducts(limit),
  });
}

// Hook to fetch order stats
export function useGetOrderStats() {
    return useQuery({
        queryKey: DASHBOARD_KEYS.orderStats,
        queryFn: getOrderStats,
    });
} 
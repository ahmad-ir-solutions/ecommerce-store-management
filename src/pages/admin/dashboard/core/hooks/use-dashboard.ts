import { useQuery } from "@tanstack/react-query";
import { getTopSellingProducts } from "../_request";

const PRODUCT_KEYS = {
  topSelling: (limit?: number) => ['products', 'top-selling', limit] as const,
};

// Hook to fetch top selling products
export function useGetTopSellingProducts(limit?: number) {
  return useQuery({
    queryKey: PRODUCT_KEYS.topSelling(limit),
    queryFn: () => getTopSellingProducts(limit),
  });
} 
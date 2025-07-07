import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllWarehouses, createWarehouse, getSpecificWarehouse, updateWarehouse, deleteWarehouse } from "./_request";

const WAREHOUSE_KEYS = {
  all: ['warehouses'] as const,
  details: (id: string) => ['warehouses', id] as const,
};

// Hook to fetch all warehouses
export function useGetAllWarehouses() {
  return useQuery({
    queryKey: WAREHOUSE_KEYS.all,
      queryFn: getAllWarehouses,
  });
}

// Hook to create a new warehouse
export function useCreateWarehouse() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWarehouse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WAREHOUSE_KEYS.all });
    },
  });
}

// Hook to fetch a specific warehouse
export function useGetSpecificWarehouse(id: string) {
    return useQuery({
        queryKey: WAREHOUSE_KEYS.details(id),
        queryFn: () => getSpecificWarehouse(id),
        enabled: !!id, // Only fetch if id is available
    });
}

// Hook to update an existing warehouse
export function useUpdateWarehouse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, body }: { id: string, body: { channelName?: string } }) => updateWarehouse(id, body),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: WAREHOUSE_KEYS.details(variables.id) });
            queryClient.invalidateQueries({ queryKey: WAREHOUSE_KEYS.all });
        },
    });
}

// Hook to delete a warehouse
export function useDeleteWarehouse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteWarehouse,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: WAREHOUSE_KEYS.all });
        },
    });
} 
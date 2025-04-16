import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  QueryKey,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

// Utility for queries
export function useAppQuery<TData, TError = AxiosError>(
  key: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<
    UseQueryOptions<TData, TError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<TData, TError>({
    queryKey: key,
    queryFn,
    ...options,
  });
}

// ✅ FIXED Utility for mutations
export function useAppMutation<TData, TError = AxiosError, TVariables = void>(
  options: UseMutationOptions<TData, TError, TVariables>
) {
  return useMutation<TData, TError, TVariables>(options);
}

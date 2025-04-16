import { QueryClient } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60; // 1 hour

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime,
    },
  },
})
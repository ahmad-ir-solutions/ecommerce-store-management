import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllChannels, createChannel, getSpecificChannel, updateChannel, deleteChannel } from "./_request";

const CHANNEL_KEYS = {
  all: ['channels'] as const,
  details: (id: string) => ['channels', id] as const,
};

// Hook to fetch all channels
export function useGetAllChannels() {
  return useQuery({
    queryKey: CHANNEL_KEYS.all,
    queryFn: getAllChannels,
  });
}

// Hook to create a new channel
export function useCreateChannel() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHANNEL_KEYS.all });
    },
  });
}

// Hook to fetch a specific channel
export function useGetSpecificChannel(id: string) {
    return useQuery({
        queryKey: CHANNEL_KEYS.details(id),
        queryFn: () => getSpecificChannel(id),
        enabled: !!id, // Only fetch if id is available
    });
}

// Hook to update an existing channel
export function useUpdateChannel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, body }: { id: string, body: { channelName?: string } }) => updateChannel(id, body),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: CHANNEL_KEYS.details(variables.id) });
            queryClient.invalidateQueries({ queryKey: CHANNEL_KEYS.all });
        },
    });
}

// Hook to delete a channel
export function useDeleteChannel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteChannel,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: CHANNEL_KEYS.all });
        },
    });
} 
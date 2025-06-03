import authApi from "@/lib/axios"
import type {
    IChannel
} from "./_modals"

const CHANNELS_URL = "/channels"

// Get all channels
export function getAllChannels() {
  return authApi.get<IChannel[]>(CHANNELS_URL)
}

// Get a specific channel by ID
export function getSpecificChannel(id: string) {
  return authApi.get<IChannel>(`${CHANNELS_URL}/${id}`)
}

// Create a new channel
export function createChannel(body: { channelId: string, channelName: string }) {
  return authApi.post<IChannel>(CHANNELS_URL, body)
}

// Update an existing channel
export function updateChannel(id: string, body: { channelName?: string }) {
  return authApi.patch<IChannel>(`${CHANNELS_URL}/${id}`, body)
}

// Delete a channel
export function deleteChannel(id: string) {
  return authApi.delete<{ message: string }>(`${CHANNELS_URL}/${id}`)
} 
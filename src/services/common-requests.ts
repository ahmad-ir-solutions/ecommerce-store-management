import authApi from '@/lib/axios';

export interface Channel {
  _id: string;
  channelId: string;
  channelName: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const getChannels = async (): Promise<Channel[]> => {
  const response = await authApi.get<Channel[]>(`/channels`);
  console.log('Channels fetched:', response);
  
  return response.data;
};
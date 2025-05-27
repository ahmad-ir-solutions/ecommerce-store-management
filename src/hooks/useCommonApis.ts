// hooks/useCommonApis.ts
import { useQuery } from '@tanstack/react-query';
import { getChannels } from '@/services/common-requests';

export const useCommonApis = () => {
  const channelsQuery = useQuery({
    queryKey: ['channels'],
    queryFn: getChannels,
  });

  // Add more queries as needed:
  // const usersQuery = useQuery({ queryKey: ['users'], queryFn: getUsers });
  // const settingsQuery = useQuery({ queryKey: ['settings'], queryFn: getSettings });

  return {
    channels: channelsQuery,
    // users: usersQuery,
    // settings: settingsQuery,
  };
};

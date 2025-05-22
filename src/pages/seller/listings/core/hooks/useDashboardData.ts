import { useQuery } from '@tanstack/react-query';
import { DashboardDataParams } from '../_modals';
import { getDashboardData } from '../_request';
import { QUERIES_KEYS } from '@/lib/react-query/queryKeys';

const useDashboardData = (params: DashboardDataParams) => {
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: [QUERIES_KEYS.GET_DASHBOARD, params],
    queryFn: () => getDashboardData(params),
    staleTime: 0,    // Data is stale immediately
  });

  return { DashboardData: data?.data, error, isLoading, isError, isSuccess, refetch };
};

export default useDashboardData;

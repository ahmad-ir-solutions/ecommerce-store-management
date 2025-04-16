import { useQuery } from 'react-query';
import { DashboardDataParams } from '../_modals';
import { QUERIES_KEYS } from 'helpers/crud-helper/consts';
import { getDashboardData } from '../_request';

const useDashboardData = (params: DashboardDataParams) => {
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery(
    [QUERIES_KEYS.GET_DASHBOARD, params],
    () => getDashboardData(params),
    {
      cacheTime: 1,    // Clear cache immediately after use
      staleTime: 0,    // Data is stale immediately
    }
  );

  return { DashboardData: data?.data, error, isLoading, isError, isSuccess, refetch };
};

export default useDashboardData;

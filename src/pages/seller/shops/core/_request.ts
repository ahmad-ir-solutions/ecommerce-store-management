import api from 'services/api/api';
import { CaseCounts } from './_modals';


const DASHBOARD_URL = '/dashboard';

export function getDashboardData(params: any) {
  return api.get<CaseCounts>(DASHBOARD_URL, { params }).then((response) => response);
}


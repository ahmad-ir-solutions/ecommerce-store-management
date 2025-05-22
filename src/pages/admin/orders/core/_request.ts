import api from '@/services/api';
import { CaseCounts } from '../../dashboard/core/_modals';
// import { CaseCounts, CreateOrderData, IOrderResponse, IOrdersResponse, UpdateOrderData } from './_modals';



const DASHBOARD_URL = '/dashboard';

export function getDashboardData(params: any) {
  return api.get<CaseCounts>(DASHBOARD_URL, { params }).then((response) => response);
}




// const ORDERS_URL = "/orders"

// export function getAllOrders(params?: Record<string, any>) {
//   return authApi.get<IOrdersResponse>(ORDERS_URL, { params })
// }

// export function getSpecificOrder(id: string) {
//   return authApi.get<IOrderResponse>(`${ORDERS_URL}/${id}`)
// }

// export function createOrder(body: CreateOrderData) {
//   return authApi.post<IOrderResponse>(ORDERS_URL, body)
// }

// export function updateOrder(id: string, body: UpdateOrderData) {
//   return authApi.patch<IOrderResponse>(`${ORDERS_URL}/${id}`, body)
// }

// export function deleteOrder(id: string) {
//   return authApi.delete<{ message: string }>(`${ORDERS_URL}/${id}`)
// }

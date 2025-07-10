import authApi from "@/lib/axios"
import { IAuthResponse } from "@/pages/auth/core/_models"
import { ISellerModel, ISellerOrderData, ISellerResponse, ITransactionResponse, StatsData } from "./_modals"
import { SellerQueryParams } from "./_modals"

const GET_ALL_SELLERS_URL = "/user/all"
const ADD_SELLER_URL = "/auth/signup"
const DELETE_SELLER_URL = "/user"
const UPDATE_SELLER_URL = "/user"
const GET_SELLER_URL = "/user"
const GET_SELLER_ORDER_STATS_URL = "/orders/get-orders-stats"
const GET_SELLER_ORDERS_URL = "/orders/sellers-all-orders"
const GET_SELLER_TRANSACTIONS_URL = "/ledger"

export function getSellers(params?: SellerQueryParams) {
  return authApi.get<ISellerResponse>(GET_ALL_SELLERS_URL, { params })
}

export function addSeller(body: any) {
  return authApi.post<IAuthResponse>(ADD_SELLER_URL, body)
}

export function updateSeller(userId: string, body: any) {
  return authApi.patch<IAuthResponse>(`${UPDATE_SELLER_URL}/${userId}`, body)
}

export function getSellerById(sellerId: string) {
  return authApi.get<ISellerModel>(`${GET_SELLER_URL}/${sellerId}`)
}

export function deleteSeller(userId: string) {
  return authApi.delete<IAuthResponse>(`${DELETE_SELLER_URL}/${userId}`)
}

// stats of orders
export function getSellerOrderStats(sellerId: string) {
  return authApi.get<StatsData[]>(`${GET_SELLER_ORDER_STATS_URL}/${sellerId}`)
}

// sellers all orders
export function getSellerOrders(sellerId: string, queryParams: SellerQueryParams) {
  return authApi.get<{
  orders: ISellerOrderData[]
  total: number
}>(`${GET_SELLER_ORDERS_URL}/${sellerId}`, { params: queryParams })
}

// sellers all transactions
export function getSellerTransactions(sellerId: string, queryParams: SellerQueryParams) {
  return authApi.get<ITransactionResponse>(`${GET_SELLER_TRANSACTIONS_URL}/${sellerId}`, { params: queryParams })
}

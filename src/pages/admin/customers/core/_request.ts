import authApi from "@/lib/axios"
import type {
  // ICustomerResponse,
  ICustomersResponse,
  CreateCustomerData,
  UpdateCustomerData,
  CustomerQueryParams,
  ICustomer,
} from "./_modals"

const CUSTOMERS_URL = "/customers"

// Get all customers with optional query parameters
export function getAllCustomers(params?: CustomerQueryParams) {
  return authApi.get<ICustomersResponse>(CUSTOMERS_URL, { params })
}

// Get a specific customer by ID
export function getSpecificCustomer(id: string) {
  return authApi.get<ICustomer>(`${CUSTOMERS_URL}/${id}`)
}

// Create a new customer
export function createCustomer(body: CreateCustomerData) {
  return authApi.post<ICustomersResponse>(CUSTOMERS_URL, body)
}

// Update an existing customer
export function updateCustomer(id: string, body: UpdateCustomerData) {
  return authApi.patch<ICustomersResponse>(`${CUSTOMERS_URL}/${id}`, body)
}

// Delete a customer
export function deleteCustomer(id: string) {
  return authApi.delete<{ message: string }>(`${CUSTOMERS_URL}/${id}`)
}

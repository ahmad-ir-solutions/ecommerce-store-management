import authApi from "@/lib/axios"
import type {
  ICompanyResponse,
  ICompaniesResponse,
  CreateCompanyData,
  UpdateCompanyData,
  CompanyQueryParams,
  ICompanyModel,
} from "./_modal"

const WAREHOUSES_URL = "/warehouses";

export function getAllCompanies(params?: CompanyQueryParams) {
  return authApi.get<ICompaniesResponse>(WAREHOUSES_URL, { params })
}

export function getSpecificCompany(id: string) {
  return authApi.get<ICompanyModel>(`${WAREHOUSES_URL}/${id}`)
}

export function createCompany(body: CreateCompanyData) {
  return authApi.post<ICompanyResponse>(WAREHOUSES_URL, body)
}

export function updateCompany(id: string, body: UpdateCompanyData) {
  return authApi.patch<ICompanyResponse>(`${WAREHOUSES_URL}/${id}`, body)
}

export function deleteCompany(id: string) {
  return authApi.delete<{ success: boolean; message: string }>(`${WAREHOUSES_URL}/${id}`)
}

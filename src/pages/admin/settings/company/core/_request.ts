import authApi from "@/lib/axios"
import type {
  ICompanyResponse,
  ICompaniesResponse,
  CreateCompanyData,
  UpdateCompanyData,
  CompanyQueryParams,
  ICompanyModel,
} from "./_modal"

const COMPANIES_URL = "/company"

export function getAllCompanies(params?: CompanyQueryParams) {
  return authApi.get<ICompaniesResponse>(COMPANIES_URL, { params })
}

export function getSpecificCompany(id: string) {
  return authApi.get<ICompanyModel>(`${COMPANIES_URL}/${id}`)
}

export function createCompany(body: CreateCompanyData) {
  return authApi.post<ICompanyResponse>(COMPANIES_URL, body)
}

export function updateCompany(id: string, body: UpdateCompanyData) {
  return authApi.patch<ICompanyResponse>(`${COMPANIES_URL}/${id}`, body)
}

export function deleteCompany(id: string) {
  return authApi.delete<{ success: boolean; message: string }>(`${COMPANIES_URL}/${id}`)
}

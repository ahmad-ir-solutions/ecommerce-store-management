import { z } from 'zod';
import { warehouseSchema } from './_schema';
import { Company } from '../../company/core/_modal';

// Define the warehouse type
export type WarehouseFormValues = z.infer<typeof warehouseSchema>

export interface ICompanyResponse {
  success: boolean
  data: Company & { _id: string; createdAt: string; updatedAt: string }
  message?: string
}

export interface ICompaniesResponse {
  success: boolean
  data: Array<Company & { _id: string; createdAt: string; updatedAt: string }>
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface CompanyQueryParams {
  page?: number
  limit?: number
  search?: string
}

export type CreateCompanyData = Company
export type UpdateCompanyData = Partial<Company>

export interface ICompanyModel extends Company {
  _id: string
  createdAt: string
  updatedAt: string
}

import { z } from 'zod'
import { csvFormSchema } from './_schema'

export interface topSellingProduct {
  id: number
  sku: string
  name: string
  quantity: number
  revenue: number
}

// export interface ProductItem {
//   _id: string
//   productName: string
//   sku: string
//   inventory: number
//   price: number
//   rrp: number
//   taxClass: number
//   priceIncludesVat: boolean
//   weight: number
//   length: number
//   width: number
//   height: number
//   warehouse: string
//   brand: string
//   ean: string
//   upc: string
//   createdAt: string
//   updatedAt: string
//   __v: number
//   // Additional fields for UI display
//   image?: string
//   type?: string
//   warehouseDetail?: string
//   heightDepth?: string // UI alias for height
// }

// export interface SavedFilter {
//   id: string
//   label: string
//   value: string
//   conditions?: FilterCondition[]
//   isPublic?: boolean
//   isFavorite?: boolean
//   filters?: any
//   createdBy?: string
//   createdAt?: string
// }

// export interface FilterCondition {
//   field: keyof ProductItem
//   operator: "equals" | "contains" | "greaterThan" | "lessThan"
//   value: string
// }

// If you're using zod schemas
// export type ProductFormValues = z.infer<typeof productSchema>
// export type CsvProductFormValues = z.infer<typeof csvFormSchema>

// Supplier interfaces
// export type Supplier = {
//   supplierName: string
//   address: string
//   address2?: string
//   city: string
//   countryState?: string
//   country: string
//   postcode: string
//   phone?: string
//   supplierCode?: string
//   supplierCurrency: string
//   supplierReference?: string
//   supplierEmailAddress?: string
//   commaDelimitedEmails?: string
//   leadTime?: number
//   minimumOrderValue?: number
//   purchaseOrderMode?: string
//   isManufacturer: boolean
//   contactEmail?: string
//   sendEmailBelowReorderLevel: boolean
//   sendEmailBelowOutOfStockThreshold: boolean
//   includeProductsAtReorderLevel: boolean
//   excludeOutOfStockManualReorderLevel: boolean
//   poShippingCostType?: string
//   poChangeToStatus?: string
//   totalDropShipCost?: number
//   dropShipShippingCostType?: string
//   dropShipChangeToStatus?: string
//   totalPoShippingCost?: number
//   includeInRequisitions: boolean
//   consolidateDropShipEmails: boolean
//   transferMethod?: string
//   exportMethod?: string
//   templateType?: string
//   isDefaultExportMethod: boolean
//   exportDelimiter?: string
//   exportHeaders: boolean
//   id?: string
// }

// export interface SupplierFormValues {
//   supplierName: string
//   address: string
//   city: string
//   country: string
//   postcode: string
//   supplierCurrency: string
//   isManufacturer: boolean
//   sendEmailBelowReorderLevel: boolean
//   sendEmailBelowOutOfStockThreshold: boolean
//   includeProductsAtReorderLevel: boolean
//   excludeOutOfStockManualReorderLevel: boolean
//   includeInRequisitions: boolean
//   consolidateDropShipEmails: boolean
//   address2?: string
//   countryState?: string
//   phone?: string
//   supplierCode?: string
//   supplierReference?: string
//   commaDelimitedEmails?: string
//   minimumOrderValue?: number
//   supplierEmailAddress?: string
//   contactEmail?: string
//   leadTime?: number
//   purchaseOrderMode?: string
//   poShippingCostType?: string
//   poChangeToStatus?: string
//   totalDropShipCost?: number
//   dropShipShippingCostType?: string
//   dropShipChangeToStatus?: string
//   totalPoShippingCost?: number
//   transferMethod?: string
//   exportMethod?: string
//   templateType?: string
//   isDefaultExportMethod: boolean
//   exportDelimiter?: string
//   exportHeaders: boolean
// }

export type CsvFormValues = z.infer<typeof csvFormSchema>;

// ---------------------------------------------------------

// API response interfaces
export interface IProductModel {
  _id: string
  productName: string
  productType: string
  imageUrl: string
  sku: string
  inventory: number
  price: number
  rrp: number
  taxClass: number
  priceIncludesVat: boolean
  weight: number
  length: number
  width: number
  height: number
  warehouse: string
  brand: string
  ean: string
  upc: string
  supplierDetails: string
  priorityOrder: string
  supplierSku: string
  unitCostPrice: string
  cartonCostPrice: string
  supplierStockLevel: string
  supplierCartonQuantity: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface IProductResponse {
  _id?: string
  product: IProductModel
  message: string
}

export interface IProductsResponse {
  productsWithOrderCOunt: IProductModel[]
  total: number
  page: number
  limit: number
  message: string
}

export type CreateProductData = {
  productName: string
  productType: string
  sku?: string
  inventory?: number
  imageUrl?: string
  price?: number
  rrp?: number
  taxClass?: number
  priceIncludesVat?: boolean
  weight?: number
  length?: number
  width?: number
  height?: number
  warehouse?: string
  brand?: string
  ean?: string
  upc?: string
  supplierDetails?: string,
  priorityOrder?: string
  supplierSku?: string,
  unitCostPrice?: string,
  cartonCostPrice?: string,
  supplierStockLevel?: string,
  supplierCartonQuantity?: string,
}

export type UpdateProductData = Partial<CreateProductData>

export interface ProductQueryParams {
  sortBy?: string
  sortOrder?: "asc" | "desc"
  limit?: number
  page?: number
  search?: string
}



// ---------------------------------------------------------
// Base supplier interface
export interface ISupplier {
  _id: string
  supplierName: string
  address: string
  city: string
  country: string
  postcode: string
  supplierCurrency: string
  isManufacturer: boolean
  sendEmailBelowReorderLevel: boolean
  sendEmailBelowOutOfStockThreshold: boolean
  includeProductsAtReorderLevel: boolean
  excludeOutOfStockManualReorderLevel: boolean
  includeInRequisitions: boolean
  consolidateDropShipEmails: boolean
  address2?: string
  countryState?: string
  phone?: string
  supplierCode?: string
  supplierReference?: string
  commaDelimitedEmails?: string
  minimumOrderValue?: number
  supplierEmailAddress?: string
  contactEmail?: string
  leadTime?: number
  purchaseOrderMode?: string
  poShippingCostType?: string
  poChangeToStatus?: string
  totalDropShipCost?: number
  dropShipShippingCostType?: string
  dropShipChangeToStatus?: string
  totalPoShippingCost?: number
  transferMethod?: string
  exportMethod?: string
  templateType?: string
  isDefaultExportMethod?: boolean
  exportDelimiter?: string
  exportHeaders?: boolean
  createdAt?: string
  updatedAt?: string
}

// API supplier Response interfaces
export interface ISupplierResponse {
  success: boolean
  message: string
  data: ISupplier
}

export interface ISuppliersResponse {
  success: boolean
  message: string
  data: ISupplier[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  total?: number
}

// Query parameters for filtering suppliers
export interface SupplierQueryParams {
  page?: number
  limit?: number
  search?: string
  country?: string
  isManufacturer?: boolean
}

// Form data types
export type CreateSupplierData = Omit<ISupplier, "_id" | "createdAt" | "updatedAt">
export type UpdateSupplierData = Partial<CreateSupplierData>

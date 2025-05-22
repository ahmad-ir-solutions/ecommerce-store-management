import { z } from 'zod'
import { csvFormSchema } from './_schema'

export interface topSellingProduct {
  id: number
  sku: string
  name: string
  quantity: number
  revenue: number
}

export interface ProductItem {
  _id: string
  productName: string
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
  createdAt: string
  updatedAt: string
  __v: number
  // Additional fields for UI display
  image?: string
  type?: string
  warehouseDetail?: string
  heightDepth?: string // UI alias for height
}

export interface SavedFilter {
  id: string
  label: string
  value: string
  conditions?: FilterCondition[]
  isPublic?: boolean
  isFavorite?: boolean
  filters?: any
  createdBy?: string
  createdAt?: string
}

export interface FilterCondition {
  field: keyof ProductItem
  operator: "equals" | "contains" | "greaterThan" | "lessThan"
  value: string
}

// If you're using zod schemas
// export type ProductFormValues = z.infer<typeof productSchema>
// export type CsvProductFormValues = z.infer<typeof csvFormSchema>

// Supplier interfaces
export type Supplier = {
  supplierName: string
  address: string
  address2?: string
  city: string
  countryState?: string
  country: string
  postcode: string
  phone?: string
  supplierCode?: string
  supplierCurrency: string
  supplierReference?: string
  supplierEmail?: string
  commaDelimitedEmails?: string
  leadTime?: string
  minimumOrderValue?: string
  purchaseOrderMode?: string
  isManufacturer: boolean
  contactEmail?: string
  sendEmailWhenProductBelowReorderLevel: boolean
  sendEmailWhenProductBelowOutOfStockThreshold: boolean
  includeProductsEqualToReorderLevel: boolean
  excludeOutOfStockProductsWithZeroManualReorderLevel: boolean
  purchaseOrderShippingCostType?: string
  purchaseOrderChangeToStatus?: string
  totalPurchaseOrderShippingCost?: string
  dropShipmentShippingCostType?: string
  dropShipmentChangeToStatus?: string
  totalDropShipmentShippingCost?: string
  includeSupplierInRequisitions: boolean
  consolidateDropshipSupplierEmails: boolean
  transferMethod?: string
  exportMethod?: string
  templateType?: string
  defaultExportMethod: boolean
  exportDelimiter?: string
  exportHeaders: boolean
  id?: string
}

export interface SupplierFormValues {
  supplierName: string
  address: string
  city: string
  country: string
  postcode: string
  supplierCurrency: string
  isManufacturer: boolean
  sendEmailWhenProductBelowReorderLevel: boolean
  sendEmailWhenProductBelowOutOfStockThreshold: boolean
  includeProductsEqualToReorderLevel: boolean
  excludeOutOfStockProductsWithZeroManualReorderLevel: boolean
  includeSupplierInRequisitions: boolean
  consolidateDropshipSupplierEmails: boolean
  address2?: string
  countryState?: string
  phone?: string
  supplierCode?: string
  supplierReference?: string
  commaDelimitedEmails?: string
  minimumOrderValue?: string
  supplierEmail?: string
  contactEmail?: string
  leadTime?: string
  purchaseOrderMode?: string
  purchaseOrderShippingCostType?: string
  purchaseOrderChangeToStatus?: string
  totalPurchaseOrderShippingCost?: string
  dropShipmentShippingCostType?: string
  dropShipmentChangeToStatus?: string
  totalDropShipmentShippingCost?: string
  transferMethod?: string
  exportMethod?: string
  templateType?: string
  defaultExportMethod: boolean
  exportDelimiter?: string
  exportHeaders: boolean
}

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


// API response interfaces for suppliers
export interface ISupplier {
  _id: string
  supplierName: string
  contactName: string
  email: string
  phone: string
  address: {
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
    countryCode: string
  }
  handlingTimeInDays: number
  collectionPoint?: string
  warehouseType: "In-House" | "Third-Party"
  isFreeProductSupplier: boolean
  linkedProductIds: string[]
  createdAt: string
  updatedAt: string
}

export interface ISupplierResponse {
  success: boolean
  message: string
  _id?: string
  data?: ISupplier
}

export interface ISuppliersResponse {
  success: boolean
  message: string
  data: {
    suppliers: ISupplier[]
    totalCount: number
    page: number
    limit: number
  }
}

// Request interfaces
export interface SupplierQueryParams {
  page?: number
  limit?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  warehouseType?: string
  isFreeProductSupplier?: boolean
}

export interface SupplierAddressData {
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  countryCode: string
}

export interface CreateSupplierData {
  supplierName: string
  contactName: string
  email: string
  phone: string
  address: SupplierAddressData
  handlingTimeInDays: number
  collectionPoint?: string
  warehouseType: "In-House" | "Third-Party"
  isFreeProductSupplier: boolean
  linkedProductIds?: string[]
}

export type UpdateSupplierData = Partial<CreateSupplierData>
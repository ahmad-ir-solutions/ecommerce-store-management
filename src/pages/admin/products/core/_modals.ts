
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
  priceIncludesVAT: boolean
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


// ---------------------------------------------------------


// API response interfaces
export interface IProductModel {
  _id: string
  productName: string
  productType: string
  sku: string
  inventory: number
  price: number
  rrp: number
  taxClass: number
  priceIncludesVAT: boolean
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
  price?: number
  rrp?: number
  taxClass?: number
  priceIncludesVAT?: boolean
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

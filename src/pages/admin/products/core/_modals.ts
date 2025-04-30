import { z } from "zod"
import { csvFormSchema, productSchema } from "./_schema"

export interface topSellingProduct {
  id: number
  sku: string
  name: string
  quantity: number
  revenue: number
}

// export interface ProductItem {
//     id: string
//     type?: string
//     image?: string
//     sku: string
//     skuSuffix?: string
//     name: string
//     description?: string
//     ean?: string
//     mpn?: string
//     supplierSku?: string
//     inventory?: string
//     supplierInventory?: string
//     outOfStockDate?: string
//     onPurchaseOrder?: string
//     onBackOrder?: string
//     soldLast30Days?: string
//     daysSinceLastOrder?: string
//     stockLocations?: string
//     price: string
//     cost?: string
//     createDate?: string
//     createTime?: string
//     suppliers?: string
//     suppliersDetail?: string
//     warehouse?: string
//     warehouseDetail?: string
//   }
  

export interface ProductItem {
  id: string
  type?: string
  image?: string
  name: string
  sku: string
  inventory?: string
  price: string
  rrp?: string
  textClass?: string
  priceIncludesVat?: string
  weight?: string
  length?: string
  width?: string
  heightDepth?: string
  warehouse?: string
  warehouseDetail?: string
  brand?: string
  ean?: string
  upc?: string
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
  

export type ProductFormValues = z.infer<typeof productSchema>


export type FormValues = z.infer<typeof csvFormSchema>

// ------------suppliers

// Define the supplier type based on our form schema
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
  supplierName: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  supplierCurrency: string;
  isManufacturer: boolean;
  sendEmailWhenProductBelowReorderLevel: boolean;
  sendEmailWhenProductBelowOutOfStockThreshold: boolean;
  includeProductsEqualToReorderLevel: boolean;
  excludeOutOfStockProductsWithZeroManualReorderLevel: boolean;
  includeSupplierInRequisitions: boolean;
  consolidateDropshipSupplierEmails: boolean;
  address2?: string;
  countryState?: string;
  phone?: string;
  supplierCode?: string;
  supplierReference?: string;
  commaDelimitedEmails?: string;
  minimumOrderValue?: string;
  supplierEmail?: string;
  contactEmail?: string;
  leadTime?: string;
  purchaseOrderMode?: string;
  purchaseOrderShippingCostType?: string;
  purchaseOrderChangeToStatus?: string;
  totalPurchaseOrderShippingCost?: string;
  dropShipmentShippingCostType?: string;
  dropShipmentChangeToStatus?: string;
  totalDropShipmentShippingCost?: string;
  transferMethod?: string;
  exportMethod?: string;
  templateType?: string;
  defaultExportMethod: boolean;
  exportDelimiter?: string;
  exportHeaders: boolean;
}
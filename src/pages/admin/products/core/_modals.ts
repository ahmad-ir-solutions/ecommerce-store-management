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
  
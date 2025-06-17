export interface Address {
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state?: string
  country: string
  postalCode: string
  phone?: string
}

export interface ChannelDetails {
  _id: string
  channelId: string
  channelName: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CustomerDetails {
  _id: string
  firstName: string
  lastName: string
  email: string
  emailCC?: string
  phoneNumber: string
  customerReference?: string
  notes?: string
  tags?: string[]
  billingAddress: Address
  shippingAddress: Address
  channelDetails: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ProductDetails {
  _id: string
  productName: string
  productType: string
  brand: string
  ean: string
  upc: string
  sku: string
  price: number
  rrp: number
  priceIncludesVat: boolean
  taxClass: number
  inventory: number
  weight: number
  length: number
  width: number
  height: number
  imageUrl: string
  warehouse: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ShippingAndHandling {
  shippingMethod: string
  channelShippingMethod: string
  shippingCost: number
  trackingNumber: string
  airNumber: string
  numberOfParcels: number
  packageSize: string
  orderWeight: number
  overrideWeight: boolean
  pickerInstructions: string
  specialInstructions: string
  updateOrderTotal: boolean
}

export interface Warehouse {
  _id: string
  warehouseName: string
  warehouseType: string
  contactName: string
  address: string
  address1?: string
  address2?: string
  city: string
  postcode: string
  country: string
  countryCode: string
  collectionPoint: string
  handlingTimeInDays: number
  freeProduct: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface OrderNote {
  subject: string
  note: string
}

export interface PickwaveOrder {
  _id: string
  assignedToPickerOn?: string
  attentionRequired: boolean
  channelDetails: ChannelDetails[]
  channelOrderNumber: string
  channelPurhasedFrom?: string
  companyIdentity?: string
  createdAt: string
  customerDetails: CustomerDetails
  deliveredOn?: string
  designatedPacker?: string
  designatedPicker?: string
  discount?: number
  dispatchSentToChannel?: string
  dispatchedOn?: string
  importedFromChannelOn?: string
  itemOptions?: number
  manifestedOn?: string
  notes?: OrderNote[]
  orderDate: string
  orderStatus: string
  paymentId?: string
  pickwave?: string
  productDetails: ProductDetails
  quantity: number
  quantityAllocated?: number
  refundedAmount?: string
  royalMailLabelUrl?: string
  scannedQuantity?: number
  sellerId: string
  shippingAddress: Address
  shippingAndHandling: ShippingAndHandling
  warehouse: Warehouse[]
  signedForBy?: string
  status: string
  taxRate?: number
  taxTotal?: number
  totalPrice: number
  unitSubtotal?: number
  updatedAt: string
  __v: number

  // Computed/derived fields for table display
  id: string // Maps to _id
  channel: string // Derived from channelDetails
  multipleLines: boolean // Derived from quantity > 1
  productSKU: string // Maps to productDetails.sku
  stockLocations: string // Derived from warehouse info
  warehouseLocations: string // Derived from warehouse address
  packageSize: string // Maps to shippingAndHandling.packageSize
  orderWeight: number // Maps to shippingAndHandling.orderWeight
  shippingMethod: string // Maps to shippingAndHandling.shippingMethod
  postCode: string // Maps to shippingAddress.postalCode
}

// Enum types for better type safety
// export enum OrderStatus {
//   PENDING = "Pending",
//   PROCESSING = "Processing",
//   CONFIRMED = "Confirmed",
//   SHIPPED = "Shipped",
//   DELIVERED = "Delivered",
//   CANCELLED = "Cancelled",
//   AWAITING_PAYMENT = "Awaiting Payment",
// }

// export enum PickwaveStatus {
//   NOT_PICKED = "not_picked",
//   PICKED = "picked",
//   PARTIALLY_PICKED = "partially_picked",
// }

// export enum ShippingMethod {
//   ROYAL_MAIL_TRACKED_24 = "Royal Mail Tracked 24",
//   ROYAL_MAIL_TRACKED_48 = "Royal Mail Tracked 48",
//   STANDARD = "Standard",
//   EXPRESS = "Express",
//   NEXT_DAY = "Next Day",
// }

// export enum PackageSize {
//   SMALL = "Small",
//   MEDIUM = "Medium",
//   LARGE = "Large",
//   EXTRA_LARGE = "Extra Large",
// }

export enum ChannelType {
  TIKTOK = "TikTok",
  AMAZON = "Amazon",
  EBAY = "eBay",
  SHOPIFY = "Shopify",
  WOOCOMMERCE = "Woocommerce",
}

// Filter types
// export interface ColumnFilter {
//   id: string
//   value: any
// }

// export interface DateRangeFilter {
//   from: Date | null
//   to: Date | null
// }

// export interface CheckboxListFilter {
//   values: string[]
// }

// Table props types
// export interface TableColumn {
//   accessorKey: string
//   header: string
//   type: "text" | "number" | "date" | "boolean" | "enum" | "currency" | "weight"
//   filterable?: boolean
//   sortable?: boolean
//   filterType?: "input" | "checkbox-list" | "date-range"
//   filterOptions?: string[]
// }

// API Response types
// export interface OrdersResponse {
//   orders: PickwaveOrder[]
//   pagination: {
//     total: number
//     pages: number
//     page: number
//     limit: number
//   }
// }

export interface ApiError {
  message: string
  code?: string
  details?: any
}

// -----------------------------------

// Pickwave related interfaces

// Response interfaces
export interface IPickwaveResponse {
data: IPickwave[]
meta: {
  total: number
  page: number
  limit: number
}
}

export interface IPickwave {
_id: string
orders: string[]
createdBy: string
splitByCourier: boolean
tag?: string
restrictedByWarehouseZone: boolean
priorityWarehouseZone?: string
picker?: string
createdAt: string
updatedAt: string
status: PickwaveStatus
}

export interface IPickList {
id: string
pickwaveId: string
items: PickListItem[]
createdAt: string
updatedAt: string
}

export interface PickListItem {
productId: string
quantity: number
picked: number
location: string
}

export interface IScanResponse {
success: boolean
message: string
product?: {
  id: string
  sku: string
  name: string
  barcode: string
}
}

export interface IOrderLabel {
id: string
orderId: string
labelUrl: string
trackingNumber: string
carrier: string
createdAt: string
}

// Request interfaces
export interface CreatePickwaveData {
orders: string[]
createdBy: string
splitByCourier?: boolean
tag?: string
restrictedByWarehouseZone?: boolean
priorityWarehouseZone?: string
picker?: string
}

export interface UpdatePickwaveData {
splitByCourier?: boolean
tag?: string
restrictedByWarehouseZone?: boolean
priorityWarehouseZone?: string
picker?: string
status?: PickwaveStatus
}

export interface PickwaveQueryParams {
page?: number
limit?: number
status?: PickwaveStatus
picker?: string
createdBy?: string
tag?: string
startDate?: string
endDate?: string
}

export interface ScanProductData {
barcode: string
pickwaveId?: string
picklistId?: string
}

export interface OrderLabelParams {
orderId: string
}

// Enums
export enum PickwaveStatus {
PENDING = "pending",
IN_PROGRESS = "in_progress",
COMPLETED = "completed",
CANCELLED = "cancelled",
}
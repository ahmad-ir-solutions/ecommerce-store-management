import type { z } from "zod"
import type { addressSchema, csvOrderFormSchema, editOrderSchema } from "./_schema"

// Form value types
export type CsvOrderFormValues = z.infer<typeof csvOrderFormSchema>
export type EditOrderFormValues = z.infer<typeof editOrderSchema>
export type AddressFormValues = z.infer<typeof addressSchema>

// Address interfaces
export interface IAddress {
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

// Legacy Address interface for backward compatibility
export interface Address {
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state?: string
  county?: string
  postalCode: string
  country: string
  phone: string
}

export interface IproductDetails {
  price :number
  productName: string
  sku: string
  _id:string
}

export interface ICustomerDetails {
  // _id?: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  emailCC?: string
  customerReference?: string
  vatNumbers?: string
  abn?: string
  shippingAddress?: Address
  billingAddress: IAddress
  channelDetails?: string
}

export interface IShippingHandling {
  warehouse?: string
  shippingMethod: string
  updateOrderTotal?: boolean
  shippingCost: number
  channelShippingMethod?: string
  trackingNumber?: string
  specialInstructions?: string
  pickerInstructions?: string
  orderWeight?: number
  overrideWeight?: boolean
  packageSize?: string
  numberOfParcels?: number
  airNumber?: string
}

// Main Order interface from API
export interface IOrder {
  _id: string
  productDetails: IproductDetails
  customerDetails: ICustomerDetails
  channelDetails: string
  companyIdentity?: string
  channelPurhasedFrom?: string
  channelOrderNumber: string
  orderStatus: string
  attentionRequired: boolean
  sellerId?: string
  shippingAddress: Address
  quantity: number
  itemOptions?: number
  quantityAllocated: number
  unitSubtotal: number
  taxRate: number
  taxTotal: number
  discount: number
  totalPrice: number
  status: string
  orderDate: string
  importedFromChannelOn?: string
  assignedToPickerOn?: string
  dispatchedOn?: string
  dispatchSentToChannel?: string
  paymentId?: string
  deliveredOn?: string
  manifestedOn?: string
  designatedPicker?: string
  designatedPacker?: string
  signedForBy?: string
  shippingAndHandling?: IShippingHandling
  billingAddress?: IAddress
  notes?: string
  pickwave?: string
  scannedQuantity?: number
  royalMailLabelUrl?: string
  createdAt: string
  updatedAt: string
  __v: number
}

// Legacy interfaces for component compatibility
export interface OrderItem {
  id: string
  sku: string
  name: string
  quantity: number
  unitSubtotal: number
  taxRate: number
  taxTotal: number
  discount: number
  status: string
  quantityAllocated: number
  options?: string
}

export interface OrderTotals {
  subtotal: number
  shippingCosts: number
  shippingTax: number
  discount: number
  lineItemsTax: number
  total: number
  refundedAmount: number
}

export interface OrderNote {
  id: string
  subject: string
  note: string
  createdOn: Date
  createdBy: string
}

// Transformed order details for components
export interface OrderDetails {
  orderId: string
  status: string
  customerName: string
  emailAddress: string
  channelOrderId: string
  shippingMethod: string
  attentionRequired?: boolean
  billingAddress: Address
  shippingAddress: Address
  items: OrderItem[]
  totals: OrderTotals
  notes: OrderNote[]
  orderDate: Date
  importedDate: Date
  trackingNumber?: string
  specialInstructions?: string
  pickerInstructions?: string
  orderWeight?: string
  packageSize?: string
  numberOfParcels?: string
  airNumber?: string
}

// Table row interface for order listing
export interface Order {
  id: string
  ordersFlags: string
  orderId: string
  channel: string
  channelOrderId: string
  productSKUs: string
  orderDate: Date
  dispatchDate: Date | null
  channelDispatchDate: Date | null
  customerName: string
  company: string | null
  postcode: string
  shippingCountry: string
  emailAddress: string
  total: number
  shippingMethod: string
  status: string
  flagType?: "P" | null
}

// API Response interfaces
export interface IOrderResponse {
  _id: string
  productDetails: string
  customerDetails: ICustomerDetails
  channelDetails: string
  companyIdentity?: string
  channelPurhasedFrom?: string
  channelOrderNumber: string
  orderStatus: string
  attentionRequired: boolean
  sellerId?: string
  quantity: number
  itemOptions?: number
  quantityAllocated: number
  unitSubtotal: number
  taxRate: number
  taxTotal: number
  discount: number
  totalPrice: number
  status: string
  orderDate: string
  importedFromChannelOn?: string
  assignedToPickerOn?: string
  dispatchedOn?: string
  dispatchSentToChannel?: string
  paymentId?: string
  deliveredOn?: string
  manifestedOn?: string
  designatedPicker?: string
  designatedPacker?: string
  signedForBy?: string
  shippingAndHandling?: IShippingHandling
  billingAddress?: IAddress
  notes?: string
  pickwave?: string
  scannedQuantity?: number
  royalMailLabelUrl?: string
  message: string
}

export interface IOrdersResponse {
  _id?: string
  orders: IOrder[]
  message?: string
  total: number
  pagination?: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

export interface OrderQueryParams {
  limit?: number
  page?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  status?: string
  channel?: string
  startDate?: string
  endDate?: string
  shippingCountry?: string
  shippingMethod?: string
}

export interface CreateOrderData {
  productDetails: string
  customerDetails: ICustomerDetails
  channelDetails: string
  companyIdentity?: string
  channelPurhasedFrom?: string
  channelOrderNumber: string
  orderStatus: string
  attentionRequired: boolean
  sellerId?: string
  quantity: number
  itemOptions?: number
  quantityAllocated: number
  unitSubtotal: number
  taxRate: number
  taxTotal: number
  discount: number
  totalPrice: number
  status: string
  orderDate: string
  shippingAndHandling?: IShippingHandling
  billingAddress?: IAddress
  notes?: string
}

export interface UpdateOrderData {
  productDetails?: string
  customerDetails?: Partial<ICustomerDetails>
  channelDetails?: string
  companyIdentity?: string
  channelPurhasedFrom?: string
  channelOrderNumber?: string
  orderStatus?: string
  attentionRequired?: boolean
  sellerId?: string
  quantity?: number
  itemOptions?: number
  quantityAllocated?: number
  unitSubtotal?: number
  taxRate?: number
  taxTotal?: number
  discount?: number
  totalPrice?: number
  status?: string
  orderDate?: string
  shippingAndHandling?: Partial<IShippingHandling>
  billingAddress?: Partial<IAddress>
  notes?: string
}

// Bulk operation types
export interface BulkStatusUpdateData {
  orderIds: string[]
  status: string
  reason?: string
}

export interface BulkExportData {
  orderIds: string[]
  format: "csv" | "xlsx" | "pdf"
  includeFields?: string[]
}

export interface BulkAssignData {
  orderIds: string[]
  pickerId: string
}

export interface BulkOperationResponse {
  success: boolean
  message: string
  processedCount: number
  failedCount: number
  errors?: Array<{
    orderId: string
    error: string
  }>
}

export interface ExportResponse {
  success: boolean
  downloadUrl: string
  fileName: string
  expiresAt: string
}

// CSV Import types
export interface CsvImportResponse {
  success: boolean
  message: string
  totalProcessed: number
  successCount: number
  failCount: number
  errors?: {
    row: number
    message: string
  }[]
}

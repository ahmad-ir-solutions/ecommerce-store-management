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

  id: string
  channel: string 
  multipleLines: boolean
  productSKU: string 
  stockLocations: string 
  warehouseLocations: string 
  packageSize: string 
  orderWeight: number
  shippingMethod: string
  postCode: string
}

export enum ChannelType {
  TIKTOK = "TikTok",
  AMAZON = "Amazon",
  EBAY = "eBay",
  SHOPIFY = "Shopify",
  WOOCOMMERCE = "Woocommerce",
}
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
pdfUrl?: string
}

export interface PickListItem {
productId: string
quantity: number
picked: number
location: string
}

export interface IScanResponse {
  message: string; 
data: {
  message: string
  singleLabelS3Url: string
  allLabelFileS3Url: string
}
}

export interface IOrderLabel {
allPickwaveLabelsUrl: string | URL | undefined
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

// export interface UpdatePickwaveData {
// splitByCourier?: boolean
// tag?: string
// restrictedByWarehouseZone?: boolean
// priorityWarehouseZone?: string
// picker?: string
// status?: PickwaveStatus
// }

export interface UpdatePickwaveData {
  trackingNumber: string
  carrierName: string
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
orderId: string
pickwaveId: string
dispatchDate: string
quantity: number
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
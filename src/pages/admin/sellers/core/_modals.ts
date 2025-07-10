// Seller related interfaces
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
  phone: string
}

export interface IConnectedAccount {
  _id: string
  platform: string
  accountName: string
  accountId: string
  status: 'active' | 'inactive' | 'pending'
  connectedAt: string
  lastSyncAt?: string
}

export interface ITransaction {
  _id: string
  transactionId: string
  amount: number
  currency: string
  type: 'payment' | 'refund' | 'commission' | 'fee'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  description: string
  createdAt: string
  platform?: string
}

export interface ISeller {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  companyName?: string
  businessType?: string
  taxId?: string
  vatNumber?: string
  website?: string
  address?: IAddress
  connectedAccounts?: IConnectedAccount[]
  transactions?: ITransaction[]
  status: 'active' | 'inactive' | 'suspended'
  verificationStatus: 'verified' | 'pending' | 'unverified'
  totalSales?: number
  totalOrders?: number
  commissionRate?: number
  tags?: string[]
  notes?: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface SellerQueryParams {
  limit?: number
  page?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  role?: string
}

export interface CreateSellerData {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  companyName?: string
  businessType?: string
  taxId?: string
  vatNumber?: string
  website?: string
  address?: IAddress
  status?: string
  verificationStatus?: string
  tags?: string[]
  notes?: string
}

export interface UpdateSellerData {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  companyName?: string
  businessType?: string
  taxId?: string
  vatNumber?: string
  website?: string
  address?: Partial<IAddress>
  status?: string
  verificationStatus?: string
  tags?: string[]
  notes?: string
  totalSales?: number
  totalOrders?: number
  commissionRate?: number
}

export interface AddressFormValues {
  firstName: string
  lastName: string
  company?: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone: string
}



// ----------------------------- seller models
export interface RegisterFormData {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface IAuthResponse {
  success: boolean
  message: string
  token?: string
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
}

export interface ISellerModel {
  _id: string
  name: string
  email: string
  role: UserRole.SELLER
  designatedPicker?: boolean
  accountOwner?: boolean
  token?: string
  lastLogin?: string
  passwordAge?: string
  isActive: boolean
  mfaStatus?: string
  ipRestriction?: string
  createdAt?: string
}

export interface ISellerResponse {
  data: ISellerModel[]
  limit: number
  page: number
  total: number
}

export interface ISingleSellerResponse {
  user: ISellerModel
}

export interface IGetAllSellersResponse {
  data: ISellerModel[]
  total: number
  page: number
  limit: number
}

export interface ITransaction {
  _id: string
  userId: string
  type: "payment" | "refund" | "commission" | "fee"
  amount: number
  source: string
  orderId: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface ITransactionResponse {
  data: ITransaction[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ChannelDetails {
  channelId: string
  channelName: string
  _id: string
}

export interface ProductDetails {
  imageUrl: string
  productName: string
  sku: string
  _id: string
}

export interface StatsData {
  channelStats: Record<string, number>
  numberOfReturns: number
  totalOrders: number
  totalSpent: number
}

export interface ISellerOrderData {
  _id: string
  channelDetails: ChannelDetails
  createdAt: string
  orderStatus: string
  productDetails: ProductDetails
  quantity: number
  totalPrice: number
}
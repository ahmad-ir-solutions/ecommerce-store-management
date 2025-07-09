// Customer related interfaces
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

export interface ICustomer {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  emailCC?: string
  customerReference?: string
  vatNumber?: string
  airn?: string
  channelDetails?: {
    channelName: string
    _id: string
  }
  shippingAddress?: IAddress
  billingAddress?: IAddress
  tags?: string[]
  eori?: string
  attentionRequired?: boolean
  notes?: string
  orders?: any[]
  createdAt: string
  updatedAt: string
  __v: number
  totalOrders?: number
  totalReturns?: number
  totalSpend?: number
  averageOrderValue?: number
}

export interface ICustomerResponse {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  emailCC?: string
  customerReference?: string
  vatNumber?: string
  airn?: string
  shippingAddress?: IAddress
  billingAddress?: IAddress
  tags?: string[]
  notes?: string
  message: string
}

export interface ICustomersResponse {
  _id?: string
  orders: ICustomer[]
  message?: string
  total: number
}

export interface CustomerQueryParams {
  limit?: number
  page?: number
  search?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export interface CreateCustomerData {
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  emailCC?: string
  customerReference?: string
  vatNumber?: string
  airn?: string
  shippingAddress?: IAddress
  billingAddress?: IAddress
  tags?: string[]
  notes?: string
}

export interface UpdateCustomerData {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?: string
  emailCC?: string
  customerReference?: string
  vatNumber?: string
  airn?: string
  shippingAddress?: Partial<IAddress>
  billingAddress?: Partial<IAddress>
  tags?: string[]
  notes?: string
  totalOrders?: number
  totalReturns?: number
  totalSpend?: number
  averageOrderValue?: number
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

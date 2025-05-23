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
  abn?: string
  channel?: string
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
  abn?: string
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
  abn?: string
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
  abn?: string
  shippingAddress?: Partial<IAddress>
  billingAddress?: Partial<IAddress>
  tags?: string[]
  notes?: string
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
}

// export interface Customer {
//   _id: string
//   firstName: string
//   lastName: string
//   name: string
//   email: string
//   phoneNumber?: string
//   ccEmail?: string
//   customerReference?: string
//   vatNumber?: string
//   eori?: string
//   abn?: string
//   channel?: string
//   shippingAddress?: {
//     firstName: string
//     lastName: string
//     company?: string
//     addressLine1: string
//     addressLine2?: string
//     city: string
//     state: string
//     postalCode: string
//     country: string
//   }
//   billingAddress?: {
//     firstName: string
//     lastName: string
//     company?: string
//     addressLine1: string
//     addressLine2?: string
//     city: string
//     state: string
//     postalCode: string
//     country: string
//   }
//   tags?: string[]
//   notes?: string
//   orders?: any[]
//   attentionRequired?: boolean
//   createdAt: string
// }

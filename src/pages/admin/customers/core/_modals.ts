import { z } from "zod"
import { addressSchema } from "./_schema"

export interface Customer {
  id: string
  name: string
  firstName?: string
  lastName?: string
  email: string
  ccEmail?: string
  phoneNumber?: string
  reference: string
  vatNumber?: string
  eori?: string
  tags?: string[]
  notes?: string
  order: {
    numbers: number
    average: number
    total: number
  }
  channel: string
  shippingAddress?: Address
  billingAddress: Address
  orders?: Order[]
}

export interface Address {
  firstName?: string
  lastName?: string
  company?: string
  line1: string
  line2?: string
  city?: string
  state?: string
  postalCode?: string
  country: string
}

export interface Order {
  id: string
  date: string
  status: string
  total: number
}

export type AddressFormValues = z.infer<typeof addressSchema>
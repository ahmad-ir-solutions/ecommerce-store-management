import { z } from "zod";
import { csvOrderFormSchema } from "./_schema";

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
    flagType?: "P" | null // P for processing, could have other values
  }
  
export interface OrderDetails extends Order {
  billingAddress: {
    name: string
    company: string | null
    address1: string
    address2: string | null
    city: string
    county: string
    postcode: string
    country: string
    phone: string
  }
  shippingAddress: {
    name: string
    company: string | null
    address1: string
    address2: string | null
    city: string
    county: string
    postcode: string
    country: string
    phone: string
  }
  items: OrderItem[]
  totals: {
    subtotal: number
    shippingCosts: number
    shippingTax: number
    discount: number
    lineItemsTax: number
    total: number
    refundedAmount: number
  }
  notes: OrderNote[]
}

export interface OrderItem {
  sku: string
  name: string
  quantity: number
  options: string | null
  quantityAllocated: number
  unitSubtotal: number
  taxRate: number
  taxTotal: number
  discount: number
  total: number
  status: string
}

export interface OrderNote {
  id: string
  subject: string
  note: string
  createdOn: Date
  createdBy: string
}



// csv order type----------------
export type CsvOrderFormValues = z.infer<typeof csvOrderFormSchema>

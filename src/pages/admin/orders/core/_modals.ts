import { z } from "zod";
import { addressSchema, csvOrderFormSchema, editOrderSchema } from "./_schema";

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
  
  export interface Address {
    name: string
    company?: string
    address1: string
    address2?: string
    city: string
    county: string
    postcode: string
    country: string
    phone: string
  }
  
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

// csv order type----------------
export type CsvOrderFormValues = z.infer<typeof csvOrderFormSchema>

export type EditOrderFormValues = z.infer<typeof editOrderSchema>

export type AddressFormValues = z.infer<typeof addressSchema>

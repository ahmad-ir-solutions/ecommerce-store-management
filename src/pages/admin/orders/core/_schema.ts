import { z } from "zod";

// Define Zod schema for address validation
export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().optional()
})

// Define Zod schema for customer details within order
export const customerDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  emailCC: z.string().email("Invalid email address").optional().or(z.literal("")),
  customerReference: z.string().optional(),
  vatNumbers: z.string().optional(),
  abn: z.string().optional(),
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  channelDetails: z.string().optional(),
})

// Define Zod schema for shipping and handling
export const shippingHandlingSchema = z.object({
  warehouse: z.string().optional(),
  shippingMethod: z.string().min(1, "Shipping method is required"),
  updateOrderTotal: z.boolean().optional(),
  shippingCost: z.number().min(0, "Shipping cost must be positive"),
  channelShippingMethod: z.string().optional(),
  trackingNumber: z.string().optional(),
  specialInstructions: z.string().optional(),
  pickerInstructions: z.string().optional(),
  orderWeight: z.number().optional(),
  overrideWeight: z.boolean().optional(),
  packageSize: z.string().optional(),
  numberOfParcels: z.number().optional(),
  airNumber: z.string().optional(),
})

// Define Zod schema for order creation/update
export const orderSchema = z.object({
  productDetails: z.string().min(1, "Product details are required"),
  customerDetails: customerDetailsSchema,
  channelDetails: z.string().min(1, "Channel details are required"),
  companyIdentity: z.string().optional(),
  channelPurhasedFrom: z.string().optional(),
  channelOrderNumber: z.string().min(1, "Channel order number is required"),
  orderStatus: z.string().min(1, "Order status is required"),
  attentionRequired: z.boolean().default(false),
  sellerId: z.string().optional(),
  shippingAddress: addressSchema.optional(),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  itemOptions: z.number().optional(),
  quantityAllocated: z.number().min(0, "Quantity allocated must be positive"),
  unitSubtotal: z.number().min(0, "Unit subtotal must be positive"),
  taxRate: z.number().min(0, "Tax rate must be positive"),
  taxTotal: z.number().min(0, "Tax total must be positive"),
  discount: z.number().min(0, "Discount must be positive"),
  totalPrice: z.number().min(0, "Total price must be positive"),
  status: z.string().min(1, "Status is required"),
  orderDate: z.string().min(1, "Order date is required"),
  importedFromChannelOn: z.string().optional(),
  assignedToPickerOn: z.string().optional(),
  dispatchedOn: z.string().optional(),
  dispatchSentToChannel: z.string().optional(),
  paymentId: z.string().optional(),
  deliveredOn: z.string().optional(),
  manifestedOn: z.string().optional(),
  designatedPicker: z.string().optional(),
  designatedPacker: z.string().optional(),
  signedForBy: z.string().optional(),
  shippingAndHandling: shippingHandlingSchema.optional(),
  billingAddress: addressSchema.optional(),
  notes: z.string().optional(),
  pickwave: z.string().optional(),
  scannedQuantity: z.number().optional(),
  royalMailLabelUrl: z.string().optional(),
})

// CSV order form schema
export const csvOrderFormSchema = z.object({
  channel: z.string().min(1, "Channel is required"),
  files: z.any().optional(),
})

// Edit order form schema
export const editOrderSchema = z.object({
  orderStatus: z.string().min(1, "Order status is required"),
  attentionRequired: z.boolean().optional(),
  shippingMethod: z.string().min(1, "Shipping method is required"),
  shippingCost: z.string().min(1, "Shipping cost is required"),
  channelShippingMethod: z.string().optional(),
  trackingNumber: z.string().optional(),
  specialInstructions: z.string().optional(),
  pickerInstructions: z.string().optional(),
  orderWeight: z.string().optional(),
  packageSize: z.string().optional(),
  numberOfParcels: z.string().optional(),
  airNumber: z.string().optional(),
})

// Basic order details schema
export const basicOrderDetailsSchema = z.object({
  channelOrderNumber: z.string().min(1, "Channel order number is required"),
  orderStatus: z.string().min(1, "Order status is required"),
  attentionRequired: z.boolean().default(false),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  totalPrice: z.number().min(0, "Total price must be positive"),
  notes: z.string().optional(),
})

// Bulk operations schemas
export const bulkStatusUpdateSchema = z.object({
  orderIds: z.array(z.string()).min(1, "At least one order must be selected"),
  status: z.string().min(1, "Status is required"),
  reason: z.string().optional(),
})

export const bulkExportSchema = z.object({
  orderIds: z.array(z.string()).min(1, "At least one order must be selected"),
  format: z.enum(["csv", "xlsx", "pdf"]).default("csv"),
  includeFields: z.array(z.string()).optional(),
})

export const bulkAssignSchema = z.object({
  orderIds: z.array(z.string()).min(1, "At least one order must be selected"),
  pickerId: z.string().min(1, "Picker is required"),
})

// Type exports
export type OrderFormValues = z.infer<typeof orderSchema>
export type CsvOrderFormValues = z.infer<typeof csvOrderFormSchema>
export type EditOrderFormValues = z.infer<typeof editOrderSchema>
export type AddressFormValues = z.infer<typeof addressSchema>
export type CustomerDetailsFormValues = z.infer<typeof customerDetailsSchema>
export type ShippingHandlingFormValues = z.infer<typeof shippingHandlingSchema>
export type BasicOrderDetailsFormValues = z.infer<typeof basicOrderDetailsSchema>
export type BulkStatusUpdateFormValues = z.infer<typeof bulkStatusUpdateSchema>
export type BulkExportFormValues = z.infer<typeof bulkExportSchema>
export type BulkAssignFormValues = z.infer<typeof bulkAssignSchema>

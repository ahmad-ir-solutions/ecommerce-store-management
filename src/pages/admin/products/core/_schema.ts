import { z } from "zod";

// Define Zod schema for product validation
export const productSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  productType: z.string().min(1, "Product type is required"),
  sku: z.string().optional(),
  imageUrl: z.string().url("Invalid URL").optional(),
  inventory: z.number().int().nonnegative().optional(),
  price: z.number().nonnegative().optional(),
  rrp: z.number().nonnegative().optional(),
  taxClass: z.number().int().nonnegative().optional(),
  priceIncludesVat: z.boolean().optional(),
  weight: z.number().nonnegative().optional(),
  length: z.number().nonnegative().optional(),
  width: z.number().nonnegative().optional(),
  height: z.number().nonnegative().optional(),
  warehouse: z.string().optional(),
  brand: z.string().optional(),
  ean: z.string().optional(),
  upc: z.string().optional(),
  supplierDetails: z.string().optional(),
  priorityOrder: z.number().nonnegative().optional(),
  supplierSku: z.number().nonnegative().optional(),
  unitCostPrice: z.number().nonnegative().optional(),
  cartonCostPrice: z.number().nonnegative().optional(),
  supplierStockLevel: z.number().nonnegative().optional(),
  supplierCartonQuantity: z.number().nonnegative().optional(),
  _id: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  __v: z.number().optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>

export const supplierSchema = z.object({
  supplierName: z.string().min(1, "Supplier Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postcode: z.string().min(1, "Postcode is required"),
  supplierCurrency: z.string().min(1, "Supplier Currency is required"),
  // isManufacturer: z.boolean(),
  // sendEmailBelowReorderLevel: z.boolean(),
  // sendEmailBelowOutOfStockThreshold: z.boolean(),
  // includeProductsAtReorderLevel: z.boolean(),
  // excludeOutOfStockManualReorderLevel: z.boolean(),
  // includeInRequisitions: z.boolean(),
  // consolidateDropShipEmails: z.boolean(),
  address2: z.string().optional(),
  countryState: z.string().optional(),
  phone: z.string().optional(),
  supplierCode: z.string().optional(),
  supplierReference: z.string().optional(),
  // commaDelimitedEmails: z.string().optional(),
  // minimumOrderValue: z.number().optional().nullable(),
  supplierEmailAddress: z.string().email("Invalid email address").optional().or(z.literal("")),
  // contactEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
  // leadTime: z.number().optional().nullable(),
  // purchaseOrderMode: z.string().optional(),
  // poShippingCostType: z.string().optional(),
  // poChangeToStatus: z.string().optional(),
  // totalDropShipCost:  z.number().optional().nullable(),
  // dropShipShippingCostType: z.string().optional(),
  // dropShipChangeToStatus: z.string().optional(),
  // totalPoShippingCost: z.number().optional().nullable(),
  // transferMethod: z.string().optional(),
  // exportMethod: z.string().optional(),
  // templateType: z.string().optional(),
  // isDefaultExportMethod: z.boolean().optional(),
  // exportDelimiter: z.string().optional(),
  // exportHeaders: z.boolean().optional(),
})

export type SupplierFormValues = z.infer<typeof supplierSchema>

// csv product Form schema----------------
export const csvFormSchema = z.object({
    poReference: z.string().min(1, "PO Reference is required"),
    deliveryCost: z.string().min(1, "Delivery Cost is required"),
    supplier: z.string().min(1, "Supplier is required"),
    warehouse: z.string().min(1, "Warehouse is required"),
    dueDate: z.date({
      required_error: "Due Date is required",
    }),
    files: z.any().optional(),
  })
  


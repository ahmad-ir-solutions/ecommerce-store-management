import { z } from "zod";

// Define Zod schema for product validation
export const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    sku: z.string().optional(),
    inventory: z.string().optional(),
    price: z.string().min(1, "Product Price is required"),
    rrp: z.string().optional(),
    taxClass: z.string().optional(),
    priceIncludesVAT: z.boolean().optional(),
    weight: z.string().optional(),
    length: z.string().optional(),
    width: z.string().optional(),
    heightDepth: z.string().optional(),
    warehouse: z.string().optional(),
    brand: z.string().optional(),
    ean: z.string().optional(),
    upc: z.string().optional(),
});

// supplier schema --------
export const supplierSchema = z.object({
  supplierName: z.string().min(1, "Supplier Name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postcode: z.string().min(1, "Postcode is required"),
  supplierCurrency: z.string().min(1, "Supplier Currency is required"),
  isManufacturer: z.boolean(),
  sendEmailWhenProductBelowReorderLevel: z.boolean(),
  sendEmailWhenProductBelowOutOfStockThreshold: z.boolean(),
  includeProductsEqualToReorderLevel: z.boolean(),
  excludeOutOfStockProductsWithZeroManualReorderLevel: z.boolean(),
  includeSupplierInRequisitions: z.boolean(),
  consolidateDropshipSupplierEmails: z.boolean(),
  address2: z.string().optional(),
  countryState: z.string().optional(),
  phone: z.string().optional(),
  supplierCode: z.string().optional(),
  supplierReference: z.string().optional(),
  commaDelimitedEmails: z.string().optional(),
  minimumOrderValue: z.string().optional(),
  supplierEmail: z.string().email("Invalid email address").optional(),
  contactEmail: z.string().email("Invalid email address").optional(),
  leadTime: z.string().optional(),
  purchaseOrderMode: z.string().optional(),
  purchaseOrderShippingCostType: z.string().optional(),
  purchaseOrderChangeToStatus: z.string().optional(),
  totalPurchaseOrderShippingCost: z.string().optional(),
  dropShipmentShippingCostType: z.string().optional(),
  dropShipmentChangeToStatus: z.string().optional(),
  totalDropShipmentShippingCost: z.string().optional(),
  transferMethod: z.string().optional(),
  exportMethod: z.string().optional(),
  templateType: z.string().optional(),
  defaultExportMethod: z.boolean(),
  exportDelimiter: z.string().optional(),
  exportHeaders: z.boolean(),
});


// csv Form schema----------------
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
  


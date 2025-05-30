import { z } from "zod"

// Define the warehouse schema with Zod
export const warehouseSchema = z.object({
  contactName: z.string().optional(),
  warehouseName: z.string().min(1, { message: "Warehouse name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  postcode: z.string().min(1, { message: "Postcode/Zip code is required" }),
  handlingTimeInDays: z.number().min(1, { message: "Handling time is required" }),
  address1: z.string().optional(),
  address2: z.string().optional(),
  state: z.string().optional(),
  collectionPoint: z.string().optional(),
  country: z.string(),
  countryCode: z.string(),
  warehouseType: z.string(),
  freeProduct: z.string().optional(),
});

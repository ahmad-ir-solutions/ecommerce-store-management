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
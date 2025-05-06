import { z } from "zod";

// csv order Form schema----------------
export const csvOrderFormSchema = z.object({
    channel: z.string().min(1, "Channel is required"),
    files: z.any().optional(),
  })
  

  export const editOrderSchema = z.object({
    orderStatus: z.string(),
    attentionRequired: z.boolean().optional(),
    shippingMethod: z.string(),
    shippingCost: z.string(),
    channelShippingMethod: z.string().optional(),
    trackingNumber: z.string().optional(),
    specialInstructions: z.string().optional(),
    pickerInstructions: z.string().optional(),
    orderWeight: z.string().optional(),
    packageSize: z.string().optional(),
    numberOfParcels: z.string().optional(),
    airNumber: z.string().optional(),
  })
  
  export const addressSchema = z.object({
    name: z.string().min(1, "Name is required"),
    company: z.string().optional(),
    address1: z.string().min(1, "Address line 1 is required"),
    address2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    county: z.string().min(1, "County is required"),
    postcode: z.string().min(1, "Postcode is required"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().min(1, "Phone is required"),
  })
  
  
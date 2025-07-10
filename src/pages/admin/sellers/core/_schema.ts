import { z } from "zod"

// Define Zod schema for address validation
export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  phone: z.string().min(1, "Phone is required"),
})

// Define Zod schema for seller validation
export const sellerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
  businessType: z.string().optional(),
  taxId: z.string().optional(),
  vatNumber: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  address: addressSchema.optional(),
  status: z.enum(["active", "inactive", "suspended"]),
  verificationStatus: z.enum(["verified", "pending", "unverified"]),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
})

// Define Zod schema for basic seller details
export const basicDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
  businessType: z.string().optional(),
  taxId: z.string().optional(),
  vatNumber: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "suspended"]),
  verificationStatus: z.enum(["verified", "pending", "unverified"]),
})

// Zod Schema for creating a seller
export const createSellerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  companyName: z.string().optional(),
  businessType: z.string().optional(),
  taxId: z.string().optional(),
  vatNumber: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "suspended"]).default("active"),
  verificationStatus: z.enum(["verified", "pending", "unverified"]).default("unverified"),
  address: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    company: z.string().optional(),
    addressLine1: z.string().min(1, "Address line 1 is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
    phone: z.string().optional(),
  }).optional(),
})

// Zod Schema for updating a seller
export const updateSellerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phoneNumber: z.string().optional(),
  companyName: z.string().optional(),
  businessType: z.string().optional(),
  taxId: z.string().optional(),
  vatNumber: z.string().optional(),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  status: z.enum(["active", "inactive", "suspended"]),
  verificationStatus: z.enum(["verified", "pending", "unverified"]),
  address: addressSchema.optional(),
})

export type CreateSellerFormValues = z.infer<typeof createSellerSchema>
export type UpdateSellerFormValues = z.infer<typeof updateSellerSchema>
export type SellerFormValues = z.infer<typeof sellerSchema>
export type AddressFormValues = z.infer<typeof addressSchema>
export type BasicDetailsFormValues = z.infer<typeof basicDetailsSchema> 
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
})

// Define Zod schema for customer validation
export const customerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().optional(),
  emailCC: z.string().email("Invalid email address").optional().or(z.literal("")),
  customerReference: z.string().optional(),
  vatNumber: z.string().optional(),
  abn: z.string().optional(),
  shippingAddress: addressSchema.optional(),
  billingAddress: addressSchema.optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
})

// Define Zod schema for basic customer details
export const basicDetailsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
  email: z.string().email("Invalid email address"),
  emailCC: z.string().email("Invalid email address").optional().or(z.literal("")),
  customerReference: z.string().optional(),
  vatNumber: z.string().optional(),
  abn: z.string().optional(),
})

export type CustomerFormValues = z.infer<typeof customerSchema>
export type AddressFormValues = z.infer<typeof addressSchema>
export type BasicDetailsFormValues = z.infer<typeof basicDetailsSchema>

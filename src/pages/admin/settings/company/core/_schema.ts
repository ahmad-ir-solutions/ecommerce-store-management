import { z } from "zod"

// Single consolidated company schema with proper optional fields
export const companySchema = z.object({
  companyName: z.string().min(1, { message: "Company name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  postcode: z.string().min(1, { message: "Postcode/Zip Code is required" }),
  contactEmail: z.string().email({ message: "Invalid email address" }),
  contactPhone: z.string().min(1, { message: "Contact phone is required" }),
  address2: z.string().optional(),
  country: z.string().optional(),
  websiteUrl: z.string().optional(),
  registeredCompanyName: z.string().optional(),
  overrideCnSenderName: z.string().optional(),
  vatNumber: z.string().optional(),
  eoriNumber: z.string().optional(),
  iossNumber: z.string().optional(),
  grantPermissions: z.boolean().optional().default(false),
  ukimsNumber: z.string().optional(),
  eoriNumberNi: z.string().optional(),
  declarationCategories: z
    .object({
      document: z.boolean().optional().default(false),
      returnedGoods: z.boolean().optional().default(false),
      gift: z.boolean().optional().default(false),
      saleOfGoods: z.boolean().optional().default(false),
      mixedContent: z.boolean().optional().default(false),
      commercialSample: z.boolean().optional().default(false),
      other: z.boolean().optional().default(false),
    })
    .optional()
    .default({}),
  autoSignDeclarations: z.boolean().optional().default(false),
  declarationFile: z.string().optional(),
  companyLogo: z.string().optional(),
})


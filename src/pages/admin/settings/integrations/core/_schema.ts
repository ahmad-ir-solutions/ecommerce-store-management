import { z } from 'zod';

export interface Integration {
  id: string
  name: string
  type: "courier" | "payment"
  active: boolean
  profileName: string
  integrationType: string
}

// Define the platform types
export type Platform = "courier" | "payment-gateway"



// Validation schema for profile form
export const profileSchema = z.object({
  integrationType: z.string().min(1, "Integration type is required"),
  location: z.string().min(1, "Location is required"),
})
import { z } from "zod"

export const addUserSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  confirmEmail: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["ADMIN", "USER", "SELLER"]),
  designatedPicker: z.boolean(),
  accountOwner: z.boolean(),
  notifyMe: z.boolean(),
  copyPermissionFrom: z.string(),
}).refine((data) => data.email === data.confirmEmail, {
  message: "Emails do not match",
  path: ["confirmEmail"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const editUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  // role: z.enum(["ADMIN", "USER", "SELLER"]),
  designatedPicker: z.boolean(),
  accountOwner: z.boolean(),
  notifyMe: z.boolean(),
  copyPermissionFrom: z.string(),
})

export type AddUserFormData = z.infer<typeof addUserSchema>
export type EditUserFormData = z.infer<typeof editUserSchema>

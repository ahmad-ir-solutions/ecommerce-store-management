import { z } from "zod";
import { UserRole } from "./_models";

// --- login Schema ---
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

// Create a registration schema with Zod
export const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  role: z.enum([UserRole.ADMIN, UserRole.SELLER]).optional(),
});

// --- OTP Schema ---
export const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

  // Create a forgot password schema with Zod
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// Create a reset password schema with Zod
export const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmNewPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ["confirmNewPassword"],
});
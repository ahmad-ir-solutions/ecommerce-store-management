import { z } from "zod";

// --- login Schema ---
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

// --- OTP Schema ---
export const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits"),
});

// --- reset-password schema ---
export const formSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Passwords doesn't match",
  });
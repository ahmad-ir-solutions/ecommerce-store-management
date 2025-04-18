import { z } from "zod";

// --- login Schema ---
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

// Create a registration schema with Zod
export const registerSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
});

// --- OTP Schema ---
// export const otpSchema = z.object({
//   email: z.string().email({ message: "Please enter a valid email address" }),
//   otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
// });

export const otpSchema = z.object({
  email: z.string().email(),
  otp: z
    .string()
    .length(6, "OTP must be 6 characters.")
    .regex(/^[0-9a-zA-Z]{6}$/, "OTP must only contain letters or numbers."),
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
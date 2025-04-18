import { z } from "zod";
import { loginSchema, otpSchema, resetPasswordSchema, registerSchema, forgotPasswordSchema } from "./_schema";

export type Role = 'SELLER' | 'ADMIN';

export type ID = string;

// Login response only contains token and message
export interface IAuthResponse {
  token: string;
  message?: string;
}

// Registration response only contains message
export interface IRegisterResponse {
  message: string;
  errors?: {
    [key: string]: string;
  };
  statusCode?: number;
}

// User response from /user endpoint
export interface IUserResponse {
  _id: string;
  email: string;
  name: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
}

// Combined model for local state
export interface IUserModel extends IUserResponse {
  token?: string;
}

// Possible user roles - matching API exactly
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER"
}

//---------------- login types
export type LoginFormData = z.infer<typeof loginSchema>

//----------------- register types
export type RegisterFormData = z.infer<typeof registerSchema>;

//----------------- OTP types
export type OTPFormData = z.infer<typeof otpSchema>;

//----------------- reset-password types
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

//----------------- forgot-password types
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
  
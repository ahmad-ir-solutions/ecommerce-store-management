import { z } from "zod";
import { loginSchema, otpSchema, resetPasswordSchema, registerSchema, forgotPasswordSchema } from "./_schema";


export type Role = 'SELLER' | 'ADMIN';

export type ID = string;

export type Response<T> = {
  data?: T;
};

export interface IAuthModel {
  // data: Record<string, unknown>;
  data: {
    user: IUserModel;
    token: string;
    message: string;
  };
  api_token?: string;
}

// interface IAddress {
//   _id: string;
// }

export interface IUserModel {
  _id: ID;
  // phoneNumber: string;
  // weeklyPreference: string;
  // balance: number;
  // maxCreditLimit: number;
  role: UserRole;
  // profilePicture: string;
  email: string;
  token?: string;
  // addresses: IAddress[];
  createdAt: string;
  name: string;
  updatedAt: string;
  data?: Record<string, unknown>;
}

// export interface ISignInForm {
//   email: string;
//   password: string;
// }

// export interface ISignUpForm {
//   email: string;
//   password: string;
//   name: string;
//   role?: UserRole;
// }

// export interface IForgotPasswordForm {
//   email: string;
// }

// export interface IVerifyOtpRequestBody {
//   email: string;
//   otp: string;
// }

// export interface IResetPasswordForm {
//   email: string;
//   newPassword: string;
//   otp: string;
// }

// Possible user roles
export enum UserRole {
  ADMIN = "admin",
  SELLER = "seller",
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
  
export interface RegisterFormData {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface IAuthResponse {
  success: boolean
  message: string
  token?: string
}

export interface IRegisterResponse {
  success: boolean
  message: string
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUserModel {
  id: string
  name: string
  email: string
  role: UserRole
  designatedPicker?: boolean
  accountOwner?: boolean
  token?: string
  lastLoggedIn?: string
  passwordAge?: string
  mfaStatus?: string
  ipRestriction?: string
}

export interface IUserResponse {
  id: string
  name: string
  email: string
  role: UserRole
  designatedPicker?: boolean
  accountOwner?: boolean
  lastLoggedIn?: string
  passwordAge?: string
  mfaStatus?: string
  ipRestriction?: string
}

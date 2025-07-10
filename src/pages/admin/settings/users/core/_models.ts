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

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  SELLER = "SELLER",
}

export interface IUserModel {
  _id: string
  name: string
  email: string
  role: UserRole
  designatedPicker?: boolean
  accountOwner?: boolean
  token?: string
  lastLogin?: string
  passwordAge?: string
  mfaStatus?: string
  ipRestriction?: string
}

export interface IUserResponse {
  data: IUserModel[]
  limit: number
  page: number
  total: number
}

export interface ISingleUserResponse {
  user: IUserModel
}

export interface IGetAllUsersResponse {
  data: IUserModel[]
  total: number
  page: number
  limit: number
}

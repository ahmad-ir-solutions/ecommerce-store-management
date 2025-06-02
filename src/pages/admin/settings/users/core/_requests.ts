import authApi from "@/lib/axios"
import {
    IAuthResponse,
    IRegisterResponse,
  type IUserResponse,
  RegisterFormData,
  UserRole,
} from "./_models"

const REGISTER_URL = "/user/signup"
const ADD_USER_URL = "/user/add"
const GET_ALL_USERS_URL = "/user/all"
const DELETE_USER_URL = "/user"
const UPDATE_USER_URL = "/user"
const GET_USER_URL = "/user"

export function register(body: RegisterFormData) {
  const registerData = {
    ...body,
    role: UserRole.USER,
  }
  return authApi.post<IRegisterResponse>(REGISTER_URL, registerData)
}

export function getAllUsers() {
  return authApi.get<{ users: IUserResponse[] }>(GET_ALL_USERS_URL)
}

export function addUser(body: any) {
  return authApi.post<IAuthResponse>(ADD_USER_URL, body)
}

export function updateUser(userId: string, body: any) {
  return authApi.patch<IAuthResponse>(`${UPDATE_USER_URL}/${userId}`, body)
}

export function getUserById(userId: string) {
  return authApi.get<{ user: IUserResponse }>(`${GET_USER_URL}/${userId}`)
}

export function deleteUser(userId: string) {
  return authApi.delete<IAuthResponse>(`${DELETE_USER_URL}/${userId}`)
}

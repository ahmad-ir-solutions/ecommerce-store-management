import authApi from "@/lib/axios"
import {
  type  IAuthResponse,
  type IGetAllUsersResponse,
  type IUserModel,
} from "./_models"

const GET_ALL_USERS_URL = "/user/all"
const ADD_USER_URL = "/auth/signup"
const DELETE_USER_URL = "/user"
const UPDATE_USER_URL = "/user"
const GET_USER_URL = "/user"

export function getAllUsers() {
  return authApi.get<{ data: IGetAllUsersResponse }>(GET_ALL_USERS_URL)
}

export function addUser(body: any) {
  return authApi.post<IAuthResponse>(ADD_USER_URL, body)
}

export function updateUser(userId: string, body: any) {
  return authApi.patch<IAuthResponse>(`${UPDATE_USER_URL}/${userId}`, body)
}

export function getUserById(userId: string) {
  return authApi.get<IUserModel>(`${GET_USER_URL}/${userId}`)
}

export function deleteUser(userId: string) {
  return authApi.delete<IAuthResponse>(`${DELETE_USER_URL}/${userId}`)
}

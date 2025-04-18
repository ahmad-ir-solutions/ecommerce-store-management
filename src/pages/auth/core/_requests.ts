import authApi from '../../../lib/axios';
import { ForgotPasswordFormData, IAuthResponse, IRegisterResponse, LoginFormData, OTPFormData, RegisterFormData, ResetPasswordFormData, IUserResponse, UserRole } from './_models';

const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/signup';
const FORGOT_PASSWORD_URL = '/user/forgot-password';
const VERIFY_OTP='/user/verify-otp';
const RESET_PASS_CODE = '/user/reset-password';
const LOGOUT_URL = '/auth/logout';
const GET_USER_URL = '/user';

export function login(body: LoginFormData) {
  return authApi.post<IAuthResponse>(LOGIN_URL, body);
}

export function register(body: RegisterFormData) {
  const registerData = {
    ...body,
    role: UserRole.USER, 
  };
  return authApi.post<IRegisterResponse>(REGISTER_URL, registerData);
}

export function getUser() {
  return authApi.get<IUserResponse>(GET_USER_URL);
}

export function forgetPassword(body: ForgotPasswordFormData) {
  return authApi.post<IAuthResponse>(FORGOT_PASSWORD_URL, body);
}

export function verifyOtp(body: OTPFormData) {
  console.log(body,"body");
  
  return authApi.post<IAuthResponse>(VERIFY_OTP, body);
}

export function resetPassword(body: ResetPasswordFormData) {
  return authApi.post<IAuthResponse>(RESET_PASS_CODE, body);
}

export function logout() {
  return authApi.post(LOGOUT_URL);
}
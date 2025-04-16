import api from '../../../services/api';
import authApi from '../../../lib/axios';

import { IAuthModel, IForgotPasswordForm, ISignUpForm, LoginFormData, OTPFormData, ResetPasswordFormData } from './_models';

const LOGIN_URL = '/auth/login';
const REGISTER_URL = '/auth/signup';
const FORGOT_PASSWORD_URL = '/user/forgot-password';
const VERIFY_OTP='/user/verify-otp';
const VERIFY_TOKEN_URL = '/auth/verify-token';
const RESET_PASS_CODE = '/user/reset-password';

export function login(body: LoginFormData) {
  return authApi.post<IAuthModel>(LOGIN_URL, body);
}

export function register(body: ISignUpForm) {
  return authApi.post<IAuthModel>(REGISTER_URL, body);
}
export function forgetPassword(body: IForgotPasswordForm) {
  return authApi.post<IAuthModel>(FORGOT_PASSWORD_URL, body);
}

export function verify(body: OTPFormData) {
  return authApi.post<IAuthModel>(VERIFY_OTP, body);
}

export function resetPassword(body: ResetPasswordFormData) {
  return authApi.post<IAuthModel>(RESET_PASS_CODE, body);
}
export function getUserByToken(token: string) {
  return api.post(
    VERIFY_TOKEN_URL,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
}


// Logout user
export const logoutUser = async (): Promise<void> => {
  // In a real app, this would call the logout endpoint
  // await axios.post(`${API_URL}/auth/logout`);

  // For now, we'll just simulate a successful logout
  return Promise.resolve()
}
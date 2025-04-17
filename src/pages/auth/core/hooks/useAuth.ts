import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { login, register, forgetPassword, verifyOtp, resetPassword, logout } from '../_requests';
import { showSuccessMessage, showErrorMessage } from '@/lib/utils/messageUtils';
import { useNavigate } from 'react-router-dom';
import { LoginFormData, OTPFormData, ResetPasswordFormData, RegisterFormData, ForgotPasswordFormData, IAuthModel } from '../_models';
import { AxiosError } from 'axios';

export const useLogin = () => {
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: (res: { data: IAuthModel }) => {
      const { user, token, message } = res.data.data;
      setUser(user);
      setToken(token);
      showSuccessMessage(message ? message.toString() : 'Login successful!');
      navigate('/dashboard');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  });
};

export const useRegister = () => {
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterFormData) => register(data),
    onSuccess: (res: { data: IAuthModel }) => {
      const { user, token, message } = res.data.data;
      setUser(user);
      setToken(token);
      showSuccessMessage(message ? message.toString() : 'Registration successful!');
      navigate('/dashboard');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordFormData) => forgetPassword(data),
    onSuccess: (res: { data: IAuthModel }) => {
      showSuccessMessage(res.data.data.message?.toString() || 'Password reset instructions sent to your email.');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || 'Failed to send reset instructions. Please try again.');
    }
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: (data: OTPFormData) => verifyOtp(data),
    onSuccess: (res: { data: IAuthModel }) => {
      showSuccessMessage(res.data.data.message?.toString() || 'OTP verified successfully.');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || 'OTP verification failed. Please try again.');
    }
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordFormData) => resetPassword(data),
    onSuccess: (res: { data: IAuthModel }) => {
      showSuccessMessage(res.data.data.message?.toString() || 'Password reset successfully.');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || 'Password reset failed. Please try again.');
    }
  });
};

export const useLogout = () => {
  const { logout: logoutStore } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      logoutStore();
      showSuccessMessage('Logged out successfully.');
      navigate('/auth/login');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || 'Logout failed. Please try again.');
    }
  });
};

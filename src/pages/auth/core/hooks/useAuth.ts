import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/authStore';
import { login, register, forgetPassword, verifyOtp, resetPassword, logout, getUser } from '../_requests';
import { showSuccessMessage, showErrorMessage } from '@/lib/utils/messageUtils';
import { useNavigate } from 'react-router-dom';
import { LoginFormData, OTPFormData, ResetPasswordFormData, RegisterFormData, ForgotPasswordFormData, UserRole, IUserModel } from '../_models';
import { AxiosError } from 'axios';

export const useLogin = () => {
  const { setUser, setToken } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginFormData) => login(data),
    onSuccess: async (response) => {
      const { token, message } = response.data;
      
      if (!token) {
        showErrorMessage('Missing token in response');
        return;
      }

      // First set the token so subsequent requests can use it
      setToken(token);

      try {
        // Fetch user data
        const userResponse = await getUser();
        const userData = userResponse.data;

        // Add token to user data
        const userInfo: IUserModel = {
          ...userData,
          token
        };

        setUser(userInfo);
        showSuccessMessage(message || 'Login successful!');
        
        // Redirect based on user role
        const dashboardPath = userData.role === UserRole.ADMIN ? '/admin/dashboard' : '/seller/products';
        navigate(dashboardPath);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        showErrorMessage('Failed to fetch user data');
        setToken('');
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || 'Login failed. Please try again.');
    }
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterFormData) => register(data),
    onSuccess: (response) => {
      const { message } = response.data;
      showSuccessMessage(message || 'Registration successful! Please login.');
      navigate('/auth/login');
    },
    onError: (error: AxiosError<{ message: string; errors?: { [key: string]: string } }>) => {
      if (error.response?.data.errors) {
        // Show all validation errors
        Object.values(error.response.data.errors).forEach(errorMessage => {
          showErrorMessage(errorMessage);
        });
      } else {
        showErrorMessage(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  });
};

export const useForgotPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: ForgotPasswordFormData) => forgetPassword(data),
    onSuccess: (response) => {
      navigate('/auth/verification');
      showSuccessMessage(response.data.message || 'Password reset instructions sent to your email.');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || 'Failed to send reset instructions. Please try again.');
    }
  });
};

export const useVerifyOtp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: OTPFormData) => verifyOtp(data),
    onSuccess: (response) => {
      showSuccessMessage(response.data.message || 'OTP verified successfully.');
      navigate('/auth/reset-password');
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || 'OTP verification failed. Please try again.');
    }
  });
};

export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: ResetPasswordFormData) => resetPassword(data),
    onSuccess: (response) => {
      showSuccessMessage(response.data.message || 'Password reset successfully.');
      navigate('/auth/login');
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

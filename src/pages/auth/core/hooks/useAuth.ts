import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/store/userStore';
import { login, register } from '../_requests';
import { showSuccessMessage } from '@/lib/utils/messageUtils';

export const useLogin = () => {
  const { setUser, setToken } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { user, token, message } = res.data;
      console.log('User:', user);
  console.log('Token:', token);
  console.log('Message:', message);
      // showSuccessMessage(res.data.message || 'Login successful!');
      // setUser(res.data.user);
      // setToken(res.data.token);
    },
  });
};

// export const useRegister = () => {
//   const { setUser, setToken } = useAuthStore();

//   return useMutation({
//     mutationFn: register,
//     onSuccess: (res) => {
//       setUser(res.data.user);
//       setToken(res.data.token);
//     },
//   });
// };

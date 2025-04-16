import { IUserModel } from '@/pages/auth/core/_models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  user: IUserModel | null;
  token: string | null;
  setUser: (user: IUserModel) => void;
  setToken: (token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage', // key in localStorage
      partialize: (state) => ({ token: state.token, user: state.user }), // persist only these
    }
  )
);

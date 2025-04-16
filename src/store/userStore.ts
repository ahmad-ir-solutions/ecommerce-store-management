// import { create } from 'zustand';

// type User = {
//   id: string;
//   email: string;
//   name: string;
//   role: string;
// };

// type AuthState = {
//   user: User | null;
//   token: string | null;
//   setUser: (user: User) => void;
//   setToken: (token: string) => void;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,
//   token: null,
//   setUser: (user) => set({ user }),
//   setToken: (token) => set({ token }),
//   logout: () => set({ user: null, token: null }),
// }));



import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
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

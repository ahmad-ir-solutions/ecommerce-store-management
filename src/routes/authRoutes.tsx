// src/routes/authRoutes.tsx
import { lazy } from "react";
import AuthLayout from "@/layouts/auth-layout";
import WithSuspense from "@/routes/withSuspense";
import { PublicRoute } from "./PublicRoute";

const LoginPage = lazy(() => import("@/pages/auth/pages/login"));
const RegisterPage = lazy(() => import("@/pages/auth/pages/register"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/pages/reset-password/forgot-password"));
const VerificationPage = lazy(() => import("@/pages/auth/pages/reset-password/verification"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/pages/reset-password/reset-password"));

export const authRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { 
      path: "auth/login", 
      element: <PublicRoute><WithSuspense><LoginPage /></WithSuspense></PublicRoute> 
    },
    { 
      path: "auth/register", 
      element: <PublicRoute><WithSuspense><RegisterPage /></WithSuspense></PublicRoute> 
    },
    { 
      path: "auth/forgot-password", 
      element: <PublicRoute><WithSuspense><ForgotPasswordPage /></WithSuspense></PublicRoute> 
    },
    { 
      path: "auth/verification", 
      element: <PublicRoute><WithSuspense><VerificationPage /></WithSuspense></PublicRoute> 
    },
    { 
      path: "auth/reset-password", 
      element: <PublicRoute><WithSuspense><ResetPasswordPage /></WithSuspense></PublicRoute> 
    },
  ],
};

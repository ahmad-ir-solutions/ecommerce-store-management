// src/routes/authRoutes.tsx
import { lazy } from "react";
import AuthLayout from "@/layouts/auth-layout";
import WithSuspense from "@/routes/withSuspense";

const LoginPage = lazy(() => import("@/pages/auth/pages/login"));
const RegisterPage = lazy(() => import("@/pages/auth/pages/register"));
const ForgotPasswordPage = lazy(() => import("@/pages/auth/pages/reset-password/forgot-password"));
const VerificationPage = lazy(() => import("@/pages/auth/pages/reset-password/verification"));
const ResetPasswordPage = lazy(() => import("@/pages/auth/pages/reset-password/reset-password"));

export const authRoutes = {
  path: "/",
  element: <AuthLayout />,
  children: [
    { path: "auth/login", element: <WithSuspense><LoginPage /></WithSuspense> },
    { path: "auth/register", element: <WithSuspense><RegisterPage /></WithSuspense> },
    { path: "auth/forgot-password", element: <WithSuspense><ForgotPasswordPage /></WithSuspense> },
    { path: "auth/verification", element: <WithSuspense><VerificationPage /></WithSuspense> },
    { path: "auth/reset-password", element: <WithSuspense><ResetPasswordPage /></WithSuspense> },
  ],
};

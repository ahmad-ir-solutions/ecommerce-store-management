// src/routes/mainRoutes.tsx
import MainLayout from "@/layouts/seller-layout";
import { Navigate } from "react-router-dom";

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    { index: true, element: <Navigate to="auth/login" replace /> },
    { path: "unauthorized", element: <div>You are not authorized to access this page</div> },
  ],
};

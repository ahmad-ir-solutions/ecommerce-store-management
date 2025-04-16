// src/routes/sellerRoutes.tsx
import { lazy } from "react";
import MainLayout from "@/layouts/main-layout";
import WithSuspense from "@/routes/withSuspense";
// import { ProtectedRoute } from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

const SellerDashboardPage = lazy(() => import("@/pages/seller/dashboard"));

export const sellerRoutes = {
  path: "/seller",
  element: (
    // <ProtectedRoute allowedRoles={["seller"]}>
      <MainLayout />
    // </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to="/seller/dashboard" replace /> },
    { path: "dashboard", element: <WithSuspense><SellerDashboardPage /></WithSuspense> },
    // { path: "seller/products", element: <WithSuspense><SellerProductsPage /></WithSuspense> },
  ],
};

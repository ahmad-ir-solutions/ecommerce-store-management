import { lazy } from "react";
import AdminLayout from "@/layouts/admin-layout";
import WithSuspense from "@/routes/withSuspense";
// import { ProtectedRoute } from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

const AdminDashboardPage = lazy(() => import("@/pages/admin/dashboard").then(module => ({ default: module.AdminDashboardPage })));
          
export const adminRoutes = {
  path: "/admin",
  element: (
    // <ProtectedRoute allowedRoles={["admin"]}>
      <AdminLayout />
    // </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to="/admin/dashboard" replace /> },
    { path: "dashboard", element: <WithSuspense><AdminDashboardPage /></WithSuspense> },
  ],
};

import { lazy } from "react";
import AdminLayout from "@/layouts/admin-layout";
import WithSuspense from "@/routes/withSuspense";
import { ProtectedRoute } from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

// Lazy load all admin pages
const AdminDashboardPage = lazy(() => import("@/pages/admin/dashboard").then(module => ({ default: module.AdminDashboardPage })));
const ManageOrderPage = lazy(() => import("@/pages/admin/orders/pages/manage").then(module => ({ default: module.ManageOrderPage })));
const OrdersCsvPage = lazy(() => import("@/pages/admin/orders/pages/csv").then(module => ({ default: module.OrdersCsvPage })));
const AdminCustomersPage = lazy(() => import("@/pages/admin/customers").then(module => ({ default: module.AdminCustomersPage })));
const PickingPage = lazy(() => import("@/pages/admin/warehouse/pages/picking").then(module => ({ default: module.PickingPage })));
const DeliveriesPage = lazy(() => import("@/pages/admin/warehouse/pages/deliveries").then(module => ({ default: module.DeliveriesPage })));
const ManifestsPage = lazy(() => import("@/pages/admin/warehouse/pages/manifests").then(module => ({ default: module.ManifestsPage })));
const SuppliersPage = lazy(() => import("@/pages/admin/products/pages/suppliers").then(module => ({ default: module.SuppliersPage })));
const ProductsCsvPage = lazy(() => import("@/pages/admin/products/pages/csv").then(module => ({ default: module.ProductsCsvPage })));
          
export const adminRoutes = {
  path: "/admin",
  element: (
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    // Redirect root /admin to dashboard
    { index: true, element: <Navigate to="/admin/dashboard" replace /> },
    { path: "dashboard", element: <WithSuspense><AdminDashboardPage /></WithSuspense> },
    
    // Orders routes
    { 
      path: "orders",
      children: [
        // Redirect /admin/orders to /admin/orders/manage
        { index: true, element: <Navigate to="/admin/orders/manage" replace /> },
        { path: "manage", element: <WithSuspense><ManageOrderPage /></WithSuspense> },
        { path: "csv", element: <WithSuspense><OrdersCsvPage /></WithSuspense> },
      ]
    },
    
    // Customers route
    { path: "customers", element: <WithSuspense><AdminCustomersPage /></WithSuspense> },
    
    // Warehouse routes
    {
      path: "warehouse",
      children: [
        // Redirect /admin/warehouse to /admin/warehouse/picking
        { index: true, element: <Navigate to="/admin/warehouse/picking" replace /> },
        { path: "picking", element: <WithSuspense><PickingPage /></WithSuspense> },
        { path: "deliveries", element: <WithSuspense><DeliveriesPage /></WithSuspense> },
        { path: "manifests", element: <WithSuspense><ManifestsPage /></WithSuspense> },
      ]
    },
    
    // Products routes
    {
      path: "products",
      children: [
        // Redirect /admin/products to /admin/products/suppliers
        { index: true, element: <Navigate to="/admin/products/suppliers" replace /> },
        { path: "suppliers", element: <WithSuspense><SuppliersPage /></WithSuspense> },
        { path: "csv", element: <WithSuspense><ProductsCsvPage /></WithSuspense> },
      ]
    },
  ],
};

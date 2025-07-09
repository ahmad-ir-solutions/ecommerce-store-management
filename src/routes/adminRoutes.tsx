import { lazy } from "react";
import { Navigate } from "react-router-dom";
import AdminLayout from "@/layouts/admin-layout";
import WithSuspense from "@/routes/withSuspense";
import { ProtectedRoute } from "./ProtectedRoute";

// Lazy load all admin pages
const AdminDashboardPage = lazy(() => import("@/pages/admin/dashboard").then(module => ({ default: module.AdminDashboardPage })));
const ManageOrderPage = lazy(() => import("@/pages/admin/orders").then(module => ({ default: module.ManageOrderPage })));
const AddOrderPage = lazy(() => import("@/pages/admin/orders").then(module => ({ default: module.AddOrderPage })));
const OrdersCsvPage = lazy(() => import("@/pages/admin/orders").then(module => ({ default: module.OrdersCsvPage })));
const EditOrderPage = lazy(() => import("@/pages/admin/orders").then(module => ({ default: module.EditOrderPage })));
const AdminCustomersPage = lazy(() => import("@/pages/admin/customers").then(module => ({ default: module.AdminCustomersPage })));
const AddCustomerPage = lazy(() => import("@/pages/admin/customers/pages/add-customer").then(module => ({ default: module.AddCustomerPage })));
const CustomerDetails = lazy(() => import("@/pages/admin/customers/pages/customer-details").then(module => ({ default: module.CustomerDetails })));
const PickwavePage = lazy(() => import("@/pages/admin/warehouse/pages/pickwave").then(module => ({ default: module.PickwavePage })));
const EditPickwaveDetailsPage = lazy(() => import("@/pages/admin/warehouse/pages/edit-pickwave-details").then(module => ({ default: module.EditPickwaveDetailsPage })));
const UpdateTrackingNumberPage = lazy(() => import("@/pages/admin/warehouse/pages/update-tracking-number").then(module => ({ default: module.UpdateTrackingNumberPage })));
const DeliveriesPage = lazy(() => import("@/pages/admin/warehouse/pages/deliveries").then(module => ({ default: module.DeliveriesPage })));
const ManifestsPage = lazy(() => import("@/pages/admin/warehouse/pages/manifests").then(module => ({ default: module.ManifestsPage })));
const AllProductsPage = lazy(() => import("@/pages/admin/products/pages/all-products").then(module => ({ default: module.AllProductsPage })));
const SuppliersPage = lazy(() => import("@/pages/admin/products/pages/suppliers").then(module => ({ default: module.SuppliersPage })));
const AddSupplierPage = lazy(() => import("@/pages/admin/products/pages/add-supplier").then(module => ({ default: module.AddSupplierPage })));
const SupplierDetailsPage = lazy(() => import("@/pages/admin/products/pages/supplier-details").then(module => ({ default: module.SupplierDetailsPage })));
const ProductsCsvPage = lazy(() => import("@/pages/admin/products/pages/csv").then(module => ({ default: module.ProductsCsvPage })));
const ProductDetailsPage = lazy(() => import("@/pages/admin/products/pages/product-details").then(module => ({ default: module.ProductDetailsPage })));
const CompanyPage = lazy(() => import("@/pages/admin/settings/company/pages/company").then(module => ({ default: module.CompanyPage })));
const AddCompany = lazy(() => import("@/pages/admin/settings/company/pages/add-company").then(module => ({ default: module.AddCompany })));
const EditCompanyDetails = lazy(() => import("@/pages/admin/settings/company/pages/edit-company-details").then(module => ({ default: module.EditCompanyDetails })));
const ExistingUsers = lazy(() => import("@/pages/admin/settings/users/pages/existing-users").then(module => ({ default: module.ExistingUsers })));
const AddUser = lazy(() => import("@/pages/admin/settings/users/pages/add-user").then(module => ({ default: module.AddUser })));
const EditUserDetails = lazy(() => import("@/pages/admin/settings/users/pages/edit-user-details").then(module => ({ default: module.EditUserDetails })));
const IntegrationPage = lazy(() => import("@/pages/admin/settings/integrations/pages/integration").then(module => ({ default: module.IntegrationPage })));
const ExistingWarehouse = lazy(() => import("@/pages/admin/settings/warehouse/pages/existing-warehouse").then(module => ({ default: module.ExistingWarehouse })));
const EditWarehouseDetails = lazy(() => import('@/pages/admin/settings/warehouse/pages/edit-warehouse-details').then(module => ({ default: module.EditWarehouseDetails })));
const AddWarehouse = lazy(() => import('@/pages/admin/settings/warehouse/pages/add-warehouse').then(module => ({ default: module.AddWarehouse })));
const EditCourierDetails = lazy(() => import("@/pages/admin/settings/integrations/pages/edit-courier-details").then(module => ({ default: module.EditCourierDetails })));
const EditPaymentGatewaysDetail = lazy(() => import("@/pages/admin/settings/integrations/pages/edit-payment-gateways-details").then(module => ({ default: module.EditPaymentGatewaysDetail })));

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
        { path: "add-order", element: <WithSuspense><AddOrderPage /></WithSuspense> },
        { path: "csv", element: <WithSuspense><OrdersCsvPage /></WithSuspense> },
        // Dynamic order route
        { path: "edit-order/:orderId", element: <WithSuspense><EditOrderPage /></WithSuspense> },
      ]
    },

    // Customers route
    { path: "customers", element: <WithSuspense><AdminCustomersPage /></WithSuspense> },
    // Dynamic customer route
    { path: "customer-details/:customerId", element: <WithSuspense><CustomerDetails /></WithSuspense> },
    { path: "customers/add-customer", element: <WithSuspense><AddCustomerPage /></WithSuspense> },

    // Warehouse routes
    {
      path: "warehouse",
      children: [
        // Redirect /admin/warehouse to /admin/warehouse/pickwave
        { index: true, element: <Navigate to="/admin/warehouse/pickwave" replace /> },
        { path: "pickwave", element: <WithSuspense><PickwavePage /></WithSuspense> },
        { path: "deliveries", element: <WithSuspense><DeliveriesPage /></WithSuspense> },
        { path: "manifests", element: <WithSuspense><ManifestsPage /></WithSuspense> },
        { path: "edit-pickwave-details/:pickwaveId", element: <WithSuspense><EditPickwaveDetailsPage /></WithSuspense> },
        { path: "update-tracking-number/:trackingId", element: <WithSuspense><UpdateTrackingNumberPage /></WithSuspense> },
      ]
    },

    // Products routes
    {
      path: "products",
      children: [
        // Redirect /admin/products to /admin/products/suppliers
        { index: true, element: <Navigate to="/admin/products/all-products" replace /> },
        { path: "all-products", element: <WithSuspense><AllProductsPage /></WithSuspense> },
        { path: "suppliers", element: <WithSuspense><SuppliersPage /></WithSuspense> },
        { path: "csv", element: <WithSuspense><ProductsCsvPage /></WithSuspense> },
        { path: "add-supplier", element: <WithSuspense><AddSupplierPage /></WithSuspense> },
        // Dynamic product route
        { path: ":productId", element: <WithSuspense><ProductDetailsPage /></WithSuspense> },
        { path: "supplier-details/:supplierId", element: <WithSuspense><SupplierDetailsPage /></WithSuspense> },
      ]
    },

    // settings routes
    {
      path: "settings",
      children: [
        // Redirect /admin/settings to /admin/settings/company
        { index: true, element: <Navigate to="/admin/settings/company" replace /> },
        { path: "company", element: <WithSuspense><CompanyPage /></WithSuspense> },
        { path: "company/edit-company-details/:companyId", element: <WithSuspense><EditCompanyDetails /></WithSuspense> },
        { path: "company/add-company", element: <WithSuspense><AddCompany /></WithSuspense> },
        { path: "users", element: <WithSuspense><ExistingUsers /></WithSuspense> },
        { path: "users/add-user", element: <WithSuspense><AddUser /></WithSuspense> },
        { path: "users/edit-user-details/:userId", element: <WithSuspense><EditUserDetails /></WithSuspense> },
        { path: "integrations", element: <WithSuspense><IntegrationPage /></WithSuspense> },
        { path: "warehouse", element: <WithSuspense><ExistingWarehouse /></WithSuspense> },
        { path: "warehouse/edit-warehouse-details/:warehouseId", element: <WithSuspense><EditWarehouseDetails /></WithSuspense> },
        { path: "warehouse/add-warehouse", element: <WithSuspense><AddWarehouse /></WithSuspense> },
        { path: "integrations/edit-courier-details/:courierId", element: <WithSuspense><EditCourierDetails /></WithSuspense> },
        { path: "integrations/edit-payment-gateways-details/:paymentGatewaysId", element: <WithSuspense><EditPaymentGatewaysDetail /></WithSuspense> },
      ]
    },
  ],
};

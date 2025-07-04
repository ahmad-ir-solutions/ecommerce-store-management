import { lazy } from "react";
import MainLayout from "@/layouts/seller-layout";
import WithSuspense from "@/routes/withSuspense";
import { ProtectedRoute } from "./ProtectedRoute";
import { Navigate } from "react-router-dom";

// Lazy load all seller pages
const SellerProductsPage = lazy(() => import("@/pages/seller/products/pages/master-product").then(module => ({ default: module.SellerProductsPage })));
const EditProductInfoPage = lazy(() => import("@/pages/seller/products/pages/edit-product-info").then(module => ({ default: module.EditProductInfoPage })));
const AddProductPage = lazy(() => import("@/pages/seller/products/pages/add-product").then(module => ({ default: module.AddProductPage })));
// const ProductDetailsPage = lazy(() => import("@/pages/seller/products/pages/product-details").then(module => ({ default: module.ProductDetailsPage })));

const SellerListingsPage = lazy(() => import("@/pages/seller/listings/pages/listing").then(module => ({ default: module.SellerListingsPage })));
const EditListingInfoPage = lazy(() => import("@/pages/seller/listings/pages/edit-listing-info").then(module => ({ default: module.EditListingInfoPage })));

const SellerOrdersPage = lazy(() => import("@/pages/seller/orders/pages/order").then(module => ({ default: module.SellerOrdersPage })));
const FulfilmentOrderDetailsPage = lazy(() => import("@/pages/seller/orders/pages/fulfilment-order-details").then(module => ({ default: module.FulfilmentOrderDetailsPage })));

const SellerPaymentPage = lazy(() => import("@/pages/seller/payments/pages/payment").then(module => ({ default: module.SellerPaymentPage })));

const SellerShopsPage = lazy(() => import("@/pages/seller/shops/pages/shop").then(module => ({ default: module.SellerShopsPage })));
const EditMarketplaceDetails = lazy(() => import("@/pages/seller/shops/pages/edit-marketplace-details").then(module => ({ default: module.EditMarketplaceDetails })));
const EditWebstoreDetails = lazy(() => import("@/pages/seller/shops/pages/edit-webstore-details").then(module => ({ default: module.EditWebstoreDetails })));

const BillingPage = lazy(() => import("@/pages/seller/billing").then(module => ({ default: module.BillingPage })));

const ProfileSettingsPage = lazy(() => import("@/pages/seller/settings/pages/profile-settings"));

const PaymentSettingsPage = lazy(() => import("@/pages/seller/settings/pages/payment-settings"));

export const sellerRoutes = {
  path: "/seller",
  element: (
    <ProtectedRoute allowedRoles={["USER"]}>
      <MainLayout />
    </ProtectedRoute>
  ),
  
  children: [
    // Products routes
    { index: true, element: <Navigate to="products" replace /> },
    {
      path: "products",
      children: [
        { index: true, element: <WithSuspense><SellerProductsPage /></WithSuspense> },
        { path: "add-list", element: <WithSuspense><AddProductPage /></WithSuspense> },
        { path: "edit-product-info/:productId", element: <WithSuspense><EditProductInfoPage /></WithSuspense> },
        // { path: ":productId", element: <WithSuspense><ProductDetailsPage /></WithSuspense> },
      ]
    },

    // Listings routes
    {
      path: "listings",
      children: [
        { index: true, element: <WithSuspense><SellerListingsPage /></WithSuspense> },
        { path: "edit-listing-info/:listingId", element: <WithSuspense><EditListingInfoPage /></WithSuspense> },
      ]
    },

    // Orders routes
    {
      path: "orders",
      children: [
        { index: true, element: <WithSuspense><SellerOrdersPage /></WithSuspense> },
        { path: "fulfilment-order-details/:orderId", element: <WithSuspense><FulfilmentOrderDetailsPage /></WithSuspense> },
      ]
    },

    // Shop routes
    {
      path: "shops",
      children: [
        { index: true, element: <WithSuspense><SellerShopsPage /></WithSuspense> },
        { path: "edit-marketplace/:marketplaceId", element: <WithSuspense><EditMarketplaceDetails /></WithSuspense> },
        { path: "edit-webstore/:webstoreId", element: <WithSuspense><EditWebstoreDetails /></WithSuspense> },
      ]
    },

    // payment routes
    {
      path: "payments",
      children: [
        { index: true, element: <WithSuspense><SellerPaymentPage /></WithSuspense> },
      ]
    },

    // Billing routes
    {
      path: "billing",
      children: [
        { index: true, element: <WithSuspense><BillingPage /></WithSuspense> },
      ]
    },

    // Settings routes
    {
      path: "settings",
      children: [
        { path: "profile", element: <WithSuspense><ProfileSettingsPage /></WithSuspense> },
        { path: "payment", element: <WithSuspense><PaymentSettingsPage /></WithSuspense> },
      ]
    },
  ],
};

// src/routes/index.tsx
import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "@/pages/PageNotFound";
import { authRoutes } from "./authRoutes";
import { adminRoutes } from "./adminRoutes";
import { sellerRoutes } from "./sellerRoutes";
import { mainRoutes } from "./mainRoutes";

export const router = createBrowserRouter([
  mainRoutes,
  authRoutes,
  adminRoutes,
  sellerRoutes,
  { path: "*", element: <NotFoundPage /> },
]);

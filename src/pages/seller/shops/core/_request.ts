// requests/ecommerce/woocommerce.api.ts
import authApi from "@/lib/axios";

// POST: Create Account Connection
export function createAccountConnection(data: { profileName: string; integrationType: string, platformType: string, isActive: boolean }) {
  return authApi.post("/account-connection/create-connection", data);
}

// GET: Generate WooCommerce URL
export function generateWoocommerceUrl(site_url: string, account_creation_id: string) {
  return authApi.get(`/account-connection/generate-woocommerce-url`, {
    params: { site_url, account_creation_id },
  });
}

// GET: Get Connected Accounts
export function getConnectedAccounts() {
  return authApi.get("/account-connection/woocommerce-accounts");
}

// GET: Get connected Account
export function getConnectedAccount(id: string) {
  return authApi.get(`/account-connection/woocommerce-account/${id}`);
}

// PATCH: Update Account Connection
export function updateAccountConnection(id: string, data: Partial<any>) {
  return authApi.patch(`/account-connection/update-connection/${id}`, data);
}

// Generate Woocommerce account connection url 
type WoocommerceURLParams = {
  site_url: string;
  account_creation_id: string;
}

// Generate Woocommerce account connection url 
export function getWoocommerceConnectUrl(params: WoocommerceURLParams) {
  return authApi.get("/account-connection/generate-woocommerce-url", {
    params,
  });
}
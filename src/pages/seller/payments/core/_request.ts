// stripeApi.ts
import authApi from '@/lib/axios';

export function createSetupIntent() {
  return authApi.post(`/stripe/setup-intent`);
}

export function chargeCard(data: {
  amount: number;
  customerId?: string;
  paymentMethodId?: string;
  metadata?: Record<string, string>;
}) {
  return authApi.post(`/stripe/charge`, data);
}

export function setDefaultCard(data: {
  customerId?: string;
  paymentMethodId: string;
}) {
  return authApi.post(`/stripe/set-default-card`, data);
}

export function getSavedCards() {
  return authApi.get(`/stripe/saved-cards`);
}

export function deleteCard(data: { paymentMethodId: string }) {
  return authApi.delete(`/stripe/delete-card`, { data });
}

export function getAvailableBalance() {
  return authApi.get(`/user/balance`);
}
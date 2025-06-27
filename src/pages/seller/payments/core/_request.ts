// stripeApi.ts
import authApi from '@/lib/axios';

const STRIPE_BASE = '/stripe';

export function createSetupIntent() {
  return authApi.post(`/${STRIPE_BASE}/setup-intent`);
}

export function chargeCard(data: {
  amount: number;
  customerId?: string;
  paymentMethodId?: string;
  metadata?: Record<string, string>;
}) {
  return authApi.post(`/${STRIPE_BASE}/charge`, data);
}

export function setDefaultCard(data: {
  customerId?: string;
  paymentMethodId: string;
}) {
  return authApi.post(`/${STRIPE_BASE}/set-default-card`, data);
}

export function getSavedCards() {
  return authApi.get(`/${STRIPE_BASE}/saved-cards`);
}

export function deleteCard(data: { paymentMethodId: string }) {
  return authApi.post(`/${STRIPE_BASE}/delete-card`, data); // POST instead of DELETE if backend expects payload
}

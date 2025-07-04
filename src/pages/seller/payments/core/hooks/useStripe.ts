// stripe.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils";
import type { AxiosError } from "axios";
import { chargeCard, createSetupIntent, deleteCard, getAvailableBalance, getSavedCards, setDefaultCard } from "../_request";
import { Stripe, StripeElements } from "@stripe/stripe-js";

// Query keys
export const stripeKeys = {
  all: ["stripe"] as const,
  savedCards: () => [...stripeKeys.all, "saved-cards"] as const,
};

// Create Setup Intent

interface SetupIntentParams {
  stripe: Stripe
  elements: StripeElements
  cardholderName: string
  agreeToTerms: boolean
  onSuccess?: () => void
}

export const useSetupIntentConfirm = () => {
  return useMutation({
    mutationFn: async ({ stripe, elements, cardholderName, agreeToTerms, onSuccess }: SetupIntentParams) => {
      if (!stripe || !elements) throw new Error("Stripe not loaded")
      if (!agreeToTerms) throw new Error("Please agree to the terms of service")
      if (!cardholderName.trim()) throw new Error("Cardholder name is required")

      const cardElement = elements.getElement("card")
      if (!cardElement) throw new Error("Card element not found")

      // 1. Call backend for client secret
      const response = await createSetupIntent()

      const { clientSecret } = response.data
      if (!clientSecret) throw new Error("No client secret received")

      // 2. Confirm card setup
      const result = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: cardholderName },
        },
      })

      if (result.error) throw new Error(result.error.message)

      // Optional callback on success
      onSuccess?.()

      return result
    },

    onSuccess: () => {
      showSuccessMessage("Card saved successfully!")
    },

    onError: (err: any) => {
      showErrorMessage(err.message || "Failed to save card")
    },
  })
}

// Charge Card
export const useChargeCard = () => {
  return useMutation({
    mutationFn: chargeCard,
    onSuccess: (res) => {
      console.log(res);
      showSuccessMessage("Payment successful");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to charge card");
    },
  });
};

// Set Default Card
export const useSetDefaultCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: setDefaultCard,
    onSuccess: () => {
      showSuccessMessage("Default card updated");
      queryClient.invalidateQueries({ queryKey: stripeKeys.savedCards() });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to set default card");
    },
  });
};

// Get Saved Cards
export const useGetSavedCards = () => {
  return useQuery({
    queryKey: stripeKeys.savedCards(),
    queryFn: getSavedCards,
    select: (res) => res.data,
  });
};

// Delete Card
export const useDeleteCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCard,
    onSuccess: () => {
      showSuccessMessage("Card deleted successfully");
      queryClient.invalidateQueries({ queryKey: stripeKeys.savedCards() });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to delete card");
    },
  });
};

// Get Available Balance
export const useGetAvailableBalance = () => {
  return useQuery({
    queryKey: ["available-balance"],
    queryFn: getAvailableBalance,
    select: (res) => res.data,
    refetchOnWindowFocus: true,
  });
};
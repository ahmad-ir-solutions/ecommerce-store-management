// stripe.hooks.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils";
import type { AxiosError } from "axios";
import { chargeCard, createSetupIntent, deleteCard, getSavedCards, setDefaultCard } from "../_request";

// Query keys
export const stripeKeys = {
  all: ["stripe"] as const,
  savedCards: () => [...stripeKeys.all, "saved-cards"] as const,
};

// Create Setup Intent
export const useCreateSetupIntent = () => {
  return useMutation({
    mutationFn: createSetupIntent,
    onSuccess: (res) => {
      console.log(res);
      
      showSuccessMessage("Setup intent created");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      showErrorMessage(error.response?.data?.message || "Failed to create setup intent");
    },
  });
};

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

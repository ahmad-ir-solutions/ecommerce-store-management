import { Integration, Platform } from '@/pages/admin/settings/integrations/core/_schema'
import { create } from "zustand"

interface IntegrationState {
  integrations: Integration[]
  addIntegration: (integration: Integration) => void
  toggleIntegration: (id: string) => void
  removeIntegration: (id: string) => void

  isOpen: boolean
  step: "platform" | "profile"
  selectedPlatform: Platform | null
  openModal: () => void
  closeModal: () => void
  setStep: (step: "platform" | "profile") => void
  setSelectedPlatform: (platform: Platform) => void
}

export const useIntegrationStore = create<IntegrationState>((set) => ({
  integrations: [
    {
      id: "1",
      name: "DHL",
      type: "courier",
      active: true,
      profileName: "CMS Standard",
      integrationType: "API",
    },
    {
      id: "2",
      name: "Stripe",
      type: "payment",
      active: false,
      profileName: "API Advanced",
      integrationType: "API",
    },
  ],

  addIntegration: (integration) =>
    set((state) => ({
      integrations: [...state.integrations, integration],
    })),

  toggleIntegration: (id) =>
    set((state) => ({
      integrations: state.integrations.map((integration) =>
        integration.id === id ? { ...integration, active: !integration.active } : integration,
      ),
    })),

  removeIntegration: (id) =>
    set((state) => ({
      integrations: state.integrations.filter((integration) => integration.id !== id),
    })),

  isOpen: false,
  step: "platform",
  selectedPlatform: null,
  openModal: () => set({ isOpen: true, step: "platform", selectedPlatform: null }),
  closeModal: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
}))

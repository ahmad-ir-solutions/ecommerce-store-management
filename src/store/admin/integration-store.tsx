import { create } from "zustand"

export interface Integration {
  id: string
  name: string
  type: "courier" | "payment"
  active: boolean
  profileName: string
  integrationType: string
}

interface IntegrationState {
  integrations: Integration[]
  addIntegration: (integration: Integration) => void
  toggleIntegration: (id: string) => void
  removeIntegration: (id: string) => void
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
}))

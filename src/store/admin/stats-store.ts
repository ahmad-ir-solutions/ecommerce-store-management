
import { create } from "zustand"

interface StatsState {
  stats: {
    sales: number
    revenue: number
    taxAndShipping: number
  }
  productStats: {
    total: number
    outOfStock: number
    onPurchaseOrder: number
    onBackOrder: number
    noWeights: number
    noDimensions: number
    noCountryOfManufacture: number
    unitsInUnknownLocations: number
  }
  setStats: (stats: StatsState["stats"]) => void
  setProductStats: (productStats: StatsState["productStats"]) => void
}

export const useStatsStore = create<StatsState>((set) => ({
  stats: {
    sales: 5423,
    revenue: 84139.87,
    taxAndShipping: 14009.16,
  },
  productStats: {
    total: 934,
    outOfStock: 116,
    onPurchaseOrder: 0,
    onBackOrder: 0,
    noWeights: 1,
    noDimensions: 934,
    noCountryOfManufacture: 934,
    unitsInUnknownLocations: 0,
  },
  setStats: (stats) => set({ stats }),
  setProductStats: (productStats) => set({ productStats }),
}))

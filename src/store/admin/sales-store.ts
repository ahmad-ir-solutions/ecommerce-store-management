import { create } from "zustand"

interface SalesState {
  salesData: {
    date: string
    amazon: number
    ebay: number
    onbuy: number
  }[]
  channelSales: {
    id: number
    name: string
    today: number
    yesterday: number
    thisWeek: number
    lastWeek: number
    thisMonth: number
    lastMonth: number
  }[]
  setSalesData: (salesData: SalesState["salesData"]) => void
  setChannelSales: (channelSales: SalesState["channelSales"]) => void
}

export const useSalesStore = create<SalesState>((set) => ({
  salesData: [
    {
      date: "Feb 28",
      amazon: 1200,
      ebay: 1800,
      onbuy: 800,
    },
    {
      date: "March 1",
      amazon: 1300,
      ebay: 1900,
      onbuy: 700,
    },
    {
      date: "March 2",
      amazon: 1400,
      ebay: 2000,
      onbuy: 900,
    },
    {
      date: "March 3",
      amazon: 1500,
      ebay: 2100,
      onbuy: 1000,
    },
    {
      date: "March 4",
      amazon: 1600,
      ebay: 2200,
      onbuy: 1100,
    },
    {
      date: "March 5",
      amazon: 1700,
      ebay: 2300,
      onbuy: 1200,
    },
    {
      date: "March 6",
      amazon: 1800,
      ebay: 2400,
      onbuy: 1300,
    },
    {
      date: "March 7",
      amazon: 1900,
      ebay: 2500,
      onbuy: 1400,
    },
  ],
  channelSales: [
    {
      id: 1,
      name: "Ebay DCUK",
      today: 2106.96,
      yesterday: 2106.96,
      thisWeek: 2106.96,
      lastWeek: 2106.96,
      thisMonth: 2106.96,
      lastMonth: 2106.96,
    },
    {
      id: 2,
      name: "Ebay DCUK",
      today: 2106.96,
      yesterday: 2106.96,
      thisWeek: 2106.96,
      lastWeek: 2106.96,
      thisMonth: 2106.96,
      lastMonth: 2106.96,
    },
    {
      id: 3,
      name: "Ebay DCUK",
      today: 2106.96,
      yesterday: 2106.96,
      thisWeek: 2106.96,
      lastWeek: 2106.96,
      thisMonth: 2106.96,
      lastMonth: 2106.96,
    },
  ],
  setSalesData: (salesData) => set({ salesData }),
  setChannelSales: (channelSales) => set({ channelSales }),
}))

import { subDays, format } from "date-fns"

// Generate dates for the last 30 days
export const generateDates = (days: number) => {
  return Array.from({ length: days }).map((_, i) => {
    const date = subDays(new Date(), days - i - 1)
    return format(date, "MMM dd")
  })
}

// Generate random data for each channel
export const generateChannelData = (dates: string[]) => {
  return dates.map((date) => ({
    date,
    amazon: Math.floor(Math.random() * 2000) + 500,
    ebay: Math.floor(Math.random() * 1500) + 300,
    onbuy: Math.floor(Math.random() * 1000) + 200,
    woocommerce: Math.floor(Math.random() * 800) + 100,
    shopify: Math.floor(Math.random() * 600) + 100,
  }))
}

// Generate dummy data
export const dates = generateDates(30)
export const salesData = generateChannelData(dates)

// Calculate totals for stats
export const totalSales = salesData.reduce(
  (acc, item) => acc + item.amazon + item.ebay + item.onbuy + item.woocommerce + item.shopify,
  0,
)

export const totalRevenue = totalSales * 15.5 // Average price per unit

export const statsData = {
  sales: 5423,
  revenue: 84139.87,
  taxAndShipping: 14009.16,
}

export const productStatsData = {
  total: 934,
  outOfStock: 116,
  onPurchaseOrder: 0,
  onBackOrder: 0,
  noWeights: 1,
  noDimensions: 934,
  noCountryOfManufacture: 934,
  unitsInUnknownLocations: 0,
}

export const channelSalesData = [
  {
    id: 1,
    name: "Amazon",
    today: 1245.67,
    yesterday: 1089.32,
    thisWeek: 8765.43,
    lastWeek: 7654.32,
    thisMonth: 32456.78,
    lastMonth: 29876.54,
  },
  {
    id: 2,
    name: "Ebay",
    today: 876.54,
    yesterday: 765.43,
    thisWeek: 5432.1,
    lastWeek: 4321.09,
    thisMonth: 21098.76,
    lastMonth: 19876.54,
  },
  {
    id: 3,
    name: "Onbuy",
    today: 543.21,
    yesterday: 432.1,
    thisWeek: 3210.98,
    lastWeek: 2109.87,
    thisMonth: 15432.1,
    lastMonth: 13210.98,
  },
  {
    id: 4,
    name: "Woocommerce",
    today: 321.09,
    yesterday: 210.98,
    thisWeek: 2109.87,
    lastWeek: 1098.76,
    thisMonth: 9876.54,
    lastMonth: 8765.43,
  },
  {
    id: 5,
    name: "Shopify",
    today: 210.98,
    yesterday: 109.87,
    thisWeek: 1098.76,
    lastWeek: 987.65,
    thisMonth: 7654.32,
    lastMonth: 6543.21,
  },
]

export const topSellingProductsData = [
  {
    id: 1,
    sku: "60B5010044712",
    name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
    quantity: 102,
    revenue: 2106.96,
  },
  {
    id: 2,
    sku: "60B5010044713",
    name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
    quantity: 102,
    revenue: 2106.96,
  },
  {
    id: 3,
    sku: "60B5010044714",
    name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
    quantity: 102,
    revenue: 2106.96,
  },
  {
    id: 4,
    sku: "60B5010044715",
    name: "Armaf Club De Nuit Intense Woman 105ml Edp Spr",
    quantity: 98,
    revenue: 1986.54,
  },
  {
    id: 5,
    sku: "60B5010044716",
    name: "Armaf Club De Nuit Milestone 105ml Edp Spr",
    quantity: 95,
    revenue: 1876.32,
  },
]

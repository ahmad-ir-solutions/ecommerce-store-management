import type { DateRange } from "react-day-picker"

export interface IErrorType {
    [key: number]: string;
  }
  
  export const ErrorType = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    Default: 'Error',
  };
  
export async function fetchDashboardData(dateRange: DateRange) {
  console.log(dateRange, "dateRange");
  
  // In a real application, this would be an API call to your backend
  // For this example, we'll just return mock data

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    stats: {
      sales: 5423,
      revenue: 84139.87,
      taxAndShipping: 14009.16,
    },
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
    salesByChannel: {
      amazon: 1245,
      ebay: 2356,
      onbuy: 1822,
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
    topSellingProducts: [
      {
        id: 1,
        sku: "608501004712",
        name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
        quantity: 102,
        revenue: 2106.96,
      },
      {
        id: 2,
        sku: "608501004712",
        name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
        quantity: 102,
        revenue: 2106.96,
      },
      {
        id: 3,
        sku: "608501004712",
        name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
        quantity: 102,
        revenue: 2106.96,
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
  }
}

export async function fetchRecentOrders(orderStatus: string) {
  console.log(orderStatus, "orderStatus");
  
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1001",
      customer: "John Doe",
      date: "2024-01-20",
      status: "completed",
      items: 3,
      total: 75.0,
    },
    {
      id: "1002",
      customer: "Jane Smith",
      date: "2024-01-22",
      status: "processing",
      items: 1,
      total: 25.0,
    },
    {
      id: "1003",
      customer: "Alice Johnson",
      date: "2024-01-25",
      status: "pending",
      items: 2,
      total: 50.0,
    },
  ]
}

export async function fetchInventoryAlerts() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      sku: "PRODUCT001",
      product: "Awesome Gadget",
      alertType: "Low Stock",
      currentStock: 5,
      threshold: 10,
    },
    {
      id: "2",
      sku: "PRODUCT002",
      product: "Amazing Widget",
      alertType: "Out of Stock",
      currentStock: 0,
      threshold: 5,
    },
    {
      id: "3",
      sku: "PRODUCT003",
      product: "Incredible Thingamajig",
      alertType: "Overstock",
      currentStock: 150,
      threshold: 100,
    },
  ]
}

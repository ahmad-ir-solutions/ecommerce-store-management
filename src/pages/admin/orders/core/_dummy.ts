// import { Order, OrderDetails,  } from "./_modals"

// // Mock data based on the screenshot
// export const fetchOrders = async (): Promise<Order[]> => {
//   // In a real application, this would be an API call
//   // return await fetch('/api/orders').then(res => res.json())

//   // For demo purposes, we'll return mock data
//   return [
//     {
//       id: "1",
//       ordersFlags: "All",
//       orderId: "20260858",
//       channel: "Amazon United Kingdom (UK)",
//       channelOrderId: "204-5708088-1234567",
//       productSKUs: "335150098046",
//       orderDate: new Date("2025-07-03T11:53:00"),
//       dispatchDate: null,
//       channelDispatchDate: null,
//       customerName: "ROOZAFZAY Marwan",
//       company: null,
//       postcode: "UB6 8UJ",
//       shippingCountry: "UNITED KINGDOM",
//       emailAddress: "Marwanroozafzay@hotmail.com",
//       total: 12.79,
//       shippingMethod: "Tracked 24",
//       status: "Complete",
//       flagType: "P"
//     },
//     {
//       id: "2",
//       ordersFlags: "All",
//       orderId: "20260857",
//       channel: "Amazon United Kingdom (UK)",
//       channelOrderId: "206-2617894-1234567",
//       productSKUs: "335150098046",
//       orderDate: new Date("2025-07-03T11:53:00"),
//       dispatchDate: null,
//       channelDispatchDate: null,
//       customerName: "ROOZAFZAY Marwan",
//       company: null,
//       postcode: "UB6 8UJ",
//       shippingCountry: "UNITED KINGDOM",
//       emailAddress: "Marwanroozafzay@hotmail.com",
//       total: 12.79,
//       shippingMethod: "Tracked 24",
//       status: "pending", 
//       flagType: "P"
//     },
//     {
//       id: "3",
//       ordersFlags: "All",
//       orderId: "20201377",
//       channel: "Amazon United Kingdom (UK)",
//       channelOrderId: "026-0141189-4701631",
//       productSKUs: "608501004712",
//       orderDate: new Date("2025-05-03T11:45:00"),
//       dispatchDate: null,
//       channelDispatchDate: null,
//       customerName: "Muireann Mhathúna",
//       company: null,
//       postcode: "SW1A 1AA",
//       shippingCountry: "UNITED KINGDOM",
//       emailAddress: "example@amazon.co.uk",
//       total: 23.49,
//       shippingMethod: "Tracked 24",
//       status: "completed",
//       flagType: "P"
//     },
//     {
//       id: "4",
//       ordersFlags: "All",
//       orderId: "20201366",
//       channel: "Ebay DCUK",
//       channelOrderId: "22-12616-28548",
//       productSKUs: "335071304878",
//       orderDate: new Date("2025-05-03T12:30:00"),
//       dispatchDate: null,
//       channelDispatchDate: null,
//       customerName: "Paul Baker / paul2022",
//       company: null,
//       postcode: "WA10 6UJ",
//       shippingCountry: "UNITED KINGDOM",
//       emailAddress: "example@ebay.com",
//       total: 23.99,
//       shippingMethod: "Tracked 24",
//       status: "completed"
//     },
//     {
//       id: "5",
//       ordersFlags: "All",
//       orderId: "20201261",
//       channel: "Amazon United Kingdom (UK)",
//       channelOrderId: "202-3228092-4503315",
//       productSKUs: "608501004712",
//       orderDate: new Date("2025-05-03T11:30:00"),
//       dispatchDate: null,
//       channelDispatchDate: null,
//       customerName: "ROOZAFZAY Marwan",
//       company: null,
//       postcode: "UB6 8UJ",
//       shippingCountry: "UNITED KINGDOM",
//       emailAddress: "Not Available",
//       total: 31.49,
//       shippingMethod: "Tracked 24",
//       status: "awaiting payment"
//     },
//   ]
// }

// export const exportOrders = async (selectedOrders: string[]) => {
//   // In a real application, this would be an API call
//   console.log("Exporting orders:", selectedOrders)
//   return { success: true }
// }


// // Mock data for testing
// export const mockOrder: OrderDetails = {
//   orderId: "ORD-12345",
//   status: "Complete (Ready to pick)",
//   customerName: "Emma Hogan / em7250153",
//   emailAddress: "01663448748988e37f63@members.ebay.com",
//   channelOrderId: "18-12798-77213",
//   shippingMethod: "Complete (Ready to pick)",
//   attentionRequired: false,
//   billingAddress: {
//     name: "EMMA HOGAN",
//     company: "",
//     address1: "67 ALDER STREET",
//     address2: "",
//     city: "NEWTON-LE-WILLOWS",
//     county: "MERSEYSIDE",
//     postcode: "WA12 8HW",
//     country: "UNITED KINGDOM",
//     phone: "07784867400",
//   },
//   shippingAddress: {
//     name: "EMMA HOGAN",
//     company: "",
//     address1: "67 ALDER STREET",
//     address2: "",
//     city: "NEWTON-LE-WILLOWS",
//     county: "MERSEYSIDE",
//     postcode: "WA12 8HW",
//     country: "UNITED KINGDOM",
//     phone: "07784867400",
//   },
//   items: [
//     {
//       id: "item-1",
//       sku: "608501004712",
//       name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
//       quantity: 1,
//       unitSubtotal: 6.43,
//       taxRate: 20,
//       taxTotal: 1.29,
//       discount: 0,
//       status: "Allocated",
//       quantityAllocated: 1,
//     },
//   ],
//   totals: {
//     subtotal: 6.43,
//     shippingCosts: 3.99,
//     shippingTax: 0.8,
//     discount: 0,
//     lineItemsTax: 1.29,
//     total: 12.51,
//     refundedAmount: 0,
//   },
//   notes: [],
//   orderDate: new Date("2023-03-10T09:40:00"),
//   importedDate: new Date("2023-03-10T09:45:00"),
// }

// // Simulate API calls
// export const fetchOrderDetails = async (orderId: string): Promise<OrderDetails> => {
//   // Simulate network delay
//   await new Promise((resolve) => setTimeout(resolve, 500))

//   // Return mock data
//   return { ...mockOrder, orderId }
// }

// export const updateOrder = async (orderId: string, data: Partial<OrderDetails>): Promise<OrderDetails> => {
//   // Simulate network delay
//   await new Promise((resolve) => setTimeout(resolve, 800))

//   // Return updated data
//   return { ...mockOrder, ...data, orderId }
// }

// export const cancelOrder = async (orderId: string): Promise<void> => {
//   // Simulate network delay
//   await new Promise((resolve) => setTimeout(resolve, 600))

//   // In a real app, this would cancel the order
//   console.log(`Order ${orderId} cancelled`)
// }

// export const cloneOrder = async (orderId: string): Promise<string> => {
//   // Simulate network delay
//   await new Promise((resolve) => setTimeout(resolve, 700))

//   // In a real app, this would clone the order and return the new order ID
//   const newOrderId = `ORD-CLONE-${Math.floor(Math.random() * 10000)}`
//   console.log(`Order ${orderId} cloned to ${newOrderId}`)

//   return newOrderId
// }
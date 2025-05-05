import { Order, OrderDetails } from "./_modals"

// Mock data based on the screenshot
export const fetchOrders = async (): Promise<Order[]> => {
  // In a real application, this would be an API call
  // return await fetch('/api/orders').then(res => res.json())

  // For demo purposes, we'll return mock data
  return [
    {
      id: "1",
      ordersFlags: "All",
      orderId: "20260858",
      channel: "Amazon United Kingdom (UK)",
      channelOrderId: "204-5708088-1234567",
      productSKUs: "335150098046",
      orderDate: new Date("2025-07-03T11:53:00"),
      dispatchDate: null,
      channelDispatchDate: null,
      customerName: "ROOZAFZAY Marwan",
      company: null,
      postcode: "UB6 8UJ",
      shippingCountry: "UNITED KINGDOM",
      emailAddress: "Marwanroozafzay@hotmail.com",
      total: 12.79,
      shippingMethod: "Tracked 24",
      status: "Complete",
      flagType: "P"
    },
    {
      id: "2",
      ordersFlags: "All",
      orderId: "20260857",
      channel: "Amazon United Kingdom (UK)",
      channelOrderId: "206-2617894-1234567",
      productSKUs: "335150098046",
      orderDate: new Date("2025-07-03T11:53:00"),
      dispatchDate: null,
      channelDispatchDate: null,
      customerName: "ROOZAFZAY Marwan",
      company: null,
      postcode: "UB6 8UJ",
      shippingCountry: "UNITED KINGDOM",
      emailAddress: "Marwanroozafzay@hotmail.com",
      total: 12.79,
      shippingMethod: "Tracked 24",
      status: "Pending",
      flagType: "P"
    },
    {
      id: "3",
      ordersFlags: "All",
      orderId: "20201377",
      channel: "Amazon United Kingdom (UK)",
      channelOrderId: "026-0141189-4701631",
      productSKUs: "608501004712",
      orderDate: new Date("2025-05-03T11:45:00"),
      dispatchDate: null,
      channelDispatchDate: null,
      customerName: "Muireann Mhathúna",
      company: null,
      postcode: "SW1A 1AA",
      shippingCountry: "UNITED KINGDOM",
      emailAddress: "example@amazon.co.uk",
      total: 23.49,
      shippingMethod: "Tracked 24",
      status: "Complete",
      flagType: "P"
    },
    {
      id: "4",
      ordersFlags: "All",
      orderId: "20201366",
      channel: "Ebay DCUK",
      channelOrderId: "22-12616-28548",
      productSKUs: "335071304878",
      orderDate: new Date("2025-05-03T12:30:00"),
      dispatchDate: null,
      channelDispatchDate: null,
      customerName: "Paul Baker / paul2022",
      company: null,
      postcode: "WA10 6UJ",
      shippingCountry: "UNITED KINGDOM",
      emailAddress: "example@ebay.com",
      total: 23.99,
      shippingMethod: "Tracked 24",
      status: "Complete"
    },
    {
      id: "5",
      ordersFlags: "All",
      orderId: "20201261",
      channel: "Amazon United Kingdom (UK)",
      channelOrderId: "202-3228092-4503315",
      productSKUs: "608501004712",
      orderDate: new Date("2025-05-03T11:30:00"),
      dispatchDate: null,
      channelDispatchDate: null,
      customerName: "ROOZAFZAY Marwan",
      company: null,
      postcode: "UB6 8UJ",
      shippingCountry: "UNITED KINGDOM",
      emailAddress: "Not Available",
      total: 31.49,
      shippingMethod: "Tracked 24",
      status: "Awaiting Payment"
    },
  ]
}

export const fetchOrderDetails = async (orderId: string): Promise<OrderDetails> => {
  // In a real application, this would be an API call
  // return await fetch(`/api/orders/${orderId}`).then(res => res.json())
  
  // For demo purposes, we'll return mock data
  return {
    id: "1",
    ordersFlags: "All",
    orderId: orderId,
    channel: "Ebay DCUK",
    channelOrderId: "18-12798-77213",
    productSKUs: "608501004712",
    orderDate: new Date("2025-10-03T09:40:00"),
    dispatchDate: null,
    channelDispatchDate: null,
    customerName: "Emma Hogan / em7250153",
    company: "Designers Collection",
    postcode: "WA12 8HW",
    shippingCountry: "UNITED KINGDOM",
    emailAddress: "01663448748988e37f63@members.ebay.com",
    total: 7.72,
    shippingMethod: "Complete (Ready to pick)",
    status: "Complete",
    billingAddress: {
      name: "EMMA HOGAN",
      company: null,
      address1: "67 ALDER STREET",
      address2: null,
      city: "NEWTON-LE-WILLOWS",
      county: "MERSEYSIDE",
      postcode: "WA12 8HW",
      country: "UNITED KINGDOM",
      phone: "07784867400"
    },
    shippingAddress: {
      name: "EMMA HOGAN",
      company: null,
      address1: "67 ALDER STREET",
      address2: null,
      city: "NEWTON-LE-WILLOWS",
      county: "MERSEYSIDE",
      postcode: "WA12 8HW",
      country: "UNITED KINGDOM",
      phone: "07784867400"
    },
    items: [
      {
        sku: "608501004712",
        name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
        quantity: 1,
        options: null,
        quantityAllocated: 1,
        unitSubtotal: 6.43,
        taxRate: 20.00,
        taxTotal: 1.29,
        discount: 0.00,
        total: 7.72,
        status: "Allocated"
      }
    ],
    totals: {
      subtotal: 6.43,
      shippingCosts: 6.43,
      shippingTax: 6.43,
      discount: 6.43,
      lineItemsTax: 6.43,
      total: 7.72,
      refundedAmount: 6.43
    },
    notes: []
  }
}

export const exportOrders = async (selectedOrders: string[]) => {
  // In a real application, this would be an API call
  console.log("Exporting orders:", selectedOrders)
  return { success: true }
}

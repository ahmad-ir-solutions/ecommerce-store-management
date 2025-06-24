export interface PaymentTransaction {
    _id: string
    customerName: string
    customerEmail: string
    customerAddress: string
    productSku: string
    productName: string
    productImage: string
    date: string
    orderNumber: string
    quantity: number
    unitPrice: number
    totalAmount: number
    channel: "Amazon United Kingdom (UK)" | "eBay" | "Website" | "Retail"
    status: "Paid" | "Unpaid" | "Unfulfilled" | "Processing" | "Cancelled"
    paymentMethod: "Credit Card" | "PayPal" | "Bank Transfer" | "Cash"
    notes?: string
  }
  
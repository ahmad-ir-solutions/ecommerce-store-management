export interface User {
    id: string
    email: string
    name: string
    role: string
  }
  
  export interface Product {
    id: string
    name: string
    description: string
    price: number
    stock: number
    category: string
    imageUrl?: string
    createdAt: string
    updatedAt: string
  }
  
  export interface Order {
    id: string
    userId: string
    products: OrderProduct[]
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
    totalAmount: number
    shippingAddress: Address
    paymentMethod: string
    createdAt: string
    updatedAt: string
  }
  
  export interface OrderProduct {
    productId: string
    productName: string
    quantity: number
    unitPrice: number
  }
  
  export interface Address {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  
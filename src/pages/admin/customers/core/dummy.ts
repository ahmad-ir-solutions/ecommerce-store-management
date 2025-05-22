import { Customer } from "./_modals"

// Mock data for customers
const mockCustomers: Customer[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `cust_${i + 1}`,
  name: "Hammad Al-Khader",
  email: "3hl1q3nyg85sfqv@marketpla......",
  phoneNumber: "07511742114",
  reference: `3EFECF13-D384-48DC-${i}........`,
  date: "Today",
  order: {
    numbers: 1,
    average: 25.99,
    total: 25.99,
  },
  channel: "Amazon United Kingdom (UK)",
  billingAddress: {
    line1: "Flat 31 george street london W1U",
    country: "United Kingdom",
  },
}))

// Mock customer detail
const mockCustomerDetail: Customer = {
  id: "cust_1",
  name: "Hammad Al-Khader",
  firstName: "Hammad",
  lastName: "Al-Khader",
  email: "hammad@example.com",
  phoneNumber: "",
  reference: "abcdefgh",
  order: {
    numbers: 1,
    average: 25.99,
    total: 25.99,
  },
  channel: "Amazon United Kingdom (UK)",
  shippingAddress: {
    firstName: "Hammad",
    lastName: "Al-Khader",
    company: "MORRISONS DAILY",
    line1: "FLAT 11TH MANOR HOUSE ROAD",
    line2: "WEDNESBURY",
    city: "WEST MIDLANDS",
    state: "WEST MIDLANDS",
    postalCode: "WS10 9QL",
    country: "UNITED KINGDOM",
  },
  billingAddress: {
    firstName: "Hammad",
    lastName: "Al-Khader",
    company: "MORRISONS DAILY",
    line1: "FLAT 11TH MANOR HOUSE ROAD",
    line2: "WEDNESBURY",
    city: "WEST MIDLANDS",
    state: "WEST MIDLANDS",
    postalCode: "WS10 9QL",
    country: "UNITED KINGDOM",
  },
  orders: [
    {
      id: "19992422",
      date: "Today",
      status: "Paid",
      total: 25.99,
    },
  ],
}

// Simulate API calls with delays
export async function fetchCustomers(): Promise<Customer[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockCustomers
}

export async function fetchCustomerById(id: string): Promise<Customer> {
  console.log(id, "fetchCustomerById");
  await new Promise((resolve) => setTimeout(resolve, 500))
  return mockCustomerDetail
}

export async function updateCustomer({ id, data }: { id: string; data: Partial<Customer> }): Promise<Customer> {
  console.log(id, data, "updateCustomer");
  
  await new Promise((resolve) => setTimeout(resolve, 800))
  return { ...mockCustomerDetail, ...data }
}

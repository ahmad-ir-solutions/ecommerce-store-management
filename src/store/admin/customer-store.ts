import { create } from "zustand"

type AddressFormFocus = "shipping" | "billing" | null

interface CustomerState {
  selectedCustomerId: string | null
  setSelectedCustomerId: (id: string | null) => void
  addressFormFocus: AddressFormFocus
  setAddressFormFocus: (focus: AddressFormFocus) => void
}

export const useCustomerStore = create<CustomerState>((set) => ({
  selectedCustomerId: null,
  setSelectedCustomerId: (id) => set({ selectedCustomerId: id }),
  addressFormFocus: null,
  setAddressFormFocus: (focus) => set({ addressFormFocus: focus }),
}))

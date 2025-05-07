import { Company } from "@/pages/admin/settings/company/core/_modal"
import { create } from "zustand"

// Define the store state
interface CompanyState {
  company: Company | null
  setCompany: (company: Company) => void
  updateCompany: (updates: Partial<Company>) => void
  resetCompany: () => void
}

// Create the store
export const useCompanyStore = create<CompanyState>((set) => ({
  company: null,
  setCompany: (company) => set({ company }),
  updateCompany: (updates) =>
    set((state) => ({
      company: state.company ? { ...state.company, ...updates } : null,
    })),
  resetCompany: () => set({ company: null }),
}))

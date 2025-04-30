import { Supplier } from "@/pages/admin/products/core/_modals"
import { create } from "zustand"
import { persist } from "zustand/middleware"


type SupplierStore = {
  suppliers: Supplier[]
  addSupplier: (supplier: Omit<Supplier, "id">) => void
  updateSupplier: (id: string, supplier: Partial<Supplier>) => void
  deleteSupplier: (id: string) => void
  getSupplier: (id: string) => Supplier | undefined
}

export const useSupplierStore = create<SupplierStore>()(
  persist(
    (set, get) => ({
      suppliers: [],

      addSupplier: (supplier) => {
        const id = crypto.randomUUID()
        set((state) => ({
          suppliers: [...state.suppliers, { ...supplier, id }],
        }))
        return id
      },

      updateSupplier: (id, updatedSupplier) => {
        set((state) => ({
          suppliers: state.suppliers.map((supplier) =>
            supplier.id === id ? { ...supplier, ...updatedSupplier } : supplier,
          ),
        }))
      },

      deleteSupplier: (id) => {
        set((state) => ({
          suppliers: state.suppliers.filter((supplier) => supplier.id !== id),
        }))
      },

      getSupplier: (id) => {
        return get().suppliers.find((supplier) => supplier.id === id)
      },
    }),
    {
      name: "supplier-storage",
    },
  ),
)

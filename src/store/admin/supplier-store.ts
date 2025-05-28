import { ISupplier } from '@/pages/admin/products/core/_modals'
import { create } from "zustand"
import { persist } from "zustand/middleware"


type SupplierStore = {
  suppliers: ISupplier[]
  addSupplier: (supplier: Omit<ISupplier, "id">) => void
  updateSupplier: (id: string, supplier: Partial<ISupplier>) => void
  deleteSupplier: (id: string) => void
  getSupplier: (id: string) => ISupplier | undefined
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
            supplier._id === id ? { ...supplier, ...updatedSupplier } : supplier,
          ),
        }))
      },

      deleteSupplier: (id) => {
        set((state) => ({
          suppliers: state.suppliers.filter((supplier) => supplier._id !== id),
        }))
      },

      getSupplier: (id) => {
        return get().suppliers.find((supplier) => supplier._id === id)
      },
    }),
    {
      name: "supplier-storage",
    },
  ),
)

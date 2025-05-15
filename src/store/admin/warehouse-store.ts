import { WarehouseFormValues } from '@/pages/admin/settings/warehouse/core/_modal'
import { create } from "zustand"

interface WarehouseStore {
  warehouse: WarehouseFormValues | null
  setWarehouse: (warehouse: WarehouseFormValues) => void
}

export const useWarehouseStore = create<WarehouseStore>((set) => ({
  warehouse: null,
  setWarehouse: (warehouse) => set({ warehouse }),
}))

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Filter {
  id: string
  name: string
  filters: {
    columnFilters: any[]
    globalFilter: string
  }
}

interface OrdersState {
  savedFilters: Filter[]
  activeFilter: string | null
  activeFilters: {
    columnFilters: any[]
    globalFilter: string
  }
  addSavedFilter: (filter: Omit<Filter, "id">) => void
  removeSavedFilter: (id: string) => void
  applySavedFilter: (id: string) => void
  resetFilters: () => void
  setActiveFilters: (filters: { columnFilters: any[]; globalFilter: string }) => void
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      savedFilters: [
        {
          id: "all-orders",
          name: "All Orders",
          filters: {
            columnFilters: [],
            globalFilter: "",
          },
        },
        {
          id: "pending-orders",
          name: "Pending Orders",
          filters: {
            columnFilters: [
              {
                id: "status",
                value: "pending",
              },
            ],
            globalFilter: "",
          },
        },
      ],
      activeFilter: null,
      activeFilters: {
        columnFilters: [],
        globalFilter: "",
      },
      addSavedFilter: (filter) => {
        const id = Date.now().toString()
        set((state) => ({
          savedFilters: [...state.savedFilters, { ...filter, id }],
        }))
      },
      removeSavedFilter: (id) => {
        set((state) => ({
          savedFilters: state.savedFilters.filter((filter) => filter.id !== id),
        }))
      },
      applySavedFilter: (id) => {
        const filter = get().savedFilters.find((filter) => filter.id === id)
        if (filter) {
          set({
            activeFilter: id,
            activeFilters: filter.filters,
          })
        }
      },
      resetFilters: () => {
        set({
          activeFilter: null,
          activeFilters: {
            columnFilters: [],
            globalFilter: "",
          },
        })
      },
      setActiveFilters: (filters) => {
        set({
          activeFilters: filters,
        })
      },
    }),
    {
      name: "orders-storage",
    },
  ),
)

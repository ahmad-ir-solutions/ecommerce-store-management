import { create } from "zustand"
import { persist } from "zustand/middleware"
import { fetchInventory } from "@/pages/admin/products/core/_request"
import { ProductItem, SavedFilter, topSellingProduct } from "@/pages/admin/products/core/_modals"
// import { createContext, useContext, type ReactNode, useEffect } from "react"
// import { useQuery } from "@tanstack/react-query"
// import { fetchInventory } from "@/pages/admin/products/core/_request"

interface ProductState {
  product: ProductItem[]
  isLoading: boolean
  error: Error | null
  savedFilters: SavedFilter[]
  activeFilters: any
  applySavedFilter: (id: string) => void
  resetFilters: () => void
  setProduct: (inventory: ProductItem[]) => void
  saveFilter: (filter: SavedFilter) => void
  topSellingProducts: topSellingProduct[]
  setActiveFilters: (filters: any) => void
  setTopSellingProducts: (products: topSellingProduct[]) => void
  fetchInventory: () => Promise<void>
}

export const useProductsStore = create<ProductState>()(
  persist(
    (set, get) => ({
      product: [],
      isLoading: false,
      error: null,
      savedFilters: [
        { id: "1111", label: "Low Stock Items", value: "low-stock-items" },
        { id: "2222", label: "High Value Items", value: "high-value-items" },
        { id: "3333", label: "Recently Added", value: "recently-added" },
      ],
      
      activeFilters: {
        columnFilters: [],
        globalFilter: "",
      },

      applySavedFilter: (value: string) => {
        // Implementation would apply the filter
        console.log(`Applying filter with id: ${value}`);
      },
      resetFilters: () => {
        set({
          activeFilters: {
            columnFilters: [],
            globalFilter: "",
          },
        })
        
      },

      setProduct: (product: ProductItem[]) => set({ product }),
      
      saveFilter: (filter: SavedFilter) => {
        const { savedFilters } = get();
        const updatedFilters = [...savedFilters];
    
        // Check if filter with same ID exists
        const existingIndex = updatedFilters.findIndex((f) => f.id === filter.id);
        if (existingIndex >= 0) {
          updatedFilters[existingIndex] = filter;
        } else {
          updatedFilters.push(filter);
        }
    
        set({ savedFilters: updatedFilters });
      },
    
      setActiveFilters: (filters: any) => {
        console.log(filters, "filters");
        
        set({ activeFilters: filters });
      },

        fetchInventory: async () => {
        set({ isLoading: true })
        try {
          // In a real app, this would be an API call
          // Simulating API call with timeout
         const data = await fetchInventory()

          set({ product: data, isLoading: false })
        } catch (error) {
          set({ error: error as Error, isLoading: false })
        }
      },

      topSellingProducts: [
        {
          id: 1,
          sku: "608501004712",
          name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
          quantity: 102,
          revenue: 2106.96,
        },
        {
          id: 2,
          sku: "608501004713",
          name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
          quantity: 102,
          revenue: 2106.96,
        },
        {
          id: 3,
          sku: "608501004712",
          name: "Armaf Club De Nuit Intense Man 105ml Edt Spr",
          quantity: 102,
          revenue: 2106.96,
        },
      ],

      setTopSellingProducts: (products: topSellingProduct[]) => set({ topSellingProducts: products }),
    }),
    { name: "products-storage",
      partialize: (state) => (
        {
          // Only persist these parts of the state
          savedFilters: state.savedFilters,
          activeFilters: state.activeFilters,
        }
      )
     }
  )
  )

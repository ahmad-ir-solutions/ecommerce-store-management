import { create } from "zustand"
import { persist } from "zustand/middleware"
import { IProductModel, SavedFilter, topSellingProduct } from "@/pages/admin/products/core/_modals"

interface ProductState {
  product: IProductModel[]
  isLoading: boolean
  error: Error | null
  savedFilters: SavedFilter[]
  activeFilters: any
  applySavedFilter: (id: string) => void
  resetFilters: () => void
  setProduct: (inventory: IProductModel[]) => void
  saveFilter: (filter: SavedFilter) => void
  topSellingProducts: topSellingProduct[]
  setActiveFilters: (filters: any) => void
  setTopSellingProducts: (products: topSellingProduct[]) => void
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

      setProduct: (product: IProductModel[]) => set({ product }),
      
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

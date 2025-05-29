// import { CreateProductData } from "@/pages/admin/products/core/_modals"
// import { create } from "zustand"
// import { persist } from "zustand/middleware"

// interface ProductDetailStore {
//   currentProduct: CreateProductData | null
//   originalProduct: CreateProductData | null
//   isEditing: boolean
//   isLoading: boolean
//   error: Error | null
//   setProduct: (product: CreateProductData) => void
//   setIsEditing: (isEditing: boolean) => void
//   updateProduct: (product: CreateProductData) => void
//   resetProduct: () => void
//   setLoading: (isLoading: boolean) => void
//   setError: (error: Error | null) => void
// }

// export const useProductDetailStore = create<ProductDetailStore>()(
//   persist(
//     (set, get) => ({
//       currentProduct: null,
//       originalProduct: null,
//       isEditing: false,
//       isLoading: false,
//       error: null,
//       setProduct: (product) => set({ currentProduct: product, originalProduct: product }),
//       setIsEditing: (isEditing) => set({ isEditing }),
//       updateProduct: (product) => set({ currentProduct: product }),
//       resetProduct: () => set({ currentProduct: get().originalProduct }),
//       setLoading: (isLoading) => set({ isLoading }),
//       setError: (error) => set({ error }),
//     }),
//     {
//       name: "product-detail-storage",
//       partialize: (state) => ({
//         // Only persist these parts of the state
//         isEditing: state.isEditing,
//       }),
//     },
//   ),
// )

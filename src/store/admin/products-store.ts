import { create } from "zustand"

interface ProductsState {
  topSellingProducts: {
    id: number
    sku: string
    name: string
    quantity: number
    revenue: number
  }[]
  setTopSellingProducts: (products: ProductsState["topSellingProducts"]) => void
}

export const useProductsStore = create<ProductsState>((set) => ({
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
      sku: "608501004712",
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
  setTopSellingProducts: (products) => set({ topSellingProducts: products }),
}))

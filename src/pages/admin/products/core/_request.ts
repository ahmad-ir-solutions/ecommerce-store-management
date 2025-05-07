import { ProductItem } from "./_modals"


export async function fetchInventory(): Promise<ProductItem[]> {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        Array(50)
          .fill(null)
          .map((_, index) => ({
            id: `${index + 101}`,
            type: "product",
            qty: `0.${index}`,
            image: `/placeholder-${index + 1}.svg?height=40&width=40`,
            sku: `SKU-${80543209 + index}`,
            name: `Product ${index + 1}`,
            inventory: `${10 + index}`,
            price: `${(100 + index * 5).toFixed(2)}`,
            rrp: `${(120 + index * 5).toFixed(2)}`,
            textClass: `class-${index + 1}`,
            priceIncludesVat: index % 2 === 0 ? "Yes" : "No",
            weight: `${(1 + index * 0.1).toFixed(2)}`,
            length: `${(10 + index).toFixed(1)}`,
            width: `${(5 + index).toFixed(1)}`,
            heightDepth: `${(15 + index).toFixed(1)}`,
            warehouse: `Warehouse-${index + 1}`,
            warehouseDetail: `Detail-${index + 1}`,
            brand: `Brand-${index + 1}`,
            ean: `EAN-${1000000000 + index}`,
            upc: `UPC-${2000000000 + index}`,
          })),
      )
    }, 500)
  })
}



// import { ProductItem } from "@/types/product"
// export async function fetchInventory(): Promise<ProductItem[]> {
//   // In a real app, this would be an API call
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(
//         Array(10)
//           .fill(null)
//           .map((_, index) => ({
//             id: `${index + 1}`,
//             type: "product",
//             image: "/placeholder.svg?height=40&width=40",
//             sku: "80543209",
//             skuSuffix: "02553",
//             name: "Xerioff Accento",
//             description: "EDP-S 100ml",
//             ean: "",
//             mpn: "",
//             supplierSku: "",
//             inventory: "06",
//             supplierInventory: "06",
//             outOfStockDate: "",
//             onPurchaseOrder: "0",
//             onBackOrder: "0",
//             soldLast30Days: "0",
//             daysSinceLastOrder: "",
//             stockLocations: "X1-PX1",
//             price: "112.95",
//             cost: "0.00",
//             createDate: "06/03/2025",
//             createTime: "12:13",
//             suppliers: "Designers",
//             suppliersDetail: "Collection",
//             warehouse: "Default",
//             warehouseDetail: "Warehouse",
//           })),
//       )
//     }, 500)
//   })
// }

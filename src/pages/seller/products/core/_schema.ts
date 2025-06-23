export interface ProductFormValues {
    productName: string
    sku: string
    inventory: number
    price: number
    rrp: number
    taxClass: number
    priceIncludesVat: boolean
    weight: number
    length: number | string
    width: number | string
    height: number | string
    warehouse: string
    brand: string
    ean: string
    upc: string
    imageUrl: string
  }
  
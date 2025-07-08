import { WarehouseFormValues } from './_modal'

// Mock API functions
export const fetchWarehouseDetails = async (id: string): Promise<WarehouseFormValues> => {
  console.log(id, "id");
  
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        contactName: "",
        warehouseName: "",
        address: "",
        // address1: "",
        address2: "",
        city: "",
        state: "",
        postcode: "",
        collectionPoint: "",
        country: "UNITED KINGDOME",
        countryCode: "GB",
        handlingTimeInDays: 1,
        // warehouseType: "Default Warehouse",
        // freeProduct: "Search For Product",
      })
    }, 500)
  })
}

export const updateWarehouseDetails = async (id: string, data: WarehouseFormValues): Promise<WarehouseFormValues> => {
    console.log(id, "id");
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 500)
  })
}

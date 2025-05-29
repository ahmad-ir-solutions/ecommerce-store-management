// import { useGetCustomers } from '../../customers/core/hooks/useCustomer'
import type { IOrder, Order, } from "./_modals"

// Transform API order to table row format
export function transformOrderToTableRow(apiOrder: IOrder): Order {
  console.log(apiOrder.customerDetails);
  
// const { data, isLoading, error } = useGetCustomers(apiOrder.customerDetails._id)
// console.log(data, "fsdlkhjflk");

  return {
    id: apiOrder._id,
    ordersFlags: "", // Add logic for flags
    orderId: apiOrder.channelOrderNumber,
    channel: apiOrder.channelPurhasedFrom || "Unknown",
    channelOrderId: apiOrder.channelOrderNumber,
    productSKUs: apiOrder.productDetails.sku,
    orderDate: new Date(apiOrder.orderDate),
    dispatchDate: apiOrder.dispatchedOn ? new Date(apiOrder.dispatchedOn) : null,
    channelDispatchDate: apiOrder.dispatchSentToChannel ? new Date(apiOrder.dispatchSentToChannel) : null,
    customerName: `${apiOrder.customerDetails.firstName} ${apiOrder.customerDetails.lastName}`,
    company: apiOrder.shippingAddress.company || null,
    postcode: apiOrder.shippingAddress.postalCode,
    shippingCountry: apiOrder.shippingAddress.country,
    emailAddress: apiOrder.customerDetails.email,
    total: apiOrder.totalPrice,
    shippingMethod: apiOrder.shippingAndHandling?.shippingMethod || "",
    status: apiOrder.status,
    flagType: apiOrder.status === "processing" ? "P" : null,
  }
}

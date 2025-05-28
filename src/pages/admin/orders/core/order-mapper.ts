// import { useGetCustomers } from '../../customers/core/hooks/useCustomer'
import type { IOrder, OrderDetails, Order, Address, OrderItem, OrderTotals, OrderNote } from "./_modals"

// Transform API order to OrderDetails for components
export function transformOrderToOrderDetails(apiOrder: IOrder): OrderDetails {
  // Transform addresses
  const billingAddress: Address = {
    // name: `${apiOrder.customerDetails.firstName} ${apiOrder.customerDetails.lastName}`,
    firstName: apiOrder.customerDetails.billingAddress.firstName,
    lastName: apiOrder.customerDetails.billingAddress.firstName,
    company: apiOrder.customerDetails.billingAddress.company,
    addressLine1: apiOrder.customerDetails.billingAddress.addressLine1,
    addressLine2: apiOrder.customerDetails.billingAddress.addressLine2,
    city: apiOrder.customerDetails.billingAddress.city,
    county: apiOrder.customerDetails.billingAddress.state,
    postalCode: apiOrder.customerDetails.billingAddress.postalCode,
    country: apiOrder.customerDetails.billingAddress.country,
    phone: apiOrder.customerDetails.billingAddress.phone || "",
  }

  const shippingAddress: Address = {
    firstName: apiOrder.shippingAddress.firstName,
    lastName: apiOrder.shippingAddress.lastName,
    company: apiOrder.shippingAddress.company,
    addressLine1: apiOrder.shippingAddress.addressLine1,
    addressLine2: apiOrder.shippingAddress.addressLine2,
    city: apiOrder.shippingAddress.city,
    country: apiOrder.shippingAddress.country,
    postalCode: apiOrder.shippingAddress.postalCode,
    phone: apiOrder.shippingAddress.phone || "",
  }

  // Transform order items (create mock items based on order data)
  const items: OrderItem[] = [
    {
      id: apiOrder._id,
      sku: apiOrder.productDetails.sku,
      name: `Product ${apiOrder.productDetails}`,
      quantity: apiOrder.quantity,
      unitSubtotal: apiOrder.unitSubtotal,
      taxRate: apiOrder.taxRate,
      taxTotal: apiOrder.taxTotal,
      discount: apiOrder.discount,
      status: apiOrder.status,
      quantityAllocated: apiOrder.quantityAllocated,
      options: apiOrder.itemOptions?.toString(),
    },
  ]

  // Transform totals
  const totals: OrderTotals = {
    subtotal: apiOrder.unitSubtotal * apiOrder.quantity,
    shippingCosts: apiOrder.shippingAndHandling?.shippingCost || 0,
    shippingTax: 0, // Calculate if needed
    discount: apiOrder.discount,
    lineItemsTax: apiOrder.taxTotal,
    total: apiOrder.totalPrice,
    refundedAmount: 0, // Add if available in API
  }

  // Transform notes (create from notes string if available)
  const notes: OrderNote[] = apiOrder.notes
    ? [
        {
          id: "1",
          subject: "Order Note",
          note: apiOrder.notes,
          createdOn: new Date(apiOrder.createdAt),
          createdBy: "System",
        },
      ]
    : []

  return {
    orderId: apiOrder._id,
    status: apiOrder.status,
    customerName: `${apiOrder.customerDetails.firstName} ${apiOrder.customerDetails.lastName}`,
    emailAddress: apiOrder.customerDetails.email,
    channelOrderId: apiOrder.channelOrderNumber,
    shippingMethod: apiOrder.shippingAndHandling?.shippingMethod || "",
    attentionRequired: apiOrder.attentionRequired,
    billingAddress,
    shippingAddress,
    items,
    totals,
    notes,
    orderDate: new Date(apiOrder.orderDate),
    importedDate: new Date(apiOrder.importedFromChannelOn || apiOrder.createdAt),
    trackingNumber: apiOrder.shippingAndHandling?.trackingNumber,
    specialInstructions: apiOrder.shippingAndHandling?.specialInstructions,
    pickerInstructions: apiOrder.shippingAndHandling?.pickerInstructions,
    orderWeight: apiOrder.shippingAndHandling?.orderWeight?.toString(),
    packageSize: apiOrder.shippingAndHandling?.packageSize,
    numberOfParcels: apiOrder.shippingAndHandling?.numberOfParcels?.toString(),
    airNumber: apiOrder.shippingAndHandling?.airNumber,
  }
}

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

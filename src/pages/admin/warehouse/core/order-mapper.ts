import { IOrder } from "../../orders/core/_modals"
import { PickwaveOrder, Warehouse, ChannelDetails, CustomerDetails, ProductDetails, ShippingAndHandling } from "./_modals"

export function transformToPickwaveOrder(order: IOrder): PickwaveOrder {
  // Create a default warehouse entry
  const defaultWarehouse: Warehouse = {
    _id: "default",
    warehouseName: "Default Warehouse",
    warehouseType: "main",
    contactName: "System",
    address: "-",
    city: "-",
    postcode: "-",
    country: "UK",
    countryCode: "GB",
    collectionPoint: "-",
    handlingTimeInDays: 1,
    freeProduct: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  }

  // Create a default channel details entry
  const defaultChannelDetails: ChannelDetails = {
    _id: "default",
    channelId: order.channelDetails || "default",
    channelName: order.channelPurhasedFrom || "Unknown",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  }

  // Transform customer details
  const transformedCustomerDetails: CustomerDetails = {
    _id: "default",
    firstName: order.customerDetails.firstName,
    lastName: order.customerDetails.lastName,
    email: order.customerDetails.email,
    emailCC: order.customerDetails.emailCC,
    phoneNumber: order.customerDetails.phoneNumber || "",
    customerReference: order.customerDetails.customerReference,
    notes: "",
    tags: [],
    billingAddress: order.customerDetails.billingAddress,
    shippingAddress: order.customerDetails.shippingAddress || order.shippingAddress,
    channelDetails: order.channelDetails,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  }

  // Transform product details
  const transformedProductDetails: ProductDetails = {
    _id: order.productDetails._id,
    productName: order.productDetails.productName,
    productType: "default",
    brand: "",
    ean: "",
    upc: "",
    sku: order.productDetails.sku,
    price: order.productDetails.price,
    rrp: 0,
    priceIncludesVat: false,
    taxClass: 0,
    inventory: 0,
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    imageUrl: "",
    warehouse: "default",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  }

  // Transform shipping and handling
  const transformedShippingAndHandling: ShippingAndHandling = {
    shippingMethod: order.shippingAndHandling?.shippingMethod || "Standard",
    channelShippingMethod: order.shippingAndHandling?.channelShippingMethod || "Standard",
    shippingCost: order.shippingAndHandling?.shippingCost || 0,
    trackingNumber: order.shippingAndHandling?.trackingNumber || "",
    airNumber: order.shippingAndHandling?.airNumber || "",
    numberOfParcels: order.shippingAndHandling?.numberOfParcels || 1,
    packageSize: order.shippingAndHandling?.packageSize || "Medium",
    orderWeight: order.shippingAndHandling?.orderWeight || 0,
    overrideWeight: order.shippingAndHandling?.overrideWeight || false,
    pickerInstructions: order.shippingAndHandling?.pickerInstructions || "",
    specialInstructions: order.shippingAndHandling?.specialInstructions || "",
    updateOrderTotal: order.shippingAndHandling?.updateOrderTotal || false
  }

  return {
    ...order,
    warehouse: [defaultWarehouse],
    channelDetails: [defaultChannelDetails],
    customerDetails: transformedCustomerDetails,
    productDetails: transformedProductDetails,
    shippingAndHandling: transformedShippingAndHandling,
    sellerId: order.sellerId || "default",
    id: order._id,
    channel: order.channelPurhasedFrom || "Unknown",
    multipleLines: order.quantity > 1,
    productSKU: order.productDetails.sku,
    stockLocations: "-",
    warehouseLocations: "-",
    packageSize: order.shippingAndHandling?.packageSize || "-",
    orderWeight: order.shippingAndHandling?.orderWeight || 0,
    shippingMethod: order.shippingAndHandling?.shippingMethod || "-",
    postCode: order.shippingAddress?.postalCode || "-"
  }
} 
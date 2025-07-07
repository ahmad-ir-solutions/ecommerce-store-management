import { Button } from "@/components/ui/button"
import { ReusableTable } from "@/components/shared/reusableTable"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { Eye, Package } from "lucide-react"
import { useCreateOrder } from "@/pages/admin/orders/core/hooks/use-orders"
import { showErrorMessage } from "@/lib/utils/messageUtils"
import { useAuthStore } from "@/store/authStore"
import { useUpdateWooCommerceOrderStatus } from "../core/hooks/useWoocommerceOrders"


export interface OrderPayload {
    productDetails: string;
    channelSiteUrl?: string;
    customerDetails: CustomerDetails;
    channelDetails?: string;
    companyIdentity?: string;
    channelPurhasedFrom?: string;
    channelOrderNumber?: string;
    orderStatus?: string;
    attentionRequired: boolean;
    sellerId?: string;
    quantity: number;
    itemOptions?: number;
    quantityAllocated?: number;
    unitSubtotal?: number;
    taxRate?: number;
    taxTotal?: number;
    discount?: number;
    totalPrice: number;
    status?: string;
    orderDate: string;
    importedFromChannelOn?: string;
    assignedToPickerOn?: string;
    dispatchedOn?: string;
    dispatchSentToChannel?: string;
    paymentId?: string;
    deliveredOn?: string;
    manifestedOn?: string;
    designatedPicker?: string;
    signedForBy?: string;
    shippingAndHandling: ShippingAndHandling;
    notes?: Note[];
    // pickwave?: string;
    // scannedQuantity?: number;
    // royalMailLabelUrl?: string;
    // trackingNumber?: string;
    // refundedAmount?: string;
  }
  
  export interface CustomerDetails {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: Address;
    billingAddress: BillingShippingAddress;
    shippingAddress: BillingShippingAddress;
    channelDetails: string;
  }
  
  export interface Address {
    firstName: string;
    lastName: string;
    company: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  
  export interface BillingShippingAddress extends Address {
    phone: string;
  }
  
  export interface ShippingAndHandling {
    // warehouse?: string; //id
    shippingMethod: string;
    // updateOrderTotal: boolean;
    // shippingCost?: number;
    // channelShippingMethod?: string;
    // trackingNumber: string;
    // specialInstructions: string;
    // pickerInstructions: string;
    // orderWeight: number;
    // overrideWeight?: boolean;
    // packageSize?: string;
    // numberOfParcels?: number;
    // airNumber?: string;
  }
  
  export interface Note {
    subject: string;
    note: string;
  }

interface WooCommerceOrder {
  _id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  status: string
  total: string
  currency: string
  currencySymbol: string
  dateCreated: string
  paymentMethod: string
  itemsCount: number
  siteUrl: string
  customerNote: string
}

interface PlatformOrdersTabProps {
  orders: any[]
  isLoading: boolean
  onRefresh: () => void
}

export function PlatformOrdersTab({ orders, isLoading, onRefresh }: PlatformOrdersTabProps) {
  const { mutate: createOrder, isPending: isCreatingOrder } = useCreateOrder()
  const { mutate: updateWooCommerceOrderStatus } = useUpdateWooCommerceOrderStatus()
  const authStore = useAuthStore()
  // Map WooCommerce orders to display format
  const mappedOrders: WooCommerceOrder[] = orders.map((order: any) => ({
    _id: String(order.id),
    orderNumber: order.number || `#${order.id}`,
    customerName: `${order.billing?.first_name || ""} ${order.billing?.last_name || ""}`.trim() || "N/A",
    customerEmail: order.billing?.email || "N/A",
    status: order.status || "unknown",
    total: order.total || "0",
    currency: order.currency || "USD",
    currencySymbol: order.currency_symbol || "$",
    dateCreated: order.date_created ? new Date(order.date_created).toLocaleDateString() : "N/A",
    paymentMethod: order.payment_method_title || order.payment_method || "N/A",
    itemsCount: order.line_items?.length || 0,
    siteUrl: order.siteUrl || "",
    customerNote: order.customer_note || "",
  }))

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "refunded":
        return "bg-gray-100 text-gray-800"
      case "failed":
        return "bg-red-100 text-red-800"
      case "on-hold":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
//   console.log(authStore.user?._id);

  const handlePlaceOrder = async (orderId: string) => {
    const orderData = orders.find((order) => String(order.id) === orderId)

    try {
      // Calculate totals
      const subtotal =
        Number.parseFloat(orderData.total) -
        Number.parseFloat(orderData.total_tax || "0") -
        Number.parseFloat(orderData.shipping_total || "0")
      const taxRate = subtotal > 0 ? (Number.parseFloat(orderData.total_tax || "0") / subtotal) * 100 : 0
    //   const totalQuantity = orderData.line_items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 1

      // Create payload matching the target structure
    const payload = {
        productDetails: orderData.line_items?.[0]?.sku || "", 
        channelSiteUrl: orderData.siteUrl,
        customerDetails: {
          firstName: orderData.billing?.first_name || "",
          lastName: orderData.billing?.last_name || "",
          email: orderData.billing?.email || "",
          phone: orderData.billing?.phone || "",
          address: {
            firstName: orderData.billing?.first_name || "",
            lastName: orderData.billing?.last_name || "",
            company: orderData.billing?.company || "",
            addressLine1: orderData.billing?.address_1 || "",
            addressLine2: orderData.billing?.address_2 || "",
            city: orderData.billing?.city || "",
            state: orderData.billing?.state || "",
            postalCode: orderData.billing?.postcode || "",
            country: orderData.billing?.country || ""
          },
          billingAddress: {
            firstName: orderData.billing?.first_name || "",
            lastName: orderData.billing?.last_name || "",
            company: orderData.billing?.company || "",
            addressLine1: orderData.billing?.address_1 || "",
            addressLine2: orderData.billing?.address_2 || "",
            city: orderData.billing?.city || "",
            state: orderData.billing?.state || "",
            postalCode: orderData.billing?.postcode || "",
            country: orderData.billing?.country || "",
            phone: orderData.billing?.phone || ""
          },
          shippingAddress: {
            // firstName: orderData.shipping?.first_name || "",
            // lastName: orderData.shipping?.last_name || "",
            // company: orderData.shipping?.company || "",
            // addressLine1: orderData.shipping?.address_1 || "",
            // addressLine2: orderData.shipping?.address_2 || "",
            // city: orderData.shipping?.city || "",
            // state: orderData.shipping?.state || "",
            // postalCode: orderData.shipping?.postcode || "",
            // country: orderData.shipping?.country || "",
            // phone: orderData.shipping?.phone || ""
            firstName: orderData.billing?.first_name || "",
            lastName: orderData.billing?.last_name || "",
            company: orderData.billing?.company || "",
            addressLine1: orderData.billing?.address_1 || "",
            addressLine2: orderData.billing?.address_2 || "",
            city: orderData.billing?.city || "",
            state: orderData.billing?.state || "",
            postalCode: orderData.billing?.postcode || "",
            country: orderData.billing?.country || "",
            phone: orderData.billing?.phone || ""
          },
          channelDetails: "683439042a58921247c01beb"
        },
      
        channelDetails: "683439042a58921247c01beb",
        companyIdentity: "example-company",
        channelPurhasedFrom: "WooCommerce",
        channelOrderNumber: orderData.number || `WC-${orderData.id}`,
        orderStatus: orderData.status,
        attentionRequired: true,
        sellerId: authStore.user?._id,
      
        quantity: orderData.line_items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 1,
        itemOptions: orderData.line_items?.length || 1,
        quantityAllocated: orderData.line_items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 1,
        unitSubtotal: parseFloat(orderData.line_items?.[0]?.price || "0"),
        taxRate: taxRate, // computed earlier
        taxTotal: parseFloat(orderData.total_tax || "0"),
        discount: parseFloat(orderData.discount_total || "0"),
        totalPrice: parseFloat(orderData.total || "0"),
        status: orderData.status,
      
        orderDate: orderData.date_created,
        importedFromChannelOn: new Date().toISOString(),
        assignedToPickerOn: new Date().toISOString(),
        dispatchedOn: "sample",
        dispatchSentToChannel: "sample",
        paymentId: orderData.transaction_id || `PAY-${orderData.id}`,
        deliveredOn: "sample",
        manifestedOn: "sample",
        designatedPicker: "sample",
        signedForBy: "sample",
      
        shippingAndHandling: {
          warehouse: "6836ad6a7ad0996826a6e132",
          shippingMethod: "Standard",
          updateOrderTotal: true,
          shippingCost: parseFloat(orderData.shipping_total || "0"),
          channelShippingMethod: orderData.payment_method_title || "N/A",
          trackingNumber: "TRACK" + orderData.id,
          specialInstructions: orderData.customer_note || "",
          pickerInstructions: "",
          orderWeight: 2.5, // mock or computed
          overrideWeight: false,
          packageSize: "Medium",
          numberOfParcels: 1,
          airNumber: ""
        },
      
        notes: [
          {
            subject: "Imported from WooCommerce",
            note: `Order ID ${orderData.id}`
          }
        ]
      }

      await createOrder(payload)
      await updateWooCommerceOrderStatus({orderId: orderData.id, data: {siteUrl: orderData.siteUrl, newStatus: "pending" }})
         onRefresh()

    } catch (error) {
      console.error("Error placing order:", error)
      showErrorMessage("Failed to place order for fulfilment")
    }
  }

  const orderColumns = [
    {
      key: "checkbox",
      title: "",
      render: (
        row: WooCommerceOrder,
        selectedRows?: string[],
        toggleSelectRow?: (id: string) => void,
        toggleSelectAll?: () => void,
        isAllSelected?: boolean,
      ) => {
        if (row._id === "header") {
          return <Checkbox checked={isAllSelected || false} onCheckedChange={toggleSelectAll} />
        }
        return (
          <Checkbox
            checked={selectedRows?.includes(row._id) || false}
            onCheckedChange={() => toggleSelectRow?.(row._id)}
          />
        )
      },
      width: "50px",
    },
    {
      key: "orderNumber",
      title: "Order #",
      render: (row: WooCommerceOrder) => (
        <Link
          to={`/order-details/${row._id}?siteUrl=${encodeURIComponent(row.siteUrl)}`}
          className="text-[#024AFE] font-medium hover:underline"
        >
          {row.orderNumber}
        </Link>
      ),
      width: "120px",
    },
    {
      key: "customerName",
      title: "Customer",
      render: (row: WooCommerceOrder) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.customerName}</span>
          <span className="text-sm text-gray-500">{row.customerEmail}</span>
        </div>
      ),
      width: "200px",
    },
    {
      key: "status",
      title: "Status",
      render: (row: WooCommerceOrder) => (
        <Badge variant="secondary" className={`capitalize ${getStatusColor(row.status)}`}>
          {row.status.replace("-", " ")}
        </Badge>
      ),
      width: "120px",
    },
    {
      key: "total",
      title: "Total",
      render: (row: WooCommerceOrder) => (
        <span className="font-medium">
          {row.currencySymbol}
          {Number.parseFloat(row.total).toLocaleString()}
        </span>
      ),
      width: "100px",
    },
    {
      key: "itemsCount",
      title: "Quantity",
      render: (row: WooCommerceOrder) => <span className="text-center block">{row.itemsCount}</span>,
      width: "80px",
    },
    {
      key: "paymentMethod",
      title: "Payment",
      render: (row: WooCommerceOrder) => <span className="text-sm">{row.paymentMethod}</span>,
      width: "140px",
    },
    {
      key: "dateCreated",
      title: "Date",
      render: (row: WooCommerceOrder) => <span className="text-sm">{row.dateCreated}</span>,
      width: "120px",
    },
    {
      key: "action",
      title: "Actions",
      render: (row: WooCommerceOrder) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" asChild className="p-2 bg-transparent">
            <Link to={`/order-details/${row._id}?siteUrl=${encodeURIComponent(row.siteUrl)}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            size="sm"
            variant="default"
            type="button"
            onClick={() => handlePlaceOrder(row._id)}
            disabled={isCreatingOrder}
            className="p-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Package className="w-4 h-4 mr-1" />
            {isCreatingOrder ? "Placing..." : "Place Order"}
          </Button>
        </div>
      ),
      width: "180px",
    },
  ]

  return (
    <div>
    {/* Orders Table */}
      <ReusableTable
        // title="Platform Orders"
        data={mappedOrders}
        columns={orderColumns}
        itemsPerPage={10}
        isLoading={isLoading}
        className="mt-0"
      />
    </div>
  )
}

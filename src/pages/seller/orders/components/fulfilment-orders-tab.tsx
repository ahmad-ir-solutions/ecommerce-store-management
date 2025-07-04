
import { ReusableTable } from "@/components/shared/reusableTable"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Link } from "react-router-dom"
import { useGetFulfilmentOrders } from "../core/hooks/useWoocommerceOrders"

interface FulfilmentOrder {
  _id: string
  channelOrderNumber: string
  customerName: string
  customerEmail: string
  orderStatus: string
  totalPrice: number
  dateCreated: string
  trackingNumber: string | null
  productName: string
  productSku: string
  quantity: number
  channelName: string
  warehouseName: string
  shippingMethod: string
  packageSize: string
  orderWeight: number
  postCode: string
  companyIdentity: string
  orderDate: string
  designatedPicker: string
  designatedPacker: string
}

export function FulfilmentOrdersTab() {
//   const [selectedRows, setSelectedRows] = useState<string[]>([])
  const { data: fulfilmentOrdersResponse, isLoading} = useGetFulfilmentOrders()

  console.log(fulfilmentOrdersResponse, "fulfilmentOrdersResponse")

  const fulfilmentOrders = fulfilmentOrdersResponse?.orders || []

  // Map the API data to our interface
  const mappedOrders: FulfilmentOrder[] = fulfilmentOrders.map((order: any) => ({
    _id: order._id,
    channelOrderNumber: order.channelOrderNumber || "N/A",
    customerName: `${order.customerDetails?.firstName || ""} ${order.customerDetails?.lastName || ""}`.trim() || "N/A",
    customerEmail: order.customerDetails?.email || "N/A",
    orderStatus: order.orderStatus || order.status || "unknown",
    totalPrice: order.totalPrice || 0,
    dateCreated: order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A",
    trackingNumber: order.shippingAndHandling?.trackingNumber || order.trackingNumber || null,
    productName: order.productDetails?.productName || "N/A",
    productSku: order.productDetails?.sku || "N/A",
    quantity: order.quantity || 0,
    channelName: order.channelDetails?.[0]?.channelName || order.channelPurhasedFrom || "N/A",
    warehouseName: order.shippingAndHandling?.warehouse?.[0]?.warehouseName || order.productDetails?.warehouse || "N/A",
    shippingMethod: order.shippingAndHandling?.shippingMethod || "N/A",
    packageSize: order.shippingAndHandling?.packageSize || "N/A",
    orderWeight: order.shippingAndHandling?.orderWeight || 0,
    postCode: order.customerDetails?.shippingAddress?.postalCode || order.shippingAddress?.postalCode || "N/A",
    companyIdentity: order.companyIdentity || "N/A",
    orderDate: order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A",
    designatedPicker: order.designatedPicker || "N/A",
    designatedPacker: order.designatedPacker || "N/A",
  }))

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
      case "dispatched":
        return "bg-purple-100 text-purple-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "manifested":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

//   const toggleSelectRow = (id: string) => {
//     setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
//   }

//   const toggleSelectAll = () => {
//     setSelectedRows((prev) => (prev.length === mappedOrders.length ? [] : mappedOrders.map((order) => order._id)))
//   }

  const fulfilmentColumns = [
    {
      key: "checkbox",
      title: "",
      render: (
        row: FulfilmentOrder,
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
      key: "warehouseName",
      title: "Warehouse",
      render: (row: FulfilmentOrder) => (
        <div className="flex items-center gap-2">
          {/* <Package className="w-4 h-4 text-gray-500" /> */}
          <span className="text-sm">{row.warehouseName}</span>
        </div>
      ),
      width: "120px",
    },
    {
      key: "companyIdentity",
      title: "Company Identity",
      render: (row: FulfilmentOrder) => <span className="text-sm">{row.companyIdentity}</span>,
      width: "130px",
    },
    {
      key: "channelName",
      title: "Channel",
      render: (row: FulfilmentOrder) => (
        <div className="flex items-center gap-2">
          {/* {row.channelName === "Amazon" && <span className="text-orange-600 font-medium">📦</span>} */}
          {row.channelName === "TikTok" && <span className="text-black font-medium">🎵</span>}
          <span className="text-sm font-medium">{row.channelName}</span>
        </div>
      ),
      width: "100px",
    },
    {
      key: "orderStatus",
      title: "Order Flags",
      render: (row: FulfilmentOrder) => (
        <Badge variant="secondary" className={`capitalize ${getStatusColor(row.orderStatus)}`}>
          {row.orderStatus.replace("-", " ")}
        </Badge>
      ),
      width: "120px",
    },
    {
      key: "channelOrderNumber",
      title: "Channel Order ID",
      render: (row: FulfilmentOrder) => (
        <Link to={`/seller/orders/fulfilment-order-details/${row._id}`} className="text-[#024AFE] font-medium hover:underline">
          {row.channelOrderNumber}
        </Link>
      ),
      width: "140px",
    },
    {
      key: "customerName",
      title: "Channel Order Ref",
      render: (row: FulfilmentOrder) => (
        <div className="flex flex-col">
          <span className="font-medium text-sm">{row.customerName}</span>
          <span className="text-xs text-gray-500">{row.customerEmail}</span>
        </div>
      ),
      width: "160px",
    },
    {
      key: "orderDate",
      title: "Order Date",
      render: (row: FulfilmentOrder) => <span className="text-sm">{row.orderDate}</span>,
      width: "100px",
    },
    {
      key: "quantity",
      title: "Quantity",
      render: (row: FulfilmentOrder) => (
        <span className="block text-sm">{row.quantity}</span>
      ),
      width: "100px",
    },
    {
      key: "productSku",
      title: "Product SKU",
      render: (row: FulfilmentOrder) => <span className="text-sm font-mono">{row.productSku}</span>,
      width: "120px",
    },
    {
      key: "warehouseName",
      title: "Stock Locations",
      render: (row: FulfilmentOrder) => <span className="text-sm">{row.warehouseName}</span>,
      width: "120px",
    },
    {
      key: "designatedPicker",
      title: "Warehouse Zone",
      render: (row: FulfilmentOrder) => (
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Picker:</span>
          <span className="text-sm">{row.designatedPicker}</span>
        </div>
      ),
      width: "120px",
    },
    {
      key: "packageSize",
      title: "Package Size",
      render: (row: FulfilmentOrder) => <span className="text-sm">{row.packageSize}</span>,
      width: "100px",
    },
    {
      key: "orderWeight",
      title: "Order Weight",
      render: (row: FulfilmentOrder) => <span className="text-sm">{row.orderWeight} kg</span>,
      width: "100px",
    },
    {
      key: "shippingMethod",
      title: "Shipping Method",
      render: (row: FulfilmentOrder) => <span className="text-sm">{row.shippingMethod}</span>,
      width: "140px",
    },
    {
      key: "postCode",
      title: "Post Code",
      render: (row: FulfilmentOrder) => (
        <div className="flex items-center gap-1">
          {/* <MapPin className="w-3 h-3 text-gray-500" /> */}
          <span className="text-sm">{row.postCode}</span>
        </div>
      ),
      width: "100px",
    },
    // {
    //   key: "action",
    //   title: "Actions",
    //   render: (row: FulfilmentOrder) => (
    //     <div className="flex gap-2">
    //       <Button size="sm" variant="outline" asChild className="p-2 bg-transparent">
    //         <Link to={`/seller/orders/order-details/${row._id}`}>
    //           <Eye className="w-4 h-4" />
    //         </Link>
    //       </Button>
    //       {row.trackingNumber && (
    //         <Button
    //           size="sm"
    //           variant="default"
    //           onClick={() => {
    //             // Handle track order
    //             window.open(`https://track.royalmail.com/track/${row.trackingNumber}`, "_blank")
    //           }}
    //           className="p-2 bg-blue-600 hover:bg-blue-700 text-white"
    //         >
    //           <Truck className="w-4 h-4" />
    //         </Button>
    //       )}
    //     </div>
    //   ),
    //   width: "120px",
    // },
  ]

  return (
    <div>
      {/* Fulfilment Orders Table */}
      <ReusableTable
        // title="Fulfilment Orders"
        data={mappedOrders}
        columns={fulfilmentColumns}
        itemsPerPage={10}
        isLoading={isLoading}
        // selectedRows={selectedRows}
        // toggleSelectRow={toggleSelectRow}
        // toggleSelectAll={toggleSelectAll}
        // isAllSelected={selectedRows.length === mappedOrders.length && mappedOrders.length > 0}
      />
    </div>
  )
}

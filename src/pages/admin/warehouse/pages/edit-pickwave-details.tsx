import { useState, useEffect } from "react"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Switch } from "@/components/ui/switch"
import { useGetPickwave, useScanProduct } from "../core/hooks/usePickwave"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

interface OrderItem {
  _id: string
  sku: string
  orderNumber: string
  productName: string
  stockLocation: string
  quantityOrdered: number
  orderStatus: string
  shippingMethod: string
}

interface Order {
  _id: string
  productDetails: {
    _id: string
    productName: string
    sku: string
    warehouse: string
  }
  channelOrderNumber: string
  quantity: number
  orderStatus: string
  shippingAndHandling: {
    shippingMethod: string
  }
}

interface PickwaveData {
  _id: string
  orders: Order[]
  status: string
  tag: string | null
  createdBy: string
  createdAt: string
  splitByCourier: boolean
  restrictedByWarehouseZone: boolean
  priorityWarehouseZone: string[]
  updatedAt: string
}

// Add this before the EditPickwaveDetailsPage component
const scanProductSchema = z.object({
  dispatchDate: z.string().min(1, "Dispatch date is required"),
  skuBarcode: z.string().min(1, "SKU/Barcode is required"),
  quantity: z.string()
    .min(1, "Quantity is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Quantity must be a positive number"
    })
})

type ScanProductFormValues = z.infer<typeof scanProductSchema>

export function EditPickwaveDetailsPage() {
  const params = useParams()
  const pickwaveId = params.pickwaveId as string
  const [groupByOrders, setGroupByOrders] = useState(false)
  const [selectedRows, setSelectedRows] = useState<boolean[]>([])

  // Initialize form
  const form = useForm<ScanProductFormValues>({
    resolver: zodResolver(scanProductSchema),
    defaultValues: {
      dispatchDate: "",
      skuBarcode: "",
      quantity: ""
    }
  })

  // Fetch pickwave data
   const { data: pickwaveData, isLoading } = useGetPickwave(pickwaveId)
  const { mutate: scanMutation } = useScanProduct()

  const [orderItems, setOrderItems] = useState<OrderItem[]>([])

  useEffect(() => {
    if (pickwaveData) {
      // Transform orders data into OrderItem format
      const transformedOrders = (pickwaveData as unknown as PickwaveData).orders.map(order => ({
        _id: order._id,
        sku: order.productDetails.sku,
        orderNumber: order.channelOrderNumber,
        productName: order.productDetails.productName,
        stockLocation: order.productDetails.warehouse,
        quantityOrdered: order.quantity,
        orderStatus: order.orderStatus,
        shippingMethod: order.shippingAndHandling.shippingMethod
      }))
      setOrderItems(transformedOrders)
      setSelectedRows(new Array(transformedOrders.length).fill(false))
    }
  }, [pickwaveData])

  const handleUpdateOrder = () => {
    // Handle order update logic
    console.log("Order updated")
  }

  const handleScan = (data: ScanProductFormValues) => {
    // Handle scan logic
    console.log("dispatchDate", data.dispatchDate, "Product scanned:", data.skuBarcode, "Quantity:", data.quantity, "pickwaveId:", pickwaveId)
    const scanPayload = {dispatchDate: data.dispatchDate,quantity: Number(data.quantity), orderId: data.skuBarcode, pickwaveId}
    console.log(scanPayload);
    scanMutation(scanPayload)
    form.reset()
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(new Array(orderItems.length).fill(checked))
  }

  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelectedRows = [...selectedRows]
    newSelectedRows[index] = checked
    setSelectedRows(newSelectedRows)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
      </div>
    )
  }

  return (
    <div>
      <Header title="Warehouse">
        <Button variant="filter">Pre-Dispatched Labels</Button>
        <Button variant="filter">Pre-Dispatched Actions</Button>
        <Button variant="filter">Print Scanned Invoices</Button>
        <Button variant="filter">Print Dispacthed Labels</Button>
        <Button variant="filter">Get All Barcodes</Button>
      </Header>
      <div className="mt-6">
        {/* Pickwave Details Section */}
        <div className="bg-white rounded-2xl shadow-none mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Pickwave Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-4 text-[#4E5967] font-normal text-sm">
              <div className="space-y-1 md:col-span-1">
                <div className="flex justify-between">
                  <span className="">Pickwave ID</span>
                  <span>{pickwaveData?._id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="">Created Date</span>
                  <span>{new Date(pickwaveData?.createdAt || "").toLocaleDateString()}</span>
                </div>

                <div className="flex justify-between">
                  <span className="">Outstanding / Total Orders</span>
                  <span>
                    {pickwaveData?.orders.length} / {pickwaveData?.orders.length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="">Created By</span>
                  <span>{pickwaveData?.createdBy}</span>
                </div>
              </div>
              <div className="space-y-1 md:col-span-1">
                <div className="flex justify-between">
                  <span className=" mr-4">Tag</span>
                  <Input
                    value={pickwaveData?.tag || ""}
                    onChange={(e) => console.log("Tag updated:", e.target.value)}
                    className="w-64 h-8 border-gray-200"
                  />
                </div>

                <div className="flex justify-between">
                  <span className="">Pickwave Status</span>
                  <span>{pickwaveData?.status}</span>
                </div>

                <div className="flex justify-between">
                  <span className="mr-4">Pickwave Message</span>
                  <Textarea
                    value=""
                    onChange={(e) => console.log("Message updated:", e.target.value)}
                    className="w-64 h-24 border-gray-200"
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <div className=" col-span-1"></div>
                  <Button
                    onClick={handleUpdateOrder}
                    className="text-[#024AFE] hover:text-[#0206fe] bg-transparent hover:bg-transparent p-0 shadow-none underline"
                  >
                    Update Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scan Product Section */}
        <div className="bg-white rounded-2xl shadow-none mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Scan Product</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleScan)} className="flex flex-wrap gap-6 items-center bg-[#ECF6FF] rounded-l-xl rounded-r-xl p-6">
                <FormField
                  control={form.control}
                  name="dispatchDate"
                  render={({ field }) => (
                    <div className="block">
                      <FormItem className="flex items-center gap-2">
                        <FormLabel className="whitespace-nowrap">Dispatch Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            {...field}
                            className="bg-white border-gray-200 rounded-md h-8.5"
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage className="text-red-500 text-xs" />
                    </div>)}
                />

                <FormField
                  control={form.control}
                  name="skuBarcode"
                  render={({ field }) => (
                    <div className="block">
                      <FormItem className="flex items-center gap-2">
                        <FormLabel className="whitespace-nowrap">Enter SKU/Barcode</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            className="bg-white border-gray-200 rounded-md h-8"
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage  className="text-red-500 text-xs"/>
                    </div>)}
                />

                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <div className="block">
                      <FormItem className="flex items-center gap-2">
                        <FormLabel className="whitespace-nowrap">Enter Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            {...field}
                            className="bg-white border-gray-200 rounded-md h-8"
                          />
                        </FormControl>
                      </FormItem>
                      <FormMessage  className="text-red-500 text-xs"/>
                    </div>)}
                />

                <Button type="submit" className="bg-[#024AFE] hover:bg-[#0206fe] text-white">
                  Scan
                </Button>
              </form>
            </Form>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-none">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-between gap-4 w-full">
                <div className="relative inline-block text-left">
                  <div>
                    <Button variant="outline" className="h-8 text-sm">
                      Export Selected
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="group-orders" className="text-sm">
                    Group By Orders
                  </label>
                  <Switch
                    id="group-orders"
                    checked={groupByOrders}
                    onCheckedChange={setGroupByOrders}
                  />
                </div>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-[#ECF6FF] border-none rounded-lg">
                  <TableHead className="w-10 p-3 rounded-tl-lg rounded-bl-lg">
                    <Checkbox
                      checked={selectedRows.every(Boolean) && orderItems.length > 0}
                      onCheckedChange={handleSelectAll}
                      disabled={orderItems.length === 0}
                    />
                  </TableHead>
                  <TableHead className="p-3">Ordered SKU</TableHead>
                  <TableHead className="p-3">Channel Order ID</TableHead>
                  <TableHead className="p-3">Product Name</TableHead>
                  <TableHead className="p-3">Stock Locations</TableHead>
                  <TableHead className="p-3">Quantity Ordered</TableHead>
                  <TableHead className="p-3">Order Status</TableHead>
                  <TableHead className="p-3 rounded-tr-lg rounded-br-lg">Shipping Method</TableHead>
                </TableRow>
                <TableRow className="text-[#11263C] text-sm border-b border-gray-200">
                  <TableCell className="p-3 text-start"></TableCell>
                  <TableCell className="p-3 text-start">
                    <Input placeholder="Filter SKU" className="w-full bg-white border-gray-200 rounded-md h-8" />
                  </TableCell>
                  <TableCell className="p-3 text-start">
                    <Input placeholder="Filter Channel Order ID" className="w-full bg-white border-gray-200 rounded-md h-8" />
                  </TableCell>
                  <TableCell className="p-3 text-start">
                    <Input placeholder="Filter Product Name" className="w-full bg-white border-gray-200 rounded-md h-8" />
                  </TableCell>
                  <TableCell className="p-3 text-start"></TableCell>
                  <TableCell className="p-3 text-start"></TableCell>
                  <TableCell className="p-3 text-start">
                    <Input placeholder="Filter Order Status" className="w-full bg-white border-gray-200 rounded-md h-8" />
                  </TableCell>
                  <TableCell className="p-3 text-start"></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderItems.map((item, index) => (
                  <TableRow key={index} className="text-[#11263C] text-sm border-b border-gray-200">
                    <TableCell className="p-3">
                      <Checkbox
                        checked={selectedRows[index]}
                        onCheckedChange={(checked: boolean) => handleRowSelect(index, checked)}
                      />
                    </TableCell>
                    <TableCell className="p-3 text-start">{item._id}</TableCell>
                    <TableCell className="p-3 text-start">{item.orderNumber}</TableCell>
                    <TableCell className="p-3 text-start">{item.productName}</TableCell>
                    <TableCell className="p-3 text-start">{item.stockLocation}</TableCell>
                    <TableCell className="p-3 text-start">{item.quantityOrdered}</TableCell>
                    <TableCell className="p-3 text-start">{item.orderStatus}</TableCell>
                    <TableCell className="p-3 text-start">{item.shippingMethod}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPickwaveDetailsPage;

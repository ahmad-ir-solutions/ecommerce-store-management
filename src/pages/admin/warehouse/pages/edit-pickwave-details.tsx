import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useParams } from "react-router-dom"
import { Header } from "@/components/shared/header"
import { Switch } from "@/components/ui/switch"
// Assuming you have an icon component, e.g., from react-icons
// import { FiCheck } from "react-icons/fi";

interface PickwaveDetails {
  id: string
  createdDate: string
  outstandingOrders: number
  totalOrders: number
  picker: string
  tag: string
  status: string
  message: string
}

interface OrderItem {
  sku: string
  orderNumber: string
  productName: string
  stockLocation: string
  quantityOrdered: number
  orderStatus: number
  shippingMethod: string
}

export function EditPickwaveDetailsPage() {
  const params = useParams()
  const pickwaveId = params.pickwaveId as string
  const [dispatchDate, setDispatchDate] = useState("17/03/2025")
  const [skuBarcode, setSkuBarcode] = useState("")
  const [quantity, setQuantity] = useState("")

  const [pickwaveDetails, setPickwaveDetails] = useState<PickwaveDetails>({
    id: pickwaveId,
    createdDate: "17/03/2025",
    outstandingOrders: 150,
    totalOrders: 150,
    picker: "Adnan",
    tag: "",
    status: "Open",
    message: "",
  })

  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      sku: "19-YXTR-YMFJ",
      orderNumber: "19-YXTR-YMFJ",
      productName: "AFNAN 9PM GIFT SET SHOWER GEL 150ML EDP 100ML DEO SPRAY 150ML",
      stockLocation: "A1-PA1",
      quantityOrdered: 1,
      orderStatus: 0,
      shippingMethod: "Standard",
    },
    {
      sku: "19-YXTR-YMFJ",
      orderNumber: "19-YXTR-YMFJ",
      productName: "AFNAN 9PM GIFT SET SHOWER GEL 150ML EDP 100ML DEO SPRAY 150ML",
      stockLocation: "A1-PA1",
      quantityOrdered: 1,
      orderStatus: 0,
      shippingMethod: "Standard",
    },
    {
      sku: "19-YXTR-YMFJ",
      orderNumber: "19-YXTR-YMFJ",
      productName: "AFNAN 9PM GIFT SET SHOWER GEL 150ML EDP 100ML DEO SPRAY 150ML",
      stockLocation: "A1-PA1",
      quantityOrdered: 1,
      orderStatus: 0,
      shippingMethod: "Standard",
    },
  ])
console.log(setOrderItems);

  const [groupByOrders, setGroupByOrders] = useState(false);
  const [selectedRows, setSelectedRows] = useState<boolean[]>([]);

  useEffect(() => {
    // Initialize selectedRows when orderItems change
    setSelectedRows(new Array(orderItems.length).fill(false));
  }, [orderItems]);

  // Simulate fetching data based on ID
  useEffect(() => {
    // In a real application, you would fetch the data from an API
    console.log(`Fetching pickwave details for ID: ${pickwaveId}`)
    // For now, we're using the default state values
    setSkuBarcode("")
    setQuantity("")
  }, [pickwaveId])

  const handleUpdateOrder = () => {
    // Handle order update logic
    console.log("Order updated")
  }

  const handleScan = () => {
    // Handle scan logic
    console.log("Product scanned:", skuBarcode, "Quantity:", quantity)
    setSkuBarcode("")
    setQuantity("")
  }

  // const handleExportSelected = () => {
  //   const selectedData = orderItems.filter((_, index) => selectedRows[index]);
  //   // TODO: Implement CSV export logic for selectedData
  //   console.log("Exporting selected rows:", selectedData);
  // }

  const handleSelectAll = (checked: boolean) => {
    setSelectedRows(new Array(orderItems.length).fill(checked));
  }

  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[index] = checked;
    setSelectedRows(newSelectedRows);
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-4 text-[#4E5967] font-normal">
              <div className="space-y-1 md:col-span-1">
                <div className="flex justify-between">
                  <span className="">Pickwave ID</span>
                  <span>{pickwaveDetails.id}</span>
                </div>

                <div className="flex justify-between">
                  <span className="">Created Date</span>
                  <span>{pickwaveDetails.createdDate}</span>
                </div>

                <div className="flex justify-between">
                  <span className="">Outstanding / Total Orders</span>
                  <span>
                    {pickwaveDetails.outstandingOrders} / {pickwaveDetails.totalOrders}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="">Picker</span>
                  <span>{pickwaveDetails.picker}</span>
                </div>
              </div>
              <div className="space-y-1 md:col-span-1">
                <div className="flex justify-between">
                  <span className=" mr-4">Tag</span>
                  <Input
                    value={pickwaveDetails.tag}
                    onChange={(e) => setPickwaveDetails({ ...pickwaveDetails, tag: e.target.value })}
                    className="w-64 h-8 border-gray-200"
                  />
                </div>

                <div className="flex justify-between">
                  <span className="">Pickwave Status</span>
                  <span>{pickwaveDetails.status}</span>
                </div>


                <div className="flex justify-between">
                  <span className="mr-4">Pickwave Message</span>
                  <Textarea
                    value={pickwaveDetails.message}
                    onChange={(e) => setPickwaveDetails({ ...pickwaveDetails, message: e.target.value })}
                    className="w-64 h-24 border-gray-200"
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <div className=" col-span-1"></div>
                  <Button
                    onClick={handleUpdateOrder}
                    className="text-blue-500 hover:text-blue-700 bg-transparent hover:bg-transparent p-0 shadow-none underline"
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

            <div className="flex flex-wrap gap-6 items-center bg-[#ECF6FF] rounded-l-xl rounded-r-xl p-6">
              <div className="flex items-center gap-2">
                <span className=" whitespace-nowrap">Dispatch Date</span>
                <Input
                  type="date"
                  value={dispatchDate}
                  onChange={(e) => setDispatchDate(e.target.value)}
                  className="bg-white border-gray-200 rounded-md h-8.5"
                />
              </div>

              <div className="flex items-center gap-2">
                <span className=" whitespace-nowrap">Enter SKU/Barcode</span>
                <Input type="text" value={skuBarcode} onChange={(e) => setSkuBarcode(e.target.value)} className="bg-white border-gray-200 rounded-md h-8" />
              </div>

              <div className="flex items-center gap-2">
                <span className=" whitespace-nowrap">Enter Quantity</span>
                <Input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="bg-white border-gray-200 rounded-md h-8" />
              </div>

              <Button onClick={handleScan} className="bg-blue-500 hover:bg-blue-600 text-white">
                Scan
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-none">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-between gap-4 w-full">
                {/* Replace with your customSelector component */}
                <div className="relative inline-block text-left">
                  <div>
                    {/* This button would trigger the dropdown */}
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
                  <TableHead className="p-3">Order Number</TableHead>
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
                     <Input placeholder="Filter Order Number" className="w-full bg-white border-gray-200 rounded-md h-8" />
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
                    <TableCell className="p-3 text-start">{item.sku}</TableCell>
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

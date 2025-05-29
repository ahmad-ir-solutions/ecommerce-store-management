import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { IOrder } from "../core/_modals"
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils"

interface ItemsOrderedProps {
  order: IOrder
  // onUpdateItems: (items: OrderItem[]) => Promise<OrderDetails>
}

export function ItemsOrdered({ order }: ItemsOrderedProps) {
  // const [orderItems, setOrderItems] = useState<IOrder>(order)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Update local state when items prop changes
  // useEffect(() => {
  //   setOrderItems(items)
  // }, [items])
  const handleQuantityChange = (value: string) => {
    console.log(value, "handleQuantityChange");

    // const newItems = [...order.productDetails]
    // newItems[index].quantity = Number.parseFloat(value) || 0
    // setOrderItems(newItems)
  }

  const handleQuantityAllocatedChange = (value: string) => {
    console.log(value, "value");

    // const newItems = [...orderItems]
    // newItems[index].quantityAllocated = Number.parseFloat(value) || 0
    // setOrderItems(newItems)
  }

  const handleUnitSubtotalChange = (value: string) => {
    console.log(value, "value");

    // const newItems = [...orderItems]
    // newItems[index].unitSubtotal = Number.parseFloat(value) || 0
    // setOrderItems(newItems)
  }

  const handleTaxRateChange = (value: string) => {
    console.log(value, "value");

    // const newItems = [...orderItems]
    // newItems[index].taxRate = Number.parseFloat(value) || 0
    // setOrderItems(newItems)
  }

  // const handleTaxTotalChange = (value: string) => {
  // console.log(value, "value");

  // const newItems = [...orderItems]
  // newItems[index].taxTotal = Number.parseFloat(value.replace("£", "")) || 0
  // setOrderItems(newItems)
  // }

  const handleDiscountChange = (value: string) => {
    console.log(value, "value");

    // const newItems = [...orderItems]
    // newItems[index].discount = Number.parseFloat(value) || 0
    // setOrderItems(newItems)
  }

  const handleSaveChanges = async () => {
    try {
      // console.log(orderItems);

      setIsUpdating(true)
      // await onUpdateItems(orderItems)
      showSuccessMessage("Order items have been updated successfully")
    } catch (error) {
      showErrorMessage("There was an error updating the order items. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div className="bg-white rounded-2xl shadow-none overflow-hidden my-4 px-6 py-4">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-4">Items Ordered</h2>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 bg-white border-gray-300"
            onClick={toggleCollapse}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="h-8 bg-blue-500 text-white"
            onClick={handleSaveChanges}
            disabled={isUpdating}
          >
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-[#ECF6FF]">
              <TableRow className="border-none">
                <TableHead className="font-medium rounded-l-lg py-3">Product SKU</TableHead>
                <TableHead className="font-medium rounded-l-lg py-3">Name</TableHead>
                <TableHead className="font-medium py-3">Quantity</TableHead>
                {/* <TableHead className="font-medium py-3">Item Options</TableHead> */}
                <TableHead className="font-medium py-3">Quantity Allocated</TableHead>
                <TableHead className="font-medium py-3">Unit Subtotal</TableHead>
                <TableHead className="font-medium py-3">Tax Rate</TableHead>
                <TableHead className="font-medium py-3">Tax Total</TableHead>
                <TableHead className="font-medium py-3">Discount</TableHead>
                <TableHead className="font-medium py-3">Total</TableHead>
                <TableHead className="font-medium rounded-r-lg py-3">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* {orderItems.map((item, index) => (
                <TableRow key={index} className="border-b border-gray-200">
                  <TableCell className="p-2">{item.sku}</TableCell>
                  <TableCell className="p-2 text-gray-400">{item.name}</TableCell>
                  <TableCell className="p-2">
                    <Input
                      className="h-8 w-16 border-gray-300"
                      value={item.quantity.toString()}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">{item.options || "01"}</TableCell>
                  <TableCell className="p-2">
                    <Input
                      className="h-8 w-16 border-gray-300"
                      value={item.quantityAllocated.toString()}
                      onChange={(e) => handleQuantityAllocatedChange(index, e.target.value)}
                    />
                    {item.quantityAllocated}
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      className="h-8 w-16 border-gray-300"
                      value={item.unitSubtotal.toString()}
                      onChange={(e) => handleUnitSubtotalChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      className="h-8 w-16 border-gray-300"
                      value={item.taxRate.toString()}
                      onChange={(e) => handleTaxRateChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    {`£ ${item.taxTotal.toFixed(2)}`}
                  </TableCell>
                  <TableCell className="p-2">
                    <Input
                      className="h-8 w-16 border-gray-300"
                      value={item.discount.toString()}
                      onChange={(e) => handleDiscountChange(index, e.target.value)}
                    />
                  </TableCell>
                  <TableCell className="p-2">
                    £ {(item.unitSubtotal * item.quantity + item.taxTotal - item.discount).toFixed(2)}
                  </TableCell>
                  <TableCell className="p-2">{item.status}</TableCell>
                </TableRow>
              ))} */}

              <TableRow className="border-b border-gray-200">
                <TableCell className="p-2">{order.productDetails.sku || "-"}</TableCell>
                <TableCell className="p-2 text-gray-400">{order.productDetails.productName || "-"}</TableCell>
                <TableCell className="p-2">
                  <Input
                    className="h-8 w-16 border-gray-300"
                    value={order.quantity.toString()}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                  />
                </TableCell>
                {/* <TableCell className="p-2">{item.options || "01"}</TableCell> */}
                <TableCell className="p-2">
                  <Input
                    className="h-8 w-16 border-gray-300"
                    value={order.quantityAllocated.toString()}
                    onChange={(e) => handleQuantityAllocatedChange(e.target.value)}
                  />
                  {/* {order.quantityAllocated} */}
                </TableCell>
                <TableCell className="p-2">
                  <Input
                    className="h-8 w-16 border-gray-300"
                    value={order.unitSubtotal.toString()}
                    onChange={(e) => handleUnitSubtotalChange(e.target.value)}
                  />
                </TableCell>
                <TableCell className="p-2">
                  <Input
                    className="h-8 w-16 border-gray-300"
                    value={order.taxRate.toString()}
                    onChange={(e) => handleTaxRateChange(e.target.value)}
                  />
                </TableCell>
                <TableCell className="p-2">
                  {`£ ${order.taxTotal.toFixed(2)}`}
                </TableCell>
                <TableCell className="p-2">
                  <Input
                    className="h-8 w-16 border-gray-300"
                    value={order.discount.toString()}
                    onChange={(e) => handleDiscountChange(e.target.value)}
                  />
                </TableCell>
                <TableCell className="p-2">
                  £ {(order.unitSubtotal * order.quantity + order.taxTotal - order.discount).toFixed(2)}
                </TableCell>
                <TableCell className="p-2">{order.status}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

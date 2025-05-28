import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderDetails, OrderItem } from "../core/_modals"
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils"

interface ItemsOrderedProps {
  items: OrderItem[]
  onUpdateItems: (items: OrderItem[]) => Promise<OrderDetails>
}

export function ItemsOrdered({ items, onUpdateItems }: ItemsOrderedProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>(items)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  // Update local state when items prop changes
  useEffect(() => {
    setOrderItems(items)
  }, [items])

  const handleQuantityChange = (index: number, value: string) => {
    const newItems = [...orderItems]
    newItems[index].quantity = Number.parseFloat(value) || 0
    setOrderItems(newItems)
  }

  // const handleQuantityAllocatedChange = (index: number, value: string) => {
  //   const newItems = [...orderItems]
  //   newItems[index].quantityAllocated = Number.parseFloat(value) || 0
  //   setOrderItems(newItems)
  // }

  const handleUnitSubtotalChange = (index: number, value: string) => {
    const newItems = [...orderItems]
    newItems[index].unitSubtotal = Number.parseFloat(value) || 0
    setOrderItems(newItems)
  }

  const handleTaxRateChange = (index: number, value: string) => {
    const newItems = [...orderItems]
    newItems[index].taxRate = Number.parseFloat(value) || 0
    setOrderItems(newItems)
  }

  // const handleTaxTotalChange = (index: number, value: string) => {
  //   const newItems = [...orderItems]
  //   newItems[index].taxTotal = Number.parseFloat(value.replace("£", "")) || 0
  //   setOrderItems(newItems)
  // }

  const handleDiscountChange = (index: number, value: string) => {
    const newItems = [...orderItems]
    newItems[index].discount = Number.parseFloat(value) || 0
    setOrderItems(newItems)
  }

  const handleSaveChanges = async () => {
    try {
      setIsUpdating(true)
      await onUpdateItems(orderItems)
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
                <TableHead className="font-medium py-3">Item Options</TableHead>
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
              {orderItems.map((item, index) => (
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
                    {/* <Input
                      className="h-8 w-16 border-gray-300"
                      value={item.quantityAllocated.toString()}
                      onChange={(e) => handleQuantityAllocatedChange(index, e.target.value)}
                    /> */}
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
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

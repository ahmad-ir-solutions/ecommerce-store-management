import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { IOrder } from "../core/_modals"
import { showErrorMessage } from "@/lib/utils/messageUtils"
import { useUpdateOrder } from "../core/hooks/use-orders"

interface ItemsOrderedProps {
  order: IOrder
}

export function ItemsOrdered({ order }: ItemsOrderedProps) {
  const [changedValues, setChangedValues] = useState<Partial<any>>({})

  const { mutate: updateOrderMutation, isPending: isUpdating } = useUpdateOrder()

  const handleInputChange = (field: keyof IOrder, value: string) => {
    let parsedValue: any = value

    // Parse numeric fields
    if (["quantity", "quantityAllocated", "unitSubtotal", "taxRate", "discount"].includes(field)) {
      parsedValue = Number.parseFloat(value) || 0
    }

    setChangedValues((prev) => ({
      ...prev,
      [field]: parsedValue,
    }))
  }

  const handleUpdateOrder = async () => {
    if (Object.keys(changedValues).length === 0) {
      showErrorMessage("No changes to update")
      return
    }


    updateOrderMutation({
      id: order._id,
      data: changedValues,
    })

    // Clear changed values after successful update
    setChangedValues({})
  }

  // Get current value (changed value or original value)
  const getCurrentValue = (field: keyof IOrder): string | number | undefined => {
    return changedValues[field] !== undefined ? changedValues[field] : order[field]
  }

  const hasChanges = Object.keys(changedValues).length > 0

  return (
    <div className="bg-white rounded-2xl shadow-none overflow-hidden my-4 px-6 py-4">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold mb-4">Items Ordered</h2>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="h-8 bg-[#024AFE] text-white disabled:opacity-50"
            onClick={handleUpdateOrder}
            disabled={isUpdating || !hasChanges}
          >
            <Check className="h-4 w-4" />
            {isUpdating ? "Updating..." : "Update"}
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#ECF6FF]">
            <TableRow className="border-none">
              <TableHead className="font-medium rounded-l-lg py-3">Product SKU</TableHead>
              <TableHead className="font-medium rounded-l-lg py-3">Name</TableHead>
              <TableHead className="font-medium py-3">Quantity</TableHead>
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
            <TableRow className="border-b border-gray-200">
              <TableCell className="p-2">{order.productDetails.sku || "-"}</TableCell>
              <TableCell className="p-2">{order.productDetails.productName || "-"}</TableCell>
              <TableCell className="p-2">
                <Input
                  className="h-8 w-16 border-gray-300"
                  value={getCurrentValue("quantity")?.toString() ?? ""}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  disabled={isUpdating}
                />
              </TableCell>
              <TableCell className="p-2">
                <Input
                  className="h-8 w-16 border-gray-300"
                  value={getCurrentValue("quantityAllocated")?.toString() ?? ""}
                  onChange={(e) => handleInputChange("quantityAllocated", e.target.value)}
                  disabled={isUpdating}
                />
              </TableCell>
              <TableCell className="p-2">
                <Input
                  className="h-8 w-16 border-gray-300"
                  value={getCurrentValue("unitSubtotal")?.toString() ?? ""}
                  onChange={(e) => handleInputChange("unitSubtotal", e.target.value)}
                  disabled={isUpdating}
                />
              </TableCell>
              <TableCell className="p-2">
                <Input
                  className="h-8 w-16 border-gray-300"
                  value={getCurrentValue("taxRate")?.toString() ?? ""}
                  onChange={(e) => handleInputChange("taxRate", e.target.value)}
                  disabled={isUpdating}
                />
              </TableCell>
              <TableCell className="p-2">{`£ ${(getCurrentValue("taxTotal") as number)?.toFixed(2) ?? 0}`}</TableCell>
              <TableCell className="p-2">
                <Input
                  className="h-8 w-16 border-gray-300"
                  value={getCurrentValue("discount")?.toString() ?? ""}
                  onChange={(e) => handleInputChange("discount", e.target.value)}
                  disabled={isUpdating}
                />
              </TableCell>
              <TableCell className="p-2">
                £{" "}
                {(
                  (getCurrentValue("unitSubtotal") as number) * (getCurrentValue("quantity") as number) +
                  (getCurrentValue("taxTotal") as number ?? 0) -
                  (getCurrentValue("discount") as number ?? 0)
                ).toFixed(2)}
              </TableCell>
              <TableCell className="p-2">{order.status}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
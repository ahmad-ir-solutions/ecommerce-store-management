import { useState } from "react"
import type { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"

interface SupplierFilterProps<TData, TValue> {
  column: Column<TData, TValue>
}

export function SupplierFilter<TData, TValue>({ column }: SupplierFilterProps<TData, TValue>) {
  const [open, setOpen] = useState(false)
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([])

  const suppliers = [
    { id: "designers", label: "Designers Collection" },
    { id: "example", label: "Example Supplier" },
  ]

  const handleSupplierChange = (supplier: string) => {
    setSelectedSuppliers((prev) => {
      if (prev.includes(supplier)) {
        return prev.filter((s) => s !== supplier)
      } else {
        return [...prev, supplier]
      }
    })
  }

  const applyFilter = () => {
    if (selectedSuppliers.length === 0) {
      column.setFilterValue(undefined)
    } else {
      column.setFilterValue(selectedSuppliers)
    }
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-transparent">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <div className="p-4 border-b">
          <h4 className="font-medium text-sm">Filter by Supplier</h4>
        </div>
        <div className="p-4 space-y-2">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex items-center space-x-2">
              <Checkbox
                id={`supplier-${supplier.id}`}
                checked={selectedSuppliers.includes(supplier.id)}
                onCheckedChange={() => handleSupplierChange(supplier.id)}
              />
              <Label htmlFor={`supplier-${supplier.id}`} className="text-sm font-normal">
                {supplier.label}
              </Label>
            </div>
          ))}
        </div>
        <div className="flex justify-end p-4 border-t">
          <Button variant="outline" size="sm" className="mr-2" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={applyFilter}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

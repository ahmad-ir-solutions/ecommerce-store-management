import { useState } from "react"
import type { Column } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"

interface WarehouseFilterProps<TData, TValue> {
  column: Column<TData, TValue>
}

export function WarehouseFilter<TData, TValue>({ column }: WarehouseFilterProps<TData, TValue>) {
  const [open, setOpen] = useState(false)
  const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>([])

  const warehouses = [
    { id: "default", label: "Default Warehouse" },
    { id: "default-a1", label: "Default Warehouse - A1" },
    { id: "default-a2", label: "Default Warehouse - A2" },
    { id: "default-a3", label: "Default Warehouse - A3" },
    { id: "default-a4", label: "Default Warehouse - A4" },
  ]

  const handleWarehouseChange = (warehouse: string) => {
    setSelectedWarehouses((prev) => {
      if (prev.includes(warehouse)) {
        return prev.filter((w) => w !== warehouse)
      } else {
        return [...prev, warehouse]
      }
    })
  }

  const applyFilter = () => {
    if (selectedWarehouses.length === 0) {
      column.setFilterValue(undefined)
    } else {
      column.setFilterValue(selectedWarehouses)
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
          <h4 className="font-medium text-sm">Filter by Warehouse</h4>
        </div>
        <div className="p-4 space-y-2 max-h-[300px] overflow-auto">
          {warehouses.map((warehouse) => (
            <div key={warehouse.id} className="flex items-center space-x-2">
              <Checkbox
                id={`warehouse-${warehouse.id}`}
                checked={selectedWarehouses.includes(warehouse.id)}
                onCheckedChange={() => handleWarehouseChange(warehouse.id)}
              />
              <Label htmlFor={`warehouse-${warehouse.id}`} className="text-sm font-normal">
                {warehouse.label}
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

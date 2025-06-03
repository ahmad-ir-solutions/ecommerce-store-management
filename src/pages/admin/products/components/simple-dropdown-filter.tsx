import { useState } from "react"
import type { Column } from "@tanstack/react-table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface SimpleDropdownFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  options: string[]
}

export function SimpleDropdownFilter<TData, TValue>({ column, options }: SimpleDropdownFilterProps<TData, TValue>) {
  const [open, setOpen] = useState(false)
  const rawValue = column.getFilterValue()
  const selectedValue: string = typeof rawValue === 'string' ? rawValue : "All"

  const handleSelect = (value: string) => {
    column.setFilterValue(value === "All" ? undefined : value)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-8 px-3 text-xs border-gray-300"
        >
          {selectedValue}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white" align="start">
        <div className="max-h-[300px] overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-muted ${
                selectedValue === option ? "bg-muted" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

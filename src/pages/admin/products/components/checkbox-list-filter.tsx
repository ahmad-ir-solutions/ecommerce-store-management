import { useState } from "react"
import type { Column } from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface CheckboxListFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  options: string[]
}

export function CheckboxListFilter<TData, TValue>({ column, options }: CheckboxListFilterProps<TData, TValue>) {
  const [open, setOpen] = useState(false)
  const rawValue = column.getFilterValue()
  // Always treat as array of strings
  const selectedValues: string[] = Array.isArray(rawValue)
    ? rawValue.map(String)
    : typeof rawValue === "string"
      ? [rawValue]
      : []

  // DEBUG: See what is being compared
  console.log('selectedValues:', selectedValues, 'options:', options)

  const handleCheckboxChange = (value: string) => {
    let newSelectedValues
    if (selectedValues.includes(value)) {
      newSelectedValues = selectedValues.filter((v) => v !== value)
    } else {
      newSelectedValues = [...selectedValues, value]
    }
    column.setFilterValue(newSelectedValues.length ? newSelectedValues : undefined)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button variant="outline"  className="w-full justify-between h-8 px-3 text-gray-500 border-gray-300 shadow-xs">
          {selectedValues.length > 0 ? `${selectedValues.length} selected` : "Select options"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] bg-white p-0 border-none" align="start">
        <div className="p-2 max-h-[300px] overflow-auto">
          {options.map((option) => {
            const optionStr = String(option)
            return (
              <div key={optionStr} className="flex items-center space-x-2 p-2">
                <Checkbox
                  id={`${column.id}-${optionStr}`}
                  checked={selectedValues.includes(optionStr)}
                  onCheckedChange={() => handleCheckboxChange(optionStr)}
                />
                <label
                  htmlFor={`${column.id}-${optionStr}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {optionStr}
                </label>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
} 
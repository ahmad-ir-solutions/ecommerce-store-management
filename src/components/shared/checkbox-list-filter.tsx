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
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const handleCheckboxChange = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]

    setSelectedValues(newSelectedValues)
    column.setFilterValue(newSelectedValues.length ? newSelectedValues : undefined)
  }

  return (
    <Popover>
      <PopoverTrigger asChild className="">
        <Button variant="outline"  className="w-full justify-between h-8 px-3 text-gray-500 border-gray-300 shadow-xs">
          {selectedValues.length > 0 ? `${selectedValues.length} selected` : "Select options"}
          {/* {displayValue} */}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] bg-white p-0 border-none" align="start">
        <div className="p-2 max-h-[300px] overflow-auto">
          {options.map((option) => (
            <div key={option} className="flex items-center space-x-2 p-2">
              <Checkbox
                id={`${column.id}-${option}`}
                checked={selectedValues.includes(option)}
                onCheckedChange={() => handleCheckboxChange(option)}
              />
              <label
                htmlFor={`${column.id}-${option}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {option}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

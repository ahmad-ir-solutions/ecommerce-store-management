import { useState } from "react"
import type { Column } from "@tanstack/react-table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ChevronDown } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface CheckboxListFilterProps<TData, TValue> {
  column: Column<TData, TValue>
  options: string[]
}

export function CheckboxListFilter<TData, TValue>({ column, options }: CheckboxListFilterProps<TData, TValue>) {
  const [open, setOpen] = useState(false)
  const [selectedValues, setSelectedValues] = useState<string[]>([])
  const [displayValue, setDisplayValue] = useState<string>("All")

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setSelectedValues((prev) => {
      if (checked) {
        return [...prev, value]
      } else {
        return prev.filter((item) => item !== value)
      }
    })
  }

  const applyFilter = () => {
    if (selectedValues.length === 0) {
      column.setFilterValue(undefined)
      setDisplayValue("All")
    } else if (selectedValues.length === 1) {
      column.setFilterValue(selectedValues)
      setDisplayValue(selectedValues[0])
    } else {
      column.setFilterValue(selectedValues)
      setDisplayValue(`${selectedValues.length} selected`)
    }
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
          {displayValue}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0 bg-white" align="start">
        <ScrollArea className="h-[200px]">
          <div className="p-2">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2 p-2 hover:bg-muted rounded-md">
                <Checkbox
                  id={`${column.id}-${option}`}
                  checked={selectedValues.includes(option)}
                  onCheckedChange={(checked) => handleCheckboxChange(option, checked === true)}
                />
                <Label htmlFor={`${column.id}-${option}`} className="text-sm font-normal cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex justify-end p-2 border-t">
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

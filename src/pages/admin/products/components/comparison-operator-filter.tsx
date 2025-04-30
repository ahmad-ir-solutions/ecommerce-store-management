import type React from "react"

import { useState } from "react"
import type { Column } from "@tanstack/react-table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown } from "lucide-react"

interface ComparisonOperatorFilterProps<TData, TValue> {
  column: Column<TData, TValue>
}

type Operator = "=" | "<" | ">" | "≤" | "≥"

export function ComparisonOperatorFilter<TData, TValue>({ column }: ComparisonOperatorFilterProps<TData, TValue>) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>("")
  const [operator, setOperator] = useState<Operator>("=")

  const operators: Operator[] = ["=", "<", ">", "≤", "≥"]

  const handleOperatorSelect = (op: Operator) => {
    setOperator(op)
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const applyFilter = () => {
    if (!value) {
      column.setFilterValue(undefined)
    } else {
      column.setFilterValue({ operator, value })
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
          {value ? `${operator} ${value}` : "Filter..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white" align="start">
        <div className="border-b">
          {operators.map((op) => (
            <div
              key={op}
              className={`px-4 py-2 text-sm cursor-pointer hover:bg-muted border-b last:border-b-0 ${
                operator === op ? "bg-muted" : ""
              }`}
              onClick={() => handleOperatorSelect(op)}
            >
              {op}
            </div>
          ))}
        </div>
        <div className="p-4">
          <Input
            placeholder="Enter value"
            value={value}
            onChange={handleValueChange}
            className="h-8 mb-4"
            type="text"
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={applyFilter}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

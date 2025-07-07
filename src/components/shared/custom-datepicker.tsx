import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import * as React from "react"
import { cn } from "@/lib/utils"

interface DatePickerProps {
  date?: Date | null
  onChange: (date: Date | undefined) => void
  placeholder?: string
  className?: string
}

export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  onChange,
  placeholder = "Pick a date",
  className = "",
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            "data-[empty=true]:text-muted-foreground border-gray-200",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white border-none">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  )
}

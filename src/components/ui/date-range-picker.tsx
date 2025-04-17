import { useState, forwardRef } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DateRangePickerProps {
  dateRange: {
    from: Date
    to: Date
  }
  setDateRange: React.Dispatch<
    React.SetStateAction<{
      from: Date
      to: Date
    }>
  >
}

export function DateRangePicker({ dateRange, setDateRange }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(dateRange.from)
  const [endDate, setEndDate] = useState<Date | null>(dateRange.to)

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)

    if (start && end) {
      setDateRange({
        from: start,
        to: end,
      })
    }
  }

  // Custom input component
  const CustomInput = forwardRef<HTMLButtonElement, React.ComponentPropsWithoutRef<"button">>(
    ({ value, onClick }, ref) => (
      <Button variant="outline" onClick={onClick} ref={ref} className="w-[300px] justify-start text-left font-normal">
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value || "Select date range"}
      </Button>
    ),
  )

  CustomInput.displayName = "CustomDatePickerInput"

  return (
    <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      monthsShown={2}
      customInput={<CustomInput />}
      dateFormat="dd MMMM yyyy"
      calendarClassName="bg-white shadow-lg border border-gray-200 rounded-md"
    />
  )
}


// import type * as React from "react"
// import { CalendarIcon } from "lucide-react"
// import { format } from "date-fns"
// import type { DateRange } from "react-day-picker"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// interface DateRangePickerProps {
//   dateRange: DateRange
//   setDateRange: React.Dispatch<React.SetStateAction<DateRange>>
// }

// export function DateRangePicker({ dateRange, setDateRange }: DateRangePickerProps) {
//   return (
//     <div className="grid gap-2">
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={"outline"}
//             className={cn("w-[300px] justify-start text-left font-normal", !dateRange && "text-muted-foreground")}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {dateRange?.from ? (
//               dateRange.to ? (
//                 <>
//                   {format(dateRange.from, "dd MMMM yyyy")} - {format(dateRange.to, "dd MMMM yyyy")}
//                 </>
//               ) : (
//                 format(dateRange.from, "dd MMMM yyyy")
//               )
//             ) : (
//               <span>Pick a date range</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={dateRange?.from}
//             selected={dateRange}
//             onSelect={setDateRange}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   )
// }

"use client"

import type React from "react"

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

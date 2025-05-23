import { useState, useEffect } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  subMonths,
  isSameDay,
  startOfMonth,
  endOfMonth,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfYear,
} from "date-fns"
import { Input } from "@/components/ui/input"
import type { DateRange } from "react-day-picker"

interface DateRangePickerFilterProps {
  date?: DateRange
  setDate: (date: DateRange) => void
  className?: string
  title?: string
}

export function DateRangePickerFilter({ date, setDate, className, title = "Filter..." }: DateRangePickerFilterProps) {
  const [open, setOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedRange, setSelectedRange] = useState<string | null>(null)
  const [selectedDates, setSelectedDates] = useState<{ from?: Date; to?: Date }>({
    from: date?.from,
    to: date?.to,
  })

  // Update internal state when external date changes
  useEffect(() => {
    if (date?.from || date?.to) {
      setSelectedDates({
        from: date.from,
        to: date.to,
      })
    }
  }, [date])

  const quickDateOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "Last 7 Days", value: "last7days" },
    { label: "Last Week", value: "lastweek" },
    { label: "Last Month", value: "lastmonth" },
    { label: "Year To Date", value: "yeartodate" },
  ]

  const applyQuickDateRange = (value: string) => {
    setSelectedRange(value)
    const today = new Date()
    let from: Date | undefined
    let to: Date | undefined

    switch (value) {
      case "today":
        from = today
        to = today
        break
      case "yesterday":
        from = subDays(today, 1)
        to = subDays(today, 1)
        break
      case "last7days":
        from = subDays(today, 6)
        to = today
        break
      case "lastweek":
        from = startOfWeek(subDays(today, 7))
        to = endOfWeek(subDays(today, 7))
        break
      case "lastmonth":
        from = startOfMonth(subMonths(today, 1))
        to = endOfMonth(subMonths(today, 1))
        break
      case "yeartodate":
        from = startOfYear(today)
        to = today
        break
      default:
        from = undefined
        to = undefined
    }

    setSelectedDates({ from, to })
  }

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay()

    // Get days from previous month to fill the first row
    const prevMonthDays = []
    const prevMonth = month === 0 ? 11 : month - 1
    const prevMonthYear = month === 0 ? year - 1 : year
    const prevMonthDaysCount = new Date(prevMonthYear, prevMonth + 1, 0).getDate()

    // Sunday is 0 in JavaScript, but we want to start with Sunday
    const startDay = firstDay === 0 ? 6 : firstDay - 1

    for (let i = prevMonthDaysCount - startDay + 1; i <= prevMonthDaysCount; i++) {
      prevMonthDays.push({
        date: new Date(prevMonthYear, prevMonth, i),
        isCurrentMonth: false,
      })
    }

    // Current month days
    const currentMonthDays = []
    for (let i = 1; i <= daysInMonth; i++) {
      currentMonthDays.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      })
    }

    // Next month days to fill the last row
    const nextMonthDays = []
    const nextMonth = month === 11 ? 0 : month + 1
    const nextMonthYear = month === 11 ? year + 1 : year
    const totalDays = prevMonthDays.length + currentMonthDays.length
    const remainingDays = 42 - totalDays // 6 rows of 7 days

    for (let i = 1; i <= remainingDays; i++) {
      nextMonthDays.push({
        date: new Date(nextMonthYear, nextMonth, i),
        isCurrentMonth: false,
      })
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays]
  }

  const handleDateClick = (date: Date) => {
    setSelectedRange(null)
    if (!selectedDates.from) {
      setSelectedDates({ from: date, to: date })
    } else if (
      !selectedDates.to ||
      (selectedDates.from && selectedDates.to && isSameDay(selectedDates.from, selectedDates.to))
    ) {
      if (date < selectedDates.from) {
        setSelectedDates({ from: date, to: selectedDates.from })
      } else {
        setSelectedDates({ ...selectedDates, to: date })
      }
    } else {
      setSelectedDates({ from: date, to: date })
    }
  }

  const isDateInRange = (date: Date) => {
    if (!selectedDates.from || !selectedDates.to) return false
    return date >= selectedDates.from && date <= selectedDates.to
  }

  const isSelectedDate = (date: Date) => {
    if (!selectedDates.from) return false
    if (!selectedDates.to) return isSameDay(date, selectedDates.from)
    return isSameDay(date, selectedDates.from) || isSameDay(date, selectedDates.to) || isDateInRange(date)
  }

  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  const applyFilter = () => {
    if (selectedDates.from && selectedDates.to) {
      setDate({ from: selectedDates.from, to: selectedDates.to })
    } else if (selectedDates.from) {
      setDate({ from: selectedDates.from, to: selectedDates.from })
    }
    setOpen(false)
  }

  const formatDisplayDate = () => {
    if (!selectedDates.from) return title
    if (selectedRange) return quickDateOptions.find((opt) => opt.value === selectedRange)?.label || "Custom Range"
    if (!selectedDates.to) return format(selectedDates.from, "dd MMM yyyy")
    return `${format(selectedDates.from, "dd MMM yyyy")} - ${format(selectedDates.to, "dd MMM yyyy")}`
  }

  return (
    <div className={className}>
      {title && <p className="text-xs text-muted-foreground mb-1">{title}</p>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10 px-3 text-sm border-gray-300"
          >
            {formatDisplayDate()}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0 bg-white rounded-lg shadow-lg" align="start">
          <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-6">
              {quickDateOptions.map((option) => (
                <Button
                  key={option.value}
                  variant={selectedRange === option.value ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full text-sm ${selectedRange === option.value
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                    }`}
                  onClick={() => applyQuickDateRange(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 mb-2">From Date</p>
                <Input
                  value={selectedDates.from ? format(selectedDates.from, "dd MMMM yyyy") : ""}
                  readOnly
                  className="border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">To Date</p>
                <Input
                  value={selectedDates.to ? format(selectedDates.to, "dd MMMM yyyy") : ""}
                  readOnly
                  className="border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <div className="font-medium text-blue-500 text-lg">{format(currentMonth, "MMMM yyyy")}</div>
                <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
                  <div key={day} className="text-xs font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1 text-center">
                {getDaysInMonth(currentMonth).map((item, i) => {
                  const { date, isCurrentMonth } = item
                  const isSelected = isSelectedDate(date)
                  const isWeekendDay = isWeekend(date)

                  return (
                    <button
                      key={i}
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${!isCurrentMonth
                        ? "text-gray-300"
                        : isSelected
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : isWeekendDay
                            ? "text-red-500 hover:bg-gray-100"
                            : "hover:bg-gray-100"
                        }`}
                      onClick={() => isCurrentMonth && handleDateClick(date)}
                      disabled={!isCurrentMonth}
                    >
                      {date.getDate()}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4">
              <Button
                variant="outline"
                className="border border-gray-300 text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={applyFilter}>
                Save
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

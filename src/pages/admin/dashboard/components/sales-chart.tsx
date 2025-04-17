import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useSalesStore } from "@/store/admin/sales-store"
import { Card } from "@/components/ui/card"

interface SalesChartProps {
  chartType: "line" | "area"
  unitSold: "units" | "revenue" | "orders" | "average_order_value"
  dateRange?: {
    from: Date
    to: Date
  }
}

export function SalesChart({ chartType, unitSold, dateRange }: SalesChartProps) {
  const { salesData } = useSalesStore()

  const formatValue = (value: number) => {
    switch (unitSold) {
      case "revenue":
        return `£${value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      case "average_order_value":
        return `£${value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      case "orders":
        return value.toLocaleString()
      default: // units
        return value.toLocaleString()
    }
  }

  const getYAxisConfig = () => {
    switch (unitSold) {
      case "revenue":
        return {
          ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000],
          domain: [0, 6000],
          formatter: (value: number) => `£${(value / 1000).toFixed(0)}k`
        }
      case "average_order_value":
        return {
          ticks: [0, 50, 100, 150, 200, 250, 300],
          domain: [0, 300],
          formatter: (value: number) => `£${value}`
        }
      case "orders":
        return {
          ticks: [0, 50, 100, 150, 200, 250, 300],
          domain: [0, 100],
          formatter: (value: number) => value.toString()
        }
      default: // units
        return {
          ticks: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500],
          domain: [0, 3500],
          formatter: (value: number) => value.toString()
        }
    }
  }

  const filteredData = dateRange 
    ? salesData.filter(item => {
        const itemDate = new Date(item.date)
        return itemDate >= dateRange.from && itemDate <= dateRange.to
      })
    : salesData

  interface TooltipProps {
    active?: boolean;
    payload?: {
      name: string;
      value: number;
    }[];
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <>
        <Card className="bg-blue-500 text-white p-2 text-sm">
          <div className="font-medium">{label}, 2025</div>
          {payload.map((entry: { name: string; value: number }, index: number) => (
            <div key={`item-${index}`} className="flex justify-between gap-8 mt-1">
              <span>{entry.name}</span>
              <span>{formatValue(entry.value)}</span>
            </div>
          ))}
          <div className="border-t mt-1 pt-1">
            <div className="flex justify-between gap-8">
              <span>Total</span>
              <span>
                {formatValue(payload.reduce((sum: number, entry: { name: string; value: number }) => sum + entry.value, 0))}
              </span>
            </div>
          </div>
        </Card>
        <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mt-1"></div>
        <div className="w-0.5 h-20 bg-blue-300 bg-opacity-50 mx-auto mt-1 border-dashed border-blue-300"></div>
        </>
      )
    }
    return null
  }

  const renderChart = () => {
    const yAxisConfig = getYAxisConfig()

    switch (chartType) {
      case "line":
        return (
          <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false}    className="text-sm"/>
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={yAxisConfig.ticks}
              domain={yAxisConfig.domain}
              tickFormatter={yAxisConfig.formatter}
              className="text-sm"
            />
            <CartesianGrid horizontal={true} vertical={false} stroke="#e5e7eb" />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="amazon" stroke="#8884d8" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="ebay" stroke="#82ca9d" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="onbuy" stroke="#ffc658" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
          </LineChart>
        )
      case "area":
        return (
          <AreaChart data={filteredData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false}  className="text-sm"/>
            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={yAxisConfig.ticks}
              domain={yAxisConfig.domain}
              tickFormatter={yAxisConfig.formatter}
              className="text-sm"
            />
            <CartesianGrid horizontal={true} vertical={false} stroke="#e5e7eb" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="amazon" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="ebay" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
            <Area type="monotone" dataKey="onbuy" stackId="1" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        )
      default:
        return null
    }
  }

  return (
     <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        {renderChart() || <div>No chart data</div>}
      </ResponsiveContainer>
    </div>
  )
}

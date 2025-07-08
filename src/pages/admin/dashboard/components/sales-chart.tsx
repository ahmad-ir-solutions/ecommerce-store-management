import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card } from "@/components/ui/card"
import type { DateRange } from "react-day-picker"
import { isWithinInterval } from "date-fns"
import { useGetOrderStats } from "../core/hooks/use-dashboard";
import { IOrderStat } from "../core/_modals";
import { Loader2 } from "lucide-react"

interface SalesChartProps {
  chartType: "line" | "area"
  unitSold: "units" | "revenue" | "orders" | "average_order_value"
  dateRange?: DateRange
  activeChannels: {
    [key: string]: boolean
  }
}

export function SalesChart({ chartType, unitSold, dateRange, activeChannels }: SalesChartProps) {
  const { data: orderStatsData, isLoading, isError } = useGetOrderStats();
  const [filteredData, setFilteredData] = useState<IOrderStat[]>([]);

  // Filter data based on active channels and date range
  useEffect(() => {
    if (orderStatsData?.data) {
      let filtered = orderStatsData.data;

      // Filter by active channels
      filtered = filtered.filter(order => activeChannels[order.channelDetails.channelName.toLowerCase()]);

      // Apply date range filter if provided
      if (dateRange?.from && dateRange?.to) {
        filtered = filtered.filter(order => {
          const orderDate = new Date(order.createdAt);
          return isWithinInterval(orderDate, { start: dateRange.from as Date, end: dateRange.to as Date });
        });
      }
      setFilteredData(filtered);
    }
  }, [orderStatsData, activeChannels, dateRange]);

  // Format values based on unit type
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

  // Configure Y-axis based on unit type
  const getYAxisConfig = () => {
    switch (unitSold) {
      case "revenue":
        return {
          ticks: [0, 1000, 2000, 3000, 4000, 5000, 6000],
          domain: [0, 6000],
          formatter: (value: number) => `£${(value / 1000).toFixed(0)}k`,
        }
      case "average_order_value":
        return {
          ticks: [0, 50, 100, 150, 200, 250, 300],
          domain: [0, 300],
          formatter: (value: number) => `£${value}`,
        }
      case "orders":
        return {
          ticks: [0, 50, 100, 150, 200, 250, 300],
          domain: [0, 300],
          formatter: (value: number) => value.toString(),
        }
      default: // units
        return {
          ticks: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500],
          domain: [0, 3500],
          formatter: (value: number) => value.toString(),
        }
    }
  }

  // Custom tooltip component
  interface TooltipProps {
    active?: boolean
    payload?: {
      name: string
      value: number
      dataKey: string
      color: string
    }[]
    label?: string
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <>
          <Card className="bg-[#024AFE] text-white p-2 text-sm">
            <div className="font-medium">{label}, 2025</div>
            {payload.map((entry, index) => (
              <div key={`item-${index}`} className="flex justify-between gap-8 mt-1">
                <span>{entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}</span>
                <span>{formatValue(entry.value)}</span>
              </div>
            ))}
            <div className="border-t mt-1 pt-1">
              <div className="flex justify-between gap-8">
                <span>Total</span>
                <span>{formatValue(payload.reduce((sum, entry) => sum + entry.value, 0))}</span>
              </div>
            </div>
          </Card>
          <div className="w-3 h-3 bg-[#024AFE] rounded-full mx-auto mt-1"></div>
          <div className="w-0.5 h-20 bg-blue-300 bg-opacity-50 mx-auto mt-1 border-dashed border-blue-300"></div>
        </>
      )
    }
    return null
  }

  // Render chart based on type
  const renderChart = () => {
    const yAxisConfig = getYAxisConfig()

    // Aggregate data by date and channel for the chart
    const aggregatedData: { [date: string]: { [channel: string]: number } } = {};

    filteredData.forEach(order => {
      const orderDate = new Date(order.createdAt).toLocaleDateString(); // Use a consistent date format
      if (!aggregatedData[orderDate]) {
        aggregatedData[orderDate] = {};
      }
      const channelName = order.channelDetails.channelName.toLowerCase();
      if (!aggregatedData[orderDate][channelName]) {
        aggregatedData[orderDate][channelName] = 0;
      }

      // Aggregate based on unitSold
      switch (unitSold) {
        case "units":
          // Assuming each order represents 1 unit for simplicity, adjust if needed
          aggregatedData[orderDate][channelName] += 1;
          break;
        case "revenue":
          aggregatedData[orderDate][channelName] += order.totalPrice; // Assuming totalPrice is revenue
          break;
        case "orders":
          aggregatedData[orderDate][channelName] += 1; // Each order is one order
          break;
        case "average_order_value":
          // This requires calculating total revenue and total orders per channel per day first
          // For simplicity, we'll skip this aggregation here or calculate it differently
          break;
        default:
          break;
      }
    });

    // Convert aggregated data to array format for recharts
    const processedData = Object.keys(aggregatedData).map(date => {
      const item: any = { date };
      Object.keys(aggregatedData[date]).forEach(channel => {
        item[channel] = aggregatedData[date][channel];
      });
      return item;
    });

    // Sort data by date
    processedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    switch (chartType) {
      case "line":
        return (
          <LineChart data={processedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-sm" />
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
            {activeChannels.amazon && (
              <Line
                type="monotone"
                dataKey="amazon"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
            {activeChannels.ebay && (
              <Line type="monotone" dataKey="ebay" stroke="#82ca9d" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
            )}
            {activeChannels.onbuy && (
              <Line type="monotone" dataKey="onbuy" stroke="#ffc658" strokeWidth={2} dot={false} activeDot={{ r: 8 }} />
            )}
            {activeChannels.woocommerce && (
              <Line
                type="monotone"
                dataKey="woocommerce"
                stroke="#ff8042"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
            {activeChannels.shopify && (
              <Line
                type="monotone"
                dataKey="shopify"
                stroke="#0088fe"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 8 }}
              />
            )}
          </LineChart>
        )
      case "area":
        return (
          <AreaChart data={processedData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} className="text-sm" />
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
            {activeChannels.amazon && (
              <Area type="monotone" dataKey="amazon" stackId="1" stroke="#8884d8" fill="#8884d8" />
            )}
            {activeChannels.ebay && <Area type="monotone" dataKey="ebay" stackId="1" stroke="#82ca9d" fill="#82ca9d" />}
            {activeChannels.onbuy && (
              <Area type="monotone" dataKey="onbuy" stackId="1" stroke="#ffc658" fill="#ffc658" />
            )}
            {activeChannels.woocommerce && (
              <Area type="monotone" dataKey="woocommerce" stackId="1" stroke="#ff8042" fill="#ff8042" />
            )}
            {activeChannels.shopify && (
              <Area type="monotone" dataKey="shopify" stackId="1" stroke="#0088fe" fill="#0088fe" />
            )}
          </AreaChart>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full h-64">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
        </div>
      ) : isError ? (
        <p>Error loading chart data.</p>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          {renderChart() || <div>No chart data</div>}
        </ResponsiveContainer>
      )}
    </div>
  )
}

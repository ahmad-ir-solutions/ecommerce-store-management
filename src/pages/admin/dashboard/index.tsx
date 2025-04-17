import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { SalesChart } from "./components/sales-chart"
import { StatsCards } from "./components/stats-cards"
import { TopSellingProducts } from "./components/top-selling-products"
import { SalesByChannel } from "./components/sales-by-channel"
// import { fetchDashboardData } from "@/lib/api"
import { TabsStats } from "./components/tabs-stats"
import { Header } from "@/components/shared/Header"
import { CustomSelect } from "@/components/shared/custom-select"
// import { useQuery } from "@tanstack/react-query"
import { subDays } from "date-fns"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { DateRange } from "react-day-picker"

const companyOptions = [
  { label: 'All', value: 'all' },
  { label: 'Company 1', value: 'company1' },
  { label: 'Company 2', value: 'company2' },
];

const channelOptions = [
  { label: 'All', value: 'all' },
  { label: 'Amazon', value: 'amazon' },
  { label: 'Ebay', value: 'ebay' },
  { label: 'Onbuy', value: 'onbuy' },
];

const unitSoldOptions = [
  { label: 'Units', value: 'units' },
  { label: 'Revenue', value: 'revenue' },
  { label: 'Orders', value: 'orders' },
  { label: 'Average Order Value', value: 'average_order_value' },
];

const graphTypeOptions = [
  { label: 'Line', value: 'line' },
  { label: 'Area', value: 'area' },
];

export function AdminDashboardPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const [chartType, setChartType] = useState<"line" | "area">("area")
  const [unitSold, setUnitSold] = useState<"units" | "revenue" | "orders" | "average_order_value">("units")
 
  // const { data, isLoading } = useQuery({
  //   queryKey: ["dashboardData", dateRange],
  //   queryFn: () => fetchDashboardData(dateRange),
  // })

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
       <Header
          title="Dashboard"
        >
          <div className="w-48">
            <CustomSelect
              placeholder="Company Identity"
              defaultValue="all"
              options={companyOptions}
              title="Company Identity"
            />
          </div>
          <div className="w-0.5 h-9 bg-gray-200 bg-opacity-50 border-dashed" />
          <div className="w-48">
            <CustomSelect
              placeholder="Channel"
              defaultValue="all"
              options={channelOptions}
              title="Channel"
            />
          </div>
       </Header>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-white rounded-2xl border-none shadow-none gap-0">
          <CardHeader className="pb-0">
            <StatsCards />
            <CardTitle className="text-lg font-medium">Sales by channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full flex flex-row justify-end overflow-auto">
              <div className="flex justify-between mb-4 space-x-2">
                <div>
                  <CustomSelect
                    placeholder="Unit Sold"
                    defaultValue={unitSold}
                    onChange={(value) => setUnitSold(value as "units" | "revenue" | "orders" | "average_order_value")}
                    options={unitSoldOptions}
                    title="Unit Sold"
                    className="w-32"
                  />
                </div>
                <div className="w-0.5 h-14 bg-gray-200 bg-opacity-50 border-dashed" />
                <DatePickerWithRange date={date} setDate={setDate} className="w-62" title="Time Frame:" />
                <div className="w-0.5 h-14 bg-gray-200 bg-opacity-50 border-dashed" />
                <div>
                  <CustomSelect
                    placeholder="Graph Type:"
                    defaultValue={chartType}
                    onChange={(value) => setChartType(value as "line" | "area")}
                    options={graphTypeOptions}
                    title="Graph Type:"
                    className="w-32"
                  />
                </div>
              </div>
            </div>
            <SalesChart 
              chartType={chartType} 
              unitSold={unitSold} 
              dateRange={date?.from && date?.to ? { from: date.from, to: date.to } : undefined} 
            />
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <Checkbox id="amazon" />
                <label htmlFor="amazon" className="text-sm">
                  Amazon
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ebay" />
                <label htmlFor="ebay" className="text-sm">
                  Ebay
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="woocommerce" />
                <label htmlFor="woocommerce" className="text-sm">
                  Woocommerce
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="shopify" />
                <label htmlFor="shopify" className="text-sm">
                  Shopify
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      <TabsStats />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopSellingProducts />
        <SalesByChannel />
      </div>
    </div>
  )
}

import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SalesChart } from "./components/sales-chart"
import { StatsCards } from "./components/stats-cards"
import { TopSellingProducts } from "./components/top-selling-products"
import { SalesByChannel } from "./components/sales-by-channel"
import { DateRangePicker } from "@/components/ui/date-range-picker"
// import { fetchDashboardData } from "@/lib/api"
import { TabsStats } from "./components/tabs-stats"
import { Header } from "@/components/shared/Header"
import { CustomSelect } from "@/components/shared/custom-select"
// import { useQuery } from "@tanstack/react-query"

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

export function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(2025, 1, 28),
    to: new Date(2025, 2, 7),
  })

  const [chartType, setChartType] = useState<"line" | "area">("area")
  const [unitSold, setUnitSold] = useState("line")

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
            />
          </div>
          <div className="w-0.5 h-9 bg-gray-200 bg-opacity-50 border-dashed" />
          <div className="w-48">
            <CustomSelect
              placeholder="Channel"
              defaultValue="all"
              options={channelOptions}
            />
          </div>
        </Header>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-white rounded-2xl border-none shadow-none">
          <CardHeader className="pb-2">
            <StatsCards />
            <CardTitle className="text-lg font-medium">Sales by channel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div className="flex gap-4">
                <Select value={unitSold} onValueChange={setUnitSold}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Unit Sold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="bar">Bar</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                  </SelectContent>
                </Select>
                <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
              </div>
              <div>
                <Select value={chartType} onValueChange={(value) => setChartType(value as "line" | "area")}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Graph Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="line">Line</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SalesChart chartType={chartType} />
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

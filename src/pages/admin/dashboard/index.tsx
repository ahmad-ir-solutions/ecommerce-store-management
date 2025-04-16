import { useState } from "react"
// import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SalesChart } from "./components/sales-chart"
import { StatsCards } from "./components/stats-cards"
import { ProductStats } from "./components/product-stats"
import { TopSellingProducts } from "./components/top-selling-products"
import { SalesByChannel } from "./components/sales-by-channel"
import { DateRangePicker } from "@/components/ui/date-range-picker"
// import { fetchDashboardData } from "@/lib/api"
import { QuickLinks } from "./components/quick-links"

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
        <div className="flex items-center justify-between bg-white p-4 rounded-3xl">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {/* <Breadcrumb /> */}
            <div className="flex items-center text-sm text-blue-500 font-medium mt-1">
              <span>DASHBOARD</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-48">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Company Identity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="company1">Company 1</SelectItem>
                  <SelectItem value="company2">Company 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-48">
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="amazon">Amazon</SelectItem>
                  <SelectItem value="ebay">Ebay</SelectItem>
                  <SelectItem value="onbuy">Onbuy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <StatsCards />

      <QuickLinks />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
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

        <ProductStats />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopSellingProducts />
        <SalesByChannel />
      </div>
    </div>
  )
}

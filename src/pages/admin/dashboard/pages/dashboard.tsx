import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/shared/header"
import { CustomSelect } from "@/components/shared/custom-select"
import { subDays } from "date-fns"
import type { DateRange } from "react-day-picker"
import { StatsCards } from '../components/stats-cards'
import { salesData, statsData } from '../core/data'
import { SalesChart } from '../components/sales-chart'
import { TabsStats } from '../components/tabs-stats'
import { TopSellingProducts } from '../components/top-selling-products'
import { SalesByChannel } from '../components/sales-by-channel'
import { DateRangePickerFilter } from '@/components/ui/date-range-picker'

const companyOptions = [
  { id: "1", label: "All", value: "all" },
  { id: "2", label: "Company 1", value: "company1" },
  { id: "3", label: "Company 2", value: "company2" },
]

const channelOptions = [
  { id: "1", label: "All", value: "all" },
  { id: "2", label: "Amazon", value: "amazon" },
  { id: "3", label: "Ebay", value: "ebay" },
  { id: "4", label: "Onbuy", value: "onbuy" },
]

const unitSoldOptions = [
  { id: "1", label: "Units", value: "units" },
  { id: "2", label: "Revenue", value: "revenue" },
  { id: "3", label: "Orders", value: "orders" },
  { id: "4", label: "Average Order Value", value: "average_order_value" },
]

const graphTypeOptions = [
  { id: "1", label: "Line", value: "line" },
  { id: "2", label: "Area", value: "area" },
]

export default function AdminDashboardPage() {
  const [date, setDate] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const [chartType, setChartType] = useState<"line" | "area">("area")
  const [unitSold, setUnitSold] = useState<"units" | "revenue" | "orders" | "average_order_value">("units")
  const [company, setCompany] = useState("all")
  const [channel, setChannel] = useState("all")
  const [activeChannels, setActiveChannels] = useState({
    amazon: true,
    ebay: true,
    onbuy: true,
    woocommerce: true,
    shopify: true,
  })

  const toggleChannel = (channelName: string) => {
    setActiveChannels((prev) => ({
      ...prev,
      [channelName]: !prev[channelName as keyof typeof prev],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col">
        <Header title="Dashboard">
          <div className="w-48">
            <CustomSelect
              placeholder="Company Identity"
              defaultValue={company}
              onChange={(value) => setCompany(String(value))}
              options={companyOptions}
              title="Company Identity"
            />
          </div>
          <div className="w-0.5 h-9 bg-gray-200 bg-opacity-50 border-dashed" />
          <div className="w-48">
            <CustomSelect
              placeholder="Channel"
              defaultValue={channel}
              onChange={(value) => setChannel(String(value))}
              options={channelOptions}
              title="Channel"
            />
          </div>
        </Header>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 bg-white rounded-2xl border-none shadow-none gap-0">
          <CardHeader className="pb-0">
            <StatsCards stats={statsData} />
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
                <DateRangePickerFilter date={date} setDate={setDate} className="w-62 flex flex-col justify-end" title="Time Frame:" />
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
              dateRange={date}
              salesData={salesData}
              activeChannels={activeChannels}
            />
            <div className="flex items-center justify-center gap-8 mt-6">
              <div className="flex items-center gap-2">
                <Checkbox id="amazon" checked={activeChannels.amazon} onCheckedChange={() => toggleChannel("amazon")} />
                <label htmlFor="amazon" className="text-sm">
                  Amazon
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="ebay" checked={activeChannels.ebay} onCheckedChange={() => toggleChannel("ebay")} />
                <label htmlFor="ebay" className="text-sm">
                  Ebay
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="woocommerce"
                  checked={activeChannels.woocommerce}
                  onCheckedChange={() => toggleChannel("woocommerce")}
                />
                <label htmlFor="woocommerce" className="text-sm">
                  Woocommerce
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="shopify"
                  checked={activeChannels.shopify}
                  onCheckedChange={() => toggleChannel("shopify")}
                />
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

import { useState, useEffect } from "react"
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
import { useGetAllChannels } from "@/pages/admin/common-api/channels/core/_hooks"
import { IChannel } from "@/pages/admin/common-api/channels/core/_modals"

const companyOptions = [
  { id: "1", label: "All", value: "all" },
  { id: "2", label: "Company 1", value: "company1" },
  { id: "3", label: "Company 2", value: "company2" },
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
  const [channels, setChannels] = useState<IChannel[]>([])
  const { data: channelsData, isLoading, isError } = useGetAllChannels();

  const [activeChannels, setActiveChannels] = useState<{
    amazon: boolean;
    ebay: boolean;
    onbuy: boolean;
    woocommerce: boolean;
    shopify: boolean;
    [key: string]: boolean;
  }>({
    amazon: true,
    ebay: true,
    onbuy: true,
    woocommerce: true,
    shopify: true,
  });

  const unitSoldOptions = [
    { id: "1", label: "Units", value: "units" },
    { id: "2", label: "Revenue", value: "revenue" },
    { id: "3", label: "Orders", value: "orders" },
    { id: "4", label: "Average Order Value", value: "average_order_value" },
  ];

  useEffect(() => {
    const getChannels = async () => {
      if (channelsData?.data) {
        setChannels(channelsData.data);
        const initialActiveChannels: { [key: string]: boolean } = {};
        channelsData.data.forEach(channel => {
          initialActiveChannels[channel.channelName.toLowerCase()] = true;
        });
        setActiveChannels(prevActiveChannels => ({
          ...prevActiveChannels,
          ...initialActiveChannels,
        }));
      }
    };
    getChannels();
  }, [channelsData]);

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
              options={channels.map((channel: IChannel) => ({
                id: channel.channelId,
                label: channel.channelName,
                value: channel.channelId,
              }))}
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
              {channels.map(channel => (
                <div key={channel.channelId} className="flex items-center gap-2">
                  <Checkbox
                    id={channel.channelName.toLowerCase()}
                    checked={!!activeChannels[channel.channelName.toLowerCase()]}
                    onCheckedChange={() => toggleChannel(channel.channelName.toLowerCase())}
                  />
                  <label htmlFor={channel.channelName.toLowerCase()} className="text-sm">
                    {channel.channelName}
                  </label>
                </div>
              ))}
            </div>
            {isLoading && <p>Loading channels...</p>}
            {isError && <p>Error loading channels.</p>}
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

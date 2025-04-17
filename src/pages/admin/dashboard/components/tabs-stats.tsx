
import { useEffect, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useSalesStore } from "@/store/admin/sales-store"
import { fetchDashboardData } from "@/lib/api"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProductStats } from "./product-stats"
export function TabsStats() {
  const [activeTab, setActiveTab] = useState("overview")
  const [dateRange, setDateRange] = useState<{
    from: Date
    to: Date
  }>({
    from: new Date(2025, 1, 28),
    to: new Date(2025, 2, 7),
  })

  const { setSalesData } = useSalesStore()

  const { data } = useQuery({
    queryKey: ["dashboardData", dateRange],
    queryFn: () => fetchDashboardData(dateRange),
  })

  useEffect(() => {
    if (data) {
      setSalesData(data.salesData)
    }
  }, [data, setSalesData])

  // const [selectedChannels, setSelectedChannels] = useState({
  //   amazon: true,
  //   ebay: true,
  //   woocommerce: true,
  //   shopify: true,
  // })

  // const handleChannelChange = (channel: keyof typeof selectedChannels) => {
  //   setSelectedChannels((prev) => ({
  //     ...prev,
  //     [channel]: !prev[channel],
  //   }))
  // }

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full bg-white rounded-2xl p-4">
    <TabsList className="grid w-full grid-cols-4 mb-4">
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="sales">Sales</TabsTrigger>
      <TabsTrigger value="products">Products</TabsTrigger>
      <TabsTrigger value="orders">Orders</TabsTrigger>
    </TabsList>

    <TabsContent value="overview" className="space-y-6">
    overview
    </TabsContent>

    <TabsContent value="sales" className="space-y-6">
    sales
    </TabsContent>

    <TabsContent value="products" className="space-y-6">
      <ProductStats />
    </TabsContent>

    <TabsContent value="orders" className="space-y-6">
    orders
    </TabsContent>
  </Tabs>
  )
}

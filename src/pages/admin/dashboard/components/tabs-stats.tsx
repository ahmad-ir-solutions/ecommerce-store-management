import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Package, ShoppingCart, Warehouse, ListFilter, MoreHorizontal } from "lucide-react"

export function TabsStats() {
  const [activeTab, setActiveTab] = useState("products")

  // Mock product stats data
  const productStats = {
    total: 934,
    outOfStock: 116,
    onPurchaseOrder: 0,
    onBackOrder: 0,
    noWeights: 1,
    noDimensions: 934,
    noCountryOfManufacture: 934,
    unitsInUnknownLocations: 0,
  }

  const stats = [
    {
      title: "Total Products",
      value: productStats.total,
      highlight: false,
    },
    {
      title: "Out Of Stock Products",
      value: productStats.outOfStock,
      highlight: false,
    },
    {
      title: "Products On Purchase Order",
      value: productStats.onPurchaseOrder,
      highlight: false,
    },
    {
      title: "Products On Back Order",
      value: productStats.onBackOrder,
      highlight: false,
    },
    {
      title: "No Weight",
      value: productStats.noWeights,
      highlight: true,
    },
    {
      title: "No Dimensions",
      value: productStats.noDimensions,
      highlight: true,
    },
    {
      title: "No Country Of Manufacture",
      value: productStats.noCountryOfManufacture,
      highlight: false,
    },
    {
      title: "Units In Unknown Locations",
      value: productStats.unitsInUnknownLocations,
      highlight: false,
    },
  ]

  return (
    <div className="w-full bg-white rounded-2xl p-4">
      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white z-10 pb-2">
        <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-16 bg-white">
            <div className="flex flex-col items-center justify-center space-y-1">
              <TabsTrigger
              value="products"
              className="flex flex-col items-center justify-center space-y-1 data-[state=active]:text-white data-[state=active]:bg-[#3D8BFF] data-[state=active]:rounded-md"
              >
              <div className="p-2 rounded-full data-[state=active]:bg-[#3D8BFF] flex items-center justify-center">
                <Package className="h-5 w-5" />
              </div>
              </TabsTrigger>
              <p className="text-xs">Products</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <TabsTrigger
              value="orders"
              className="flex flex-col items-center justify-center space-y-1 data-[state=active]:text-white data-[state=active]:bg-[#3D8BFF]"
              >
              <div className="p-2 rounded-full data-[state=active]:bg-[#3D8BFF] flex items-center justify-center">
                <ShoppingCart className="h-5 w-5" />
              </div>
              </TabsTrigger>
              <p className="text-xs">orders</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <TabsTrigger
              value="warehouse"
              className="flex flex-col items-center justify-center space-y-1 data-[state=active]:text-white data-[state=active]:bg-[#3D8BFF]"
              >
              <div className="p-2 rounded-full data-[state=active]:bg-[#3D8BFF] flex items-center justify-center">
                <Warehouse className="h-5 w-5" />
              </div>
              </TabsTrigger>
              <p className="text-xs">warehouse</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <TabsTrigger
              value="listings"
              className="flex flex-col items-center justify-center space-y-1 data-[state=active]:text-white data-[state=active]:bg-[#3D8BFF]"
              >
              <div className="p-2 rounded-full data-[state=active]:bg-[#3D8BFF] flex items-center justify-center">
                <ListFilter className="h-5 w-5" />
              </div>
              </TabsTrigger>
              <p className="text-xs">listings</p>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <TabsTrigger
              value="others"
              className="flex flex-col items-center justify-center space-y-1 data-[state=active]:text-white data-[state=active]:bg-[#3D8BFF]"
              >
              <div className="p-2 rounded-full data-[state=active]:bg-[#3D8BFF] flex items-center justify-center">
                <MoreHorizontal className="h-5 w-5" />
              </div>
              </TabsTrigger>
              <p className="text-xs">others</p>
            </div>
          </TabsList>

          <TabsContent value="products" className="mt-0">
            <Card className="border-none shadow-none">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => (
                    <div key={index} className={`rounded-lg p-3 ${stat.highlight ? "bg-red-50" : "bg-slate-50"}`}>
                      <p className="text-xs text-slate-500 mb-1">{stat.title}</p>
                      <p className="text-2xl font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <div className="p-4 text-center text-slate-500">Orders content</div>
          </TabsContent>

          <TabsContent value="warehouse" className="mt-0">
            <div className="p-4 text-center text-slate-500">Warehouse content</div>
          </TabsContent>

          <TabsContent value="listings" className="mt-0">
            <div className="p-4 text-center text-slate-500">Listings content</div>
          </TabsContent>

          <TabsContent value="others" className="mt-0">
            <div className="p-4 text-center text-slate-500">Others content</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

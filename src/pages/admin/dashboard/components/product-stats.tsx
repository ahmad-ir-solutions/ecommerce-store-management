import { Card, CardContent } from "@/components/ui/card"
import { useStatsStore } from "@/store/admin/stats-store"

export function ProductStats() {
  const { productStats } = useStatsStore()

  const stats = [
    {
      title: "Total Products",
      value: productStats.total,
    },
    {
      title: "Out Of Stock Products",
      value: productStats.outOfStock,
    },
    {
      title: "Products On Purchase Order",
      value: productStats.onPurchaseOrder,
    },
    {
      title: "Products On Back Order",
      value: productStats.onBackOrder,
    },
    {
      title: "No Weights",
      value: productStats.noWeights,
    },
    {
      title: "No Dimensions",
      value: productStats.noDimensions,
    },
    {
      title: "No Country Of Manufacture",
      value: productStats.noCountryOfManufacture,
    },
    {
      title: "Units In Unknown Stock Locations",
      value: productStats.unitsInUnknownLocations,
    },
  ]

  return (
    <Card className="border-none shadow-none pb-0">
      <CardContent className="px-0">
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-2">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { useStatsStore } from "@/store/admin/stats-store"

export function StatsCards() {
  const { stats } = useStatsStore()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Sale</p>
            <h2 className="text-3xl font-bold">{stats.sales.toLocaleString()}</h2>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Revenue</p>
            <h2 className="text-3xl font-bold">
              £
              {stats.revenue.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Tax & Shipping</p>
            <h2 className="text-3xl font-bold">
              £
              {stats.taxAndShipping.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </h2>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

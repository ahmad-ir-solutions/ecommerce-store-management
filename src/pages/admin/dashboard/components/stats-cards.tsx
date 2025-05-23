import { Card, CardContent } from "@/components/ui/card"

interface StatsCardsProps {
  stats: {
    sales: number
    revenue: number
    taxAndShipping: number
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="flex justify-between gap-6 border-b border-gray-200">
      <Card className="rounded-2xl border-none shadow-none pt-0">
        <CardContent className="p-0">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Sale</p>
            <h2 className="text-3xl font-bold">{stats.sales.toLocaleString()}</h2>
          </div>
        </CardContent>
      </Card>
      <div className="w-0.5 h-20 bg-gray-200 bg-opacity-50 border-dashed"></div>

      <Card className="rounded-2xl border-none shadow-none pt-0">
        <CardContent className="p-0">
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
      <div className="w-0.5 h-20 bg-gray-200 bg-opacity-50 border-dashed"></div>

      <Card className="rounded-2xl border-none shadow-none pt-0">
        <CardContent className="p-0">
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

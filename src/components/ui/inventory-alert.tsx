import type { ColumnDef } from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fetchInventoryAlerts } from "@/lib/api"
import { DataTable } from "@/components/ui/data-table"

interface InventoryAlert {
  id: string
  sku: string
  product: string
  alertType: string
  currentStock: number
  threshold: number
}

export function InventoryAlerts() {
  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["inventoryAlerts"],
    queryFn: fetchInventoryAlerts,
  })

  const getAlertTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "low stock":
        return "bg-yellow-100 text-yellow-800"
      case "out of stock":
        return "bg-red-100 text-red-800"
      case "overstock":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const columns: ColumnDef<InventoryAlert>[] = [
    {
      accessorKey: "sku",
      header: "SKU",
      cell: ({ row }) => <div className="font-medium">{row.getValue("sku")}</div>,
    },
    {
      accessorKey: "product",
      header: "Product",
    },
    {
      accessorKey: "alertType",
      header: "Alert Type",
      cell: ({ row }) => (
        <Badge variant="outline" className={getAlertTypeColor(row.getValue("alertType"))}>
          {row.getValue("alertType")}
        </Badge>
      ),
    },
    {
      accessorKey: "currentStock",
      header: "Current Stock",
      cell: ({ row }) => <div className="text-right">{row.getValue("currentStock")}</div>,
    },
    {
      accessorKey: "threshold",
      header: "Threshold",
      cell: ({ row }) => <div className="text-right">{row.getValue("threshold")}</div>,
    },
    {
      id: "actions",
      header: "Action",
      cell: () => (
        <Button variant="ghost" size="sm">
          Order
        </Button>
      ),
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Inventory Alerts</CardTitle>
        <Button variant="outline" size="sm">
          Manage Inventory
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : (
          <DataTable columns={columns} data={alerts} />
        )}
      </CardContent>
    </Card>
  )
}

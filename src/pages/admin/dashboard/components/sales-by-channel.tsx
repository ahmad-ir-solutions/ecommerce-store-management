import type { ColumnDef } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSalesStore } from "@/store/admin/sales-store"
import { DataTable } from "@/components/ui/data-table"

interface ChannelSales {
  id: number
  name: string
  today: number
  yesterday: number
  thisWeek: number
  lastWeek: number
  thisMonth: number
  lastMonth: number
}

export function SalesByChannel() {
  const { channelSales } = useSalesStore()

  const columns: ColumnDef<ChannelSales>[] = [
    {
      accessorKey: "name",
      header: "Channel",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "today",
      header: "Today",
      cell: ({ row }) => <div>£{(row.getValue("today") as number).toFixed(2)}</div>,
    },
    {
      accessorKey: "yesterday",
      header: "Yesterday",
      cell: ({ row }) => <div>£{(row.getValue("yesterday") as number).toFixed(2)}</div>,
    },
    {
      accessorKey: "thisWeek",
      header: "This Week",
      cell: ({ row }) => <div>£{(row.getValue("thisWeek") as number).toFixed(2)}</div>,
    },
    {
      accessorKey: "lastWeek",
      header: "Last Week",
      cell: ({ row }) => <div>£{(row.getValue("lastWeek") as number).toFixed(2)}</div>,
    },
    {
      accessorKey: "thisMonth",
      header: "This Month",
      cell: ({ row }) => <div>£{(row.getValue("thisMonth") as number).toFixed(2)}</div>,
    },
    {
      accessorKey: "lastMonth",
      header: "Last Month",
      cell: ({ row }) => <div>£{(row.getValue("lastMonth") as number).toFixed(2)}</div>,
    },
  ]

  return (
    <Card className="bg-white rounded-2xl border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Overview of sales by channel</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={channelSales} />
      </CardContent>
    </Card>
  )
}

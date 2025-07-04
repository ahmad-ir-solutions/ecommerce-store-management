
import { useState } from "react"
import type { ColumnDef } from "@tanstack/react-table"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { fetchRecentOrders } from "@/lib/api"
import { DataTable } from "@/components/ui/data-table"

interface Order {
  id: string
  customer: string
  date: string
  status: string
  items: number
  total: number
}

export function RecentOrders() {
  const [orderStatus, setOrderStatus] = useState("all")

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["recentOrders", orderStatus],
    queryFn: () => fetchRecentOrders(orderStatus),
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "customer",
      header: "Customer",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className={getStatusColor(row.getValue("status"))}>
          {row.getValue("status")}
        </Badge>
      ),
    },
    {
      accessorKey: "items",
      header: "Items",
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ row }) => <div className="text-right">£{(row.getValue("total") as number).toFixed(2)}</div>,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
        <div className="flex items-center gap-2">
          <Select value={orderStatus} onValueChange={setOrderStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>  
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : (
          <DataTable columns={columns} data={orders} showPagination />
        )}
      </CardContent>
    </Card>
  )
}

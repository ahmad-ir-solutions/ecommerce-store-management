import type { ColumnDef } from "@tanstack/react-table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProductsStore } from "@/store/admin/products-store"
import { DataTable } from "@/components/ui/data-table"

interface Product {
  id: number
  sku: string
  name: string
  quantity: number
  revenue: number
}

export function TopSellingProducts() {
  const { topSellingProducts } = useProductsStore()

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "sku",
      header: "Product SKU",
      cell: ({ row }) => <div className="font-medium">{row.getValue("sku")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: ({ row }) => <div className="text-right">{row.getValue("quantity")}</div>,
    },
    {
      accessorKey: "revenue",
      header: "Revenue (ex VAT)",
      cell: ({ row }) => <div className="text-right">£{(row.getValue("revenue") as number).toFixed(2)}</div>,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Top Selling Products</CardTitle>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={topSellingProducts} />
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useProductsStore } from "@/store/admin/products-store"
import { CustomSelect } from "@/components/shared/custom-select"
// import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TopSellingProducts() {
  const { topSellingProducts } = useProductsStore()
  // const [timePeriod, setTimePeriod] = useState("7days")
  // const columns: ColumnDef<Product>[] = [
  //   {
  //     accessorKey: "sku",
  //     header: "Product SKU",
  //     cell: ({ row }) => <div className="font-medium">{row.getValue("sku")}</div>,
  //   },
  //   {
  //     accessorKey: "name",
  //     header: "Name",
  //   },
  //   {
  //     accessorKey: "quantity",
  //     header: "Quantity",
  //     cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  //   },
  //   {
  //     accessorKey: "revenue",
  //     header: "Revenue (ex VAT)",
  //     cell: ({ row }) => <div>£{(row.getValue("revenue") as number).toFixed(2)}</div>,
  //   },
  // ]

  return (
    <Card className="bg-white rounded-2xl border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Top Selling Products</CardTitle>
        <CustomSelect
          placeholder="Select time period"
          options={[
            {
              label: "Last 7 Days", value: "7days",
              id: "1"
            },
            {
              label: "Last 30 Days", value: "30days",
              id: "2"
            },
            {
              label: "Last 90 Days", value: "90days",
              id: "3"
            },
          ]}
          // onChange={(value) => setTimePeriod(value)}
          onChange={(value) => console.log(value)}
          className="w-[180px]"
        />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#ECF6FF] rounded-lg">
              <TableHead className="w-[100px] p-3">Product SKU</TableHead>
              <TableHead className="p-3">Name</TableHead>
              <TableHead className="text-right p-3">Quantity</TableHead>
              <TableHead className="text-right p-3">Revenue (ex VAT)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topSellingProducts.map((product) => (
              <TableRow key={product.id} className="border-none text-[#727272]">
                <TableCell className="font-normal text-[#11263C] p-3">{product.sku}</TableCell>
                <TableCell className="text-sm p-3">{product.name}</TableCell>
                <TableCell className="text-right p-3">{product.quantity}</TableCell>
                <TableCell className="text-right text-[#11263C] p-3">£{product.revenue.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomSelect } from "@/components/shared/custom-select"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { topSellingProductsData } from '../core/data'

export function TopSellingProducts() {
  const [timePeriod, setTimePeriod] = useState("7days")
  const [products, setProducts] = useState(topSellingProductsData)

  // This would normally filter products based on time period
  const handleTimePeriodChange = (value: string | number) => {
    setTimePeriod(String(value))
    // In a real app, you would filter products based on the time period
    // For now, we'll just use the same data
    setProducts(topSellingProductsData)
  }

  return (
    <Card className="bg-white rounded-2xl border-none shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Top Selling Products</CardTitle>
        <CustomSelect
          placeholder="Select time period"
          options={[
            {
              label: "Last 7 Days",
              value: "7days",
              id: "1",
            },
            {
              label: "Last 30 Days",
              value: "30days",
              id: "2",
            },
            {
              label: "Last 90 Days",
              value: "90days",
              id: "3",
            },
          ]}
          onChange={handleTimePeriodChange}
          defaultValue={timePeriod}
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
            {products.map((product) => (
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

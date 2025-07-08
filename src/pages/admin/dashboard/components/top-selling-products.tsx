import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomSelect } from "@/components/shared/custom-select"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetTopSellingProducts } from "../core/hooks/use-dashboard"
import { ITopSellingProduct } from "../core/_modals"
import { Loader2 } from "lucide-react"

export function TopSellingProducts() {
  const [timePeriod, setTimePeriod] = useState("7days")
  const [limit, setLimit] = useState(7); // State to manage the limit for the API call
  const { data: productsData, isLoading, isError } = useGetTopSellingProducts(limit);

  // This would normally filter products based on time period
  const handleTimePeriodChange = (value: string | number) => {
    setTimePeriod(String(value))
    // Map time period to a limit for the API call
    switch (value) {
      case "7days":
        setLimit(7);
        break;
      case "30days":
        setLimit(30);
        break;
      case "90days":
        setLimit(90);
        break;
      default:
        setLimit(7);
    }
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
              <TableHead className="text-start p-3">Quantity</TableHead>
              <TableHead className="text-right p-3">Revenue (ex VAT)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && <TableRow><TableCell colSpan={4}><div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
            </div></TableCell></TableRow>}
            {isError && <TableRow><TableCell colSpan={4}><div className="flex justify-center items-center h-64">
              Error loading products.
            </div></TableCell></TableRow>}
            {productsData?.data?.map((product: ITopSellingProduct) => (
              <TableRow key={product._id} className="border-none text-[#727272]">
                <TableCell className="font-normal text-[#11263C] p-3">{product.sku}</TableCell>
                <TableCell className="text-sm p-3">{product.productName}</TableCell>
                <TableCell className="text-start p-3">{product.totalSales}</TableCell>
                <TableCell className="text-right text-[#11263C] p-3">£{product.totalRevenue.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

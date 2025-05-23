import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { channelSalesData } from '../core/data'

export function SalesByChannel() {
  return (
    <Card className="bg-white rounded-2xl border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Overview of sales by channel</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#ECF6FF] rounded-lg">
              <TableHead className="p-3">Channel</TableHead>
              <TableHead className="p-3">Today</TableHead>
              <TableHead className="p-3">Yesterday</TableHead>
              <TableHead className="p-3">This Week</TableHead>
              <TableHead className="p-3">Last Week</TableHead>
              <TableHead className="p-3">This Month</TableHead>
              <TableHead className="p-3">Last Month</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {channelSalesData.map((channel) => (
              <TableRow key={channel.id} className="border-none text-[#727272]">
                <TableCell className="font-medium p-3">{channel.name}</TableCell>
                <TableCell className="p-3">£{channel.today.toFixed(2)}</TableCell>
                <TableCell className="p-3">£{channel.yesterday.toFixed(2)}</TableCell>
                <TableCell className="p-3">£{channel.thisWeek.toFixed(2)}</TableCell>
                <TableCell className="p-3">£{channel.lastWeek.toFixed(2)}</TableCell>
                <TableCell className="p-3">£{channel.thisMonth.toFixed(2)}</TableCell>
                <TableCell className="p-3">£{channel.lastMonth.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

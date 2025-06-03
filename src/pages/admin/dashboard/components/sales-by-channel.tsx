import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useGetOrderStats } from "../core/hooks/use-dashboard";
import { useState, useEffect } from "react";
import { isToday, isYesterday, isThisWeek, isThisMonth, parseISO, isSameWeek, isSameMonth, subWeeks, subMonths } from 'date-fns';
import { Loader2 } from "lucide-react";

interface ChannelSalesStats {
  channelName: string;
  today: number;
  yesterday: number;
  thisWeek: number;
  lastWeek: number;
  thisMonth: number;
  lastMonth: number;
}

export function SalesByChannel() {
  const { data: orderStatsData, isLoading, isError } = useGetOrderStats();
  const [channelSalesStats, setChannelSalesStats] = useState<ChannelSalesStats[]>([]);

  useEffect(() => {
    if (orderStatsData?.data) {
      const stats: { [key: string]: ChannelSalesStats } = {};

      orderStatsData.data.forEach(order => {
        const channelName = order.channelDetails.channelName;
        const orderDate = parseISO(order.createdAt);
        const revenue = order.totalPrice; // Assuming totalPrice is revenue

        if (!stats[channelName]) {
          stats[channelName] = {
            channelName,
            today: 0,
            yesterday: 0,
            thisWeek: 0,
            lastWeek: 0,
            thisMonth: 0,
            lastMonth: 0,
          };
        }

        if (isToday(orderDate)) {
          stats[channelName].today += revenue;
        }
        if (isYesterday(orderDate)) {
          stats[channelName].yesterday += revenue;
        }
        if (isThisWeek(orderDate)) {
          stats[channelName].thisWeek += revenue;
        }
        // Check if date is within last week (excluding this week)
        const lastWeek = subWeeks(new Date(), 1);
        if (isSameWeek(orderDate, lastWeek) && !isThisWeek(orderDate)) {
          stats[channelName].lastWeek += revenue;
        }
        if (isThisMonth(orderDate)) {
          stats[channelName].thisMonth += revenue;
        }
        // Check if date is within last month (excluding this month)
        const lastMonth = subMonths(new Date(), 1);
        if (isSameMonth(orderDate, lastMonth) && !isThisMonth(orderDate)) {
          stats[channelName].lastMonth += revenue;
        }
      });

      setChannelSalesStats(Object.values(stats));
    }
  }, [orderStatsData]);

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
            {isLoading && <TableRow><TableCell colSpan={7}><div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div></TableCell></TableRow>}
            {isError && <TableRow><TableCell colSpan={7}><div className="flex justify-center items-center h-64">
              Error loading sales by channel.
            </div></TableCell></TableRow>}
            {channelSalesStats.map((channel) => (
              <TableRow key={channel.channelName} className="border-none text-[#727272]">
                <TableCell className="font-medium p-3">{channel.channelName}</TableCell>
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

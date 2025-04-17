import type { ColumnDef, CellContext } from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useSalesStore } from "@/store/admin/sales-store"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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
      id: "name",
      header: "Channel",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      id: "today",
      header: "Today",
      cell: ({ row }) => <div>£{(row.getValue("today") as number).toFixed(2)}</div>,
    },
    {
      id: "yesterday",
      header: "Yesterday",
      cell: ({ row }) => <div>£{(row.getValue("yesterday") as number).toFixed(2)}</div>,
    },
    {
      id: "thisWeek",
      header: "This Week",
      cell: ({ row }) => <div>£{(row.getValue("thisWeek") as number).toFixed(2)}</div>,
    },
    {
      id: "lastWeek",
      header: "Last Week",
      cell: ({ row }) => <div>£{(row.getValue("lastWeek") as number).toFixed(2)}</div>,
    },
    {
      id: "thisMonth",
      header: "This Month",
      cell: ({ row }) => <div>£{(row.getValue("thisMonth") as number).toFixed(2)}</div>,
    },
    {
      id: "lastMonth",
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
        <Table>
          <TableHeader>
            <TableRow className="border-none bg-[#ECF6FF] rounded-lg">
              {columns.map((column) => (
                <TableHead key={column.id} className="p-3">
                  {column.header as string}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {channelSales.map((channel) => (
              <TableRow key={channel.id} className="border-none text-[#727272]">
                {columns.map((column) => (
                  <TableCell key={column.id} className="p-3">
                    {typeof column.cell === 'function' ? 
                      column.cell({ 
                        row: { 
                          getValue: (key: keyof ChannelSales) => channel[key] 
                        } 
                      } as CellContext<ChannelSales, unknown>) : 
                      channel[column.id as keyof ChannelSales]
                    }
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

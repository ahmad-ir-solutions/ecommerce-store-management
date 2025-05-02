import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Customer } from "../core/_modals"
import { Skeleton } from "@/components/ui/skeleton"

export function CustomersTable({
  customers,
  isLoading,
}: {
  customers: Customer[]
  isLoading: boolean
}) {
  const [rowSelection, setRowSelection] = useState({})

  const columns: ColumnDef<Customer>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "avatar",
      header: "Customers",
      cell: ({ row }) => {
        const initials = row.original.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 bg-red-500 text-white">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{row.original.name}</span>
              <span className="text-xs text-muted-foreground">{row.original.email}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "reference",
      header: "Reference",
    },
    {
      accessorKey: "billingAddress",
      header: "Billing Address",
      cell: ({ row }) => {
        const address = row.original.billingAddress
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8 bg-blue-500 text-white">
              <AvatarFallback>{address.country.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{address.line1}</span>
              <span className="text-xs text-muted-foreground">{address.country}</span>
            </div>
          </div>
        )
      },
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    {
      accessorKey: "order",
      header: "Order",
      cell: ({ row }) => {
        const order = row.original.order
        return (
          <div className="flex flex-col">
            <span>Numbers: {order.numbers}</span>
            <span>Average: £{order.average.toFixed(2)}</span>
            <span>Total: £{order.total.toFixed(2)}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "channel",
      header: "Channel",
      cell: ({ row }) => {
        const channel = row.original.channel
        return (
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-green-500 text-white">
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <span>{channel}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
    },
    {
      accessorKey: "notes",
      header: "Notes",
    },
  ]

  const table = useReactTable({
    data: customers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  if (isLoading) {
    return <TableSkeleton />
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                //   onClick={() => router.push(`/customers/${row.original.id}`)}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            First
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Last
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">Page 1 of 18 · Items 1 to 25 of 337</div>
      </div>
    </div>
  )
}

function TableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {Array.from({ length: 8 }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="h-6 w-full" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, i) => (
            <TableRow key={i}>
              {Array.from({ length: 8 }).map((_, j) => (
                <TableCell key={j}>
                  <Skeleton className="h-8 w-full" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

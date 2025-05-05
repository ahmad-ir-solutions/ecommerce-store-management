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
import { PaginationControls } from "../../../../components/shared/PaginationControls"
import { useNavigate } from "react-router-dom"

export function CustomersTable({
  customers,
  isLoading,
}: {
  customers: Customer[]
  isLoading: boolean
}) {
  const [rowSelection, setRowSelection] = useState({})
  const navigate = useNavigate()
  const columns: ColumnDef<Customer>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-[#BBC2CB] w-4.5 h-4.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          onClick={(e) => e.stopPropagation()}
          className="border-[#BBC2CB] w-4.5 h-4.5"
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
              <span className="text-xs text-[#4E5967]">{row.original.email}</span>
              <span className="text-xs text-[#4E5967]">{row.original.phoneNumber}</span>
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
              <div className="grid grid-cols-[65px_1fr] items-center">
                <span className="text-[#4E5967]">Number</span>
                <span className="font-medium">{order.numbers}</span>
              </div>
              <div className="grid grid-cols-[65px_1fr] items-center">
                <span className="text-[#4E5967]">Average</span>
                <span className="font-medium">£{order.average.toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-[65px_1fr] items-center">
                <span className="text-[#4E5967]">Total</span>
                <span className="font-medium">£{order.total.toFixed(2)}</span>
              </div>
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
            <span className="underline">{channel}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: () => {
        return (
          <div className="flex items-center gap-2">
            <span>-</span>
          </div>
        )
      },
    },
    {
      accessorKey: "notes",
      header: "Notes",
      cell: () => {
        return (
          <div className="flex items-center gap-2">
            <span>-</span>
          </div>
        )
      },
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
    return <div>Loading...</div>
  }

   // Calculate total pages
   const totalPages = table.getPageCount()
   const currentPage = table.getState().pagination.pageIndex + 1
 
   // Handle page change
   const handlePageChange = (page: number) => {
     table.setPageIndex(page - 1)
   }

  return (
    <div className="space-y-4">
      <div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-[#ECF6FF] border-b-0">
               {headerGroup.headers.map((header, index) => {
                  const isFirst = index === 0;
                  const isLast = index === headerGroup.headers.length - 1;

                  return (
                    <TableHead
                      key={header.id}
                      className={`${isFirst ? "rounded-tl-xl rounded-bl-xl" : ""} ${isLast ? "rounded-tr-xl rounded-br-xl" : ""} py-3 border-b border-b-white`}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => navigate(`/admin/customer-details/${row.original.id}`)}
                  className="cursor-pointer border-b-[#ECE9F1]"
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
            variant="primary"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="max-w-24"
          >
            First
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="max-w-24"
          >
            Previous
          </Button>
          <span className="text-sm border border-[#BBC2CB] rounded-md p-1 px-5 max-w-24">
            {table.getState().pagination.pageIndex + 1}
          </span>
          <Button variant="primary" className="max-w-24" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="max-w-24"
          >
            Last
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} - Items {(currentPage - 1) * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(currentPage * table.getState().pagination.pageSize, customers.length)} of {customers.length}
        </div>
      </div>
    </div>
  )
}

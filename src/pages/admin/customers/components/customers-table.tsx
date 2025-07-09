import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ICustomer } from "../core/_modals"
// import { useNavigate } from "react-router-dom"
import { columns } from './customer-column'
import { Loader2 } from 'lucide-react'
import { CustomPagination } from "@/components/shared/custom-pagination"

export function CustomersTable({
  customers,
  isLoading,
  onPageChange,
  totalPages,
  totalItems,
  currentPage,
  itemsPerPage,
  error,
  search
}: {
  customers: ICustomer[]
  isLoading: boolean
  onPageChange: (page: number) => void
  totalPages: number
  totalItems: number
  currentPage: number
  error: any
  itemsPerPage: number
  search: string
}) {
  const [rowSelection, setRowSelection] = useState({})
  // const navigate = useNavigate()

  const table = useReactTable({
    data: customers,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      globalFilter: search,
    },
    globalFilterFn: "includesString",
  })

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
            {error && <TableRow><TableCell colSpan={columns.length}><div className="flex justify-center items-center h-64">
              Error loading customers: {(error as Error).message}
            </div></TableCell></TableRow>}
            {isLoading && <TableRow><TableCell colSpan={columns.length}><div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
            </div></TableCell></TableRow>}
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                // onClick={() => navigate(`/admin/customer-details/${row.original._id}`)}
                className="border-b-[#ECE9F1]"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </div>
  )
}

import { useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus } from "lucide-react"
import { PaginationControls } from "@/components/shared/PaginationControls"
import { useQuery } from "@tanstack/react-query"
import { fetchInventory } from "../../products/core/_request"
import { useOrderProductColumns } from "./order-product-column"

export function OrderProductTable() {

  const columns = useOrderProductColumns()
  const [columnFilters, setColumnFilters] = useState<any[]>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  })

  console.log(data,"data");
  

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    enableSorting: true,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const columnFilterTypes: Record<string, string> = {
    sku: "input",
    name: "input",
    mpn: "input",
    ean: "input"
  }

  if (isLoading) {
    return <div>Loading inventory data...</div>
  }

  // const handleSelectChange = (value: string) => {
  //   console.log(value, "value");
    
  //   applySavedFilter(value)
  // }

  const handleClearFilters = () => {
    setColumnFilters([]); // Clear column filters
    setGlobalFilter(""); // Clear global filter
  };
  

   // Calculate total pages
   const totalPages = table.getPageCount()
   const currentPage = table.getState().pagination.pageIndex + 1
 
   // Handle page change
   const handlePageChange = (page: number) => {
     table.setPageIndex(page - 1)
   }

  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-4 px-6 py-4 shadow-none">
    <div className="py-4 flex justify-between items-center">
      <Button
        type="button"
        variant="filter"
        size="sm"
        className="h-10 shadow-none"
        // onClick={handleAddSelectedProducts}
        // disabled={isSubmitting}
      >
        <Plus className="h-4 w-4 mx-1" />
        {"Add Selected Products"}
      </Button>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="filter"
          size="sm"
          className="h-10 shadow-none"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </div>
      <Table>
        <TableHeader className="">
          <TableRow className="border-none bg-[#ECF6FF] rounded-tl-xl">
            {table.getFlatHeaders().map((header) => (
              <TableHead key={header.id} className="whitespace-nowrap leading-0">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
          <TableRow className="border-gray-400 bg-[#ECF6FF] rounded-tl-xl">
            {table.getFlatHeaders().map((header) => {
              console.log(header, "header")
              return (
                <>
              <TableHead key={`filter-${header.id}`}>
              {header.column.getCanFilter() ? (
                <div>
                  {/* Render different filter types based on column */}
                  {columnFilterTypes[header.id] === "input" ? (
                      <Input
                      value={(header.column.getFilterValue() as string) ?? ""}
                      onChange={(e) => header.column.setFilterValue(e.target.value)}
                      className="h-8 w-full bg-white border-gray-300"
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : null}
            </TableHead>
                </>
              )
              })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="border-gray-200">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between mt-5">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="max-w-24"
          >
            First
          </Button>
          <Button
            type="button"
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
          <Button type="button" variant="primary" className="max-w-24" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
          <Button
            type="button"
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
        <div className="text-sm text-muted-foreground hidden xl:block">
          Page {currentPage} of {totalPages} - Items {(currentPage - 1) * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(currentPage * table.getState().pagination.pageSize, (data?.length ?? 0))} of {data?.length ?? 0}
        </div>
      </div>
    </div>
  )
}

export default OrderProductTable;
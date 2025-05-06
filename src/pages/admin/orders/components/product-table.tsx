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
import { useProductsStore } from "@/store/admin/products-store"
import { DateRangePickerFilter } from "../../../../components/shared/date-range-picker-filter"
import { CheckboxListFilter } from "../../../../components/shared/checkbox-list-filter"
import { PaginationControls } from "@/components/shared/PaginationControls"
import { useQuery } from "@tanstack/react-query"
import { fetchInventory } from "../../products/core/_request"
import { SimpleDropdownFilter } from "../../products/components/simple-dropdown-filter"
import { ComparisonOperatorFilter } from "../../products/components/comparison-operator-filter"
import { OrderDetails } from "../core/_modals"
import { useOrderProductColumns } from "./order-product-column"

interface Product {
  id: string
  sku: string
  name: string
  mpn: string
  ean: string
  inventory: number
  price: number
}

interface ProductsTableProps {
  onAddProducts: (products: any[]) => Promise<OrderDetails>
}

export default function ProductTable() {
 const { resetFilters } = useProductsStore()

  const columns = useOrderProductColumns()
  const [columnFilters, setColumnFilters] = useState<any[]>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const { data, isLoading, error } = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  })

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
    // type: "simple-dropdown",
    type: "checkbox-list",
    inventory: "comparison-operator",
    supplierInventory: "comparison-operator",
    onPurchaseOrder: "comparison-operator",
    onBackOrder: "comparison-operator",
    soldLast30Days: "comparison-operator",
    outOfStockDate: "date-range",
    createDate: "date-range",
    stockLocations: "checkbox-list",
    warehouse: "checkbox-list",
    suppliers: "checkbox-list",
  }

  // Define options for dropdown filters
  const filterOptions = {
    type: ["All", "Simple", "Variation", "Kit"],
    stockLocations: [
      "Default Warehouse - A1",
      "Default Warehouse - A1-PA1",
      "Default Warehouse - A2-PA2",
      "Default Warehouse - A3-PA3",
      "Default Warehouse - A4-PA4",
      "Default Warehouse - B1-PB1",
      "Default Warehouse - C1-PC1",
      "Default Warehouse - C2-PC2",
    ],
    warehouse: [
      "Default Warehouse - A1",
      "Default Warehouse - A1-PA1",
      "Default Warehouse - A2-PA2",
      "Default Warehouse - A3-PA3",
      "Default Warehouse - A4-PA4",
    ],
    suppliers: ["Designers Collection", "Example Supplier"],
  }

  if (isLoading) {
    return <div>Loading inventory data...</div>
  }

  // const handleSelectChange = (value: string) => {
  //   console.log(value, "value");
    
  //   applySavedFilter(value)
  // }

  const handleResetFilters = () => {
    resetFilters()
  }

   // Calculate total pages
   const totalPages = table.getPageCount()
   const currentPage = table.getState().pagination.pageIndex + 1
 
   // Handle page change
   const handlePageChange = (page: number) => {
     table.setPageIndex(page - 1)
   }

  return (
    <div className="flex items-center justify-between bg-white py-3 px-6 rounded-2xl">
      <div className="bg-white rounded-2xl overflow-hidden mb-4 px-6">
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
            onClick={handleResetFilters}
          >
            Clear Filters
          </Button>
        </div>
      </div>
        <Table>
          <TableHeader className="">
            <TableRow className="border-none">
              {table.getFlatHeaders().map((header) => (
                <TableHead key={header.id} className="whitespace-nowrap leading-0">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
            <TableRow className="border-gray-400">
              {table.getFlatHeaders().map((header) => {
                console.log(header, "header")
                return (
                  <>
                  {/* <TableHead></TableHead> */}
                <TableHead key={`filter-${header.id}`}>
                {header.column.getCanFilter() ? (
                  <div>
                    {/* Render different filter types based on column */}
                    {columnFilterTypes[header.id] === "simple-dropdown" ? (
                      <SimpleDropdownFilter
                        column={header.column}
                        options={filterOptions[header.id as keyof typeof filterOptions] || []}
                      />
                    ) : columnFilterTypes[header.id] === "comparison-operator" ? (
                      <ComparisonOperatorFilter column={header.column} />
                    ) : columnFilterTypes[header.id] === "date-range" ? (
                      <DateRangePickerFilter column={header.column} />
                    ) : columnFilterTypes[header.id] === "checkbox-list" ? (
                      <CheckboxListFilter
                        column={header.column}
                        options={filterOptions[header.id as keyof typeof filterOptions] || []}
                      />
                    ) : (
                      <Input
                        placeholder={`Filter ${header.column.columnDef.header?.toString() || ""}`}
                        value={(header.column.getFilterValue() as string) ?? ""}
                        onChange={(e) => header.column.setFilterValue(e.target.value)}
                        className="h-8 w-full border-gray-300"
                      />
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
        <div className="flex items-center justify-between">
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
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} - Items {(currentPage - 1) * table.getState().pagination.pageSize + 1} to{" "}
          {Math.min(currentPage * table.getState().pagination.pageSize, (data?.length ?? 0))} of {data?.length ?? 0}
        </div>
      </div>
      </div>
    </div>
  )
}

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
import { Check, Plus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { exportOrders, fetchOrders } from "../core/_dummy"
import { SavedFilters } from "../../products/components/saved-filter"
import { CheckboxListFilter } from "../../../../components/shared/checkbox-list-filter"
import { DateRangePickerFilter } from "../../../../components/shared/date-range-picker-filter"
import { PaginationControls } from "@/components/shared/PaginationControls"
import { SaveFilterModal } from "../../products/components/modals/save-filter-modal"
import { useOrderFilterStore } from "@/store/admin/order-filter-store"
import { useOrderColumns as columns } from "../components/order-columns"
import { CustomSelect } from "@/components/shared/custom-select"
import { Header } from "@/components/shared/header"
import { CustomSearch } from "@/components/shared/custom-search"

export function ManageOrderPage() {
  const { savedFilters, applySavedFilter, activeFilters, resetFilters, setActiveFilters } = useOrderFilterStore()
  const [columnFilters, setColumnFilters] = useState<any[]>(activeFilters.columnFilters || [])
  const [globalFilter, setGlobalFilter] = useState(activeFilters.globalFilter || "")
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
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
    onColumnFiltersChange: (filters) => {
      setColumnFilters(filters as any[])
      setActiveFilters({ columnFilters: filters as any[], globalFilter })
    },
    onGlobalFilterChange: (filter) => {
      setGlobalFilter(filter)
      setActiveFilters({ columnFilters, globalFilter: filter })
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const columnFilterTypes: Record<string, string> = {
    ordersFlags: "checkbox-list",
    channel: "checkbox-list",
    orderDate: "date-range",
    dispatchDate: "date-range",
    channelDispatchDate: "date-range",
    shippingCountry: "checkbox-list",
    shippingMethod: "checkbox-list",
  }

  // Define options for dropdown filters
  const filterOptions = {
    ordersFlags: ["All", "Pending", "Shipped", "Cancelled"],
    channel: ["All", "TikTok", "Amazon", "eBay", "Shopify"],
    shippingCountry: ["All", "UNITED KINGDOM", "UNITED STATES", "GERMANY", "FRANCE", "AUSTRALIA"],
    shippingMethod: ["All", "Tracked 24", "Tracked 48", "Standard", "Express"],
  }

  if (isLoading) {
    return <div>Loading orders data...</div>
  }

  if (error) {
    return <div>Error loading orders: {(error as Error).message}</div>
  }

  const handleActionChange = (value: string) => {
    setSelectedAction(value)
  }

  const handleActionExecute = async () => {
    if (selectedAction === "export") {
      const selectedRows = table.getSelectedRowModel().rows
      const selectedIds = selectedRows.map((row) => row.original.id)

      if (selectedIds.length === 0) {
        alert("Please select at least one order to export")
        return
      }

      try {
        await exportOrders(selectedIds)
        alert("Orders exported successfully")
      } catch (error) {
        console.error("Failed to export orders:", error)
        alert("Failed to export orders")
      }
    }
  }

  const handleSaveFilters = () => {
    setIsSaveModalOpen(true)
  }

  const handleResetFilters = () => {
    resetFilters()
    setColumnFilters([])
    setGlobalFilter("")
  }

  // Calculate total pages
  const totalPages = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1

  // Handle page change
  const handlePageChange = (page: number) => {
    table.setPageIndex(page - 1)
  }

  return (
    <div>
      <Header title="Orders">
      <div className="flex items-center justify-end h-16 px-6 gap-6">
        <CustomSearch className='w-[25rem]' onClick={() => {}} placeholder="Search for orders, Channels order reference, name, postcode (min.3 characters)" />
        <div className="flex items-center gap-4">
          <Button  variant="default" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
          <Plus />
            Add Order
          </Button>
        </div>
      </div>
      </Header>
      <div className="mt-6">
        <div className="space-y-4">
        <div className="flex items-center justify-between bg-white py-4 px-6 rounded-2xl">
          <div className="flex items-center space-x-2">
            <CustomSelect
              placeholder="Please select"
              options={[
                { id: "export", label: "Export", value: "export" },
              ]}
              className="w-[200px]"
              onChange={handleActionChange}
              />
            <Button
              variant="default"
              size="icon"
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleActionExecute}
              disabled={!selectedAction}
            >
              <Check className="h-4 w-4 text-white" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <SavedFilters />
            <Button variant="filter" onClick={handleSaveFilters}>
              Save Filters
            </Button>
            <Button variant="filter" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        </div>

        <div className="bg-white py-3 px-6 rounded-2xl">
          <Table>
            <TableHeader>
              <TableRow className="border-none">
                {table.getFlatHeaders().map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
              <TableRow className="border-gray-400">
                {table.getFlatHeaders().map((header) => (
                  <TableHead key={`filter-${header.id}`}>
                    {header.column.getCanFilter() ? (
                      <div>
                        {/* Render different filter types based on column */}
                        {columnFilterTypes[header.id] === "checkbox-list" ? (
                          <CheckboxListFilter
                            column={header.column}
                            options={filterOptions[header.id as keyof typeof filterOptions] || []}
                          />
                        ) : columnFilterTypes[header.id] === "date-range" ? (
                          <DateRangePickerFilter column={header.column} />
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
                ))}
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
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        {/* pagination */}
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
            {Math.min(currentPage * table.getState().pagination.pageSize, (data?.length ?? 0))} of {data?.length ?? 0}
          </div>
        </div>

        <SaveFilterModal
          isOpen={isSaveModalOpen}
          onClose={() => setIsSaveModalOpen(false)}
          currentFilters={{ columnFilters, globalFilter }}
        />
        </div>
      </div>
    </div>
  )
}

export default ManageOrderPage

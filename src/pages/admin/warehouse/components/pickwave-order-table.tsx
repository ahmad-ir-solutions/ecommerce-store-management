import { useState } from "react"
import { flexRender, type Table as TanStackTable } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PaginationControls } from "@/components/shared/PaginationControls"
import { CheckboxListFilter } from "@/components/shared/checkbox-list-filter"
import { DateRangePickerFilter } from "@/components/shared/date-range-picker-filter"
import { SavedFilters } from "../../orders/components/saved-filter"
import { SaveFilterModal } from "../../orders/components/modals/save-filter-modal"

interface OrdersTableProps {
  table: TanStackTable<any>
  columnFilters: any[]
  setColumnFilters: (filters: any[]) => void
  searchInput: string
  setSearchInput: (value: string) => void
  currentPage: number
  totalPages: number
  handlePageChange: (page: number) => void
  pagination: {
    pageIndex: number
    pageSize: number
  }
  data?: {
    pagination?: {
      total?: number
    }
  }
  columns: any[]
}

export function PickwaveOrdersTable({
  table,
  columnFilters,
  setColumnFilters,
  searchInput,
  setSearchInput,
  currentPage,
  totalPages,
  handlePageChange,
  pagination,
  data,
  columns,
}: OrdersTableProps) {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  const columnFilterTypes: Record<string, string> = {
    ordersFlags: "checkbox-list",
    channel: "checkbox-list",
    warehouse: "checkbox-list",
    orderDate: "date-range",
    dispatchDate: "date-range",
    channelDispatchDate: "date-range",
    shippingMethod: "checkbox-list",
    shippingCountry: "checkbox-list",
  }

  const filterOptions = {
    ordersFlags: ["All", "Attention Required", "Normal"],
    channel: ["All", "TikTok", "Amazon", "eBay", "Shopify", "Woocommerce"],
    warehouse: ["All", "Default Warehouse", "Central Hub", "North Warehouse", "South Warehouse"],
    shippingMethod: ["All", "Royal Mail Tracked 24", "Royal Mail Tracked 48", "Standard", "Express"],
    shippingCountry: ["All", "UNITED KINGDOM", "UNITED STATES", "GERMANY", "FRANCE", "AUSTRALIA"],
  }

  const handleSaveFilters = () => {
    setIsSaveModalOpen(true)
  }

  const handleResetFilters = () => {
    setColumnFilters([])
    setSearchInput("")
  }

  return (
    <div className="space-y-4">
      {/* Bulk Actions Toolbar - Show only when orders are selected */}
      {/* {selectedOrderIds.length > 0 && (
        <BulkActionsToolbar selectedOrderIds={selectedOrderIds} onClearSelection={handleClearSelection} />
      )} */}

      {/* Filter Actions */}
      <div className="flex items-center justify-between bg-white py-4 px-6 rounded-2xl">
        <div className="flex items-center space-x-2">
          {/* <span className="text-sm text-gray-600">{data?.pagination?.total || 0} total orders</span> */}
        </div>
        <div className="flex items-center space-x-2">
          <SavedFilters
            onApplyFilter={(filters) => {
              setColumnFilters(filters.columnFilters || [])
              setSearchInput(filters.globalFilter || "")
            }}
          />
          <Button variant="filter" onClick={handleSaveFilters}>
            Save Filters
          </Button>
          <Button variant="filter" onClick={handleResetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Orders Table */}
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="max-w-24"
          >
            First
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="max-w-24"
          >
            Previous
          </Button>
          <span className="text-sm border border-[#BBC2CB] rounded-md p-1 px-5 max-w-24">{currentPage}</span>
          <Button
            variant="primary"
            className="max-w-24"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="max-w-24"
          >
            Last
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} - Items {(currentPage - 1) * pagination.pageSize + 1} to{" "}
          {Math.min(currentPage * pagination.pageSize, data?.pagination?.total ?? 0)} of {data?.pagination?.total ?? 0}
        </div>
      </div>

      <SaveFilterModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        currentFilters={{ columnFilters, globalFilter: searchInput }}
      />
    </div>
  )
}

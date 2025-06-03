import { useState, useCallback, useEffect } from "react"
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
import { Loader2, Plus } from "lucide-react"
import { SavedFilters } from "../components/saved-filter"
import { CheckboxListFilter } from "../../../../components/shared/checkbox-list-filter"
import { DateRangePickerFilter } from "../../../../components/shared/date-range-picker-filter"
import { PaginationControls } from "@/components/shared/PaginationControls"
import { SaveFilterModal } from "../components/modals/save-filter-modal"
import { useOrderColumns as columns } from "../components/order-columns"
import { Header } from "@/components/shared/header"
import { CustomSearch } from "@/components/shared/custom-search"
import { transformOrderToTableRow } from '../core/order-mapper'
import { useGetOrders } from '../core/hooks/use-orders'
// import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'

export function ManageOrderPage() {
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  // const navigate = useNavigate();

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      setPagination(prev => ({ ...prev, pageIndex: 0 })); // optional: reset to page 1
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSetSearch(searchInput);
  }, [searchInput, debouncedSetSearch]);


  const { orders: data, isLoading, error } = useGetOrders({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchTerm,
  });


  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // const handleAddOrder = () => {
  //   navigate("/admin/orders/add-order");
  // };

  const tableData = data?.orders ? data.orders.map(transformOrderToTableRow) : []

  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: data?.pagination?.pages ?? -1,
    state: {
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    enableSorting: true,
    manualPagination: true,
    onColumnFiltersChange: (filters) => {
      setColumnFilters(filters as any[])
    },
    onPaginationChange: setPagination,
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

  const filterOptions = {
    ordersFlags: ["All", "Pending", "Shipped", "Cancelled"],
    channel: ["All", "TikTok", "Amazon", "eBay", "Shopify"],
    shippingCountry: ["All", "UNITED KINGDOM", "UNITED STATES", "GERMANY", "FRANCE", "AUSTRALIA"],
    shippingMethod: ["All", "Tracked 24", "Tracked 48", "Standard", "Express"],
  }

  // const selectedRows = table.getSelectedRowModel().rows
  // const selectedOrderIds = selectedRows.map((row) => row.original.id)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div>Error loading orders: {(error as Error).message}</div>
  }

  const handleSaveFilters = () => {
    setIsSaveModalOpen(true)
  }

  const handleResetFilters = () => {
    setColumnFilters([])
    setSearchInput("")
  }

  // Calculate total pages
  const totalPages = data?.pagination?.pages || 1
  const currentPage = pagination.pageIndex + 1

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, pageIndex: page - 1 }))
  }

  return (
    <div>
      <Header title="Manage Orders">
        <div className="flex items-center justify-end h-16 px-6 gap-6">
          <CustomSearch
            className="w-[25rem]"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search for orders, Channels order reference, name, postcode (min. 3 characters)"
          />
          <div className="flex items-center gap-4">
            <Button type='button' 
            // onClick={handleAddOrder} 
            variant="default" size="lg" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
              <Plus />
              New Orders
            </Button>
          </div>
        </div>
      </Header>

      <div className="mt-6">
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
              <SavedFilters onApplyFilter={(filters) => {
                setColumnFilters(filters.columnFilters || [])
                setSearchInput(filters.globalFilter || "")
              }} />
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
              {Math.min(currentPage * pagination.pageSize, data?.pagination?.total ?? 0)} of{" "}
              {data?.pagination?.total ?? 0}
            </div>
          </div>

          <SaveFilterModal
            isOpen={isSaveModalOpen}
            onClose={() => setIsSaveModalOpen(false)}
            currentFilters={{ columnFilters, globalFilter: searchInput }}
          />
        </div>
      </div>
    </div>
  )
}

export default ManageOrderPage

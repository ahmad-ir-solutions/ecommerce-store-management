import { useState, useCallback, useEffect } from "react"
import {
  // flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2, Plus } from "lucide-react"
// import { SavedFilters } from "../components/saved-filter"
// import { CheckboxListFilter } from "../../../../components/shared/checkbox-list-filter"
// import { DateRangePickerFilter } from "../../../../components/shared/date-range-picker-filter"
// import { PaginationControls } from "@/components/shared/PaginationControls"
// import { SaveFilterModal } from "../components/modals/save-filter-modal"
import { useOrderColumns as columns } from "../components/order-columns"
import { Header } from "@/components/shared/header"
import { CustomSearch } from "@/components/shared/custom-search"
import { transformOrderToTableRow } from '../core/order-mapper'
import { useGetOrders } from '../core/hooks/use-orders'
import { useNavigate } from 'react-router-dom'
import { debounce } from 'lodash'
import { OrdersTable } from "../components/order-table"

export function ManageOrderPage() {
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  // const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const navigate = useNavigate();

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


  const { orders: orderData, isLoading, error } = useGetOrders({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    search: searchTerm,
  });
  
  
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleAddOrder = () => {
    navigate("/admin/orders/add-order");
  };

  const tableData = orderData?.orders ? orderData.orders.map(transformOrderToTableRow) : []

  const table = useReactTable({
    data: tableData,
    columns,
    pageCount: orderData?.pagination?.pages ?? -1,
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

  // const columnFilterTypes: Record<string, string> = {
  //   ordersFlags: "checkbox-list",
  //   channel: "checkbox-list",
  //   orderDate: "date-range",
  //   dispatchDate: "date-range",
  //   channelDispatchDate: "date-range",   
  //   shippingCountry: "checkbox-list",
  //   shippingMethod: "checkbox-list",
  // }

  // const filterOptions = {
  //   ordersFlags: ["All", "pending", "shipped", "cancelled"],
  //   channel: ["All", "TikTok", "Amazon", "eBay", "Shopify"],
  //   shippingCountry: ["All", "UNITED KINGDOM", "UNITED STATES", "GERMANY", "FRANCE", "AUSTRALIA"],
  //   shippingMethod: ["All", "Tracked 24", "Tracked 48", "Standard", "Express"],
  // }

  // const selectedRows = table.getSelectedRowModel().rows
  // const selectedOrderIds = selectedRows.map((row) => row.original.id)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
      </div>
    )
  }

  if (error) {
    return <div>Error loading orders: {(error as Error).message}</div>
  }

  // const handleSaveFilters = () => {
  //   setIsSaveModalOpen(true)
  // }

  // const handleResetFilters = () => {
  //   setColumnFilters([])
  //   setSearchInput("")
  // }

  // Calculate total pages
  const totalPages = orderData?.pagination?.pages || 1
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
            onClick={handleAddOrder} 
            variant="default" size="lg" className="bg-[#024AFE] hover:bg-[#021bfe] text-white rounded-lg">
              <Plus />
              New Orders
            </Button>
          </div>
        </div>
      </Header>

      <div className="mt-6">
      <OrdersTable
          table={table}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          pagination={pagination}
          data={orderData}
          columns={columns}
        />
      </div>
    </div>
  )
}

export default ManageOrderPage
